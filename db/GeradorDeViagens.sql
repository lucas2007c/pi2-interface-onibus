CREATE TEMPORARY TABLE IF NOT EXISTS numeros (numero INT);
INSERT INTO numeros (numero) VALUES (0),(1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12),(13),(14),(15),(16),(17),(18),(19),(20),(21),(22),(23);

-- Crie as viagens para cada hora do dia com IDs aleatórios de linhas, ônibus e motoristas ativos
INSERT INTO fasttravel.viagem (dataPartida, dataChegada, onibus_id, motorista_id, linha_id)
SELECT
    TIMESTAMP(DATE(NOW()), '00:00:00') + INTERVAL numero HOUR AS dataPartida,
    TIMESTAMP(DATE(NOW()), '00:00:00') + INTERVAL numero + 1 HOUR AS dataChegada,
    (
        SELECT id FROM fasttravel.onibus WHERE inativado IS NULL ORDER BY RAND() LIMIT 1
    ) AS onibus_id,
    (
        SELECT id FROM fasttravel.motorista WHERE inativado IS NULL ORDER BY RAND() LIMIT 1
    ) AS motorista_id,
    (
        SELECT id FROM fasttravel.linha WHERE inativado IS NULL ORDER BY RAND() LIMIT 1
    ) AS linha_id
FROM numeros;

-- Exclua a tabela temporária quando não for mais necessária
DROP TEMPORARY TABLE IF EXISTS numeros;
select * from viagem;