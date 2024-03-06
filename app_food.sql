/*
 Navicat Premium Data Transfer

 Source Server         : Nodejs39
 Source Server Type    : MySQL
 Source Server Version : 80200 (8.2.0)
 Source Host           : localhost:3306
 Source Schema         : app_food

 Target Server Type    : MySQL
 Target Server Version : 80200 (8.2.0)
 File Encoding         : 65001

 Date: 06/03/2024 21:42:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for food
-- ----------------------------
DROP TABLE IF EXISTS `food`;
CREATE TABLE `food`  (
  `food_id` int NOT NULL AUTO_INCREMENT,
  `food_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `price` float NULL DEFAULT NULL,
  `desc` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `type_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`food_id`) USING BTREE,
  INDEX `type_id`(`type_id` ASC) USING BTREE,
  CONSTRAINT `food_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `food_type` (`type_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of food
-- ----------------------------
INSERT INTO `food` VALUES (1, 'Bánh Mì', 'banhmi.jpg', 20000, 'Bánh mì hà nội', 1);
INSERT INTO `food` VALUES (2, 'Khô bò', 'khobo.jpg', 20000, 'Khô bò 50g', 2);
INSERT INTO `food` VALUES (3, 'Cơm tấm', 'comtam.jpg', 30000, 'Cơm tấm', 3);

-- ----------------------------
-- Table structure for food_type
-- ----------------------------
DROP TABLE IF EXISTS `food_type`;
CREATE TABLE `food_type`  (
  `type_id` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`type_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of food_type
-- ----------------------------
INSERT INTO `food_type` VALUES (1, 'Đồ ăn nhanh');
INSERT INTO `food_type` VALUES (2, 'Đồ ăn vặt');
INSERT INTO `food_type` VALUES (3, 'Cơm (Món Chính)');

-- ----------------------------
-- Table structure for like_res
-- ----------------------------
DROP TABLE IF EXISTS `like_res`;
CREATE TABLE `like_res`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL DEFAULT NULL,
  `res_id` int NULL DEFAULT NULL,
  `date_like` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  INDEX `res_id`(`res_id` ASC) USING BTREE,
  CONSTRAINT `like_res_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `like_res_ibfk_2` FOREIGN KEY (`res_id`) REFERENCES `restaurant` (`res_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of like_res
-- ----------------------------
INSERT INTO `like_res` VALUES (4, 6, 1, '2024-02-29 13:54:45');
INSERT INTO `like_res` VALUES (9, 1, 1, '2024-03-04 17:10:19');

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL DEFAULT NULL,
  `food_id` int NULL DEFAULT NULL,
  `amount` int NULL DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `arr_sub_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `food_id`(`food_id` ASC) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`food_id`) REFERENCES `food` (`food_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 39 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES (32, 1, 1, 1, '', '[1]');
INSERT INTO `order` VALUES (33, 1, 1, 1, '', '[2]');
INSERT INTO `order` VALUES (34, 1, 1, 1, '', '[1]');
INSERT INTO `order` VALUES (35, 1, 1, 1, '', '[]');
INSERT INTO `order` VALUES (36, 1, 1, 1, '', '[1]');
INSERT INTO `order` VALUES (37, 1, 2, 1, '', '[3]');
INSERT INTO `order` VALUES (38, 1, 1, 1, '', '[1]');

-- ----------------------------
-- Table structure for rate_res
-- ----------------------------
DROP TABLE IF EXISTS `rate_res`;
CREATE TABLE `rate_res`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL DEFAULT NULL,
  `res_id` int NULL DEFAULT NULL,
  `amount` int NULL DEFAULT NULL,
  `date_rate` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  INDEX `res_id`(`res_id` ASC) USING BTREE,
  CONSTRAINT `rate_res_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `rate_res_ibfk_2` FOREIGN KEY (`res_id`) REFERENCES `restaurant` (`res_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rate_res
-- ----------------------------
INSERT INTO `rate_res` VALUES (4, 1, 1, 5, '2024-03-02 11:34:40');

-- ----------------------------
-- Table structure for restaurant
-- ----------------------------
DROP TABLE IF EXISTS `restaurant`;
CREATE TABLE `restaurant`  (
  `res_id` int NOT NULL AUTO_INCREMENT,
  `res_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`res_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of restaurant
-- ----------------------------
INSERT INTO `restaurant` VALUES (1, 'Pizza Palace', 'pizza-palace.jpg', 'A local pizzeria with a cozy atmosphere and delicious slices.');
INSERT INTO `restaurant` VALUES (2, 'Sophisticated Sushi', 'sushi-restaurant.jpg', 'High-end sushi restaurant with a variety of fresh seafood and creative rolls.');
INSERT INTO `restaurant` VALUES (3, 'Tasty Tacos', 'taco-truck.jpg', 'Authentic Mexican tacos served from a colorful food truck.');
INSERT INTO `restaurant` VALUES (4, 'Gourmet Greek', 'greek-salad.jpg', 'Fine dining establishment serving traditional Greek dishes with a modern twist.');
INSERT INTO `restaurant` VALUES (5, 'Home-style Hamburger Haven', 'hamburger-grill.jpg', 'Classic American diner with juicy burgers, crispy fries, and milkshakes.');

-- ----------------------------
-- Table structure for sub_food
-- ----------------------------
DROP TABLE IF EXISTS `sub_food`;
CREATE TABLE `sub_food`  (
  `sub_id` int NOT NULL AUTO_INCREMENT,
  `sub_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `sub_price` float NULL DEFAULT NULL,
  `food_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`sub_id`) USING BTREE,
  INDEX `food_id`(`food_id` ASC) USING BTREE,
  CONSTRAINT `sub_food_ibfk_1` FOREIGN KEY (`food_id`) REFERENCES `food` (`food_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sub_food
-- ----------------------------
INSERT INTO `sub_food` VALUES (1, 'Thịt thêm', 5000, 1);
INSERT INTO `sub_food` VALUES (2, 'Cơm thêm', 5000, 3);
INSERT INTO `sub_food` VALUES (3, 'Khô bò thêm', 5000, 2);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'John Doe', 'john.doe@example.com', 'password123');
INSERT INTO `user` VALUES (2, 'Jane Smith', 'jane.smith@example.com', 'qwerty456');
INSERT INTO `user` VALUES (3, 'Alice Johnson', 'alice.johnson@example.com', 'password789');
INSERT INTO `user` VALUES (4, 'Bob Brown', 'bob.brown@example.com', '11111111');
INSERT INTO `user` VALUES (5, 'Charlie Green', 'charlie.green@example.com', 'qwertyuiop');
INSERT INTO `user` VALUES (6, 'Luca Nguyen', 'icaluca12@gmail.com', '123123');

SET FOREIGN_KEY_CHECKS = 1;
