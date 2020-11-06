-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ideas
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
-- Table structure for table `ideas`
--

DROP TABLE IF EXISTS `ideas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ideas` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKt4qp1368gdn4wk6ih62bj80ym` (`user_id`),
  CONSTRAINT `FKt4qp1368gdn4wk6ih62bj80ym` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ideas`
--

LOCK TABLES `ideas` WRITE;
/*!40000 ALTER TABLE `ideas` DISABLE KEYS */;
INSERT INTO `ideas` VALUES (1,'2020-09-05 17:35:43.626000','Enfocarme solo en lo necesario',NULL,1),(3,'2020-09-05 18:44:14.730000','another',NULL,2),(4,'2020-09-05 19:35:38.471000','Una buena!',NULL,2),(5,'2020-09-05 21:35:27.966000','Nos vemos el Lunes',NULL,3),(6,'2020-09-05 22:49:16.215000','tengo cualquier hambre',NULL,1),(7,'2020-09-05 22:50:35.102000','asdfg','2020-09-05 22:50:43.040000',1),(8,'2020-09-05 23:02:53.063000','fasf','2020-09-05 23:29:29.084000',1),(9,'2020-09-05 23:38:50.716000','Ser piadoso en colocar la nota es mi Ley',NULL,4);
/*!40000 ALTER TABLE `ideas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_likes_idea`
--

DROP TABLE IF EXISTS `user_likes_idea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_likes_idea` (
  `user_id` bigint NOT NULL,
  `idea_id` bigint NOT NULL,
  KEY `FKpkd8q5b7e1wgm0jsefai8tp7q` (`idea_id`),
  KEY `FK898li2yxia67jg7oywi1khrfk` (`user_id`),
  CONSTRAINT `FK898li2yxia67jg7oywi1khrfk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKpkd8q5b7e1wgm0jsefai8tp7q` FOREIGN KEY (`idea_id`) REFERENCES `ideas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_likes_idea`
--

LOCK TABLES `user_likes_idea` WRITE;
/*!40000 ALTER TABLE `user_likes_idea` DISABLE KEYS */;
INSERT INTO `user_likes_idea` VALUES (1,8),(2,3),(3,3),(1,3),(4,3),(4,5),(1,6),(4,6),(1,1),(4,1),(1,4),(2,4),(4,4),(4,9);
/*!40000 ALTER TABLE `user_likes_idea` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'2020-09-05 17:08:48.420000','erick@gmail.com','Erick','$2a$10$CGTRh2uc76OD5p31bJDfS.96XokTmjNKn3P5OqGX7K0nSE/YoTBhW',NULL),(2,'2020-09-05 18:42:53.974000','jhad@gmail.com','jhadyra','$2a$10$0l3jbIBgXqaSB8HrBu4GieZSvnzz/l8rYcReppPimDa64lq/jvME2',NULL),(3,'2020-09-05 21:09:16.405000','carlos@gmail.com','Carlos','$2a$10$ZxFmjWsDe9BtnImpRTLwKOKESfCcgPArKoSy9anlb74xrjqQ7Qw3G',NULL),(4,'2020-09-05 23:37:27.495000','dany@gmail.com','Dany','$2a$10$3Wfq5f1e01wLVx9w9gm7OOk4VBeMuo/iH2R3V/eCeAfdmgWf40dRi',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-05 20:41:45
