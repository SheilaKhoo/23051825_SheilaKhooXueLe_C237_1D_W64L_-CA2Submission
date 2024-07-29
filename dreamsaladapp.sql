-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 09, 2024 at 11:13 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dreamsaladapp`
--
CREATE DATABASE IF NOT EXISTS `dreamsaladapp` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `dreamsaladapp`;

-- --------------------------------------------------------

--
-- Table structure for table `connectors`
--

CREATE TABLE `connectors` (
  `connector_id` int(11) NOT NULL,
  `starting_phrase` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `connectors`
--

INSERT INTO `connectors` (`connector_id`, `starting_phrase`) VALUES
(0, 'Then, '),
(1, 'Later in the day, '),
(2, 'After that, '),
(3, 'That was when ');

-- --------------------------------------------------------

--
-- Table structure for table `dreams`
--

CREATE TABLE `dreams` (
  `dream_id` int(11) NOT NULL,
  `user_name` varchar(32) NOT NULL,
  `title` varchar(128) NOT NULL,
  `dream` varchar(1000) NOT NULL,
  `connector_id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `last_edited` datetime NOT NULL,
  `image` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dreams`
--

INSERT INTO `dreams` (`dream_id`, `user_name`, `title`, `dream`, `connector_id`, `created`, `last_edited`, `image`) VALUES
(1, 'Bob', 'Rick Astley Llama Party', 'After a satisfying picnic, I saw a large herd of llamas grazing in the field. One of them looked at me. Suddenly, it turned into Rick Astley. I felt like I had to run around and desert the place immediately.', 1, '2022-12-31 12:30:38', '2022-12-31 12:30:38', NULL),
(2, 'Tom', 'Graveyard Horror', 'I saw a graveyard and decided to enter it. Suddenly the sky turned dark and I saw a hooded figure with no body floating towards me. I ran as far as my legs could carry, and hid behind a tombstone.', 3, '2023-01-04 15:12:47', '2023-01-04 15:12:47', NULL),
(3, 'Tom', 'Beach Whales', 'I went to the beach and saw a strange sight. Whales, even upside-down ones, were floating in the air around the beach. I ran up a coconut tree and jumped onto one, and it took me on a trip over the sea, soaring majestically in the sky like an eagle piloting a blimp.', 2, '2023-01-05 07:39:15', '2023-01-05 07:39:15', NULL),
(4, 'Rick', 'Llama Party', 'I went to the shopping mall and saw a group of llamas having a birthday party at McDonalds. The birthday llama excitedly waved me over and gave me an apple pie!', 2, '2023-01-07 11:25:35', '2023-01-07 11:25:35', NULL),
(5, 'Jack', 'Balloon Gunship', 'I boarded a balloon gunship and fought aliens attacking our Solar System. Unfortunately, they destroyed Jupiter and we now have 7 planets left. I charged up my Lazor-EX beam and eradicated the remaining attackers and saved the day!', 1, '2023-01-09 04:40:13', '2023-01-09 04:40:13', NULL),
(6, 'Bob', 'Pizza Cheese', 'I was eating pizza when the cheese flew out of the pizza and started dancing over the pizza box. Then it jumped back into the pizza. I quickly finished the pizza before it jumped out again.', 0, '2023-01-10 10:19:28', '2023-01-10 10:19:28', NULL),
(7, 'Bob', 'McChicken Trampoline', 'I accidentally stepped on a McChicken that someone left on the floor, and it bounced me up all the way to the stratosphere and onto the Moon. I found an ancient cave with a spaceship. I boarded the spaceship and it took me home.', 0, '2023-01-12 14:47:14', '2023-01-12 14:47:14', NULL),
(8, 'Bob', 'Clock Frenzy', 'I was looking at my favourite table clock when suddenly the hands started spinning around frantically. When they stopped spinning, I found there were now three hands on it. I gave the clock a shake and the third hand disappeared.', 0, '2023-01-13 08:35:34', '2023-01-13 08:35:34', NULL),
(9, 'Bob', 'Carrot Chair', 'I decided to build a chair out of carrots. I stabbed carrots into carrots to join them. After five hours, I finally finished my carrot chair. I proudly sat on it and it collapsed immediately.', 0, '2023-01-17 15:05:47', '2023-01-17 15:05:47', NULL),
(10, 'Bob', 'Peanut Rain', 'I went shopping and it started thundering. Then a torrent of peanuts started pouring from the sky. I caught one, cracked it open, and ate it. It was the best peanut I ever had.', 0, '2023-01-18 07:41:20', '2023-01-18 07:41:20', NULL),
(11, 'Bob', 'Cake Monster', 'I bought a cake from the cakeshop downstairs, and was going to eat it when it morphed into a cake monster with cherry eyes. It ran away crying and I had to get a refund for my runaway cake.', 0, '2023-01-21 14:17:31', '2023-01-21 14:17:31', NULL),
(12, 'User', 'Grass Sword', 'As a grass-loving person, I decided to build a sword out of grass so I could fight my enemies with my favourite plant. After many hours of forging my sword, I was done! My grass sword was so fearsome it could even cut down trees!', 0, '2023-01-23 10:32:12', '2023-01-23 10:32:12', NULL),
(13, 'User', 'Laser Ring', 'The underground goblins attacked the Earth! I quickly grabbed the laser ring my grandfather passed down to me and put it on. I ran outside and started tapping the ring with my finger, and it fired a powerful red laser beam that eradicated all the underground goblins.', 0, '2023-01-26 15:17:36', '2023-01-26 15:17:36', NULL),
(14, 'User', 'Eggland', 'I saw a strange door I never saw before. I opened and stepped through it, and found myself in a world of eggs! The floor was omelette. The trees were egg-shaped. The eggs laid eggs. Everything was eggs!', 0, '2023-01-30 08:30:06', '2023-01-30 08:30:06', NULL),
(15, 'User', 'DreamSalad', 'I sat up in bed, realizing I had a dream about coding a website called DreamSalad. It was a website where users could order a DreamSalad, which was delicious dreams tossed together in a bowl, and it would be delivered within 30 minutes to their doorstep.', 0, '2023-02-10 14:13:29', '2023-02-10 14:13:29', NULL),
(16, 'User', 'Rose Snack', 'I was munching on a rose for lunch. It was sweet and juicy and tasted so delicious! I loved the prickly thorns as they made the rose exciting to eat.', 0, '2023-02-21 08:35:13', '2023-02-21 08:35:13', NULL),
(17, 'User', 'Tissue Exam', 'I was taking an exam. To save money, the school has decided to replace A4 paper with tissue paper. The exam was printed on tissue paper. After finishing the paper, my tissue flew away, out of the window.', 0, '2023-02-23 14:13:30', '2023-02-23 14:13:30', NULL),
(18, 'User', 'Powerbank', 'I went to the powerbank to withdraw some power. I decided to withdraw 100 units of power. With the extra power, my strength stat increased by 200!', 0, '2023-02-28 08:32:15', '2023-02-28 08:32:15', NULL),
(19, 'User', 'Wasabi Sambal', 'I went to a sushi shop and they had wasabi sambal. Everyone was enjoying it and dipping their sushi into bowls of wasabi sambal.', 0, '2023-03-04 13:17:33', '2023-03-04 13:17:33', NULL),
(20, 'User', 'Spidey Sense', 'I got bitten by a spider and now I can shoot spiderweb out of my toes! I can swing from building to building by shooting web everywhere!', 0, '2023-03-09 15:25:19', '2023-03-09 15:25:19', NULL),
(21, 'User', 'Bat Sense', 'I got bitten by a bat and I can now transform into a bat! I flew to the moon and had a party there before flying back to Earth.', 0, '2023-03-16 06:36:09', '2023-03-16 06:36:09', NULL),
(22, 'User', 'Aircorn', 'I bought the new Aircorn 2000 from the supermarket. When I pressed the On button, it started blasting cold air out of itself. Now I can take a walk under the hot sun and not feel too hot!', 0, '2023-03-24 13:11:31', '2023-03-24 13:11:31', NULL),
(23, 'User', 'Sheepwrecked', 'I sailed across the ocean on a sheep, and crashed into an iceberg. I swam to the nearest iceberg and started a colony there with polar bears as my pets.', 0, '2023-03-31 17:21:49', '2023-03-31 17:21:49', NULL),
(24, 'User', 'Holiday on the Sun', 'I took an interplanetary flight to the sun for a holiday. It was a bit warm but it was alright. For five days, I enjoyed suntanning on the sun.', 0, '2023-04-06 05:34:14', '2023-04-06 05:34:14', NULL),
(25, 'User', 'Flying Tomato', 'I squeezed a tomato with all my might and it started flying! It took me on a trip around the world before dropping me off in Italy. I had to buy another tomato to fly back home.', 0, '2023-04-20 12:07:38', '2023-04-20 12:07:38', NULL),
(26, 'User', 'Water Bottle', 'I was thirsty, so I started drinking water out of my water bottle. I realized that no matter how much I drank, the bottle remained full. I realized I had bought the latest iWaterBottle by mistake. Oh no.', 0, '2023-04-20 16:19:24', '2024-07-05 23:28:14', NULL),
(27, 'User', 'Waffle Bed', 'I bought a new bed made of waffle. It was comfortable but a bit bumpy.', 0, '2023-04-24 12:38:12', '2023-04-24 12:38:12', NULL),
(28, 'User', 'Banana Power', 'I fought off a hundred enemy soldiers using my banana kungfu, where I swished a banana to cut them up into pieces.', 0, '2023-05-10 14:17:42', '2024-07-09 17:10:21', 'banana.png'),
(29, 'User', 'Orange Juice', 'I decided to drink some orange juice, but there was a durian next to me who was thirsty, so I gave my orange to the durian.', 0, '2023-05-25 08:38:18', '2023-05-25 08:38:18', NULL),
(30, 'User', 'Cat Power', 'I realized I was too poor to fly to Australia for a holiday. So I asked my cat to bring me there, and it agreed. I grabbed onto my cat\'s tail and it charged up before flying into the sky, and we landed in Australia safely.', 0, '2023-06-08 11:31:44', '2024-07-09 17:08:50', 'cattail.png'),
(31, 'User', 'Crappybara', 'A capybara tried to steal my banana juice when I wasn\'t looking. I was angry and called it a crappybara and it was sad, and apologized to me.', 2, '2023-06-29 13:16:34', '2024-07-05 23:07:39', NULL),
(32, 'User', 'Sushi Pie', 'I decided to bake a sushi pie. First, I made sushi. Then I made a pie. I have a sushi. I have a pie. Bam, sushi pie!', 3, '2023-07-12 12:43:18', '2023-07-12 12:43:18', NULL),
(34, 'Jane', 'Volcano HDB', 'I saw a volcanic eruption on the roof of the opposite HDB flat. Lava was flowing down the building.', 0, '2023-07-27 07:36:43', '2023-07-27 07:36:43', NULL),
(67, 'User', 'XBox', 'I bought an XBox from Harvey Norman and played tic-tac-toe with someone who bought an OBox.', 1, '2024-07-03 22:04:55', '2024-07-08 19:09:42', 'obox.png'),
(69, 'User', 'Lamb Kebaby', 'I went to a restaurant and ordered a baby lamb kebab and ate the poor baby lamb whole on a kebab stick. It was delicious though.', 1, '2024-07-04 21:51:05', '2024-07-08 20:25:14', NULL),
(85, 'User', 'Mushroom Dance', 'I found a giant mushroom and decided to dance on it. The mushroom was angry but couldn\'t do anything about it.', 3, '2024-07-09 17:12:46', '2024-07-09 17:12:46', 'mushroom.png');

-- --------------------------------------------------------

--
-- Table structure for table `saved_dreams`
--

CREATE TABLE `saved_dreams` (
  `saved_id` int(11) NOT NULL,
  `owner_name` varchar(32) NOT NULL,
  `title` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `saved_dreams`
--

INSERT INTO `saved_dreams` (`saved_id`, `owner_name`, `title`) VALUES
(26, 'User', 'Pizza and Magic Water!'),
(27, 'User', 'Oh no, aliens destroyed Jupiter :('),
(28, 'User', 'We can eat DreamSalad?!'),
(29, 'User', 'Llamas and egg world?!'),
(30, 'User', 'Holiday on the sun?! Are you serious?!'),
(31, 'User', 'lol, crappybara'),
(32, 'User', 'Durians can drink orange juice?!'),
(33, 'User', 'The first dream was an actual dream I had btw :)'),
(34, 'User', 'I would stay around and listen to him sing though...'),
(35, 'User', 'Here\'s a meme: Google for \"indian movie banana\" for the reference to the last dream :)'),
(36, 'User', 'I have a pie, I have a sushi... Ah! Sushi pie!'),
(41, 'User', 'gg'),
(42, 'User', 'fqf');

-- --------------------------------------------------------

--
-- Table structure for table `saved_dreams_has_dreams`
--

CREATE TABLE `saved_dreams_has_dreams` (
  `sdhd_id` int(10) NOT NULL,
  `saved_id` int(11) NOT NULL,
  `dream_id` int(11) DEFAULT NULL,
  `dream_order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `saved_dreams_has_dreams`
--

INSERT INTO `saved_dreams_has_dreams` (`sdhd_id`, `saved_id`, `dream_id`, `dream_order`) VALUES
(60, 26, 6, 0),
(61, 26, 26, 1),
(62, 26, 21, 2),
(63, 27, 5, 0),
(64, 27, 7, 1),
(65, 27, 30, 2),
(66, 27, 25, 3),
(67, 27, 26, 4),
(68, 27, 34, 5),
(69, 27, 3, 6),
(70, 28, 15, 0),
(71, 28, 9, 1),
(72, 28, 26, 2),
(73, 29, 4, 0),
(74, 29, 10, 1),
(75, 29, 13, 2),
(76, 29, 29, 3),
(77, 29, 32, 4),
(78, 29, 16, 5),
(79, 29, 14, 6),
(80, 30, 24, 0),
(81, 30, 16, 1),
(82, 30, 2, 2),
(83, 31, 31, 0),
(84, 31, 5, 1),
(85, 31, 10, 2),
(86, 32, NULL, 0),
(87, 32, 29, 1),
(88, 32, 17, 2),
(89, 33, 2, 0),
(90, 33, 20, 1),
(91, 33, 31, 2),
(92, 34, 1, 0),
(93, 34, 9, 1),
(94, 34, 34, 2),
(95, 35, 20, 0),
(96, 35, 32, 1),
(97, 35, 28, 2),
(98, 36, 32, 0),
(99, 36, 30, 1),
(100, 36, 28, 2),
(120, 41, 6, 0),
(121, 41, 21, 1),
(122, 41, 17, 2),
(123, 41, NULL, 3),
(124, 41, 8, 4),
(125, 41, 22, 5),
(126, 41, 29, 6),
(127, 41, 34, 7),
(128, 41, 11, 8),
(129, 41, 4, 9),
(130, 42, NULL, 0),
(131, 42, 3, 1),
(132, 42, 7, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `connectors`
--
ALTER TABLE `connectors`
  ADD PRIMARY KEY (`connector_id`);

--
-- Indexes for table `dreams`
--
ALTER TABLE `dreams`
  ADD PRIMARY KEY (`dream_id`),
  ADD KEY `connector_id` (`connector_id`);

--
-- Indexes for table `saved_dreams`
--
ALTER TABLE `saved_dreams`
  ADD PRIMARY KEY (`saved_id`);

--
-- Indexes for table `saved_dreams_has_dreams`
--
ALTER TABLE `saved_dreams_has_dreams`
  ADD PRIMARY KEY (`sdhd_id`),
  ADD KEY `saved_id` (`saved_id`),
  ADD KEY `dream_id` (`dream_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `connectors`
--
ALTER TABLE `connectors`
  MODIFY `connector_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `dreams`
--
ALTER TABLE `dreams`
  MODIFY `dream_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `saved_dreams`
--
ALTER TABLE `saved_dreams`
  MODIFY `saved_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `saved_dreams_has_dreams`
--
ALTER TABLE `saved_dreams_has_dreams`
  MODIFY `sdhd_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dreams`
--
ALTER TABLE `dreams`
  ADD CONSTRAINT `fk_to_connector_id` FOREIGN KEY (`connector_id`) REFERENCES `connectors` (`connector_id`);

--
-- Constraints for table `saved_dreams_has_dreams`
--
ALTER TABLE `saved_dreams_has_dreams`
  ADD CONSTRAINT `fk_to_dreams` FOREIGN KEY (`dream_id`) REFERENCES `dreams` (`dream_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_to_saved_dreams` FOREIGN KEY (`saved_id`) REFERENCES `saved_dreams` (`saved_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
