-- MariaDB dump 10.19-11.1.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: sec_site
-- ------------------------------------------------------
-- Server version	11.1.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `application_course_suitability`
--

DROP TABLE IF EXISTS `application_course_suitability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `application_course_suitability` (
  `application_id` smallint(5) unsigned NOT NULL,
  `course_id` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`application_id`,`course_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `application_course_suitability_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `application_records` (`application_id`),
  CONSTRAINT `application_course_suitability_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application_course_suitability`
--

LOCK TABLES `application_course_suitability` WRITE;
/*!40000 ALTER TABLE `application_course_suitability` DISABLE KEYS */;
/*!40000 ALTER TABLE `application_course_suitability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `application_records`
--

DROP TABLE IF EXISTS `application_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `application_records` (
  `application_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `applicant_id` smallint(5) unsigned DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `student_id` varchar(8) DEFAULT NULL,
  `umkc_email` varchar(255) DEFAULT NULL,
  `current_level` varchar(5) DEFAULT NULL,
  `graduating_semester_id` tinyint(3) unsigned DEFAULT NULL,
  `graduating_year` year(4) NOT NULL,
  `umkc_gpa` decimal(2,1) DEFAULT NULL,
  `umkc_hours` smallint(5) unsigned DEFAULT NULL,
  `undergrad_degree` varchar(5) DEFAULT NULL,
  `current_major` smallint(5) unsigned DEFAULT NULL,
  `applying_for` varchar(15) NOT NULL,
  `gta_certified` tinyint(1) DEFAULT NULL,
  `gta_certification_term` year(4) DEFAULT NULL,
  PRIMARY KEY (`application_id`),
  KEY `applicant_id` (`applicant_id`),
  KEY `current_major` (`current_major`),
  KEY `graduating_semester_id` (`graduating_semester_id`),
  CONSTRAINT `application_records_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `site_users` (`user_id`),
  CONSTRAINT `application_records_ibfk_2` FOREIGN KEY (`current_major`) REFERENCES `subjects` (`subject_id`),
  CONSTRAINT `application_records_ibfk_3` FOREIGN KEY (`graduating_semester_id`) REFERENCES `yearly_semesters` (`semester_id`),
  CONSTRAINT `application_records_chk_gpa_range` CHECK (`umkc_gpa` between 0.0 and 4.0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application_records`
--

LOCK TABLES `application_records` WRITE;
/*!40000 ALTER TABLE `application_records` DISABLE KEYS */;
/*!40000 ALTER TABLE `application_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `completed_courses`
--

DROP TABLE IF EXISTS `completed_courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `completed_courses` (
  `user_id` smallint(5) unsigned NOT NULL,
  `course_id` smallint(5) unsigned NOT NULL,
  `course_gpa` decimal(2,1) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`course_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `completed_courses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `site_users` (`user_id`),
  CONSTRAINT `completed_courses_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  CONSTRAINT `completed_courses_chk_gpa_range` CHECK (`course_gpa` between 0.0 and 4.0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `completed_courses`
--

LOCK TABLES `completed_courses` WRITE;
/*!40000 ALTER TABLE `completed_courses` DISABLE KEYS */;
INSERT INTO `completed_courses` VALUES
(1,1,4.0),
(2,1,4.0),
(3,1,4.0),
(3,2,4.0),
(4,1,4.0),
(4,2,4.0);
/*!40000 ALTER TABLE `completed_courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `courses` (
  `course_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `subject_id` smallint(5) unsigned NOT NULL DEFAULT 1,
  `course_number` smallint(5) unsigned NOT NULL,
  `suffix` varchar(3) DEFAULT NULL,
  `course_name` varchar(255) NOT NULL,
  PRIMARY KEY (`course_id`),
  KEY `subject_id` (`subject_id`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES
(1,1,451,'R','Software Engineering Capstone'),
(2,1,490,'WD','Web Development'),
(3,1,436,NULL,'Digital Forensics');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_users`
--

DROP TABLE IF EXISTS `site_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `site_users` (
  `user_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` tinyint(3) unsigned NOT NULL DEFAULT 1,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `site_users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `user_roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_users`
--

LOCK TABLES `site_users` WRITE;
/*!40000 ALTER TABLE `site_users` DISABLE KEYS */;
INSERT INTO `site_users` VALUES
(1,'PenghuiZhu','pz111@umsystem.edu','123456',3),
(2,'HuiJin','hj112@umsystem.edu','123456',3),
(3,'jafleeger','jf113@umsystem.edu','123456',3),
(4,'imrowse','ir114@umsystem.edu','123456',3),
(5,'Applicant','applicant@umsystem.edu','123456',2);
/*!40000 ALTER TABLE `site_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subjects` (
  `subject_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `prefix` varchar(10) NOT NULL,
  `subject_name` varchar(255) NOT NULL,
  PRIMARY KEY (`subject_id`),
  UNIQUE KEY `prefix` (`prefix`),
  UNIQUE KEY `department_name` (`subject_name`),
  UNIQUE KEY `subject_name` (`subject_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES
(1,'CS','Computer Science'),
(2,'MATH','Mathematics');
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_roles` (
  `role_id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES
(3,'Administrator'),
(2,'Applicant'),
(1,'Guest');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `yearly_semesters`
--

DROP TABLE IF EXISTS `yearly_semesters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `yearly_semesters` (
  `semester_id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `semester_name` varchar(32) NOT NULL,
  PRIMARY KEY (`semester_id`),
  UNIQUE KEY `semester_name` (`semester_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `yearly_semesters`
--

LOCK TABLES `yearly_semesters` WRITE;
/*!40000 ALTER TABLE `yearly_semesters` DISABLE KEYS */;
INSERT INTO `yearly_semesters` VALUES
(1,'Fall'),
(2,'Spring'),
(3,'Summer');
/*!40000 ALTER TABLE `yearly_semesters` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-15  0:02:20