const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient({ errorFormat: 'minimal' });
const router = express.Router();
const fs = require('fs')
const upload = require("../middlewares/fileUpload");

router.get('/usuario', async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany({
            where: {
                inativado: null
            }
        })
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // GERAL

router.get('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params
        const usuario = await prisma.usuario.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!usuario) {
            return res.status(404).json({ success: false, msg: 'usuario não encontrado' });
        }
        res.status(200).json(usuario);

    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // POR ID

router.get('/usuario/busca/:nome', async (req, res) => {
    try {
        const { nome } = req.params;
        const usuarios = await prisma.usuario.findMany({
            where: {
                nome: {
                    contains: nome
                },
                inativado: null
            }
        });
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // LIKE

router.post('/usuario', upload.single('foto_caminho'), async (req, res) => {
    try {
        const data = req.body
        const foto = req.file?.path;
        data.foto_caminho = foto

        const usuarioExistente = await prisma.usuario.findMany({
            where: {
                email: data.email,
                inativado: null
            }
        });

        if (usuarioExistente.length > 0) {
            return res.status(409).json({ success: false, msg: 'O usuário ja está cadastrado' })
        }

        data.senha = await bcrypt.hash(data.senha, 10);
        const usuario = await prisma.usuario.create({
            data: data
        });
        res.status(201).json({ msg: 'Usuário cadastrado com sucesso', usuario });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // CADASTRAR

router.patch('/usuario/:id', upload.single('foto_caminho'), async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const foto = req.file?.path;
        data.foto_caminho = foto;
        data.senha = await bcrypt.hash(data.senha, 10);
        console.log(data.senha);

        const usuarioExistente = await prisma.usuario.findMany({
            where: {
                email: data.email,
                inativado: null
            }
        });

        if (foto) {
            if (usuarioExistente[0].foto_caminho !== foto) {
                fs.unlinkSync(usuarioExistente[0].foto_caminho);
            }
        }

        const usuario = await prisma.usuario.update({
            where: {
                id: parseInt(id)
            },
            data: data
        })
        res.status(200).json({ msg: 'Usuário atualizado com sucesso', usuario });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // EDITAR

router.delete('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params
        const dataAtual = new Date().toISOString().split('T')[0]; // Obtém a data atual no formato 'YYYY-MM-DD'
        const usuario = await prisma.usuario.update({
            where: {
                id: parseInt(id)
            },
            data: {
                inativado: `${dataAtual}T00:00:00.000Z`
            }
        })
        fs.unlinkSync(usuario.foto_caminho)
        res.status(200).json({ msg: 'Usuário deletado com sucesso', usuario })
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // DELETAR

module.exports = router;