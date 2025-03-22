-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: hotel_booking
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `id` varchar(255) NOT NULL,
  `room_id` varchar(255) NOT NULL,
  `customer_id` varchar(255) NOT NULL,
  `amount_night` int NOT NULL,
  `check_in` datetime NOT NULL,
  `check_out` datetime NOT NULL,
  `total_price` float NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `status` enum('Pending','Confirmed','Canceled','Completed') NOT NULL DEFAULT 'Pending',
  `discount` float DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `room_id` (`room_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`),
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES ('bc5ca2ae-25ce-44da-81f1-9f1d409e7f7b','eb7568a6-6062-4396-8a63-fd2969aaeb41','b4b721fd-7c85-4e02-9a4b-6f701511d786',2,'2025-03-17 07:00:00','2025-03-19 05:00:00',20,'2025-03-17 16:09:05',NULL,NULL,'Completed',0),('c4e470e4-1398-4263-9729-3a3b5da47dba','bc0ee124-8435-47fa-b3a1-ff377bd24d17','4118d5ab-1e3f-48cf-a9ba-73f0ae3a34c7',3,'2025-03-22 07:00:00','2025-03-25 05:00:00',60,'2025-03-22 15:41:33',NULL,NULL,'Completed',0);
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` varchar(45) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL DEFAULT '123456',
  `role` enum('Admin','Customer') NOT NULL DEFAULT 'Customer',
  `passport` varchar(45) NOT NULL,
  `country` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES ('4118d5ab-1e3f-48cf-a9ba-73f0ae3a34c7','Minh Hằng','0869108011','hang@gmail.com','123456a@','Customer','123456789','Viet Nam','2025-03-22 15:41:33','2025-03-22 15:41:33'),('b4b721fd-7c85-4e02-9a4b-6f701511d786','Phan Đức','0383181114','phanduc@gmail.com','123456a@','Customer','123123123','Viet Nam','2025-03-17 16:09:05','2025-03-17 16:09:05'),('f9cf1679-1263-42c4-a99a-6ad784b24123','Admin','0383181115111','admin@gmail.com','123456','Admin','123123123','Viet Nam','2025-03-16 14:51:47','2025-03-16 15:16:29'),('f9cf1679-1263-42c4-a99a-6ad784b2495f','Xuân Phát','014124112481','phat@gmail.com','123456','Customer','12414124152421','VietNam','2025-03-13 15:54:21','2025-03-16 15:06:55');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facility`
--

DROP TABLE IF EXISTS `facility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facility` (
  `id` varchar(45) NOT NULL,
  `name` varchar(250) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `icon` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facility`
--

LOCK TABLES `facility` WRITE;
/*!40000 ALTER TABLE `facility` DISABLE KEYS */;
INSERT INTO `facility` VALUES ('1','WiFi miễn phí','Kết nối internet tốc độ cao','bx bx-wifi'),('10','Mini Bar','Quầy bar mini trong phòng','bx bx-drink'),('2','Hồ bơi','Hồ bơi vô cực với tầm nhìn ra biển','bx bx-water'),('3','Điều hòa','Máy lạnh công suất lớn','bx bx-wind'),('4','Bãi đỗ xe','Bãi đỗ xe miễn phí cho khách hàng','bx bx-car'),('5','Dịch vụ phòng','Phục vụ phòng 24/7','bx bx-bell'),('6','Gym & Fitness','Phòng tập thể dục hiện đại','bx bx-dumbbell'),('7','Nhà hàng','Nhà hàng với thực đơn đa dạng','bx bx-restaurant'),('8','Spa & Massage','Dịch vụ spa thư giãn','bx bx-spa'),('9','TV màn hình phẳng','TV màn hình rộng với các kênh truyền hình cáp','bx bx-tv');
/*!40000 ALTER TABLE `facility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price_per_night` float NOT NULL,
  `amount_adult` int NOT NULL,
  `amount_child` int NOT NULL,
  `status` int NOT NULL,
  `type_of_room_id` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES ('2ea4d0f1-92ad-48ae-a6b3-da3387f3d4dc','A102','https://www.banyantree.com/_next/image?url=https%3A%2F%2Fwww.banyantree.com%2Fassets%2F2025-02%2Fbt-langco-%20Three-bedroom%20Oceanview%20Pool%20Villa%20-%20Secondary%20Bedroom.jpg&w=1920&q=75',15,2,1,1,'2','2025-03-17 15:51:20','2025-03-22 22:37:10'),('34c9f3af-bf8d-4161-a98e-a199c687ef85','A203','https://www.banyantree.com/_next/image?url=https%3A%2F%2Fwww.banyantree.com%2Fassets%2F2025-02%2Fbt-langco-%20Three-bedroom%20Oceanview%20Pool%20Villa%20-%20Bathroom%20-%20Master%20bedroom.jpg&w=1920&q=75',30,2,1,1,'1','2025-03-17 15:54:01','2025-03-22 15:59:08'),('bc0ee124-8435-47fa-b3a1-ff377bd24d17','A103','https://www.banyantree.com/_next/image?url=https%3A%2F%2Fwww.banyantree.com%2Fassets%2F2025-02%2Fbt-langco-%20Three-bedroom%20Oceanview%20Pool%20Villa%20-%20Living%20Room2.jpg&w=1920&q=75',20,3,1,1,'3','2025-03-17 15:51:36','2025-03-22 15:42:52'),('db1c4b44-9f36-4399-bdb8-7bfeffc3b792','A202','https://www.banyantree.com/_next/image?url=https%3A%2F%2Fwww.banyantree.com%2Fassets%2F2025-02%2Fbt-langco-%20Three-bedroom%20Oceanview%20Pool%20Villa%20-%20Private%20Pool%20with%20Sunrise.jpg&w=1920&q=75',30,4,2,1,'5','2025-03-17 15:53:13','2025-03-22 15:58:52'),('e422e1c5-e5ef-49cd-851c-7ec1d083489c','A201','https://www.banyantree.com/_next/image?url=https%3A%2F%2Fwww.banyantree.com%2Fassets%2F2025-02%2Fbt-langco-%20Three-bedroom%20Oceanview%20Pool%20Villa%20-%20Master%20Bedroom.jpg&w=1920&q=75',25,3,2,1,'4','2025-03-17 15:51:58','2025-03-22 15:53:34'),('eb7568a6-6062-4396-8a63-fd2969aaeb41','A101','https://www.banyantree.com/_next/image?url=https%3A%2F%2Fwww.banyantree.com%2Fassets%2F2025-02%2Fbt-langco-%20Three-bedroom%20Oceanview%20Pool%20Villa%20-%20Master%20Bedroom.jpg&w=1920&q=75',10,2,1,3,'1','2025-03-17 15:51:03','2025-03-22 22:37:10');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomfacility`
--

DROP TABLE IF EXISTS `roomfacility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roomfacility` (
  `room_id` varchar(255) NOT NULL,
  `facility_id` varchar(255) NOT NULL,
  PRIMARY KEY (`room_id`,`facility_id`),
  KEY `facility_id` (`facility_id`),
  CONSTRAINT `roomfacility_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) ON DELETE CASCADE,
  CONSTRAINT `roomfacility_ibfk_2` FOREIGN KEY (`facility_id`) REFERENCES `facility` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomfacility`
--

LOCK TABLES `roomfacility` WRITE;
/*!40000 ALTER TABLE `roomfacility` DISABLE KEYS */;
INSERT INTO `roomfacility` VALUES ('34c9f3af-bf8d-4161-a98e-a199c687ef85','1'),('bc0ee124-8435-47fa-b3a1-ff377bd24d17','1'),('e422e1c5-e5ef-49cd-851c-7ec1d083489c','1'),('2ea4d0f1-92ad-48ae-a6b3-da3387f3d4dc','10'),('db1c4b44-9f36-4399-bdb8-7bfeffc3b792','10'),('34c9f3af-bf8d-4161-a98e-a199c687ef85','2'),('db1c4b44-9f36-4399-bdb8-7bfeffc3b792','2'),('e422e1c5-e5ef-49cd-851c-7ec1d083489c','2'),('eb7568a6-6062-4396-8a63-fd2969aaeb41','2'),('2ea4d0f1-92ad-48ae-a6b3-da3387f3d4dc','3'),('bc0ee124-8435-47fa-b3a1-ff377bd24d17','3'),('db1c4b44-9f36-4399-bdb8-7bfeffc3b792','3'),('e422e1c5-e5ef-49cd-851c-7ec1d083489c','3'),('eb7568a6-6062-4396-8a63-fd2969aaeb41','3'),('2ea4d0f1-92ad-48ae-a6b3-da3387f3d4dc','4'),('db1c4b44-9f36-4399-bdb8-7bfeffc3b792','4'),('e422e1c5-e5ef-49cd-851c-7ec1d083489c','4'),('34c9f3af-bf8d-4161-a98e-a199c687ef85','5'),('bc0ee124-8435-47fa-b3a1-ff377bd24d17','5'),('db1c4b44-9f36-4399-bdb8-7bfeffc3b792','5'),('e422e1c5-e5ef-49cd-851c-7ec1d083489c','5'),('eb7568a6-6062-4396-8a63-fd2969aaeb41','5'),('2ea4d0f1-92ad-48ae-a6b3-da3387f3d4dc','6'),('34c9f3af-bf8d-4161-a98e-a199c687ef85','6'),('bc0ee124-8435-47fa-b3a1-ff377bd24d17','6'),('eb7568a6-6062-4396-8a63-fd2969aaeb41','6'),('2ea4d0f1-92ad-48ae-a6b3-da3387f3d4dc','8'),('34c9f3af-bf8d-4161-a98e-a199c687ef85','8'),('db1c4b44-9f36-4399-bdb8-7bfeffc3b792','8'),('e422e1c5-e5ef-49cd-851c-7ec1d083489c','8'),('eb7568a6-6062-4396-8a63-fd2969aaeb41','8'),('e422e1c5-e5ef-49cd-851c-7ec1d083489c','9');
/*!40000 ALTER TABLE `roomfacility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomtype`
--

DROP TABLE IF EXISTS `roomtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roomtype` (
  `id` varchar(45) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomtype`
--

LOCK TABLES `roomtype` WRITE;
/*!40000 ALTER TABLE `roomtype` DISABLE KEYS */;
INSERT INTO `roomtype` VALUES ('1','Room Deluxe',1,'Deluxe Rooms offer a modern resort space with sophisticated design and high-class interior. The spacious room has a comfortable king-size bed, large windows facing the city or the sea, allowing you to enjoy the beautiful scenery. Amenities include a flat-screen TV, minibar, coffee maker, and marble bathroom with relaxing bathtub.'),('2','Room Suite',1,'Spacious and luxuriously designed, the Suite offers comfort and class with a separate living room, king-size bed, and private balcony with panoramic views. Exclusive services include complimentary breakfast, minibar, and bathroom with jacuzzi bathtub.'),('3','Room Standard',1,'The Standard Room is an ideal choice for travelers looking for comfort at an affordable price. The room is designed in a minimalist style but still ensures full amenities such as a comfortable double bed or two single beds, flat-screen TV, air conditioning, free WiFi and a small desk.'),('4','Room VIP',1,'VIP rooms are the perfect choice for customers who love class and ultimate comfort. With a spacious area, the room is designed in a luxurious style, high-class furniture, and fully equipped with modern amenities.'),('5','Room  Family',1,'Family Rooms are designed specifically for families, providing a spacious, cozy and comfortable space for the whole family to enjoy a complete vacation.');
/*!40000 ALTER TABLE `roomtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service` (
  `id` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES ('12966a6f-efab-48ec-9885-03a890d36b48','Dịch vụ 3','https://www.lagunalangco.com/wp-content/uploads/2023/10/Culinary-Experience-1.jpg'),('59979f93-6f43-4ea8-bdda-e26589faf7cc','Dịch vụ 4','https://www.lagunalangco.com/wp-content/uploads/2023/10/Culinary-Experience-2.jpg'),('68a9160c-50a9-4d48-955d-a559205b3be5','Dịch vụ 1','https://www.lagunalangco.com/wp-content/uploads/2023/10/Culinary-Experience-2.jpg'),('d37af178-3ec9-4d59-a3d0-2b9656744dff','Dịch vụ','https://www.lagunalangco.com/wp-content/uploads/2023/10/Culinary-Experience-7.jpg');
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `shift` varchar(255) NOT NULL,
  `salary` float NOT NULL,
  `hire_date` datetime NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES ('009c8f7c-17b5-46d9-bc97-cbaaebc293d1','Phan Đức','Manager','phanduc@gmail.com','0383181115','Ca sáng',50,'2025-03-16 17:00:00','active','2025-03-17 15:50:44','2025-03-17 15:50:44');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` int NOT NULL,
  `status_name` varchar(255) NOT NULL,
  `is_delete` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,1,'Available',0),(2,2,'Waiting',0),(3,3,'Booked',0),(4,4,'Inactive',0);
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-22 23:11:31
