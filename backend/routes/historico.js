const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ errorFormat: 'minimal' });
const router = express.Router();

router.get('/historico', async (req, res) => {
    try {
        const acoes = await prisma.historico.findMany()
        res.status(200).json(acoes);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu um erro no servidor.', error: error })
        console.log(error)
    }
}); // GERAL

router.get('/historico/recentes', async (req, res) => {
    try {
        const acoes = await prisma.historico.findMany({
            orderBy: {
                id: 'desc' // ou 'asc' se desejar em ordem crescente
            },
            take: 5
        })
        res.status(200).json(acoes);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu um erro no servidor.', error: error })
        console.log(error)
    }
}); // RECENTES

router.get('/historico/:id', async (req, res) => {
    try {
        const { id } = req.params
        const acao = await prisma.historico.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!acao) {
            return res.status(404).json({ success: false, msg: 'Ação não encontrada.' });
        }

        res.status(200).json(acao);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu um erro no servidor.', error: error })
        console.log(error)
    }

}); // POR ID

router.post('/historico', async (req, res) => {
    try {
        const data = req.body

        const acao = await prisma.historico.create({
            data: data
        });
        res.status(201).json({ msg: 'Ação cadastrada com sucesso!', acao });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu um erro no servidor.', error: error })
        console.log(error)
    }

}); // CADASTRAR
module.exports = router;