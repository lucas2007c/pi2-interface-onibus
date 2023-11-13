const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ errorFormat: 'minimal' });
const router = express.Router();

router.get('/passageiro', async (req, res) => {
    try {
        const passageiros = await prisma.passageiro.findMany({
            where: {
                inativado: null
            }
        })
        res.status(200).json(passageiros);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
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
            return res.status(404).json({ success: false, msg: 'Passageiro não encontrado' });
        }

        res.status(200).json(passageiro);

    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
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
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }
}); // LIKE

router.post('/passageiro', async (req, res) => {
    try {
        const data = req.body
        data.usuario_id = Number(data.usuario_id)

        const passageiroExistente = await prisma.passageiro.findMany({
            where: {
                cpf: data.cpf,
                inativado: null
            }
        });

        if (passageiroExistente.length > 0) {
            return res.status(409).json({ success: false, msg: 'O passageiro ja está Cadastrado' })
        }

        const passageiro = await prisma.passageiro.create({
            data: data
        });
        res.status(201).json({ msg: 'passageiro cadastrado com sucesso', passageiro });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // CADASTRAR

router.patch('/passageiro/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        data.usuario_id = Number(data.usuario_id)

        const passageiro = await prisma.passageiro.update({
            where: {
                id: parseInt(id)
            },
            data: data
        })
        res.status(200).json({ msg: 'passageiro atualizado com sucesso', passageiro });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
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
        res.status(200).json({ msg: 'passageiro deletado com sucesso', passageiro })
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // DELETAR

module.exports = router;