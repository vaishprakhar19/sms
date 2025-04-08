-- Create database
CREATE DATABASE IF NOT EXISTS sms_db;
USE sms_db;

-- Users table - Updated to match auth.js and core.js
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    uid VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    rollNo VARCHAR(20) UNIQUE NOT NULL,
    batch VARCHAR(10) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    department ENUM('CSE', 'ECE', 'MCA') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Students table - Updated to match result.js
CREATE TABLE IF NOT EXISTS students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    roll_no VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    department ENUM('CSE', 'ECE', 'MCA') NOT NULL,
    batch VARCHAR(10) NOT NULL,
    father_mobile VARCHAR(15) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Notices table - Updated to match notice.js
CREATE TABLE IF NOT EXISTS notices (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    stream ENUM('CSE', 'ECE', 'MCA', NULL),
    semester INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Events table - Updated to match events.js
CREATE TABLE IF NOT EXISTS events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    thumbnailImage TEXT,
    category VARCHAR(50),
    heading VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    driveLink TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Holidays table - Updated to match holiday.js
CREATE TABLE IF NOT EXISTS holidays (
    id INT PRIMARY KEY AUTO_INCREMENT,
    festival VARCHAR(100) NOT NULL,
    no_of_holidays INT NOT NULL,
    date DATE NOT NULL,
    day VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Mess table - Updated to match mess.js
CREATE TABLE IF NOT EXISTS mess_menu (
    id INT PRIMARY KEY AUTO_INCREMENT,
    day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
    breakfast TEXT,
    lunch TEXT,
    dinner TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Mess timing table - Added based on mess.js
CREATE TABLE IF NOT EXISTS mess_timing (
    id INT PRIMARY KEY AUTO_INCREMENT,
    meal_type ENUM('Breakfast', 'Lunch', 'Dinner') NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Result mapping table - Added based on result.js
CREATE TABLE IF NOT EXISTS result_mapping (
    id INT PRIMARY KEY AUTO_INCREMENT,
    roll_no VARCHAR(20) NOT NULL,
    internal INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (roll_no) REFERENCES students(roll_no) ON DELETE CASCADE
);

-- Subjects table - Added based on result.js
CREATE TABLE IF NOT EXISTS subjects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    department ENUM('CSE', 'ECE', 'MCA') NOT NULL,
    semester INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Internal marks tables - Added based on result.js
CREATE TABLE IF NOT EXISTS internal_marks_1 (
    id INT PRIMARY KEY AUTO_INCREMENT,
    roll_no VARCHAR(20) NOT NULL,
    subject_code VARCHAR(20) NOT NULL,
    marks DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (roll_no) REFERENCES students(roll_no) ON DELETE CASCADE,
    FOREIGN KEY (subject_code) REFERENCES subjects(code) ON DELETE CASCADE
);

-- Timetable tables - Added based on core.js
CREATE TABLE IF NOT EXISTS timetableCSE1 (
    id INT PRIMARY KEY AUTO_INCREMENT,
    DayOfWeek VARCHAR(20) NOT NULL,
    StartTime TIME NOT NULL,
    EndTime TIME NOT NULL,
    SubjectName VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_notices_stream_semester ON notices(stream, semester);
CREATE INDEX idx_students_roll_no ON students(roll_no);
CREATE INDEX idx_result_mapping_roll_no ON result_mapping(roll_no);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_holidays_date ON holidays(date);
CREATE INDEX idx_users_uid ON users(uid);
CREATE INDEX idx_users_rollNo ON users(rollNo);