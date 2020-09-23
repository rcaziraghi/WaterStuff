-- MySQL Script generated by MySQL Workbench
-- Tue Sep 22 23:52:52 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`usuario` ;

CREATE TABLE IF NOT EXISTS `mydb`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(125) NOT NULL,
  `senha` VARCHAR(125) NOT NULL,
  `idperfil` INT NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`, `email`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`os`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`os` ;

CREATE TABLE IF NOT EXISTS `mydb`.`os` (
  `idOS` INT NOT NULL AUTO_INCREMENT,
  `situacao` VARCHAR(45) NOT NULL,
  `localizacao` VARCHAR(45) NULL DEFAULT NULL,
  `descritivo` VARCHAR(120) NOT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`idOS`, `usuario_id`),
  INDEX `fk_OS_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_OS_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `mydb`.`usuario` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`protocolo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`protocolo` ;

CREATE TABLE IF NOT EXISTS `mydb`.`protocolo` (
  `idprotocolo` INT NOT NULL AUTO_INCREMENT,
  `situacao` VARCHAR(45) NULL DEFAULT NULL,
  `tipo` VARCHAR(45) NULL DEFAULT NULL,
  `titulo` VARCHAR(45) NULL DEFAULT NULL,
  `descritivo` VARCHAR(45) NULL DEFAULT NULL,
  `processo` VARCHAR(45) NULL DEFAULT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`idprotocolo`),
  INDEX `fk_protocolo_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_protocolo_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `mydb`.`usuario` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`avaliacao`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`avaliacao` ;

CREATE TABLE IF NOT EXISTS `mydb`.`avaliacao` (
  `idavalicao` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(45) NULL DEFAULT NULL,
  `atendimento` VARCHAR(250) NULL DEFAULT NULL,
  `nota` INT NULL DEFAULT NULL,
  `observacoes` VARCHAR(45) NULL DEFAULT NULL,
  `avalicaocol` VARCHAR(45) NULL DEFAULT NULL,
  `OS_idOS` INT NOT NULL,
  `OS_usuario_id` INT NOT NULL,
  `protocolo_idprotocolo` INT NOT NULL,
  PRIMARY KEY (`idavalicao`),
  INDEX `fk_avaliacao_OS1_idx` (`OS_idOS` ASC, `OS_usuario_id` ASC) VISIBLE,
  INDEX `fk_avaliacao_protocolo1_idx` (`protocolo_idprotocolo` ASC) VISIBLE,
  CONSTRAINT `fk_avaliacao_OS1`
    FOREIGN KEY (`OS_idOS` , `OS_usuario_id`)
    REFERENCES `mydb`.`os` (`idOS` , `usuario_id`),
  CONSTRAINT `fk_avaliacao_protocolo1`
    FOREIGN KEY (`protocolo_idprotocolo`)
    REFERENCES `mydb`.`protocolo` (`idprotocolo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`banco`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`banco` ;

CREATE TABLE IF NOT EXISTS `mydb`.`banco` (
  `idbanco` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `codigo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idbanco`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`cargo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`cargo` ;

CREATE TABLE IF NOT EXISTS `mydb`.`cargo` (
  `id` INT NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`chat`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`chat` ;

CREATE TABLE IF NOT EXISTS `mydb`.`chat` (
  `idchat` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `texto` VARCHAR(250) NULL DEFAULT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`idchat`, `usuario_id`),
  INDEX `fk_chat_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_chat_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `mydb`.`usuario` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`pais`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`pais` ;

CREATE TABLE IF NOT EXISTS `mydb`.`pais` (
  `idPais` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(256) NOT NULL,
  `sigla` VARCHAR(5) NOT NULL,
  PRIMARY KEY (`idPais`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`estado`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`estado` ;

CREATE TABLE IF NOT EXISTS `mydb`.`estado` (
  `idEstado` INT NOT NULL AUTO_INCREMENT,
  `estado` VARCHAR(45) NOT NULL,
  `sigla` VARCHAR(2) NULL DEFAULT NULL,
  `pais_idPais` INT NOT NULL,
  PRIMARY KEY (`idEstado`),
  UNIQUE INDEX `codEstado_UNIQUE` (`idEstado` ASC) VISIBLE,
  INDEX `fk_estado_pais_idx` (`pais_idPais` ASC) VISIBLE,
  CONSTRAINT `fk_estado_pais`
    FOREIGN KEY (`pais_idPais`)
    REFERENCES `mydb`.`pais` (`idPais`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`cidade`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`cidade` ;

CREATE TABLE IF NOT EXISTS `mydb`.`cidade` (
  `idCidade` INT NOT NULL AUTO_INCREMENT,
  `cidade` VARCHAR(45) NOT NULL,
  `estado_idEstado` INT NOT NULL,
  PRIMARY KEY (`idCidade`),
  UNIQUE INDEX `codCidade_UNIQUE` (`idCidade` ASC) VISIBLE,
  INDEX `fk_cidade_estado1_idx` (`estado_idEstado` ASC) VISIBLE,
  CONSTRAINT `fk_cidade_estado1`
    FOREIGN KEY (`estado_idEstado`)
    REFERENCES `mydb`.`estado` (`idEstado`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`contabancaria`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`contabancaria` ;

CREATE TABLE IF NOT EXISTS `mydb`.`contabancaria` (
  `idcontaBancaria` INT NOT NULL,
  `agencia` INT NOT NULL,
  `conta` VARCHAR(12) NULL DEFAULT NULL,
  `usuario_id` INT NOT NULL,
  `banco_idbanco` INT NOT NULL,
  PRIMARY KEY (`idcontaBancaria`),
  INDEX `fk_contaBancaria_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  INDEX `fk_contaBancaria_banco1_idx` (`banco_idbanco` ASC) VISIBLE,
  CONSTRAINT `fk_contaBancaria_banco1`
    FOREIGN KEY (`banco_idbanco`)
    REFERENCES `mydb`.`banco` (`idbanco`),
  CONSTRAINT `fk_contaBancaria_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `mydb`.`usuario` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`denuncia`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`denuncia` ;

CREATE TABLE IF NOT EXISTS `mydb`.`denuncia` (
  `iddenuncia` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL DEFAULT NULL,
  `descritivo` VARCHAR(250) NULL DEFAULT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`iddenuncia`, `usuario_id`),
  INDEX `fk_denuncia_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_denuncia_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `mydb`.`usuario` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`documentos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`documentos` ;

CREATE TABLE IF NOT EXISTS `mydb`.`documentos` (
  `idDocumentos` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`idDocumentos`, `usuario_id`),
  UNIQUE INDEX `idDocumentos_UNIQUE` (`idDocumentos` ASC) VISIBLE,
  INDEX `fk_documentos_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_documentos_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `mydb`.`usuario` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`endereco`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`endereco` ;

CREATE TABLE IF NOT EXISTS `mydb`.`endereco` (
  `idEndereco` INT NOT NULL AUTO_INCREMENT,
  `cep` VARCHAR(15) NOT NULL,
  `logradouro` VARCHAR(250) NOT NULL,
  `numero` INT NULL DEFAULT NULL,
  `complemento` VARCHAR(45) NULL DEFAULT NULL,
  `bairro` VARCHAR(250) NULL DEFAULT NULL,
  `cidade_idCidade` INT NOT NULL,
  PRIMARY KEY (`idEndereco`),
  UNIQUE INDEX `idEndereco_UNIQUE` (`idEndereco` ASC) VISIBLE,
  INDEX `fk_endereco_cidade1_idx` (`cidade_idCidade` ASC) VISIBLE,
  CONSTRAINT `fk_endereco_cidade1`
    FOREIGN KEY (`cidade_idCidade`)
    REFERENCES `mydb`.`cidade` (`idCidade`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`instalacao`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`instalacao` ;

CREATE TABLE IF NOT EXISTS `mydb`.`instalacao` (
  `idInstalacao` INT NOT NULL AUTO_INCREMENT,
  `endereco_idEndereco` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`idInstalacao`),
  UNIQUE INDEX `idInstalacao_UNIQUE` (`idInstalacao` ASC) VISIBLE,
  INDEX `fk_instalacao_endereco1_idx` (`endereco_idEndereco` ASC) VISIBLE,
  INDEX `fk_instalacao_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_instalacao_endereco1`
    FOREIGN KEY (`endereco_idEndereco`)
    REFERENCES `mydb`.`endereco` (`idEndereco`),
  CONSTRAINT `fk_instalacao_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `mydb`.`usuario` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`leitura`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`leitura` ;

CREATE TABLE IF NOT EXISTS `mydb`.`leitura` (
  `idLeitura` INT NOT NULL AUTO_INCREMENT,
  `mes` INT NOT NULL,
  `ano` YEAR NOT NULL,
  `data` DATETIME NOT NULL,
  `valor` VARCHAR(45) NOT NULL,
  `instalacao_idInstalacao` INT NOT NULL,
  PRIMARY KEY (`idLeitura`),
  UNIQUE INDEX `codLeitura_UNIQUE` (`idLeitura` ASC) VISIBLE,
  INDEX `fk_leitura_instalacao1_idx` (`instalacao_idInstalacao` ASC) VISIBLE,
  CONSTRAINT `fk_leitura_instalacao1`
    FOREIGN KEY (`instalacao_idInstalacao`)
    REFERENCES `mydb`.`instalacao` (`idInstalacao`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`fatura`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`fatura` ;

CREATE TABLE IF NOT EXISTS `mydb`.`fatura` (
  `idFatura` INT NOT NULL AUTO_INCREMENT,
  `numFatura` INT NOT NULL,
  `ano` YEAR NOT NULL,
  `mes` INT NOT NULL,
  `valor` DECIMAL(16,0) NOT NULL,
  `situacao` VARCHAR(45) NOT NULL,
  `leitura_idLeitura` INT NOT NULL,
  `instalacao_idInstalacao` INT NOT NULL,
  PRIMARY KEY (`idFatura`),
  INDEX `fk_fatura_leitura1_idx` (`leitura_idLeitura` ASC) VISIBLE,
  INDEX `fk_fatura_instalacao1_idx` (`instalacao_idInstalacao` ASC) VISIBLE,
  CONSTRAINT `fk_fatura_instalacao1`
    FOREIGN KEY (`instalacao_idInstalacao`)
    REFERENCES `mydb`.`instalacao` (`idInstalacao`),
  CONSTRAINT `fk_fatura_leitura1`
    FOREIGN KEY (`leitura_idLeitura`)
    REFERENCES `mydb`.`leitura` (`idLeitura`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`midia`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`midia` ;

CREATE TABLE IF NOT EXISTS `mydb`.`midia` (
  `idMidia` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(120) NOT NULL,
  `extensao` VARCHAR(10) NOT NULL,
  `descricao` VARCHAR(250) NULL DEFAULT NULL,
  `enderecoFisico` VARCHAR(256) NULL DEFAULT NULL,
  `enderecoVirtual` VARCHAR(256) NULL DEFAULT NULL,
  `tipo` INT NULL DEFAULT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`idMidia`, `usuario_id`),
  INDEX `fk_midia_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_midia_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `mydb`.`usuario` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`perfil`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`perfil` ;

CREATE TABLE IF NOT EXISTS `mydb`.`perfil` (
  `idperfil` INT NOT NULL AUTO_INCREMENT,
  `dtNascimento` DATE NOT NULL,
  `tipo` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`idperfil`),
  INDEX `fk_perfil_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_perfil_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `mydb`.`usuario` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`pessoafisica`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`pessoafisica` ;

CREATE TABLE IF NOT EXISTS `mydb`.`pessoafisica` (
  `idPessoaFisica` INT NOT NULL AUTO_INCREMENT,
  `cpf` VARCHAR(45) NOT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`idPessoaFisica`),
  UNIQUE INDEX `idPessoaFisica_UNIQUE` (`idPessoaFisica` ASC) VISIBLE,
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE,
  INDEX `fk_pessoaFisica_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_pessoaFisica_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `mydb`.`usuario` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`pessoajuridica`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`pessoajuridica` ;

CREATE TABLE IF NOT EXISTS `mydb`.`pessoajuridica` (
  `idPessoaJuridica` INT NOT NULL AUTO_INCREMENT,
  `cnpj` VARCHAR(50) NOT NULL,
  `razaoSocial` VARCHAR(250) NOT NULL,
  `nomeFantasia` VARCHAR(250) NULL DEFAULT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`idPessoaJuridica`),
  INDEX `fk_pessoaJuridica_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_pessoaJuridica_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `mydb`.`usuario` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`usuario_cargo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`usuario_cargo` ;

CREATE TABLE IF NOT EXISTS `mydb`.`usuario_cargo` (
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `idcargo` INT NOT NULL,
  `idusuario` INT NOT NULL,
  PRIMARY KEY (`idcargo`, `idusuario`),
  INDEX `idusuario` (`idusuario` ASC) VISIBLE,
  CONSTRAINT `usuario_cargo_ibfk_1`
    FOREIGN KEY (`idcargo`)
    REFERENCES `mydb`.`cargo` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `usuario_cargo_ibfk_2`
    FOREIGN KEY (`idusuario`)
    REFERENCES `mydb`.`usuario` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
