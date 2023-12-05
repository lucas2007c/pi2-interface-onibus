-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema fasttravel
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema fasttravel
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `fasttravel` DEFAULT CHARACTER SET utf8mb4 ;
USE `fasttravel` ;

-- -----------------------------------------------------
-- Table `fasttravel`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fasttravel`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `senha` VARCHAR(200) NOT NULL,
  `foto_caminho` VARCHAR(200) NOT NULL,
  `inativado` DATE NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `fasttravel`.`passageiro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fasttravel`.`passageiro` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NOT NULL,
  `saldo` DECIMAL(10,2) NOT NULL,
  `cpf` VARCHAR(15) NULL DEFAULT NULL,
  `numero` VARCHAR(20) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `foto_caminho` VARCHAR(200) NOT NULL,
  `tipo_cartao` VARCHAR(50) NOT NULL,
  `codigo_cartao` VARCHAR(50) NOT NULL,
  `usuario_id` INT(11) NOT NULL,
  `inativado` DATE NULL,
  PRIMARY KEY (`id`, `usuario_id`),
  UNIQUE INDEX `passageiro_id_key` (`id` ASC),
  INDEX `fk_usuario_id` (`usuario_id` ASC),
  CONSTRAINT `fk_usuario_id`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `fasttravel`.`usuario` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `fasttravel`.`motorista`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fasttravel`.`motorista` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cpf` VARCHAR(15) NULL DEFAULT NULL,
  `nome` VARCHAR(200) NOT NULL,
  `numero` VARCHAR(15) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `foto_caminho` VARCHAR(200) NOT NULL,
  `inativado` DATE NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `fasttravel`.`onibus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fasttravel`.`onibus` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `placa` VARCHAR(8) NOT NULL,
  `inativado` DATE NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `fasttravel`.`linha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fasttravel`.`linha` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `origem` VARCHAR(100) NOT NULL,
  `destino` VARCHAR(100) NOT NULL,
  `horarioPartida` TIME NOT NULL,
  `duracao` SMALLINT(5) NOT NULL,
  `inativado` DATE NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `fasttravel`.`viagem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fasttravel`.`viagem` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `dataPartida` DATETIME NULL DEFAULT NULL,
  `dataChegada` DATETIME NULL DEFAULT NULL,
  `onibus_id` INT(11) NOT NULL,
  `motorista_id` INT(11) NOT NULL,
  `linha_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `onibus_id`, `motorista_id`, `linha_id`),
  UNIQUE INDEX `viagem_id_key` (`id` ASC),
  INDEX `fk_motorista_id` (`motorista_id` ASC),
  INDEX `fk_onibus_id` (`onibus_id` ASC),
  INDEX `linha_id` (`linha_id` ASC),
  CONSTRAINT `fk_motorista_id`
    FOREIGN KEY (`motorista_id`)
    REFERENCES `fasttravel`.`motorista` (`id`),
  CONSTRAINT `fk_onibus_id`
    FOREIGN KEY (`onibus_id`)
    REFERENCES `fasttravel`.`onibus` (`id`),
  CONSTRAINT `linha_id`
    FOREIGN KEY (`linha_id`)
    REFERENCES `fasttravel`.`linha` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `fasttravel`.`embarque`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fasttravel`.`embarque` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tarifa` DECIMAL(10,2) NOT NULL,
  `data` DATETIME NOT NULL,
  `passageiro_id` INT(11) NOT NULL,
  `viagem_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `passageiro_id`, `viagem_id`),
  INDEX `fk_viagem_id` (`viagem_id` ASC),
  CONSTRAINT `fk_passageiro_id`
    FOREIGN KEY (`passageiro_id`)
    REFERENCES `fasttravel`.`passageiro` (`id`),
  CONSTRAINT `fk_viagem_id`
    FOREIGN KEY (`viagem_id`)
    REFERENCES `fasttravel`.`viagem` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `fasttravel`.`historico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fasttravel`.`historico` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `funcao` VARCHAR(100) NULL,
  `nome` VARCHAR(200) NULL,
  `autor` VARCHAR(200) NULL,
  `data` DATE NULL,
  `hora` TIME NULL,
  `acao` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;