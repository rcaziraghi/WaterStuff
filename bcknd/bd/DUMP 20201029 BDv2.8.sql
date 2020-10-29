CREATE DATABASE  IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mydb`;
-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `avaliacao`
--

DROP TABLE IF EXISTS `avaliacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avaliacao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(45) NOT NULL,
  `atendimento` varchar(250) NOT NULL,
  `nota` int NOT NULL,
  `observacoes` varchar(45) DEFAULT NULL,
  `OS_idOS` int DEFAULT NULL,
  `OS_usuario_id` int DEFAULT NULL,
  `protocolo_idprotocolo` int DEFAULT NULL,
  `usuarioId` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_avaliacao_usuarioId_idx` (`usuarioId`),
  CONSTRAINT `fk_avaliacao_usuarioId` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacao`
--

LOCK TABLES `avaliacao` WRITE;
/*!40000 ALTER TABLE `avaliacao` DISABLE KEYS */;
INSERT INTO `avaliacao` VALUES (1,'aaa','bom',10,'teste1',1,18,1,18,'2020-10-25 19:33:08','2020-10-25 19:33:08'),(2,'ASASDAS','as',6,'ASDAS',1,18,1,18,'2020-10-25 19:35:12','2020-10-25 19:35:12'),(3,'asdasd','asda',8,'',1,18,1,18,'2020-10-25 19:37:46','2020-10-25 19:37:46'),(4,'asdasd','as',9,'asdasd',1,18,1,18,'2020-10-25 19:39:39','2020-10-25 19:39:39'),(5,'dsasdasd','asdasd',8,'asdas',1,18,1,18,'2020-10-25 19:46:30','2020-10-25 19:46:30'),(6,'asd','asda',7,'asd',1,18,1,18,'2020-10-25 19:47:58','2020-10-25 19:47:58'),(7,'asdasd','dfsdfs',9,'dfsdfs',1,18,1,18,'2020-10-25 19:49:25','2020-10-25 19:49:25'),(8,'dfsdfsdf','sdfsdf',10,'sdfsd',1,18,1,18,'2020-10-25 19:49:58','2020-10-25 19:49:58'),(9,'asd','asdasarga',9,'asdarfa',1,18,1,18,'2020-10-25 19:50:36','2020-10-25 19:50:36'),(10,'as','asdasdas',9,'awerfas',1,18,1,18,'2020-10-25 19:51:19','2020-10-25 19:51:19'),(11,'Outr','sfsdgdf',9,'agfvtdr',1,18,1,18,'2020-10-25 19:52:25','2020-10-25 19:52:25'),(12,'asdafer','asdas',10,'aewraegf',1,18,1,18,'2020-10-25 19:56:55','2020-10-25 19:56:55'),(13,'aaaaa','sdaerg',10,'',1,18,1,18,'2020-10-25 19:59:50','2020-10-25 19:59:50'),(14,'asdas','asda',10,'asd',1,18,1,18,'2020-10-25 20:20:45','2020-10-25 20:20:45'),(15,'dfgwsdfs','sdfsd',10,'sdfs',1,18,1,18,'2020-10-25 20:47:26','2020-10-25 20:47:26'),(16,'Título da avaliação','Atendimento do dia 25/10',10,'Observação.',1,6,1,6,'2020-10-26 00:22:54','2020-10-26 00:22:54'),(17,'Avaliação do dia 26/10','Atendimento 2',10,'Teste',1,6,1,6,'2020-10-26 23:58:43','2020-10-26 23:58:43'),(18,'Titulo avaliação vídeo','Atendimento teste',10,'Observação',1,6,1,6,'2020-10-27 00:10:57','2020-10-27 00:10:57');
/*!40000 ALTER TABLE `avaliacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banco`
--

DROP TABLE IF EXISTS `banco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banco` (
  `idbanco` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `codigo` varchar(45) NOT NULL,
  PRIMARY KEY (`idbanco`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banco`
--

LOCK TABLES `banco` WRITE;
/*!40000 ALTER TABLE `banco` DISABLE KEYS */;
/*!40000 ALTER TABLE `banco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cargo`
--

DROP TABLE IF EXISTS `cargo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cargo` (
  `id` int NOT NULL,
  `nome` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargo`
--

LOCK TABLES `cargo` WRITE;
/*!40000 ALTER TABLE `cargo` DISABLE KEYS */;
INSERT INTO `cargo` VALUES (1,'usuario'),(2,'moderador'),(3,'admin');
/*!40000 ALTER TABLE `cargo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `idchat` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) DEFAULT NULL,
  `texto` varchar(250) DEFAULT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`idchat`,`usuario_id`),
  KEY `fk_chat_usuario1_idx` (`usuario_id`),
  CONSTRAINT `fk_chat_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cidade`
--

DROP TABLE IF EXISTS `cidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cidade` (
  `idCidade` int NOT NULL AUTO_INCREMENT,
  `cidade` varchar(45) NOT NULL,
  `estado_idEstado` int NOT NULL,
  PRIMARY KEY (`idCidade`),
  UNIQUE KEY `codCidade_UNIQUE` (`idCidade`),
  KEY `fk_cidade_estado1_idx` (`estado_idEstado`),
  CONSTRAINT `fk_cidade_estado1` FOREIGN KEY (`estado_idEstado`) REFERENCES `estado` (`idEstado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cidade`
--

LOCK TABLES `cidade` WRITE;
/*!40000 ALTER TABLE `cidade` DISABLE KEYS */;
/*!40000 ALTER TABLE `cidade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contabancaria`
--

DROP TABLE IF EXISTS `contabancaria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contabancaria` (
  `idcontaBancaria` int NOT NULL,
  `agencia` int NOT NULL,
  `conta` varchar(12) DEFAULT NULL,
  `usuario_id` int NOT NULL,
  `banco_idbanco` int NOT NULL,
  PRIMARY KEY (`idcontaBancaria`),
  KEY `fk_contaBancaria_usuario1_idx` (`usuario_id`),
  KEY `fk_contaBancaria_banco1_idx` (`banco_idbanco`),
  CONSTRAINT `fk_contaBancaria_banco1` FOREIGN KEY (`banco_idbanco`) REFERENCES `banco` (`idbanco`),
  CONSTRAINT `fk_contaBancaria_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contabancaria`
--

LOCK TABLES `contabancaria` WRITE;
/*!40000 ALTER TABLE `contabancaria` DISABLE KEYS */;
/*!40000 ALTER TABLE `contabancaria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `denuncia`
--

DROP TABLE IF EXISTS `denuncia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `denuncia` (
  `iddenuncia` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `descritivo` varchar(250) DEFAULT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`iddenuncia`,`usuario_id`),
  KEY `fk_denuncia_usuario1_idx` (`usuario_id`),
  CONSTRAINT `fk_denuncia_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `denuncia`
--

LOCK TABLES `denuncia` WRITE;
/*!40000 ALTER TABLE `denuncia` DISABLE KEYS */;
/*!40000 ALTER TABLE `denuncia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documentos`
--

DROP TABLE IF EXISTS `documentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documentos` (
  `idDocumentos` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`idDocumentos`,`usuario_id`),
  UNIQUE KEY `idDocumentos_UNIQUE` (`idDocumentos`),
  KEY `fk_documentos_usuario1_idx` (`usuario_id`),
  CONSTRAINT `fk_documentos_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documentos`
--

LOCK TABLES `documentos` WRITE;
/*!40000 ALTER TABLE `documentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `documentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endereco`
--

DROP TABLE IF EXISTS `endereco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `endereco` (
  `idEndereco` int NOT NULL AUTO_INCREMENT,
  `cep` varchar(15) NOT NULL,
  `logradouro` varchar(250) NOT NULL,
  `numero` int DEFAULT NULL,
  `complemento` varchar(45) DEFAULT NULL,
  `bairro` varchar(250) DEFAULT NULL,
  `cidade_idCidade` int NOT NULL,
  PRIMARY KEY (`idEndereco`),
  UNIQUE KEY `idEndereco_UNIQUE` (`idEndereco`),
  KEY `fk_endereco_cidade1_idx` (`cidade_idCidade`),
  CONSTRAINT `fk_endereco_cidade1` FOREIGN KEY (`cidade_idCidade`) REFERENCES `cidade` (`idCidade`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endereco`
--

LOCK TABLES `endereco` WRITE;
/*!40000 ALTER TABLE `endereco` DISABLE KEYS */;
/*!40000 ALTER TABLE `endereco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado` (
  `idEstado` int NOT NULL AUTO_INCREMENT,
  `estado` varchar(45) NOT NULL,
  `sigla` varchar(2) DEFAULT NULL,
  `pais_idPais` int NOT NULL,
  PRIMARY KEY (`idEstado`),
  UNIQUE KEY `codEstado_UNIQUE` (`idEstado`),
  KEY `fk_estado_pais_idx` (`pais_idPais`),
  CONSTRAINT `fk_estado_pais` FOREIGN KEY (`pais_idPais`) REFERENCES `pais` (`idPais`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` VALUES (1,'Acre','AC',1),(2,'Alagoas','AL',1),(3,'Amap ','AP',1),(4,'Amazonas','AM',1),(5,'Bahia','BA',1),(6,'Cear ','CE',1),(7,'EspĄrito Santo','ES',1),(8,'Goi s','GO',1),(9,'MaranhĆo','MA',1),(10,'Mato Grosso','MT',1),(11,'Mato Grosso do Sul ','MS',1),(12,'Minas Gerais','MG',1),(13,'Par ','PA',1),(14,'ParaĄba','PB',1),(15,'Paran ','PR',1),(16,'Pernambuco','PE',1),(17,'PiauĄ','PI',1),(18,'Rio de Janeiro','RJ',1),(19,'Rio Grande do Norte','RN',1),(20,'Rio Grande do Sul ','RS',1),(21,'Rondnia','RO',1),(22,'Roraima','RR',1),(23,'Santa Catarina ','SC',1),(24,'SĆo Paulo','SP',1),(25,'Sergipe','SE',1),(26,'Tocantins','TO',1),(27,'Distrito Federal ','DF',1);
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fatura`
--

DROP TABLE IF EXISTS `fatura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fatura` (
  `id` int NOT NULL AUTO_INCREMENT,
  `instalacaoId` int NOT NULL,
  `numFatura` int NOT NULL,
  `ano` int NOT NULL,
  `mes` int NOT NULL,
  `valor` decimal(16,2) NOT NULL,
  `situacao` varchar(45) NOT NULL,
  `leitura_idLeitura` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_fatura_instalacao1_idx` (`instalacaoId`),
  CONSTRAINT `fk_fatura_instalacao1` FOREIGN KEY (`instalacaoId`) REFERENCES `instalacao` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fatura`
--

LOCK TABLES `fatura` WRITE;
/*!40000 ALTER TABLE `fatura` DISABLE KEYS */;
INSERT INTO `fatura` VALUES (1,2,124525,2020,1,210.00,'aberto',1,'2020-09-25 00:00:00','2020-09-25 00:00:00'),(2,3,546116,2020,2,151.01,'aberto',2,'2020-09-25 00:00:00','2020-09-25 00:00:00'),(3,4,165103,2020,3,2.10,'aberto',3,'2020-09-25 00:00:00','2020-09-25 00:00:00'),(4,5,106516,2020,4,15.52,'aberto',4,'2020-09-25 00:00:00','2020-09-25 00:00:00'),(5,6,516545,2020,1,12.44,'aberto',5,'2020-09-25 00:00:00','2020-09-25 00:00:00'),(6,7,651365,2020,2,30.25,'pago',6,'2020-09-25 00:00:00','2020-09-25 00:00:00'),(7,8,487451,2020,3,36.01,'pago',7,'2020-09-23 00:00:00','2020-09-25 00:00:00'),(8,9,498741,2020,5,24.25,'pago',8,'2020-09-23 00:00:00','2020-09-25 00:00:00'),(9,1,165675,2020,6,1141.00,'aberto',9,'2020-09-23 00:00:00','2020-09-25 00:00:00'),(10,1,489874,2020,8,5241.14,'pago',10,'2020-09-23 00:00:00','2020-09-25 00:00:00'),(11,4,541478,2020,4,1144.51,'pago',11,'2020-09-23 00:00:00','2020-09-25 00:00:00'),(12,5,841687,2020,5,67.81,'pago',12,'2020-10-03 00:00:00','2020-09-25 00:00:00'),(13,6,498414,2020,6,137.10,'aberto',13,'2020-10-03 00:00:00','2020-09-25 00:00:00'),(14,7,498731,2020,2,9.36,'aberto',14,'2020-10-03 00:00:00','2020-09-25 00:00:00'),(15,8,141447,2020,9,1.00,'aberto',15,'2020-10-03 00:00:00','2020-09-25 00:00:00'),(16,9,168778,2020,1,2.25,'aberto',16,'2020-10-03 00:00:00','2020-09-25 00:00:00');
/*!40000 ALTER TABLE `fatura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instalacao`
--

DROP TABLE IF EXISTS `instalacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instalacao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codConsumidor` varchar(45) NOT NULL,
  `usuarioId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `cpf` varchar(14) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idInstalacao_UNIQUE` (`id`),
  KEY `fk_instalacao_usuario1_idx` (`usuarioId`),
  CONSTRAINT `fk_instalacao_usuario1` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instalacao`
--

LOCK TABLES `instalacao` WRITE;
/*!40000 ALTER TABLE `instalacao` DISABLE KEYS */;
INSERT INTO `instalacao` VALUES (1,'123456789',12,'2020-10-04 04:41:06','2020-10-04 04:41:06','123456789'),(2,'122554788',6,'2020-10-04 06:37:03','2020-10-04 06:37:03','147852369'),(3,'122554788',6,'2020-10-04 06:38:33','2020-10-04 06:38:33','147852369'),(4,'987654321',6,'2020-10-04 06:39:05','2020-10-04 06:39:05','123456789'),(5,'3251651',6,'2020-10-04 06:40:38','2020-10-04 06:40:38','0354651'),(6,'203565454',6,'2020-10-04 06:44:46','2020-10-04 06:44:46','651321321'),(7,'4105156445',6,'2020-10-04 06:45:20','2020-10-04 06:45:20','213013510'),(8,'2102102105',6,'2020-10-04 06:45:49','2020-10-04 06:45:49','50131201361'),(9,'6084031505',6,'2020-10-04 06:46:17','2020-10-04 06:46:17','5420540450'),(10,'5400564065',6,'2020-10-04 06:53:30','2020-10-04 06:53:30','01241054051'),(11,'561068546',6,'2020-10-04 06:53:44','2020-10-04 06:53:44','5165106540'),(12,'123456789AB',16,'2020-10-04 23:29:25','2020-10-04 23:29:25','123456789111'),(13,'123456789',18,'2020-10-12 00:27:47','2020-10-12 00:27:47','15212227380'),(14,'123454798d',18,'2020-10-16 03:05:53','2020-10-16 03:05:53','79649450769');
/*!40000 ALTER TABLE `instalacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leitura`
--

DROP TABLE IF EXISTS `leitura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leitura` (
  `idLeitura` int NOT NULL AUTO_INCREMENT,
  `mes` int NOT NULL,
  `ano` year NOT NULL,
  `data` datetime NOT NULL,
  `valor` varchar(45) NOT NULL,
  `instalacao_idInstalacao` int NOT NULL,
  PRIMARY KEY (`idLeitura`),
  UNIQUE KEY `codLeitura_UNIQUE` (`idLeitura`),
  KEY `fk_leitura_instalacao1_idx` (`instalacao_idInstalacao`),
  CONSTRAINT `fk_leitura_instalacao1` FOREIGN KEY (`instalacao_idInstalacao`) REFERENCES `instalacao` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leitura`
--

LOCK TABLES `leitura` WRITE;
/*!40000 ALTER TABLE `leitura` DISABLE KEYS */;
/*!40000 ALTER TABLE `leitura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `midia`
--

DROP TABLE IF EXISTS `midia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `midia` (
  `idMidia` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(120) NOT NULL,
  `extensao` varchar(10) NOT NULL,
  `descricao` varchar(250) DEFAULT NULL,
  `enderecoFisico` varchar(256) DEFAULT NULL,
  `enderecoVirtual` varchar(256) DEFAULT NULL,
  `tipo` int DEFAULT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`idMidia`,`usuario_id`),
  KEY `fk_midia_usuario1_idx` (`usuario_id`),
  CONSTRAINT `fk_midia_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `midia`
--

LOCK TABLES `midia` WRITE;
/*!40000 ALTER TABLE `midia` DISABLE KEYS */;
/*!40000 ALTER TABLE `midia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `os`
--

DROP TABLE IF EXISTS `os`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `os` (
  `idOS` int NOT NULL AUTO_INCREMENT,
  `situacao` varchar(45) NOT NULL,
  `localizacao` varchar(45) DEFAULT NULL,
  `descritivo` varchar(120) NOT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`idOS`,`usuario_id`),
  KEY `fk_OS_usuario1_idx` (`usuario_id`),
  CONSTRAINT `fk_OS_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `os`
--

LOCK TABLES `os` WRITE;
/*!40000 ALTER TABLE `os` DISABLE KEYS */;
/*!40000 ALTER TABLE `os` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pais`
--

DROP TABLE IF EXISTS `pais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pais` (
  `idPais` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(256) NOT NULL,
  `sigla` varchar(5) NOT NULL,
  PRIMARY KEY (`idPais`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pais`
--

LOCK TABLES `pais` WRITE;
/*!40000 ALTER TABLE `pais` DISABLE KEYS */;
INSERT INTO `pais` VALUES (1,'Brasil','BR');
/*!40000 ALTER TABLE `pais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perfil`
--

DROP TABLE IF EXISTS `perfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `perfil` (
  `idperfil` int NOT NULL AUTO_INCREMENT,
  `dtNascimento` date NOT NULL,
  `tipo` int NOT NULL,
  `usuario_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idperfil`),
  KEY `fk_perfil_usuario1_idx` (`usuario_id`),
  CONSTRAINT `fk_perfil_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfil`
--

LOCK TABLES `perfil` WRITE;
/*!40000 ALTER TABLE `perfil` DISABLE KEYS */;
/*!40000 ALTER TABLE `perfil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pessoafisica`
--

DROP TABLE IF EXISTS `pessoafisica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pessoafisica` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cpf` varchar(45) NOT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idPessoaFisica_UNIQUE` (`id`),
  UNIQUE KEY `cpf_UNIQUE` (`cpf`),
  KEY `fk_pessoaFisica_usuario1_idx` (`usuario_id`),
  CONSTRAINT `fk_pessoaFisica_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pessoafisica`
--

LOCK TABLES `pessoafisica` WRITE;
/*!40000 ALTER TABLE `pessoafisica` DISABLE KEYS */;
/*!40000 ALTER TABLE `pessoafisica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pessoajuridica`
--

DROP TABLE IF EXISTS `pessoajuridica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pessoajuridica` (
  `idPessoaJuridica` int NOT NULL AUTO_INCREMENT,
  `cnpj` varchar(50) NOT NULL,
  `razaoSocial` varchar(250) NOT NULL,
  `nomeFantasia` varchar(250) DEFAULT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`idPessoaJuridica`),
  KEY `fk_pessoaJuridica_usuario1_idx` (`usuario_id`),
  CONSTRAINT `fk_pessoaJuridica_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pessoajuridica`
--

LOCK TABLES `pessoajuridica` WRITE;
/*!40000 ALTER TABLE `pessoajuridica` DISABLE KEYS */;
/*!40000 ALTER TABLE `pessoajuridica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `protocolo`
--

DROP TABLE IF EXISTS `protocolo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `protocolo` (
  `idprotocolo` int NOT NULL AUTO_INCREMENT,
  `situacao` varchar(45) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `titulo` varchar(45) DEFAULT NULL,
  `descritivo` varchar(45) DEFAULT NULL,
  `processo` varchar(45) DEFAULT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`idprotocolo`),
  KEY `fk_protocolo_usuario1_idx` (`usuario_id`),
  CONSTRAINT `fk_protocolo_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `protocolo`
--

LOCK TABLES `protocolo` WRITE;
/*!40000 ALTER TABLE `protocolo` DISABLE KEYS */;
/*!40000 ALTER TABLE `protocolo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(125) NOT NULL,
  `nomeCompleto` varchar(125) NOT NULL,
  `senha` varchar(125) NOT NULL,
  `idperfil` int DEFAULT NULL,
  `dtNascimento` date DEFAULT NULL,
  `cidade` varchar(125) DEFAULT NULL,
  `siglaEstado` varchar(45) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`,`email`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'teste@teste1.com','','bd301afbc717ed60b714257db8d8c475344dee89',NULL,NULL,NULL,NULL,'2020-09-23 00:00:00','2020-10-04 00:00:00'),(2,'teste2@ftec.com.br','','$2a$08$fA211z102de2ndaPiqHtC.EwuYiTZel4IBqkukG.T9tT1jKnzdxB2',NULL,NULL,NULL,NULL,'2020-09-25 00:00:00','2020-09-25 00:00:00'),(3,'teste3@ftec.com.br','','$2a$08$vFFbsNIvJQUgy.uYX7aJLOflW33Db/7NLpAFrEAvCCsd1RCdgkWB.',NULL,NULL,NULL,NULL,'2020-09-25 00:00:00','2020-09-25 00:00:00'),(4,'teste4@ftec.com.br','','$2a$08$KECiXeFB88w7G3ZvLjfSze3eZiDWN8C1t8BHiw/M/DZlk9bXhKTHS',NULL,NULL,NULL,NULL,'2020-09-25 00:00:00','2020-09-25 00:00:00'),(5,'teste5@ftec.com.br','','$2a$08$9Xb/ZRiAAsBqephRQ.Xu9O53plU7FV2T69djTqWUfNyNpfJpJmWR.',NULL,NULL,NULL,NULL,'2020-09-25 00:00:00','2020-09-25 00:00:00'),(6,'teste6@ftec.com.br','','$2a$08$KcoarwmfCqtAq2bnz/ILf.lbWbgjYBg.LO.ncMFQAMPt7KxW/4Ehm',NULL,NULL,NULL,NULL,'2020-09-25 00:00:00','2020-09-25 00:00:00'),(7,'teste7@ftec.com.br','','$2a$08$rsd4FyFQl933jF24aQEUV.f84lCuCLx5m2BzKfdGhseGDXso45JK2',NULL,NULL,NULL,NULL,'2020-09-25 00:00:00','2020-09-25 00:00:00'),(8,'teste8@ftec.com.br','','$2a$08$exu3M26EWFznPNqOEWXbYux/SgRWOsnHts338au4CzCeuuQHU4TzG',NULL,NULL,NULL,NULL,'2020-09-25 00:00:00','2020-09-25 00:00:00'),(9,'teste9@ftec.com.br','','$2a$08$G73FpDm7zI92pYwBvr9fluYhCVEyTFCSP1jL17Cv0154LJMeeOgVe',NULL,NULL,NULL,NULL,'2020-09-25 00:00:00','2020-09-25 00:00:00'),(10,'teste2@teste1.com','','$2a$08$KbXSnTf4Co37dgU/RZmdH.f5cb73P2iHL7e.2ne00xSYgbcm2zIO6',NULL,NULL,NULL,NULL,'2020-09-25 00:00:00','2020-09-25 00:00:00'),(11,'teste231r5t@ftec.com','','$2a$08$u/MVBhZO.POclcjArKRId.iDSEZvP0sm/v/aKIfZo7.VP/UB0t.0S',NULL,NULL,NULL,NULL,'2020-09-28 00:00:00','2020-09-28 00:00:00'),(12,'asdal@fger.com','Rafael','$2a$08$kMQocBSiEzAVVjTOG3JHwO93DtnFAabTJ7HlbxPuzFw3VUPCMt.p2',NULL,'2004-10-31','Caxias do Sul','RS','2020-10-03 00:00:00','2020-10-03 00:00:00'),(16,'emailwaterstuff@gmail.com','Rafael Caziraghi','$2a$08$rZIDWdT22QW79Ql2/9Dwh.PWN9S3Jm3gSYRwVTYc5jnX4OI1b84P2',NULL,'2004-10-31','Caxias do Sul','RS','2020-10-04 23:25:47','2020-10-12 00:29:17'),(17,'asdfqwe@teste.com','Teste','$2a$08$iDyavyd2j1jeZ3ghYuuu1OrwPaYc3QpE56qJetrcLorHOGYA0RaLG',NULL,'2000-01-01','Caxias do Sul','RS','2020-10-11 23:02:20','2020-10-11 23:02:20'),(18,'email@valido.com.br','Teste','$2a$08$AmPZkGkQzP031wxVvGPPDOJeFB5JnfG93tK.7aRf0wYtZKw3i3TEG',NULL,'2004-10-12','Caxias do Sul','RS','2020-10-12 00:26:39','2020-10-12 00:26:39');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_cargo`
--

DROP TABLE IF EXISTS `usuario_cargo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_cargo` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `idcargo` int NOT NULL,
  `idusuario` int NOT NULL,
  PRIMARY KEY (`idcargo`,`idusuario`),
  KEY `idusuario` (`idusuario`),
  CONSTRAINT `usuario_cargo_ibfk_1` FOREIGN KEY (`idcargo`) REFERENCES `cargo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usuario_cargo_ibfk_2` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_cargo`
--

LOCK TABLES `usuario_cargo` WRITE;
/*!40000 ALTER TABLE `usuario_cargo` DISABLE KEYS */;
INSERT INTO `usuario_cargo` VALUES ('2020-09-23 02:50:17','2020-09-23 02:50:17',1,1),('2020-09-25 01:48:34','2020-09-25 01:48:34',1,2),('2020-09-25 02:06:10','2020-09-25 02:06:10',1,3),('2020-09-25 02:22:42','2020-09-25 02:22:42',1,4),('2020-09-25 02:23:44','2020-09-25 02:23:44',1,5),('2020-09-25 02:25:33','2020-09-25 02:25:33',1,6),('2020-09-25 02:26:46','2020-09-25 02:26:46',1,7),('2020-09-25 02:31:13','2020-09-25 02:31:13',1,8),('2020-09-25 02:32:58','2020-09-25 02:32:58',1,9),('2020-09-25 23:34:09','2020-09-25 23:34:09',1,10),('2020-09-28 22:18:39','2020-09-28 22:18:39',1,11),('2020-10-03 23:22:03','2020-10-03 23:22:03',1,12),('2020-10-04 23:25:47','2020-10-04 23:25:47',1,16),('2020-10-11 23:02:20','2020-10-11 23:02:20',1,17),('2020-10-12 00:26:39','2020-10-12 00:26:39',1,18),('2020-09-23 02:50:17','2020-09-23 02:50:17',2,1),('2020-09-25 23:34:09','2020-09-25 23:34:09',2,10);
/*!40000 ALTER TABLE `usuario_cargo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-29 19:38:17
