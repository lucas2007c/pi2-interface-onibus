const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ errorFormat: 'minimal' });
const router = express.Router();
const fs = require('fs')
const upload = require("../middlewares/fileUpload");

router.get('/passageiro', async (req, res) => {
    try {
        const passageiros = await prisma.passageiro.findMany({
            where: {
                inativado: null
            }
        })
        res.status(200).json(passageiros);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu um erro no servidor.', error: error })
        console.log(error)
    }
}); // GERAL

router.get('/passageiro/:id', async (req, res) => {
    try {
        const { id } = req.params
        const passageiro = await prisma.passageiro.findUnique({
            where: {
                id: parseInt(id),
                inativado: null
            }
        });

        if (!passageiro) {
            return res.status(404).json({ success: false, msg: 'Passageiro não encontrado.' });
        }

        res.status(200).json(passageiro);

    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu um erro no servidor.', error: error })
        console.log(error)
    }

}); // POR ID

router.get('/passageiro/saldo/:cpf', async (req, res) => {
    try {
        const { cpf } = req.params
        const passageiro = await prisma.passageiro.findFirst({
            where: {
                cpf: cpf,
                inativado: null
            }
        });
        if (!passageiro) {
            return res.status(404).json({ success: false, msg: 'Passageiro não encontrado.' });
        }

        let msg = `Seu saldo é de R$${passageiro.saldo}`
        if (passageiro.tipo_cartao == 'Idoso') {
            msg = `Cartões do tipo ${passageiro.tipo_cartao} possuem saldo ilimitado`
        }
        if (passageiro.tipo_cartao == 'Estudante') {
            msg = `Cartões do tipo ${passageiro.tipo_cartao} possuem saldo ilimitado, mas com acesso a duas viagens diárias`
        }

        res.status(200).json({ passageiro, msg });

    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu um erro no servidor.', error: error })
        console.log(error)
    }

}); // POR ID

router.get('/passageiro/busca/:nome', async (req, res) => {
    try {
        const { nome } = req.params;
        const passageiros = await prisma.passageiro.findMany({
            where: {
                nome: {
                    contains: nome
                },
                inativado: null
            }
        });
        console.log(passageiros)
        res.status(200).json(passageiros);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu um erro no servidor.', error: error })
        console.log(error)
    }
}); // LIKE

router.post('/passageiro', upload.single('foto_caminho'), async (req, res) => {
    try {
        const data = req.body
        data.usuario_id = Number(data.usuario_id)
        const foto = req.file?.path;
        data.foto_caminho = foto;

        const passageiroExistente = await prisma.passageiro.findMany({
            where: {
                cpf: data.cpf,
                inativado: null
            }
        });

        if (passageiroExistente.length > 0) {
            return res.status(409).json({ success: false, msg: 'O passageiro já está cadastrado.' })
        }

        const cartaoExistente = await prisma.passageiro.findMany({
            where: {
                codigo_cartao: data.codigo_cartao,
                inativado: null
            }
        });

        if (cartaoExistente.length > 0) {
            return res.status(409).json({ success: false, msg: 'Este cartão já está cadastrado.' })
        }

        if (data.tipo_cartao === 'Idoso' || data.tipo_cartao === 'Estudante') {
            data.saldo = 0;
        }

        const passageiro = await prisma.passageiro.create({
            data: data
        });
        res.status(201).json({ msg: 'Passageiro cadastrado com sucesso!', passageiro });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu um erro no servidor.', error: error })
        console.log(error)
    }

}); // CADASTRAR

router.patch('/passageiro/:id', upload.single('foto_caminho'), async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        data.usuario_id = Number(data.usuario_id)
        const foto = req.file?.path;
        data.foto_caminho = foto;

        const passageiroExistente = await prisma.passageiro.findMany({
            where: {
                cpf: data.cpf,
                inativado: null
            }
        });

        if (foto) {
            if (passageiroExistente[0].foto_caminho !== foto) {
                fs.unlinkSync(passageiroExistente[0].foto_caminho);
            }
        }

        const passageiro = await prisma.passageiro.update({
            where: {
                id: parseInt(id)
            },
            data: data
        })
        res.status(200).json({ msg: 'Passageiro atualizado com sucesso!', passageiro });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu um erro no servidor.', error: error })
        console.log(error)
    }

}); // EDITAR

router.delete('/passageiro/:id', async (req, res) => {
    try {
        const { id } = req.params
        const dataAtual = new Date().toISOString().split('T')[0]; // Obtém a data atual no formato 'YYYY-MM-DD'
        const passageiro = await prisma.passageiro.update({
            where: {
                id: parseInt(id)
            },
            data: {
                inativado: `${dataAtual}T00:00:00.000Z`
            }
        })
        fs.unlinkSync(passageiro.foto_caminho)
        res.status(200).json({ msg: 'Passageiro deletado com sucesso', passageiro })
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu um erro no servidor.', error: error })
        console.log(error)
    }

}); // DELETAR

module.exports = router;