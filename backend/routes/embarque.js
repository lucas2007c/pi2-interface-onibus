const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ errorFormat: 'minimal' });
const router = express.Router();

router.get('/embarque', async (req, res) => {
    try {
        const embarques = await prisma.embarque.findMany()
        res.status(200).json(embarques);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // GERAL

router.get('/embarque/:id', async (req, res) => {
    try {
        let { id } = req.params
        id = Number(id)
        const embarque = await prisma.embarque.findMany({
            where: {
                passageiro_id: id
            }
        });

        if (!embarque) {
            return res.status(222).json({ success: false, msg: 'embarque não encontrado' });
        }

        res.status(200).json(embarque);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // POR ID

router.post('/embarque', async (req, res) => {
    try {
        let { tarifa, data, passageiro_id, viagem_id } = req.body
        tarifa = Number(tarifa)
        passageiro_id = Number(passageiro_id)
        viagem_id = Number(viagem_id)
        const embarque = await prisma.embarque.create({
            data: {
                tarifa,
                data: `${data}.000Z`,
                passageiro_id,
                viagem_id
            }
        });
        res.status(201).json({ msg: 'Embarque adicionado com sucesso', embarque });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }
}); // CADASTRAR

module.exports = router;