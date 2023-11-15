const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ errorFormat: 'minimal' });
const router = express.Router();
const fs = require('fs')
const upload = require("../middlewares/fileUpload");

router.get('/motorista', async (req, res) => {
    try {
        const motoristas = await prisma.motorista.findMany({
            where: {
                inativado: null
            }
        })
        res.status(200).json(motoristas);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu um erro no servidor.', error: error })
        console.log(error)
    }
}); // GERAL

router.get('/motorista/:id', async (req, res) => {
    try {
        const { id } = req.params
        const motorista = await prisma.motorista.findUnique({
            where: {
                id: parseInt(id),
                inativado: null
            }
        });

        if (!motorista) {
            res.status(404).json({ success: false, msg: 'Motorista não encontrado.' });
        } else {
            res.status(200).json(motorista);
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu um erro no servidor.', error: error })
        console.log(error)
    }

}); // POR ID

router.get('/motorista/busca/:nome', async (req, res) => {
    try {
        const { nome } = req.params;
        const motoristas = await prisma.motorista.findMany({
            where: {
                nome: {
                    contains: nome
                },
                inativado: null
            }
        });
        res.status(200).json(motoristas);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu um erro no servidor.', error: error })
        console.log(error)
    }
}); // LIKE

router.post('/motorista', upload.single('foto_caminho'), async (req, res) => {
    try {
        const data = req.body
        const foto = req.file?.path;
        data.foto_caminho = foto

        const motoristaExistente = await prisma.motorista.findMany({
            where: {
                cpf: data.cpf,
                inativado: null
            }
        });

        if (motoristaExistente.length > 0) {
            return res.status(409).json({ success: false, msg: 'O motorista já está cadastrado.' })
        }

        const motorista = await prisma.motorista.create({
            data: data
        });
        res.status(201).json({ msg: 'Motorista cadastrado com sucesso!', motorista });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu um erro no servidor.', error: error })
        console.log(error)
    }
}); // CADASTRAR

router.patch('/motorista/:id', upload.single('foto_caminho'), async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const foto = req.file?.path;
        data.foto_caminho = foto;

        const motoristaExistente = await prisma.motorista.findMany({
            where: {
                cpf: data.cpf,
                inativado: null
            }
        });

        if (foto) {
            if (motoristaExistente[0].foto_caminho !== foto) {
                fs.unlinkSync(motoristaExistente[0].foto_caminho);
            }
        }

        const motorista = await prisma.motorista.update({
            where: {
                id: parseInt(id)
            },
            data: data
        })
        res.status(200).json({ msg: 'Motorista atualizado com sucesso!', motorista });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu um erro no servidor.', error: error })
        console.log(error)
    }
}); // EDITAR

router.delete('/motorista/:id', async (req, res) => {
    try {
        const { id } = req.params
        const dataAtual = new Date().toISOString().split('T')[0]; // Obtém a data atual no formato 'YYYY-MM-DD'
        const motorista = await prisma.motorista.update({
            where: {
                id: parseInt(id),
                inativado: null
            },
            data: {
                inativado: `${dataAtual}T00:00:00.000Z`
            }
        })
        fs.unlinkSync(motorista.foto_caminho)
        res.status(200).json({ msg: 'Motorista deletado com sucesso!', motorista })
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu um erro no servidor.', error: error })
        console.log(error)
    }

}); // DELETAR

module.exports = router;