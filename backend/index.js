const express = require('express');
const cors = require('cors')
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({ errorFormat: 'minimal' });
const port = 3000;

const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());

// PASSAGEIRO --------------------------------------------------------------------------------
app.get('/passageiro', async (req, res) => {
    try {
        const passageiros = await prisma.passageiro.findMany()
        res.status(200).json(passageiros);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }
}); // GERAL

app.get('/passageiro/:id', async (req, res) => {
    try {
        const { id } = req.params
        const passageiro = await prisma.passageiro.findUnique({
            where: {
                id: parseInt(id)
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

app.get('/passageiro/busca/:nome', async (req, res) => {
    try {
        const { nome } = req.params;
        const passageiros = await prisma.passageiro.findMany({
            where: {
                nome: {
                    contains: nome
                }
            }
        });
        console.log(passageiros)
        res.status(200).json(passageiros);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }
}); // LIKE

app.post('/passageiro', async (req, res) => {
    try {
        const data = req.body
        data.usuario_id = Number(data.usuario_id)
        const passageiro = await prisma.passageiro.create({
            data: data
        });
        res.status(201).json(passageiro);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // CADASTRAR

app.put('/passageiro/:id', async (req, res) => {
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
        res.status(200).json(passageiro);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // EDITAR

app.delete('/passageiro/:id', async (req, res) => {
    try {
        const { id } = req.params
        const passageiro = await prisma.passageiro.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.status(200).json({ msg: 'passageiro deletado:', passageiro })
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // DELETAR

// MOTORISTA ------------------------------------------------------------------------------------------------
app.get('/motorista', async (req, res) => {
    try {
        const motoristas = await prisma.motorista.findMany()
        res.status(200).json(motoristas);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }
}); // GERAL

app.get('/motorista/:id', async (req, res) => {
    try {
        const { id } = req.params
        const motorista = await prisma.motorista.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!motorista) {
            res.status(404).json({ success: false, msg: 'motorista não encontrado' });
        } else {
            res.status(200).json(motorista);
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // POR ID

app.get('/motorista/busca/:nome', async (req, res) => {
    try {
        const { nome } = req.params;
        const motoristas = await prisma.motorista.findMany({
            where: {
                nome: {
                    contains: nome
                }
            }
        });
        res.status(200).json(motoristas);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // LIKE

app.post('/motorista', async (req, res) => {
    try {
        const data = req.body
        const motorista = await prisma.motorista.create({
            data: data
        });
        res.status(201).json(motorista);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // CADASTRAR

app.put('/motorista/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const motorista = await prisma.motorista.update({
            where: {
                id: parseInt(id)
            },
            data: data
        })
        res.status(200).json(motorista);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // EDITAR

app.delete('/motorista/:id', async (req, res) => {
    try {
        const { id } = req.params
        const motorista = await prisma.motorista.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.status(200).json({ msg: 'motorista deletado:', motorista })
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // DELETAR

// LINHA ------------------------------------------------------------------------------------------------
app.get('/linha', async (req, res) => {
    try {
        const linhas = await prisma.linha.findMany()
        res.status(200).json(linhas);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // GERAL

app.get('/linha/:id', async (req, res) => {
    try {
        const { id } = req.params
        const linha = await prisma.linha.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!linha) {
            res.status(404).json({ success: false, msg: 'linha não encontrado' });
        } else {
            res.status(200).json(linha);
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // POR ID

app.get('/linha/busca/:localinicio', async (req, res) => {
    try {
        const { localinicio } = req.params;
        const linhas = await prisma.linha.findMany({
            where: {
                localinicio: {
                    contains: localinicio
                }
            }
        });
        res.status(200).json(linhas);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // LIKE

app.post('/linha', async (req, res) => {
    // `2023-01-01T${inicio}:00.000Z`
    try {
        let { nome, origem, destino, horarioPartida, duracao } = req.body
        duracao = Number(duracao)
        const linha = await prisma.linha.create({
            data: {
                nome,
                origem,
                destino,
                horarioPartida: `2023-01-01T${horarioPartida}.000Z`,
                duracao
            }
        });
        res.status(201).json(linha);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // CADASTRAR

app.put('/linha/:id', async (req, res) => {
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
                horarioPartida: `2023-01-01T${horarioPartida}.000Z`,
                duracao
            }
        })
        res.status(200).json(linha);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // EDITAR

app.delete('/linha/:id', async (req, res) => {
    try {
        const { id } = req.params
        const linha = await prisma.linha.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.status(200).json({ msg: 'linha deletada:', linha })
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // DELETAR

// usuario ------------------------------------------------------------------------------------------------
app.get('/usuario', async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany()
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // GERAL

app.get('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params
        const usuario = await prisma.usuario.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!usuario) {
            return res.status(404).json({ success: false, msg: 'usuario não encontrado' });
        }
        res.status(200).json(usuario);

    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // POR ID

app.get('/usuario/busca/:nome', async (req, res) => {
    try {
        const { nome } = req.params;
        const usuarios = await prisma.usuario.findMany({
            where: {
                nome: {
                    contains: nome
                }
            }
        });
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // LIKE

app.post('/usuario', async (req, res) => {
    try {
        const data = req.body
        const usuario = await prisma.usuario.create({
            data: data
        });
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // CADASTRAR

app.patch('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const usuario = await prisma.usuario.update({
            where: {
                id: parseInt(id)
            },
            data: data
        })
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // EDITAR

app.delete('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params
        const usuario = await prisma.usuario.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.status(200).json({ msg: 'usuario deletado:', usuario })
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // DELETAR

// ONIBUS ------------------------------------------------------------------------------------------------
app.get('/onibus', async (req, res) => {
    try {
        const onibus = await prisma.onibus.findMany()
        res.status(200).json(onibus);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // GERAL

app.get('/onibus/:id', async (req, res) => {
    try {
        const { id } = req.params
        const onibus = await prisma.onibus.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!onibus) {
            res.status(404).json({ success: false, msg: 'onibus não encontrado' });
        } else {
            res.status(200).json(onibus);
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // POR ID

app.get('/onibus/busca/:placa', async (req, res) => {
    try {
        const { placa } = req.params;
        const onibus = await prisma.onibus.findMany({
            where: {
                placa: {
                    contains: placa
                }
            }
        });
        res.status(200).json(onibus);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // LIKE

app.post('/onibus', async (req, res) => {
    try {
        const data = req.body
        const onibus = await prisma.onibus.create({
            data: data
        });
        res.status(201).json(onibus);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }


}); // CADASTRAR

app.put('/onibus/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const onibus = await prisma.onibus.update({
            where: {
                id: parseInt(id)
            },
            data: data
        })
        res.status(200).json(onibus);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // EDITAR

app.delete('/onibus/:id', async (req, res) => {
    try {
        const { id } = req.params
        const onibus = await prisma.onibus.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.status(200).json({ msg: 'onibus deletado:', onibus })
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // DELETAR

// VIAGEM ------------------------------------------------------------------
app.get('/viagem', async (req, res) => {
    try {
        const viagens = await prisma.viagem.findMany()
        res.status(200).json(viagens);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // GERAL

app.get('/viagem/:id', async (req, res) => {
    try {
        const { id } = req.params
        const viagem = await prisma.viagem.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!viagem) {
            res.status(404).json({ success: false, msg: 'viagem não encontrada' });
        } else {
            res.status(200).json(viagem);
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // POR ID

app.post('/viagem', async (req, res) => {
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
        res.status(201).json(viagem);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }
}); // CADASTRAR

//EMBARQUE ------------------------------------------------------------------------------------
app.get('/embarque', async (req, res) => {
    try {
        const embarques = await prisma.embarque.findMany()
        res.status(200).json(embarques);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // GERAL

app.post('/embarque', async (req, res) => {
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
        res.status(201).json(embarque);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }
}); // CADASTRAR

app.get('/count/:tabela', async (req, res) => {
    const { tabela } = req.params;
    if (tabela == 'motorista') {
        const countM = await prisma.motorista.count()
        return res.status(200).json({ success: true, msg: `o numero de motoristas é ${countM}` });
    }

    if (tabela == 'passageiro') {
        const countP = await prisma.passageiro.count()
        return res.status(200).json({ success: true, msg: `o numero de passageiros é ${countP}` });
    }

    if (tabela == 'linha') {
        const countL = await prisma.linha.count()
        return res.status(200).json({ success: true, msg: `o numero de linhas é ${countL}` });
    }

    if (tabela == 'onibus') {
        const countO = await prisma.onibus.count()
        return res.status(200).json({ success: true, msg: `o numero de onibuss é ${countO}` });
    }

    if (tabela == 'viagem') {
        const countV = await prisma.viagem.count()
        return res.status(200).json({ success: true, msg: `o numero de viagens é ${countV}` });
    }

    if (tabela == 'embarque') {
        const countE = await prisma.embarque.count()
        return res.status(200).json({ success: true, msg: `o numero de embarques é ${countE}` });
    }

    res.status(404).json({ success: false, msg: 'tabela não encontrada' })
});

app.all('*', (req, res) => {
    res.status(501).json({ success: false, msg: 'Rota Não encontrada' });
})

// RODANDO SERVIDOR
app.listen(port, () => {
    console.log(`servidor rodando na porta ${port}`)
});