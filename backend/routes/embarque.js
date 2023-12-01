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

router.get('/embarque/:cpf', async (req, res) => {
    try {
        let { cpf } = req.params

        const passageiro = await prisma.passageiro.findFirst({
            where: {
                cpf: cpf,
                inativado: null
            }
        });

        if (!passageiro) {
            return res.status(404).json({ success: false, msg: 'passageiro não encontrado' });
        }

        const embarques = await prisma.embarque.findMany({
            where: {
                passageiro_id: Number(passageiro.id)
            }
        });

        if (embarques.length == 0) {
            return res.status(404).json({ success: false, msg: 'Não há embarques registrados' });
        }

        res.status(200).json(embarques);
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
                data: data,
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