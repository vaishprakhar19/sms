-- Drop all tables in the database
SET FOREIGN_KEY_CHECKS = 0;

-- Drop tables in reverse order of dependencies
DROP TABLE IF EXISTS timetableCSE1;
DROP TABLE IF EXISTS internal_marks_1;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS result_mapping;
DROP TABLE IF EXISTS mess_timing;
DROP TABLE IF EXISTS mess_menu;
DROP TABLE IF EXISTS holidays;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS notices;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS users;

SET FOREIGN_KEY_CHECKS = 1;

-- Optional: Drop and recreate the database
-- DROP DATABASE IF EXISTS sms_db;
-- CREATE DATABASE sms_db;
-- USE sms_db; 