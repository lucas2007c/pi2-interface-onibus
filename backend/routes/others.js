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
                codigo_cartao: cartao.codigo_cartao,
                inativado: null
            }
        });

        function addZero(numero) {
            return numero < 10 ? `0${numero}` : numero;
        }
        const data = new Date(); // momento atual 
        const horas = addZero(data.getHours());
        const minutos = addZero(data.getMinutes());
        const segundos = addZero(data.getSeconds());

        const hhmmss = [horas, minutos, segundos].join(':');
        const dataAtualFormatada = data.toISOString().split('T')[0];
        const viagemAtual = await prisma.viagem.findFirst({
            where: {
                dataPartida: {
                    lte: `${dataAtualFormatada}T${hhmmss}.000Z`, // A partida já ocorreu ou está ocorrendo
                },
                dataChegada: {
                    gte: `${dataAtualFormatada}T${hhmmss}.000Z`, // A chegada ainda não ocorreu
                },
            },
        });

        if (passageiro.length == 0) {
            return res.status(404).json({ msg: 'Passageiro não encontrado' });
        }

        if (passageiro[0].tipo_cartao == 'Comum') {
            const novoSaldo = passageiro[0].saldo - tarifa
            if (novoSaldo < 0) {
                res.status(400).json({ msg: "Saldo insuficente", passageiroId: passageiro[0] });
            }

            await prisma.passageiro.update({
                where: {
                    id: Number(passageiro[0].id)
                },
                data: {
                    saldo: novoSaldo
                }
            })
            return res.status(200).json({ tarifa: tarifa, passageiroId: passageiro[0], viagemId: viagemAtual.id });
        } // COMUM ------------------

        if (passageiro[0].tipo_cartao == 'Estudante') {
            const total_embarques = await prisma.embarque.count({
                where: {
                    AND: [
                        { data: { lt: `${dataAtualFormatada}T23:59:59.000Z` } },
                        { passageiro_id: passageiro[0].id }
                    ]
                }
            });

            if (total_embarques == 2) {
                res.status(400).json({ msg: "Atingiu o limite de viagens diárias" });
            }

            return res.status(200).json({ tarifa: 'Gratuito', passageiroId: passageiro[0], viagemId: viagemAtual.id });
        } // ESTUDANTE -----------------

        if (passageiro[0].tipo_cartao == 'Idoso') {
            return res.status(200).json({ tarifa: 'Gratuito', passageiroId: passageiro[0], viagemId: viagemAtual.id });
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }
});


module.exports = router;