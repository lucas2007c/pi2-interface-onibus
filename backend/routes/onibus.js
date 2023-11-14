const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ errorFormat: 'minimal' });
const router = express.Router();

router.get('/onibus', async (req, res) => {
    try {
        const onibus = await prisma.onibus.findMany({
            where: {
                inativado: null
            }
        })
        res.status(200).json(onibus);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // GERAL

router.get('/onibus/:id', async (req, res) => {
    try {
        const { id } = req.params
        const onibus = await prisma.onibus.findUnique({
            where: {
                id: parseInt(id),
                inativado: null
            }
        });

        if (!onibus) {
            res.status(222).json({ success: false, msg: 'onibus não encontrado' });
        } else {
            res.status(200).json(onibus);
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // POR ID

router.get('/onibus/busca/:placa', async (req, res) => {
    try {
        const { placa } = req.params;
        const onibus = await prisma.onibus.findMany({
            where: {
                placa: {
                    contains: placa
                },
                inativado: null
            }
        });
        res.status(200).json(onibus);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // LIKE

router.post('/onibus', async (req, res) => {
    try {
        const data = req.body

        const onibusExistente = await prisma.onibus.findMany({
            where: {
                placa: data.placa,
                inativado: null
            }
        });

        if (onibusExistente.length > 0) {
            return res.status(409).json({ success: false, msg: 'O ônibus ja está cadastrado' })
        }

        const onibus = await prisma.onibus.create({
            data: data
        });
        res.status(201).json({ msg: 'ônibus cadastrado com sucesso', onibus });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }


}); // CADASTRAR

router.patch('/onibus/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const onibus = await prisma.onibus.update({
            where: {
                id: parseInt(id)
            },
            data: data
        })
        res.status(200).json({ msg: 'ônibus cadastrado com sucesso', onibus });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // EDITAR

router.delete('/onibus/:id', async (req, res) => {
    try {
        const { id } = req.params
        const dataAtual = new Date().toISOString().split('T')[0]; // Obtém a data atual no formato 'YYYY-MM-DD'
        const onibus = await prisma.onibus.update({
            where: {
                id: parseInt(id)
            },
            data: {
                inativado: `${dataAtual}T00:00:00.000Z`
            }
        })
        res.status(200).json({ msg: 'ônibus deletado sucesso', onibus })
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // DELETAR

module.exports = router;