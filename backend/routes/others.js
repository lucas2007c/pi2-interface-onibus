const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ errorFormat: 'minimal' });
const router = express.Router();

// COUNT ------------------------------------------------------------
router.get('/count/:tabela', async (req, res) => {
    contar = async (tabela) => {
        const resultado = await prisma[tabela].count({
            where: {
                inativado: null
            }
        })
        return resultado
    } // Função para count

    try {
        const { tabela } = req.params;
        const tabelasValidas = ['motorista', 'passageiro', 'linha', 'onibus', 'viagem', 'embarque', 'usuario'];
        if (tabelasValidas.includes(tabela)) {
            const countM = await contar(tabela)
            return res.status(200).json({ success: true, msg: `${countM}` });
        }

        res.status(404).json({ success: false, msg: 'tabela não encontrada' })
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }
});


// RECARGA ---------------------------------------------------------------------------------------------------------------
router.patch('/recarga/', async (req, res) => {
    try {
        const { cpf, valor } = req.body

        // verifica se o passageiro existe
        const passageiroExistente = await prisma.passageiro.findMany({
            where: {
                cpf: cpf,
                inativado: null
            }
        });

        if (passageiroExistente.length === 0) {
            return res.status(404).json({ success: false, msg: 'Passageiro não encontrado' })
        };

        const saldo = Number(passageiroExistente[0].saldo) + Number(valor)
        const usuario_id = Number(passageiroExistente[0].usuario_id)

        const passageiro = await prisma.passageiro.update({
            where: {
                id: passageiroExistente[0].id,
                inativado: null
            },
            data: { saldo, usuario_id }
        })
        res.status(200).json({ msg: 'Recarga realizada com sucesso', passageiro });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }
});

// RECARGA ---------------------------------------------------------------------------------------------------------------
router.post('/catraca', async (req, res) => {
    const tarifa = 5
    try {
        const cartao = req.body
        const passageiro = await prisma.passageiro.findMany({
            where: {
                codigo_cartao: cartao,
                inativado: null
            }
        });

        if (passageiro.length === 0) {
            return res.status(404).json({ success: false, msg: 'Passageiro não encontrado' });
        }

        if (passageiro[0].tipo_cartao == 'comum') {
            const novoSaldo = passageiro[0].saldo - tarifa
            if (novoSaldo < 0) {
                throw new Error("Saldo insuficente");
            }

            await prisma.passageiro.update({
                where: {
                    id: Number(passageiro[0].id)
                },
                data: novoSaldo
            })
            return res.status(200)
        } // COMUM ------------------


        if (passageiro[0].tipo_cartao == 'estudante') {
            const embarques = await prisma.embarque.findMany({
                where: {
                    data: {
                        equals: new Date(),
                        mode: 'day',
                    },
                },
                By: {
                    passageiro_id: true,
                },
                having: {
                    total_embarques: {
                        equals: 2,
                    },
                },
                select: {
                    passageiro_id: true,
                },
            });

            if (embarques.includes(passageiro[0].id)) {
                throw new Error("Atingiu o limite de viagens diárias");
            }

            return res.status(200)
        } // ESTUDANTE -----------------

        if (passageiro[0].tipo_cartao == 'idoso') {
            return res.status(200)
        }


        const agora = new Date(); // Obtém a data e hora atuais

        const viagemAtual = await prisma.viagem.findFirst({
            where: {
                dataPartida: {
                    lte: agora, // A partida já ocorreu ou está ocorrendo
                },
                dataChegada: {
                    gte: agora, // A chegada ainda não ocorreu
                },
            },
        });

        res.status(200).json({ tarifa: tarifa, passageiro_id: passageiro[0].id, viagem_id: viagemAtual.id })
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }
});


module.exports = router;