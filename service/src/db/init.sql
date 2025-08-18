-- 创建数据库
CREATE DATABASE IF NOT EXISTS easyenglish CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE easyenglish;

-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 创建单词表
CREATE TABLE IF NOT EXISTS words (
  id INT AUTO_INCREMENT PRIMARY KEY,
  word VARCHAR(100) NOT NULL UNIQUE,
  pronunciation VARCHAR(100),
  definition TEXT NOT NULL,
  example TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 创建用户单词关联表（用于记录用户学习的单词）
CREATE TABLE IF NOT EXISTS user_words (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  word_id INT NOT NULL,
  mastery_level TINYINT DEFAULT 0, -- 掌握程度：0-5
  next_review_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (word_id) REFERENCES words(id) ON DELETE CASCADE,
  UNIQUE KEY user_word_unique (user_id, word_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 插入一些示例数据
INSERT INTO users (username, email, password) VALUES
('testuser', 'test@example.com', '$2b$10$rPiEAgQNIT1TcJ8kVU.kVeUWxvbp0D5RNGoBQiuXnJ4kK4KhUbhhy'); -- 密码: password

INSERT INTO words (word, pronunciation, definition, example) VALUES
('apple', '/ˈæp.əl/', 'A round fruit with red, green, or yellow skin and firm white flesh', 'I eat an apple every day.'),
('book', '/bʊk/', 'A set of printed or written pages bound together along one edge', 'She read a book about history.'),
('computer', '/kəmˈpjuː.tər/', 'An electronic device that can store, retrieve, and process data', 'I use my computer for work every day.');