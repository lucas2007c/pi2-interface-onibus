-- CreateTable
CREATE TABLE `linha` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `inicio` TIME(0) NOT NULL,
    `fim` TIME(0) NOT NULL,
    `localinicio` VARCHAR(45) NOT NULL,
    `localfim` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `motorista` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf` VARCHAR(15) NULL,
    `nome` VARCHAR(200) NOT NULL,
    `nascimento` DATE NOT NULL,
    `numero` VARCHAR(15) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `foto_caminho` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `onibus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `placa` VARCHAR(8) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `passageiro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(200) NOT NULL,
    `saldo` DECIMAL(10, 2) NOT NULL,
    `cpf` VARCHAR(15) NULL,
    `nascimento` DATE NOT NULL,
    `numero` VARCHAR(20) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `foto_caminho` VARCHAR(200) NOT NULL,
    `tipo_cartao` VARCHAR(50) NOT NULL,
    `usuario_id` INTEGER NOT NULL,

    UNIQUE INDEX `passageiro_id_key`(`id`),
    INDEX `fk_usuario_id`(`usuario_id`),
    PRIMARY KEY (`id`, `usuario_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(200) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `senha` VARCHAR(45) NOT NULL,
    `token` VARCHAR(45) NOT NULL,
    `foto_caminho` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `viagem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` DATETIME(0) NULL,
    `onibus_id` INTEGER NOT NULL,
    `motorista_id` INTEGER NOT NULL,
    `linha_id` INTEGER NOT NULL,

    UNIQUE INDEX `viagem_id_key`(`id`),
    INDEX `fk_motorista_id`(`motorista_id`),
    INDEX `fk_onibus_id`(`onibus_id`),
    INDEX `linha_id`(`linha_id`),
    PRIMARY KEY (`id`, `onibus_id`, `motorista_id`, `linha_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `viagem_has_passageiro` (
    `tarifa` DECIMAL(10, 2) NOT NULL,
    `data` DATETIME(0) NOT NULL,
    `passageiro_id` INTEGER NOT NULL,
    `viagem_id` INTEGER NOT NULL,

    INDEX `fk_viagem_id`(`viagem_id`),
    PRIMARY KEY (`passageiro_id`, `viagem_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `passageiro` ADD CONSTRAINT `fk_usuario_id` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `viagem` ADD CONSTRAINT `fk_motorista_id` FOREIGN KEY (`motorista_id`) REFERENCES `motorista`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `viagem` ADD CONSTRAINT `fk_onibus_id` FOREIGN KEY (`onibus_id`) REFERENCES `onibus`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `viagem` ADD CONSTRAINT `linha_id` FOREIGN KEY (`linha_id`) REFERENCES `linha`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `viagem_has_passageiro` ADD CONSTRAINT `fk_passageiro_id` FOREIGN KEY (`passageiro_id`) REFERENCES `passageiro`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `viagem_has_passageiro` ADD CONSTRAINT `fk_viagem_id` FOREIGN KEY (`viagem_id`) REFERENCES `viagem`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
