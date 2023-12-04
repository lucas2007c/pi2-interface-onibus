const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ errorFormat: 'minimal' });
const router = express.Router();

router.get('/viagem', async (req, res) => {
    try {
        const viagens = await prisma.viagem.findMany()
        res.status(200).json(viagens);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // GERAL

router.get('/viagem/:id', async (req, res) => {
    try {
        const { id } = req.params
        const viagem = await prisma.viagem.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!viagem) {
            res.status(404).json({ success: false, msg: 'Viagem não encontrada' });
        } else {
            res.status(200).json(viagem);
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // POR ID

router.post('/viagem', async (req, res) => {
    try {
        let { dataPartida, dataChegada, onibus_id, motorista_id, linha_id } = req.body
        onibus_id = Number(onibus_id)
        motorista_id = Number(motorista_id)
        linha_id = Number(linha_id)
        const viagem = await prisma.viagem.create({
            data: {
                dataPartida: `${dataPartida}.000Z`,
                dataChegada: `${dataChegada}.000Z`,
                onibus_id,
                motorista_id,
                linha_id
            }
        });
        res.status(201).json({ msg: 'Viagem cadastrada com sucesso', viagem });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }
}); // CADASTRAR

module.exports = router;