-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: vote
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alternative`
--

DROP TABLE IF EXISTS `alternative`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alternative` (
  `id_alternative` int NOT NULL AUTO_INCREMENT,
  `id_poll` int DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `qty_votes` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_alternative`),
  KEY `id_poll` (`id_poll`),
  CONSTRAINT `alternative_ibfk_1` FOREIGN KEY (`id_poll`) REFERENCES `poll` (`id_poll`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alternative`
--

LOCK TABLES `alternative` WRITE;
/*!40000 ALTER TABLE `alternative` DISABLE KEYS */;
INSERT INTO `alternative` VALUES (1,2,'qualquer coisa blá blá blá',30),(3,15,'vvcvcv',0),(4,15,'polllllllll',0),(5,16,'xsdvsdv',0),(6,16,'fffffffffff',0),(7,17,'dddd',0),(8,17,'dddddddddddddd',0),(9,18,'vvvvvvvvvvvvvv',0),(10,18,'vvvvvvvvvvvv',0),(11,19,'fsdfwetnenf',0),(12,19,'sfgndfb',0),(13,20,'dddddddddddddd',0),(14,20,'ssssssssssss',0),(15,21,'opção 111111',0),(16,21,'opção 1222222',0),(17,21,'opção 3333',0),(18,21,'opção 111444111',0),(19,22,'Bolsonaro',1),(20,22,'Lula',1),(21,22,'Moro',0),(22,23,'Chocolate',0),(23,23,'Baunilha',0),(24,23,'Laranja',1),(25,23,'Formigueiro',0),(26,23,'Macaxeira',0),(27,23,'Morango',0),(28,24,'1954',0),(29,24,'1950',1),(30,24,'1948',1),(31,24,'1956',1),(32,25,'ffffffffffff',0),(33,25,'gggggggggg',2),(34,26,'ffff',0),(35,26,'bbbbb',3),(36,27,'cccc',0),(37,27,'dddd',1),(38,27,'gggg',2),(39,28,'Bolsonaro',0),(40,28,'Lula',0),(41,28,'Moro',0),(42,28,'João Dória',0),(43,29,'ccccccccc',0),(44,29,'eeeeeeeeeeee',1),(45,30,'d fdbfdf',0),(46,30,'weeeeeeeeee',0),(47,31,'dddddddd',0),(48,31,'vvvvvvvvvvv',1),(49,32,'xc x df',0),(50,32,'ddddddddgggg',0),(51,33,'teste1',0),(52,33,'teste4',0),(53,34,'dd ',0),(54,34,'fgfgfg',0),(55,35,'Bolsonaro',0),(56,35,'Lula',0),(57,35,'Moro',0),(58,36,'ddddddddd',0),(59,36,'ffffffffffff',0),(60,37,'fffffffffffff',0),(61,37,'ggggggggggg',0),(62,38,'dffffffffffff',0),(63,38,'fffffff',0),(64,39,'fffffffff',0),(65,39,'bbbbbbbb',0),(66,40,'vvvvvvvv',0),(67,40,'llllllllllll',1),(68,41,'ddddd',1),(69,41,'ffff',1),(70,42,'ddddd',0),(71,42,'ffff',0),(72,43,'voto 1',0),(73,43,'voto 2',1),(74,44,'fffff',0),(75,44,'vvvvv',0),(76,45,'testetesteteste',0),(77,45,'ssssssss',2),(78,46,'fdbdfb',1),(79,46,'cvvvvvvvvv',1),(80,47,'1',3),(81,47,'2',5),(82,48,'vc cv ',0),(83,48,'vvvvvvvv',0),(84,49,'dfffv',0),(85,49,'dffvfvf',0),(86,50,'xcvxcv',0),(87,50,'dfdfb',0),(88,51,'xvcxcv',0),(89,51,'dfdf',0),(90,52,'xcvxcv',0),(91,52,'fffffffff',0),(92,53,'dsdv',0),(93,53,'sdfsdf',1);
/*!40000 ALTER TABLE `alternative` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `change_password`
--

DROP TABLE IF EXISTS `change_password`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `change_password` (
  `cod_link` varchar(50) NOT NULL,
  `email` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `change_password`
--

LOCK TABLES `change_password` WRITE;
/*!40000 ALTER TABLE `change_password` DISABLE KEYS */;
/*!40000 ALTER TABLE `change_password` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poll`
--

DROP TABLE IF EXISTS `poll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `poll` (
  `id_poll` int NOT NULL AUTO_INCREMENT,
  `title` varchar(70) DEFAULT NULL,
  `qty_options` int NOT NULL,
  `public` bit(1) NOT NULL,
  `free` bit(1) NOT NULL,
  `id_user` int DEFAULT NULL,
  `qty_votes` int NOT NULL DEFAULT '0',
  `limit_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id_poll`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `poll_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=3613 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poll`
--

LOCK TABLES `poll` WRITE;
/*!40000 ALTER TABLE `poll` DISABLE KEYS */;
INSERT INTO `poll` VALUES (52,'Em quem você votaria para presidente em 2022?',2,_binary '',_binary '\0',13,0,'2022-01-21 11:11:00'),(53,'Qual o seu país favorito?',2,_binary '',_binary '\0',13,1,'2022-02-25 01:11:00'),(54,'saaaa',4,_binary '',_binary '\0',13,18,'2022-02-25 01:11:00'),(55,'saaaa',4,_binary '',_binary '\0',13,18,'2022-02-25 01:11:00'),(56,'fgbfgb',4,_binary '',_binary '\0',13,200,'2022-02-25 01:11:00'),(57,'ddfdf',4,_binary '',_binary '\0',13,18,'2022-02-25 01:11:00'),(58,'cvbcdf',4,_binary '',_binary '\0',13,18,'2022-02-25 01:11:00'),(59,'eeeee',4,_binary '',_binary '\0',13,18,'2022-02-25 01:11:00'),(60,'diegogooo',4,_binary '',_binary '\0',13,18,'2022-02-25 01:11:00'),(61,'saadddddaa',4,_binary '',_binary '\0',13,18,'2022-02-25 01:11:00'),(62,'saaaa',4,_binary '',_binary '\0',13,18,'2022-02-25 01:11:00'),(63,'saaaggfgfga',4,_binary '',_binary '\0',13,18,'2022-02-25 01:11:00'),(64,'dfb',4,_binary '',_binary '\0',13,18,'2022-02-25 01:11:00'),(65,'ggggg',4,_binary '',_binary '\0',13,18,'2022-02-25 01:11:00'),(66,'saadfbvsaa',4,_binary '',_binary '\0',13,18,'2022-02-25 01:11:00'),(67,'dfdbgsaaaa',4,_binary '',_binary '\0',13,18,'2022-02-25 01:11:00'),(68,'saaaa',4,_binary '',_binary '\0',13,18,'2022-02-25 01:11:00'),(69,'dfdfb',4,_binary '',_binary '\0',13,102,'2022-02-25 01:11:00'),(70,'saxcxcaaa',4,_binary '',_binary '\0',13,18,'2022-02-25 01:11:00'),(71,'saefgdfaaa',4,_binary '',_binary '\0',13,18,'2022-02-25 01:11:00'),(72,'saaaa',4,_binary '',_binary '\0',13,18,'2022-02-25 01:11:00'),(73,'saaaa',4,_binary '',_binary '\0',13,18,'2022-02-25 01:11:00'),(74,'saafffdfaa',4,_binary '',_binary '\0',13,18,'2022-02-25 01:11:00'),(75,'saaaa',4,_binary '',_binary '\0',13,18,'2022-02-25 01:11:00'),(76,'yy ttt',4,_binary '',_binary '\0',13,18,'2022-02-25 01:11:00'),(77,'saaaa',4,_binary '',_binary '\0',13,18,'2022-02-25 01:11:00');
/*!40000 ALTER TABLE `poll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `birth` date NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `logged` bit(1) NOT NULL,
  `token` varchar(50) DEFAULT NULL,
  `id_user` int NOT NULL AUTO_INCREMENT,
  `email` varchar(60) NOT NULL,
  UNIQUE KEY `id_user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('Diego','Cândido Lima','diegocndd','2002-02-04','abcd1234',_binary '\0',NULL,13,'diegocndd4@gmail.com');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votes`
--

DROP TABLE IF EXISTS `votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `votes` (
  `id_visitor` varchar(255) DEFAULT NULL,
  `id_poll` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votes`
--

LOCK TABLES `votes` WRITE;
/*!40000 ALTER TABLE `votes` DISABLE KEYS */;
INSERT INTO `votes` VALUES ('teste',25),('test',25),('teste',24),('b50f07069445cf8742532947bb4c2b80',22),('b50f07069445cf8742532947bb4c2b80',23),('b2262345d56d2b52121b37a76277eb66',22),('b50f07069445cf8742532947bb4c2b80',24),('b2262345d56d2b52121b37a76277eb66',24),('cc603232a3593d831ea6b21286e69528',27),('b2262345d56d2b52121b37a76277eb66',27),('b50f07069445cf8742532947bb4c2b80',27),('teste',21),('teste',23),('teste',22),('teste222',21),('tes232',21),('tes2132',21),('tesd2s1432',21),('tesd2s12',21),('tesd2s1ff2',21),('testex',26),('cc603232a3593d831ea6b21286e69528',29),('b50f07069445cf8742532947bb4c2b80',31),('b50f07069445cf8742532947bb4c2b80',40),('cc603232a3593d831ea6b21286e69528',41),('7ffc759d881b416aa604ae75dd0e5c20',41),('cc603232a3593d831ea6b21286e69528',43),('cc603232a3593d831ea6b21286e69528',45),('b2262345d56d2b52121b37a76277eb66',45),('cc603232a3593d831ea6b21286e69528',46),('b2262345d56d2b52121b37a76277eb66',46),('b2262345d56d2b52121b37a76277eb66',47),('70974d18ea78eb0931853c08c5b33b6e',47),('43aeff2f72e924e042ad5a918af2a76c',47),('cc603232a3593d831ea6b21286e69528',47),('67c2048eee8c80963f9f3e8526c17f24',47),('7ffc759d881b416aa604ae75dd0e5c20',47),('6c955003746f3c5048f31d0f40217b74',47),('9ad085f4466a89ca38c8076c97ac4a4d',47),('cc603232a3593d831ea6b21286e69528',53);
/*!40000 ALTER TABLE `votes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-24  0:16:20
