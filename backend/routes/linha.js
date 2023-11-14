const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ errorFormat: 'minimal' });
const router = express.Router();

router.get('/linha', async (req, res) => {
    try {
        const linhas = await prisma.linha.findMany({
            where: {
                inativado: null
            }
        })
        res.status(200).json(linhas);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // GERAL

router.get('/linha/:id', async (req, res) => {
    try {
        const { id } = req.params
        const linha = await prisma.linha.findUnique({
            where: {
                id: parseInt(id),
                inativado: null
            }
        });

        if (!linha) {
            res.status(222).json({ success: false, msg: 'linha não encontrada' });
        } else {
            res.status(200).json(linha);
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // POR ID

router.get('/linha/busca/:localinicio', async (req, res) => {
    try {
        const { localinicio } = req.params;
        const linhas = await prisma.linha.findMany({
            where: {
                localinicio: {
                    contains: localinicio
                },
                inativado: null
            }
        });
        res.status(200).json(linhas);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // LIKE

router.post('/linha', async (req, res) => {
    // `2023-01-01T${inicio}:00.000Z`
    try {
        let { nome, origem, destino, horarioPartida, duracao } = req.body

        const linhaExistente = await prisma.linha.findMany({
            where: {
                origem: origem,
                destino: destino,
                inativado: null
            }
        });

        if (linhaExistente.length > 0) {
            return res.status(409).json({ success: false, msg: 'A linha ja está Cadastrada' })
        }

        duracao = Number(duracao)
        const linha = await prisma.linha.create({
            data: {
                nome,
                origem,
                destino,
                horarioPartida: `2023-01-01T${horarioPartida}:00.000Z`,
                duracao
            }
        });
        res.status(201).json({ msg: 'linha cadastrada com sucesso', linha });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // CADASTRAR

router.patch('/linha/:id', async (req, res) => {
    try {
        const { id } = req.params
        let { nome, origem, destino, horarioPartida, duracao } = req.body
        duracao = Number(duracao)
        const linha = await prisma.linha.update({
            where: {
                id: parseInt(id)
            },
            data: {
                nome,
                origem,
                destino,
                horarioPartida: `2023-01-01T${horarioPartida}:00.000Z`,
                duracao
            }
        })
        res.status(200).json({ msg: 'linha atualizada com sucesso', linha });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // EDITAR

router.delete('/linha/:id', async (req, res) => {
    try {
        const { id } = req.params
        const dataAtual = new Date().toISOString().split('T')[0]; // Obtém a data atual no formato 'YYYY-MM-DD'
        const linha = await prisma.linha.update({
            where: {
                id: parseInt(id)
            },
            data: {
                inativado: `${dataAtual}T00:00:00.000Z`
            }
        })
        res.status(200).json({ msg: 'linha deletada com sucesso', linha })
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // DELETAR

module.exports = router;