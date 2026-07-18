const fs = require('fs');
const { svgW, R, A, T, Tw } = require('../svg-helpers');

function codeBlock(lines) { return lines.join('\n'); }
function q(question, answer) { return { question: question.replace(/'/g,"\\'"), answer: answer.replace(/'/g,"\\'") }; }
function m(question, options, answer, explanation) { return { question: question.replace(/'/g,"\\'"), options: options, answer: answer, explanation: explanation.replace(/'/g,"\\'") }; }
function e(title, useCase, code, description) { return { title: title.replace(/'/g,"\\'"), useCase: useCase.replace(/'/g,"\\'"), code: code, description: description.replace(/'/g,"\\'") }; }
function d(heading, text) { return { heading: heading.replace(/'/g,"\\'"), text: text.replace(/'/g,"\\'") }; }

var topics = {};
var topicList = [];

function addTopic(id, title, difficulty, estimatedMinutes, tldrItems, laymanDef, deepDiveArr, interviewAns, questionsArr, svgInner, codeExamplesArr, mcqArr) {
  var t = {
    id: id, title: title, difficulty: difficulty, estimatedMinutes: estimatedMinutes,
    tldr: tldrItems, laymanDefinition: laymanDef, deepDive: deepDiveArr,
    interviewAnswer: interviewAns, interviewQuestions: questionsArr,
    diagramSvg: svgW(500, 300, title, svgInner), codeExamples: codeExamplesArr, mcqQuestions: mcqArr
  };
  topics[id] = t;
  topicList.push({ id: id, title: title, difficulty: difficulty, estimatedMinutes: estimatedMinutes, file: id + '.json' });
}

/* =================== TOPIC 1: Database Basics =================== */
addTopic('sql-database-basics', 'Database Basics', 'beginner', 20,
  ['A database is an organized collection of structured data, managed by a Database Management System (DBMS).',
   'RDBMS (Relational DBMS) stores data in tables with rows and columns, enforcing relationships via foreign keys.',
   'SQL (Structured Query Language) is the standard language for querying and managing relational databases.',
   'Popular RDBMS: PostgreSQL, MySQL, SQL Server, Oracle, SQLite. PostgreSQL is the most advanced open-source option.'
  ],
  'A database is like a digital filing cabinet. An RDBMS is a cabinet where files are stored in structured folders (tables), each with labeled columns, and you can link information between folders using references.',
  [
    d('DBMS vs RDBMS', 'DBMS stores data as files with no relationships. RDBMS stores data in tables with defined relationships via foreign keys. RDBMS supports ACID transactions, normalization, and complex queries with JOINs. DBMS is simpler (e.g., XML store), RDBMS is more powerful and widely used.'),
    d('SQL Data Types', 'Numeric: INT, SMALLINT, BIGINT, DECIMAL(p,s), FLOAT, REAL. Character: CHAR(n), VARCHAR(n), TEXT. Date/Time: DATE, TIME, TIMESTAMP, INTERVAL. Binary: BLOB, BYTEA. Special: BOOLEAN, UUID, JSON, JSONB, ARRAY (PostgreSQL uses type-specific data types).'),
    d('Tables Structure', 'Tables consist of rows (records) and columns (fields). Each column has a defined data type and optional constraints. The schema defines the table structure. Tables can be linked through primary key / foreign key relationships.'),
    d('SQL Sublanguages', 'DDL (Data Definition Language): CREATE, ALTER, DROP. DML (Data Manipulation Language): SELECT, INSERT, UPDATE, DELETE. DCL (Data Control Language): GRANT, REVOKE. TCL (Transaction Control Language): BEGIN, COMMIT, ROLLBACK.'),
    d('PostgreSQL vs MySQL', 'PostgreSQL: advanced features (JSONB, full-text search, window functions, CTEs), stricter SQL standards compliance, extensible via extensions, better for complex queries and analytics. MySQL: faster for simple read-heavy workloads, widespread in LAMP stack, simpler replication.')
  ],
  'Understanding database fundamentals—RDBMS concepts, SQL data types, and table structure—is essential before diving into SQL. Choose PostgreSQL for features or MySQL for simplicity.',
  [
    q('What is the difference between DBMS and RDBMS?', 'DBMS stores data as files with no relationships. RDBMS stores data in tables with relationships via foreign keys, supports ACID, normalization, and SQL queries.'),
    q('What are common SQL data types?', 'INT, VARCHAR(n), TEXT, DECIMAL(p,s), DATE, TIMESTAMP, BOOLEAN, UUID, JSON, JSONB. Types vary slightly between databases.'),
    q('What is a table in SQL?', 'A table is a collection of related data organized in rows (records) and columns (fields). Each column has a data type and optional constraints.'),
    q('What are the four SQL sublanguages?', 'DDL (schema definition), DML (data manipulation), DCL (access control), TCL (transaction control).'),
    q('What is the difference between PostgreSQL and MySQL?', 'PostgreSQL has more advanced features (JSONB, full-text search, CTEs, window functions) and stricter SQL compliance. MySQL is simpler and faster for basic read-heavy workloads.'),
    q('What is a primary key?', 'A column or set of columns that uniquely identifies each row in a table. Must be unique and NOT NULL.'),
    q('What is a foreign key?', 'A column that references a primary key in another table, establishing a relationship and enforcing referential integrity.'),
    q('What is a schema in SQL?', 'A schema is a named collection of database objects (tables, views, functions). It organizes objects and controls access.'),
    q('What is NULL in SQL?', 'NULL represents missing or unknown data. It is not the same as 0 or empty string. Comparisons with NULL use IS NULL, not = NULL.'),
    q('What is the difference between CHAR and VARCHAR?', 'CHAR(n) is fixed-length (padded with spaces). VARCHAR(n) is variable-length (up to n). VARCHAR uses less space for variable-length data.')
  ],
  R(10,40,130,30,'#0070f3','','RDBMS','Tables + Relations') +
  A(140,55,170,55) +
  R(180,35,130,35,'#28a745','','SQL','Query Language') +
  A(310,53,340,53) +
  R(350,35,130,35,'#ffc107','','Tables','Rows x Columns') +
  R(180,80,130,30,'#e83e8c','','DDL','CREATE/ALTER/DROP') +
  R(180,120,130,30,'#6610f2','','DML','SELECT/INSERT/UPDATE') +
  R(180,160,130,30,'#dc3545','','DCL','GRANT/REVOKE') +
  T(240,210,'Database Basics: RDBMS organizes data in tables with SQL for queries.',9,'#666','middle'),
  [
    e('Create a Database', 'Create and use a database.', codeBlock([
      'CREATE DATABASE company;',
      '\\c company; -- PostgreSQL: connect to database',
      'USE company; -- MySQL: select database'
    ]), 'Creates a database named company and connects to it.'),
    e('Create a Table', 'Define table structure.', codeBlock([
      'CREATE TABLE employees (',
      '  id SERIAL PRIMARY KEY,',
      '  name VARCHAR(100) NOT NULL,',
      '  email VARCHAR(255) UNIQUE NOT NULL,',
      '  salary DECIMAL(10,2) DEFAULT 0,',
      '  department VARCHAR(50),',
      '  hired_at DATE DEFAULT CURRENT_DATE',
      ');'
    ]), 'Creates employees table with various column types and constraints.'),
    e('Insert Sample Data', 'Add rows to table.', codeBlock([
      "INSERT INTO employees (name, email, salary, department)",
      "VALUES ('Alice', 'alice@example.com', 75000, 'Engineering');"
    ]), 'Inserts a row into the employees table.'),
    e('Basic SELECT Query', 'Query data from table.', codeBlock([
      'SELECT name, salary, department',
      'FROM employees',
      'WHERE salary > 50000',
      'ORDER BY salary DESC;'
    ]), 'Selects names and salaries for employees earning >50k, sorted descending.'),
    e('Update and Delete', 'Modify and remove data.', codeBlock([
      "UPDATE employees SET salary = 80000 WHERE id = 1;",
      "DELETE FROM employees WHERE id = 1;"
    ]), 'Updates salary then deletes the employee record.')
  ],
  [
    m('What does RDBMS stand for?', ['Relational Database Management System', 'Random Database Management System', 'Remote Database Management System', 'Relational Data Model System'], 0, 'RDBMS stands for Relational Database Management System.'),
    m('Which SQL sublanguage handles data manipulation?', ['DDL', 'DML', 'DCL', 'TCL'], 1, 'DML (Data Manipulation Language) handles SELECT, INSERT, UPDATE, DELETE.'),
    m('What is a primary key?', ['A unique identifier for rows', 'A foreign reference', 'A data type', 'An index type'], 0, 'Primary key uniquely identifies each row.'),
    m('Which data type is variable-length string?', ['CHAR', 'VARCHAR', 'TEXT', 'STRING'], 1, 'VARCHAR is variable-length, CHAR is fixed-length.'),
    m('What does NULL represent?', ['Zero', 'Empty string', 'Missing/unknown data', 'False'], 2, 'NULL represents missing or unknown data.'),
    m('Which database has advanced JSONB support?', ['MySQL', 'PostgreSQL', 'SQLite', 'SQL Server'], 1, 'PostgreSQL excels with JSONB support for JSON operations.')
  ]
);

/* =================== TOPIC 2: CREATE & DROP DATABASE =================== */
addTopic('sql-create-database', 'CREATE & DROP Database', 'beginner', 15,
  ['CREATE DATABASE creates a new database. DROP DATABASE permanently deletes a database and all its data.',
   'Use IF NOT EXISTS / IF EXISTS to avoid errors when database already exists or does not exist.',
   'Database naming conventions: lowercase, underscores, meaningful names. Avoid SQL reserved words.',
   'PostgreSQL uses CREATE DATABASE with encoding, locale, and template options. MySQL uses simpler syntax.'
  ],
  'Creating a database is like setting up a new filing cabinet. Dropping it is like throwing that cabinet into a shredder — everything inside is gone forever.',
  [
    d('CREATE DATABASE Syntax', 'PostgreSQL: CREATE DATABASE dbname WITH ENCODING \'UTF8\' LC_COLLATE \'en_US.UTF-8\'. MySQL: CREATE DATABASE dbname CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci. Most basic: CREATE DATABASE dbname;'),
    d('DROP DATABASE', 'DROP DATABASE dbname; — permanently deletes the database. Cannot be undone. All tables, data, indexes, views, functions dropped. PostgreSQL requires you to disconnect all connections first with pg_stat_activity.'),
    d('IF EXISTS / IF NOT EXISTS', 'CREATE DATABASE IF NOT EXISTS dbname; — creates only if not existing, skips without error. DROP DATABASE IF EXISTS dbname; — drops only if exists, skips without error. Prevents script failures.'),
    d('Database Templates (PostgreSQL)', 'PostgreSQL creates databases from a template. Default: template1. You can create custom templates. Options include encoding, locale, and collation settings that are copied from the template.'),
    d('Connection Management', 'Cannot drop a database while connections exist. PostgreSQL: use pg_terminate_backend() or ALTER DATABASE dbname ALLOW_CONNECTIONS = false first. MySQL: DROP DATABASE works while connected to another database.')
  ],
  'Creating and dropping databases are foundational DDL operations. Always use IF EXISTS / IF NOT EXISTS in scripts and be extremely careful with DROP.',
  [
    q('How do you create a database in PostgreSQL?', 'CREATE DATABASE dbname; Or with options: CREATE DATABASE dbname ENCODING \'UTF8\'.'),
    q('What does DROP DATABASE do?', 'Permanently deletes the database and all its data. Cannot be recovered without a backup.'),
    q('What is IF NOT EXISTS?', 'A clause that prevents an error if the database already exists. Creates only if not present.'),
    q('Can you drop a database with active connections?', 'No. PostgreSQL requires terminating connections first. MySQL allows dropping while on a different database.'),
    q('What is a template database?', 'PostgreSQL creates databases from a template (default template1). Templates can have custom settings.'),
    q('How do you list databases?', 'PostgreSQL: \\l or SELECT datname FROM pg_database. MySQL: SHOW DATABASES.'),
    q('What naming conventions are recommended?', 'Lowercase, underscores, meaningful names. Avoid SQL reserved words (SELECT, TABLE, etc.).'),
    q('How do you switch databases?', 'PostgreSQL: \\c dbname. MySQL: USE dbname.'),
    q('What is the maximum database name length?', '63 characters by default in PostgreSQL (can be increased). MySQL allows up to 64 characters.'),
    q('How do you create a database with a specific encoding?', 'PostgreSQL: CREATE DATABASE dbname ENCODING \'UTF8\' LC_COLLATE \'en_US.UTF-8\'. MySQL: CREATE DATABASE dbname CHARACTER SET utf8mb4.')
  ],
  R(10,40,130,30,'#0070f3','','CREATE DATABASE','New Database') +
  A(140,55,170,55) +
  R(180,40,130,30,'#28a745','','IF NOT EXISTS','Skip if exists') +
  A(310,55,340,55) +
  R(350,40,130,30,'#ffc107','','Ready','Use Database') +
  A(180,70,180,100) +
  R(180,105,130,30,'#dc3545','','DROP DATABASE','Permanent Delete') +
  T(240,170,'CREATE/DROP Database: Foundational DDL. Handle with care.',9,'#666','middle'),
  [
    e('Create Basic Database', 'Simple creation.', codeBlock([
      'CREATE DATABASE company;'
    ]), 'Creates a database named company with default settings.'),
    e('Create with Options (PostgreSQL)', 'Specify encoding and locale.', codeBlock([
      'CREATE DATABASE company',
      '  ENCODING \'UTF8\'',
      '  LC_COLLATE \'en_US.UTF-8\'',
      '  LC_CTYPE \'en_US.UTF-8\';'
    ]), 'Creates database with specific encoding and locale settings.'),
    e('Drop with IF EXISTS', 'Safe dropping.', codeBlock([
      'DROP DATABASE IF EXISTS old_database;'
    ]), 'Drops only if exists, prevents error.'),
    e('List and Connect', 'PostgreSQL commands.', codeBlock([
      '\\l -- list all databases',
      '\\c company -- connect to company database',
      '',
      '-- SQL equivalent:',
      'SELECT datname FROM pg_database;'
    ]), 'Lists databases and connects to one in PostgreSQL.'),
    e('MySQL Version', 'MySQL-specific syntax.', codeBlock([
      'CREATE DATABASE IF NOT EXISTS company',
      '  CHARACTER SET utf8mb4',
      '  COLLATE utf8mb4_unicode_ci;',
      'SHOW DATABASES;',
      'USE company;'
    ]), 'MySQL version with character set and collation.')
  ],
  [
    m('What does CREATE DATABASE do?', ['Creates a table', 'Creates a new database', 'Creates a user', 'Creates a schema'], 1, 'CREATE DATABASE creates a new database.'),
    m('What does DROP DATABASE do?', ['Removes all tables', 'Permanently deletes the database', 'Disconnects users', 'Archives the data'], 1, 'DROP DATABASE permanently deletes the entire database.'),
    m('What does IF NOT EXISTS prevent?', ['Duplicate data', 'Error if DB already exists', 'SQL injection', 'Data loss'], 1, 'IF NOT EXISTS prevents error when database already exists.'),
    m('What command lists databases in PostgreSQL?', ['SHOW DATABASES', '\\l', 'LIST DB', 'SELECT databases'], 1, '\\l lists databases in PostgreSQL.'),
    m('What is the default PostgreSQL template database?', ['template0', 'template1', 'postgres', 'default'], 1, 'template1 is the default template database.'),
    m('What is the max database name length in PostgreSQL?', ['32', '63', '128', '256'], 1, '63 characters is the default maximum name length.')
  ]
);

/* =================== TOPIC 3: CREATE, ALTER, DROP TABLE =================== */
addTopic('sql-create-alter-drop-table', 'CREATE, ALTER & DROP Table', 'beginner', 20,
  ['CREATE TABLE defines a new table structure with columns, data types, and constraints.',
   'ALTER TABLE modifies an existing table: add/drop columns, modify types, add/drop constraints.',
   'DROP TABLE permanently deletes the table and its data. TRUNCATE removes all rows but keeps the table structure.',
   'RENAME TABLE renames a table. Use IF EXISTS variants to avoid errors.'
  ],
  'Creating a table is like designing a spreadsheet template. ALTER is like adding or removing columns later. DROP is shredding the whole spreadsheet.',
  [
    d('CREATE TABLE Syntax', 'CREATE TABLE tablename (column1 type constraints, column2 type constraints, table constraints);. Supports: DEFAULT values, column constraints, table-level constraints. Use IF NOT EXISTS to skip existing tables.'),
    d('ALTER TABLE Operations', 'Add column: ALTER TABLE t ADD COLUMN c TYPE. Drop column: ALTER TABLE t DROP COLUMN c. Modify type: ALTER TABLE t ALTER COLUMN c TYPE newtype. Rename column: ALTER TABLE t RENAME COLUMN old TO new. Add constraint: ALTER TABLE t ADD CONSTRAINT pk PRIMARY KEY (id).'),
    d('DROP TABLE vs TRUNCATE', 'DROP TABLE deletes the table structure and data permanently. TRUNCATE TABLE removes all rows but keeps the table structure (faster than DELETE for all rows). TRUNCATE cannot be rolled back in some databases. DROP requires CASCADE if other objects depend on the table.'),
    d('RENAME TABLE', 'PostgreSQL: ALTER TABLE old RENAME TO new. MySQL: RENAME TABLE old TO new. SQL Server: sp_rename. Cannot rename across databases.'),
    d('Temporary Tables', 'CREATE TEMPORARY TABLE tmp (...) — table exists only for the session. Automatically dropped on session end. Useful for intermediate results. PostgreSQL also supports UNLOGGED tables for faster writes (no WAL logging, not crash-safe).')
  ],
  'CREATE, ALTER, DROP, and TRUNCATE are essential DDL operations. Understanding the differences between DROP and TRUNCATE is critical for data management.',
  [
    q('How do you create a table in SQL?', 'CREATE TABLE table_name (column1 datatype constraints, column2 datatype constraints, ...);'),
    q('How do you add a column?', 'ALTER TABLE table_name ADD COLUMN column_name datatype;'),
    q('How do you drop a column?', 'ALTER TABLE table_name DROP COLUMN column_name;'),
    q('What is the difference between DROP and TRUNCATE?', 'DROP deletes the table structure and data. TRUNCATE removes all rows but keeps the structure. TRUNCATE is faster and cannot be filtered.'),
    q('What is a temporary table?', 'A table that exists only for the database session. Automatically dropped when the session ends. Created with CREATE TEMPORARY TABLE.'),
    q('How do you rename a table?', 'PostgreSQL: ALTER TABLE old_name RENAME TO new_name. MySQL: RENAME TABLE old_name TO new_name.'),
    q('What is IF NOT EXISTS in CREATE TABLE?', 'Prevents an error if the table already exists. Creates only if not present.'),
    q('Can you add a primary key after creating a table?', 'Yes: ALTER TABLE t ADD PRIMARY KEY (id);'),
    q('What does CASCADE do in DROP TABLE?', 'Automatically drops objects that depend on the table (views, foreign keys). Without CASCADE, DROP fails if dependencies exist.'),
    q('What is TRUNCATE vs DELETE without WHERE?', 'TRUNCATE is faster, uses less transaction log, resets auto-increment counters. DELETE can be rolled back and triggers row-level triggers.')
  ],
  R(10,40,130,30,'#0070f3','','CREATE TABLE','New structure') +
  A(140,55,170,55) +
  R(180,35,130,35,'#28a745','','ALTER TABLE','Modify columns') +
  A(310,53,340,53) +
  R(350,35,130,35,'#ffc107','','DROP TABLE','Delete structure') +
  R(180,80,130,30,'#e83e8c','','TRUNCATE','Remove rows') +
  R(180,125,130,30,'#6610f2','','RENAME','Rename table') +
  T(240,195,'Table DDL: CREATE, ALTER, DROP, TRUNCATE, and RENAME operations.',9,'#666','middle'),
  [
    e('Create Table with Constraints', 'Full definition.', codeBlock([
      'CREATE TABLE products (',
      '  id SERIAL PRIMARY KEY,',
      '  name VARCHAR(100) NOT NULL,',
      '  price DECIMAL(10,2) CHECK (price >= 0),',
      '  category VARCHAR(50) DEFAULT \'General\',',
      '  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
      ');'
    ]), 'Creates products table with various constraints and defaults.'),
    e('ALTER TABLE Add/Drop Column', 'Modify table structure.', codeBlock([
      'ALTER TABLE products ADD COLUMN description TEXT;',
      'ALTER TABLE products DROP COLUMN description;',
      'ALTER TABLE products ALTER COLUMN price TYPE NUMERIC(12,2);'
    ]), 'Adds, drops, and modifies column types.'),
    e('DROP vs TRUNCATE', 'Key difference demo.', codeBlock([
      '-- Removes all rows, keeps structure',
      'TRUNCATE TABLE products;',
      '',
      '-- Removes table and all data permanently',
      'DROP TABLE products;',
      '',
      '-- Drop with CASCADE (handles dependencies)',
      'DROP TABLE products CASCADE;'
    ]), 'TRUNCATE removes data only. DROP removes everything.'),
    e('RENAME Table', 'Rename examples.', codeBlock([
      '-- PostgreSQL',
      'ALTER TABLE products RENAME TO inventory;',
      '',
      '-- MySQL',
      'RENAME TABLE products TO inventory;'
    ]), 'Renames the table in PostgreSQL and MySQL syntax.'),
    e('Temporary Table', 'Session-specific table.', codeBlock([
      'CREATE TEMPORARY TABLE temp_results AS',
      'SELECT department, AVG(salary) as avg_salary',
      'FROM employees',
      'GROUP BY department;',
      '',
      'SELECT * FROM temp_results; -- auto-dropped on session end'
    ]), 'Creates a temporary table for intermediate results.')
  ],
  [
    m('Which command deletes the table structure?', ['TRUNCATE', 'DROP', 'DELETE', 'REMOVE'], 1, 'DROP deletes the table structure. TRUNCATE only removes rows.'),
    m('Which command removes all rows but keeps structure?', ['DROP', 'TRUNCATE', 'DELETE', 'CLEAR'], 1, 'TRUNCATE removes all rows, keeps the table.'),
    m('How do you add a column?', ['ADD COLUMN', 'ALTER TABLE ADD', 'ALTER TABLE ADD COLUMN', 'INSERT COLUMN'], 2, 'ALTER TABLE ... ADD COLUMN adds a column.'),
    m('What does CASCADE do in DROP TABLE?', ['Drops dependencies automatically', 'Prevents drop', 'Backs up table', 'Renames table'], 0, 'CASCADE drops dependent objects.'),
    m('When is a temporary table dropped?', ['On commit', 'On session end', 'On transaction end', 'Manually'], 1, 'Temporary tables are dropped when the session ends.'),
    m('Which operation is faster for removing all rows?', ['DELETE FROM', 'TRUNCATE', 'DROP', 'Both same'], 1, 'TRUNCATE is faster than DELETE FROM for removing all rows.')
  ]
);

/* =================== TOPIC 4: Constraints =================== */
addTopic('sql-constraints', 'Constraints', 'intermediate', 25,
  ['Constraints enforce rules on data in tables, ensuring data integrity and consistency.',
   'Common constraints: PRIMARY KEY (unique ID), FOREIGN KEY (referential integrity), UNIQUE (no duplicates), CHECK (value conditions), DEFAULT (fallback value), NOT NULL (required field).',
   'Constraints can be column-level (inline) or table-level (after columns). Table-level constraints can reference multiple columns.',
   'PostgreSQL uses SERIAL/BIGSERIAL for auto-increment. MySQL uses AUTO_INCREMENT. PostgreSQL also supports GENERATED AS IDENTITY.'
  ],
  'Constraints are like the rules for filling out a form: some fields must be filled (NOT NULL), some must be unique (UNIQUE), some must match another form (FOREIGN KEY), and some have automatic values (DEFAULT).',
  [
    d('PRIMARY KEY', 'Uniquely identifies each row. Must be unique and NOT NULL. Can be single column (id INT PRIMARY KEY) or composite (PRIMARY KEY (order_id, product_id)). Automatically creates a unique index. Only one primary key per table.'),
    d('FOREIGN KEY', 'Enforces referential integrity between tables. Ensures values in a column match values in the referenced table\'s primary key. Options: ON DELETE CASCADE (delete child rows), ON DELETE SET NULL (set child FK to NULL), ON DELETE RESTRICT (prevent delete).'),
    d('UNIQUE and NOT NULL', 'UNIQUE ensures all values in a column are different. Multiple UNIQUE constraints per table. NULL values are allowed (one NULL in PostgreSQL, multiple in MySQL). NOT NULL ensures the column always has a value.'),
    d('CHECK and DEFAULT', 'CHECK validates that values meet a condition: CHECK (salary > 0), CHECK (status IN (\'active\', \'inactive\')). DEFAULT provides a fallback value when no value is specified: DEFAULT CURRENT_DATE, DEFAULT 0.'),
    d('Auto-Increment (SERIAL vs AUTO_INCREMENT)', 'PostgreSQL: SERIAL creates an auto-incrementing integer column. BIGSERIAL for bigint. Newer: GENERATED AS IDENTITY (standard SQL). MySQL: AUTO_INCREMENT starts at 1 by default, can be customized. SQL Server: IDENTITY(1,1).')
  ],
  'Constraints are the backbone of data integrity in SQL databases. They prevent invalid data at the database level, which is more reliable than application-level validation alone.',
  [
    q('What is a PRIMARY KEY constraint?', 'Uniquely identifies each row. Must be unique and NOT NULL. Only one per table. Can be single or composite.'),
    q('What is a FOREIGN KEY constraint?', 'Enforces that values in a column match values in another table\'s primary key. Maintains referential integrity.'),
    q('What does ON DELETE CASCADE do?', 'When a parent row is deleted, all child rows referencing it are automatically deleted.'),
    q('What is the difference between UNIQUE and PRIMARY KEY?', 'PRIMARY KEY is automatically NOT NULL. UNIQUE allows NULL values. One PK per table, multiple UNIQUE constraints allowed.'),
    q('What does CHECK do?', 'Validates that column values satisfy a boolean expression. Example: CHECK (age >= 0 AND age <= 150).'),
    q('What does DEFAULT do?', 'Sets a default value for a column when no value is provided in INSERT.'),
    q('What is SERIAL in PostgreSQL?', 'An auto-incrementing integer column. Creates a sequence behind the scenes. Equivalent to AUTO_INCREMENT in MySQL.'),
    q('What is GENERATED AS IDENTITY?', 'A SQL standard syntax for auto-incrementing columns. Newer alternative to SERIAL in PostgreSQL.'),
    q('Can a table have multiple FOREIGN KEYs?', 'Yes. Each foreign key references a primary key in another table (or the same table for self-referencing).'),
    q('What happens if you delete a parent row with RESTRICT?', 'The delete is prevented if child rows reference the parent. Use CASCADE or SET NULL to allow deletion.')
  ],
  R(10,40,110,30,'#0070f3','','PRIMARY KEY','Unique ID') +
  R(10,80,110,30,'#28a745','','FOREIGN KEY','Reference') +
  R(10,120,110,30,'#ffc107','','UNIQUE','No duplicates') +
  R(10,160,110,30,'#dc3545','','NOT NULL','Required') +
  R(130,40,110,30,'#e83e8c','','CHECK','Condition') +
  R(130,80,110,30,'#6610f2','','DEFAULT','Fallback value') +
  A(240,55,270,55) + A(240,95,270,95) +
  R(280,40,200,100,'#17a2b8','','Data Integrity','Ensures valid, consistent, and reliable data in the database.') +
  T(240,190,'Constraints: Rules ensuring data integrity at the database level.',9,'#666','middle'),
  [
    e('PRIMARY KEY Examples', 'Single and composite PK.', codeBlock([
      '-- Single column primary key',
      'CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100));',
      '',
      '-- Composite primary key',
      'CREATE TABLE order_items (',
      '  order_id INT,',
      '  product_id INT,',
      '  quantity INT,',
      '  PRIMARY KEY (order_id, product_id)',
      ');'
    ]), 'Single and composite primary key definitions.'),
    e('FOREIGN KEY with CASCADE', 'Referential integrity.', codeBlock([
      'CREATE TABLE orders (',
      '  id SERIAL PRIMARY KEY,',
      '  user_id INT REFERENCES users(id) ON DELETE CASCADE,',
      '  total DECIMAL(10,2)',
      ');'
    ]), 'Foreign key with ON DELETE CASCADE — deleting a user deletes their orders.'),
    e('CHECK and DEFAULT', 'Value constraints.', codeBlock([
      'CREATE TABLE employees (',
      '  id SERIAL PRIMARY KEY,',
      '  name VARCHAR(100) NOT NULL,',
      '  salary DECIMAL(10,2) CHECK (salary > 0),',
      '  status VARCHAR(20) DEFAULT \'active\' CHECK (status IN (\'active\', \'inactive\')),',
      '  joined_at DATE DEFAULT CURRENT_DATE',
      ');'
    ]), 'CHECK validates salary > 0, status in list. DEFAULT sets fallback values.'),
    e('Auto-Increment Comparison', 'SERIAL vs IDENTITY vs AUTO_INCREMENT.', codeBlock([
      '-- PostgreSQL (old style)',
      'CREATE TABLE t (id SERIAL PRIMARY KEY);',
      '',
      '-- PostgreSQL (new standard)',
      'CREATE TABLE t (id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY);',
      '',
      '-- MySQL',
      'CREATE TABLE t (id INT AUTO_INCREMENT PRIMARY KEY);'
    ]), 'Auto-increment syntax across databases.'),
    e('Multiple UNIQUE Constraints', 'Unique on different columns.', codeBlock([
      'CREATE TABLE users (',
      '  id SERIAL PRIMARY KEY,',
      '  email VARCHAR(255) UNIQUE,',
      '  username VARCHAR(50) UNIQUE,',
      '  phone VARCHAR(20) UNIQUE',
      ');'
    ]), 'Multiple UNIQUE constraints enforce uniqueness on email, username, and phone.')
  ],
  [
    m('Which constraint ensures a column has no duplicates?', ['PRIMARY KEY', 'UNIQUE', 'FOREIGN KEY', 'CHECK'], 1, 'UNIQUE ensures no duplicate values. PRIMARY KEY also ensures uniqueness.'),
    m('What does ON DELETE CASCADE do?', ['Prevents deletion', 'Deletes child rows automatically', 'Sets FK to NULL', 'Creates backup'], 1, 'CASCADE deletes child rows when parent is deleted.'),
    m('Which constraint checks a boolean condition?', ['CHECK', 'DEFAULT', 'UNIQUE', 'NOT NULL'], 0, 'CHECK evaluates a boolean condition for each row.'),
    m('What is PostgreSQL equivalent of MySQL AUTO_INCREMENT?', ['SEQUENCE', 'SERIAL', 'INCREMENT', 'AUTO'], 1, 'SERIAL creates an auto-incrementing column in PostgreSQL.'),
    m('How many PRIMARY KEY constraints per table?', ['One', 'Two', 'Unlimited', 'Depends on DB'], 0, 'Only one PRIMARY KEY per table (can be composite).'),
    m('What does RESTRICT do on DELETE?', ['Deletes all', 'Prevents deletion if referenced', 'Sets to NULL', 'Cascades'], 1, 'RESTRICT prevents deletion if foreign key references exist.')
  ]
);

/* =================== TOPIC 5: CRUD Operations =================== */
addTopic('sql-crud', 'CRUD Operations', 'beginner', 20,
  ['CRUD stands for Create (INSERT), Read (SELECT), Update (UPDATE), Delete (DELETE) — the four basic data operations.',
   'INSERT adds new rows: INSERT INTO table (columns) VALUES (values); Can insert multiple rows in one statement.',
   'SELECT retrieves data: SELECT columns FROM table WHERE condition; Supports filtering, sorting, and joining.',
   'UPDATE modifies existing rows: UPDATE table SET column = value WHERE condition; Always use WHERE to avoid updating all rows.'
  ],
  'CRUD operations are the ABCs of database interaction — they let you create new records, read existing ones, update them, and delete them.',
  [
    d('INSERT Statement', 'Insert single row: INSERT INTO t (c1, c2) VALUES (v1, v2). Multi-row: INSERT INTO t (c1) VALUES (v1), (v2), (v3). Insert from query: INSERT INTO t SELECT * FROM other_t. RETURNING clause (PostgreSQL) returns inserted data.'),
    d('SELECT Statement', 'SELECT column1, column2 FROM table WHERE condition ORDER BY column LIMIT n. SELECT * returns all columns (avoid in production). WHERE filters rows. ORDER BY sorts results. LIMIT / OFFSET restricts results.'),
    d('UPDATE Statement', 'UPDATE table SET column1 = value1, column2 = value2 WHERE condition. Without WHERE, all rows are updated! RETURNING clause returns updated rows. Can update from another table using subquery or FROM clause.'),
    d('DELETE Statement', 'DELETE FROM table WHERE condition. Without WHERE, all rows are deleted (use TRUNCATE for performance). DELETE can use RETURNING (PostgreSQL). DELETE FROM using JOIN or USING for multi-table deletes.'),
    d('RETURNING Clause (PostgreSQL)', 'PostgreSQL extension: INSERT ... RETURNING * returns inserted rows. UPDATE ... RETURNING id returns updated row IDs. DELETE ... RETURNING * returns deleted rows. Extremely useful for getting auto-generated values without a separate query.')
  ],
  'CRUD operations are the foundation of database interaction. Mastering INSERT, SELECT, UPDATE, DELETE with all their variations is essential for any SQL developer.',
  [
    q('What does INSERT do?', 'Adds new rows to a table. INSERT INTO table (columns) VALUES (values);'),
    q('How do you select specific columns?', 'SELECT column1, column2 FROM table; Avoid SELECT * in production queries.'),
    q('What happens if UPDATE has no WHERE clause?', 'All rows in the table are updated. Always use WHERE with UPDATE unless that is intentional.'),
    q('How do you delete specific rows?', 'DELETE FROM table WHERE condition; Without WHERE, all rows are deleted.'),
    q('What is the RETURNING clause?', 'A PostgreSQL extension that returns affected rows from INSERT, UPDATE, or DELETE operations.'),
    q('How do you insert multiple rows at once?', 'INSERT INTO t (c1) VALUES (v1), (v2), (v3); — single statement, multiple rows.'),
    q('What columns should you avoid selecting with *?', 'Large text/BLOB columns, sensitive data (passwords), unnecessary columns. SELECT * causes unnecessary data transfer.'),
    q('How do you limit results in SELECT?', 'PostgreSQL/MySQL: LIMIT n. SQL Server: SELECT TOP n. Oracle: FETCH FIRST n ROWS ONLY.'),
    q('What is the difference between DELETE and TRUNCATE?', 'DELETE can have WHERE, triggers row-level triggers, slower, can be rolled back. TRUNCATE removes all rows fast, resets sequences, cannot be filtered.'),
    q('How do you insert data from another table?', 'INSERT INTO target_table SELECT * FROM source_table WHERE condition;')
  ],
  R(10,40,100,30,'#0070f3','','CREATE','INSERT') +
  R(10,80,100,30,'#28a745','','READ','SELECT') +
  R(10,120,100,30,'#ffc107','','UPDATE','UPDATE') +
  R(10,160,100,30,'#dc3545','','DELETE','DELETE') +
  A(110,55,140,55) + A(110,95,140,95) + A(110,135,140,135) + A(110,175,140,175) +
  R(150,40,230,160,'#17a2b8','','CRUD Operations','Create / Read / Update / Delete — The four fundamental data operations.') +
  T(240,225,'CRUD: INSERT, SELECT, UPDATE, DELETE — the four basic data operations.',9,'#666','middle'),
  [
    e('INSERT Examples', 'Various insert techniques.', codeBlock([
      '-- Single row',
      "INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');",
      '',
      '-- Multiple rows',
      "INSERT INTO users (name, email) VALUES ('Bob', 'bob@x.com'), ('Carol', 'carol@x.com');",
      '',
      '-- With RETURNING (PostgreSQL)',
      "INSERT INTO users (name, email) VALUES ('Dave', 'dave@x.com') RETURNING id;"
    ]), 'Single insert, multi-row insert, and RETURNING clause.'),
    e('SELECT Examples', 'Filtering and sorting.', codeBlock([
      'SELECT name, salary, department',
      'FROM employees',
      "WHERE department = 'Engineering'",
      'ORDER BY salary DESC',
      'LIMIT 10;'
    ]), 'Selects top 10 Engineering salaries.'),
    e('UPDATE with WHERE', 'Safe update pattern.', codeBlock([
      "UPDATE employees",
      "SET salary = 85000, last_raised = CURRENT_DATE",
      "WHERE id = 5",
      "RETURNING id, name, salary;"
    ]), 'Updates specific employee, returns updated data.'),
    e('DELETE with Subquery', 'Delete based on related data.', codeBlock([
      "DELETE FROM orders",
      "WHERE user_id IN (",
      "  SELECT id FROM users WHERE last_login < '2024-01-01'",
      ");"
    ]), 'Deletes orders of inactive users using a subquery.'),
    e('Conditional UPDATE (CASE)', 'Different updates per row.', codeBlock([
      "UPDATE employees",
      "SET salary = CASE",
      "  WHEN department = 'Engineering' THEN salary * 1.10",
      "  WHEN department = 'Sales' THEN salary * 1.08",
      "  ELSE salary * 1.05",
      "END;"
    ]), 'Updates salaries with different percentages per department.')
  ],
  [
    m('What does CRUD stand for?', ['Create, Read, Update, Delete', 'Copy, Retrieve, Update, Drop', 'Create, Retrieve, Use, Delete', 'Copy, Read, Update, Drop'], 0, 'CRUD: Create, Read, Update, Delete.'),
    m('Which SQL statement creates new rows?', ['SELECT', 'INSERT', 'UPDATE', 'CREATE'], 1, 'INSERT adds new rows to a table.'),
    m('What happens if UPDATE has no WHERE?', ['Updates nothing', 'Updates all rows', 'Errors', 'Updates one row'], 1, 'Without WHERE, UPDATE modifies all rows.'),
    m('Which clause returns affected rows (PostgreSQL)?', ['RETURNING', 'OUTPUT', 'RESULTS', 'FEEDBACK'], 0, 'RETURNING returns affected rows in PostgreSQL.'),
    m('How do you insert multiple rows in one statement?', ['Multiple VALUES', 'Multiple INSERTs', 'INSERT ALL', 'INSERT MULTIPLE'], 0, 'Use multiple value tuples: VALUES (v1), (v2).'),
    m('Which deletes all rows but keeps structure?', ['DELETE', 'TRUNCATE', 'DROP', 'CLEAR'], 1, 'TRUNCATE removes all rows, keeps table structure.')
  ]
);

/* =================== TOPIC 6: SELECT & Filtering =================== */
addTopic('sql-select-filtering', 'SELECT & Filtering', 'beginner', 25,
  ['SELECT retrieves data from one or more tables. WHERE filters rows based on conditions.',
   'DISTINCT removes duplicate rows from results. ORDER BY sorts results ascending (ASC) or descending (DESC).',
   'Aliases (AS) rename columns or tables in query results for clarity.',
   'LIMIT and OFFSET control row count and pagination. FETCH (SQL standard) and TOP (SQL Server) are alternatives.'
  ],
  'SELECT is like asking a specific question from your filing cabinet. WHERE narrows down which files you look at, ORDER BY arranges them, and LIMIT gives you just the first few.',
  [
    d('SELECT Clause', 'SELECT column1, column2 FROM table — returns only specified columns. SELECT * returns all columns (avoid in production — wastes bandwidth, breaks if schema changes). SELECT expressions: SELECT UPPER(name), salary * 1.1 FROM employees.'),
    d('WHERE Clause', 'Filters rows before grouping/sorting. Operators: =, <>, <, >, <=, >=. Combine with AND, OR, NOT. Use parentheses to group conditions. Performance tip: index columns used in WHERE.'),
    d('DISTINCT', 'SELECT DISTINCT column FROM table — returns unique values, removing duplicates. SELECT DISTINCT col1, col2 — unique combinations. Alternative to GROUP BY for simple deduplication.'),
    d('ORDER BY', 'ORDER BY column1 ASC, column2 DESC — sorts results. ASC (default) for ascending, DESC for descending. Can order by column position (ORDER BY 1, 2) but use column names for clarity. NULLS FIRST / NULLS LAST controls NULL placement.'),
    d('LIMIT / OFFSET / FETCH / TOP', 'LIMIT n — first n rows (PostgreSQL, MySQL). LIMIT n OFFSET m — skip m, take n. FETCH FIRST n ROWS ONLY — SQL standard. FETCH NEXT n ROWS ONLY AFTER m ROWS. TOP n — SQL Server. OFFSET is inefficient for large pagination (use keyset pagination).')
  ],
  'SELECT with WHERE, ORDER BY, DISTINCT, and LIMIT is the most common SQL query pattern. Mastering filtering and sorting is essential before moving to joins and aggregations.',
  [
    q('What does SELECT do?', 'Retrieves data from database tables. Specifies which columns to return.'),
    q('How do you filter rows in SQL?', 'Use WHERE clause with conditions: WHERE column = value, WHERE column > value, WHERE column IN (list).'),
    q('What does DISTINCT do?', 'Removes duplicate rows from the result set. Returns only unique values.'),
    q('How do you sort results?', 'ORDER BY column ASC (ascending) or DESC (descending). Can sort by multiple columns.'),
    q('What is the difference between LIMIT and OFFSET?', 'LIMIT restricts the number of rows. OFFSET skips a number of rows before returning. Used together for pagination.'),
    q('What is a column alias?', 'Renaming a column in query output using AS: SELECT name AS employee_name FROM employees;'),
    q('What does NULLS LAST do?', 'In ORDER BY, places NULL values after non-NULL values. NULLS FIRST places them first.'),
    q('What is the difference between WHERE and HAVING?', 'WHERE filters rows before grouping. HAVING filters groups after aggregation.'),
    q('How do you select unique combinations of two columns?', 'SELECT DISTINCT col1, col2 FROM table; Returns unique pairs.'),
    q('What is keyset pagination?', 'Pagination using WHERE id > last_seen_id ORDER BY id LIMIT n — more efficient than OFFSET for large datasets.')
  ],
  R(10,40,130,30,'#0070f3','','SELECT','col1, col2') +
  A(140,55,170,55) +
  R(180,35,130,30,'#28a745','','FROM','table_name') +
  A(310,50,340,50) +
  R(350,35,130,30,'#ffc107','','WHERE','condition') +
  R(180,75,130,30,'#e83e8c','','ORDER BY','sort column') +
  R(180,115,130,30,'#6610f2','','LIMIT n','restrict rows') +
  T(240,185,'SELECT: Retrieve, filter, sort, and limit data from tables.',9,'#666','middle'),
  [
    e('Basic SELECT', 'Simple query examples.', codeBlock([
      'SELECT first_name, last_name, salary',
      'FROM employees;'
    ]), 'Selects specific columns from employees table.'),
    e('WHERE with Multiple Conditions', 'Complex filtering.', codeBlock([
      'SELECT name, salary, department',
      'FROM employees',
      "WHERE department = 'Engineering'",
      '  AND salary > 60000',
      '  OR (department = \'Sales\' AND salary > 50000);'
    ]), 'Combines AND/OR for complex filtering conditions.'),
    e('DISTINCT and ORDER BY', 'Unique values sorted.', codeBlock([
      'SELECT DISTINCT department',
      'FROM employees',
      'ORDER BY department ASC;'
    ]), 'Returns unique departments in alphabetical order.'),
    e('LIMIT with OFFSET for Pagination', 'Page-based pagination.', codeBlock([
      'SELECT name, salary',
      'FROM employees',
      'ORDER BY salary DESC',
      'LIMIT 10 OFFSET 20; -- Page 3 (rows 21-30)'
    ]), 'Returns page 3 of employees sorted by salary (10 per page).'),
    e('Aliases', 'Renaming columns and tables.', codeBlock([
      'SELECT',
      '  name AS employee_name,',
      '  salary * 12 AS annual_salary',
      'FROM employees AS e',
      "WHERE e.department = 'Engineering';"
    ]), 'Renames columns and uses table alias e.')
  ],
  [
    m('Which clause filters rows?', ['SELECT', 'WHERE', 'ORDER BY', 'LIMIT'], 1, 'WHERE filters rows based on conditions.'),
    m('What does DISTINCT remove?', ['Columns', 'Duplicate rows', 'NULL values', 'Indexes'], 1, 'DISTINCT removes duplicate rows from results.'),
    m('Which clause sorts results?', ['GROUP BY', 'ORDER BY', 'SORT BY', 'HAVING'], 1, 'ORDER BY sorts query results.'),
    m('What does LIMIT 10 OFFSET 20 do?', ['First 10 rows', 'Skip 20, take 10', 'Last 10 rows', 'Skip 10, take 20'], 1, 'Skips 20 rows then returns 10.'),
    m('How do you rename a column in output?', ['AS clause', 'RENAME keyword', 'ALIAS keyword', 'NAME keyword'], 0, 'Use column_name AS alias_name.'),
    m('What is the default sort direction?', ['ASC', 'DESC', 'No default', 'Depends on column'], 0, 'Default ORDER BY direction is ASC (ascending).')
  ]
);

/* =================== TOPIC 7: WHERE Operators =================== */
addTopic('sql-where-operators', 'WHERE Operators', 'beginner', 20,
  ['WHERE operators allow precise filtering: comparison, pattern matching, range checks, and NULL handling.',
   'LIKE performs pattern matching with % (any sequence) and _ (single character) wildcards.',
   'BETWEEN checks if a value is within a range (inclusive). IN checks membership in a list.',
   'IS NULL and IS NOT NULL check for NULL values. NULL cannot be compared with = or !=.'
  ],
  'WHERE operators are like different lenses for filtering: LIKE is a fuzzy search, BETWEEN is a range check, IN is a checklist, IS NULL checks for empty spots.',
  [
    d('Comparison Operators', '= (equal), <> or != (not equal), <, >, <=, >=. String comparisons are case-sensitive in PostgreSQL, case-insensitive in MySQL by default. Use ILIKE (PostgreSQL) or LOWER() for case-insensitive comparison.'),
    d('LIKE and ILIKE', 'LIKE \'pattern\': % matches any sequence of characters, _ matches a single character. Examples: LIKE \'A%\' (starts with A), LIKE \'%son\' (ends with son), LIKE \'%middle%\' (contains). ILIKE (PostgreSQL) is case-insensitive. SIMILAR TO provides regex-like patterns.'),
    d('BETWEEN', 'column BETWEEN x AND y — inclusive of both endpoints. Equivalent to column >= x AND column <= y. Works with numbers, dates, and strings. NOT BETWEEN excludes the range.'),
    d('IN and NOT IN', 'column IN (value1, value2, value3) — matches any value in the list. More readable than multiple OR conditions. NOT IN excludes values. Be careful: NOT IN with subquery returning NULLs causes no rows (NULL propagation).'),
    d('IS NULL and IS NOT NULL', 'IS NULL checks for NULL. IS NOT NULL checks for non-NULL. NULL = NULL is false (NULL is not equal to anything). NULL != NULL is also false. Use IS DISTINCT FROM (PostgreSQL) for NULL-safe comparison.')
  ],
  'WHERE operators give you precise control over which rows are returned. Understanding NULL behavior is particularly important — it is the most common source of bugs in SQL queries.',
  [
    q('How do you match patterns in SQL?', 'Use LIKE with % (any sequence) and _ (single character). LIKE \'A%\' matches strings starting with A.'),
    q('What is the difference between LIKE and ILIKE?', 'LIKE is case-sensitive. ILIKE (PostgreSQL) is case-insensitive.'),
    q('What does BETWEEN do?', 'Checks if a value is within an inclusive range: WHERE age BETWEEN 18 AND 65.'),
    q('What does IN do?', 'Checks if a value matches any value in a list: WHERE status IN (\'active\', \'pending\').'),
    q('Why does NULL = NULL return false?', 'NULL represents unknown. No value equals another unknown value. Use IS NULL to check.'),
    q('How do you check for NULL?', 'IS NULL or IS NOT NULL. Never use = NULL or != NULL.'),
    q('What is the problem with NOT IN and NULL subqueries?', 'If the subquery returns any NULL, NOT IN returns no rows. Use NOT EXISTS instead.'),
    q('What does _ match in LIKE?', 'A single character. LIKE \'A_\' matches \'AB\', \'AC\' but not \'ABC\'.'),
    q('What is IS DISTINCT FROM?', 'A PostgreSQL operator that treats NULL as a comparable value. NULL IS DISTINCT FROM NULL is false.'),
    q('How do you do a case-insensitive comparison?', 'Use ILIKE (PostgreSQL), LOWER(column) LIKE LOWER(\'value\'), or use a case-insensitive collation.')
  ],
  R(10,40,110,30,'#0070f3','','LIKE','Pattern match') +
  R(10,80,110,30,'#28a745','','BETWEEN','Range check') +
  R(10,120,110,30,'#ffc107','','IN','List match') +
  R(10,160,110,30,'#dc3545','','IS NULL','Null check') +
  R(130,40,110,30,'#e83e8c','','AND/OR','Combine') +
  R(130,80,110,30,'#6610f2','','NOT','Negate') +
  A(240,55,270,55) + A(240,95,270,95) +
  R(280,40,200,100,'#17a2b8','','WHERE Operators','Comparison, pattern matching, range, list, and NULL checking.') +
  T(240,190,'WHERE Operators: LIKE, BETWEEN, IN, IS NULL for precise filtering.',9,'#666','middle'),
  [
    e('LIKE Pattern Matching', 'Various patterns.', codeBlock([
      "SELECT name FROM employees WHERE name LIKE 'A%'; -- Starts with A",
      "SELECT name FROM employees WHERE name LIKE '%son'; -- Ends with son",
      "SELECT name FROM employees WHERE name LIKE '%mith%'; -- Contains mith",
      "SELECT name FROM employees WHERE name LIKE 'A_'; -- A followed by any char"
    ]), 'LIKE patterns for different matching scenarios.'),
    e('BETWEEN Dates', 'Date range filtering.', codeBlock([
      "SELECT * FROM orders",
      "WHERE order_date BETWEEN '2024-01-01' AND '2024-12-31';"
    ]), 'Filters orders within the year 2024 (inclusive).'),
    e('IN Operator', 'List membership.', codeBlock([
      "SELECT name, department FROM employees",
      "WHERE department IN ('Engineering', 'Sales', 'Marketing')",
      "ORDER BY department;"
    ]), 'Returns employees in specified departments.'),
    e('NULL Checking', 'Handle NULL values.', codeBlock([
      'SELECT name, email FROM users',
      'WHERE email IS NOT NULL; -- Users with email',
      '',
      'SELECT name, phone FROM users',
      'WHERE phone IS NULL; -- Users without phone'
    ]), 'Filters for NULL and NOT NULL values.'),
    e('Combined WHERE', 'Complex conditions.', codeBlock([
      'SELECT name, salary, department',
      'FROM employees',
      "WHERE (department = 'Engineering' OR department = 'Sales')",
      '  AND salary BETWEEN 50000 AND 100000',
      '  AND name IS NOT NULL',
      'ORDER BY salary DESC;'
    ]), 'Combines multiple operators with parentheses for grouping.')
  ],
  [
    m('What does % match in LIKE?', ['One character', 'Any sequence of characters', 'A digit', 'A space'], 1, '% matches any sequence of characters in LIKE patterns.'),
    m('Is BETWEEN inclusive?', ['Yes', 'No', 'Depends on DB', 'Only for numbers'], 0, 'BETWEEN includes both endpoints.'),
    m('How do you check for NULL?', ['= NULL', 'IS NULL', '== NULL', 'EQUALS NULL'], 1, 'Use IS NULL to check for NULL values.'),
    m('What is the problem with NOT IN and NULL subquery?', ['Slow performance', 'Returns no rows if NULL in subquery', 'Errors', 'Returns all rows'], 1, 'NOT IN with NULL subquery returns no rows.'),
    m('What does _ match in LIKE?', ['Zero chars', 'One char', 'Multiple chars', 'A digit'], 1, '_ matches exactly one character.'),
    m('Which PostgreSQL operator is NULL-safe?', ['IS DISTINCT FROM', '<=>', '===', 'IS NOT'], 0, 'IS DISTINCT FROM treats NULL as a comparable value.')
  ]
);

/* =================== TOPIC 8: Aggregate Functions =================== */
addTopic('sql-aggregate-functions', 'Aggregate Functions', 'intermediate', 20,
  ['Aggregate functions perform calculations on a set of rows and return a single result.',
   'COUNT(): counts rows. COUNT(*) counts all rows. COUNT(column) counts non-NULL values. COUNT(DISTINCT column) counts unique values.',
   'SUM(), AVG(), MIN(), MAX(): sum, average, minimum, and maximum of numeric values.',
   'Aggregates ignore NULL values (except COUNT(*)). Use COALESCE or IFNULL to handle NULLs in results.'
  ],
  'Aggregate functions are like getting summary statistics. COUNT is like counting items, SUM is the total, AVG is the average, MIN is the smallest, MAX is the largest.',
  [
    d('COUNT() Variations', 'COUNT(*) — total number of rows including NULLs. COUNT(column) — number of non-NULL values in column. COUNT(DISTINCT column) — number of unique non-NULL values. COUNT(*) is typically the fastest.'),
    d('SUM()', 'SUM(column) — adds all non-NULL values in a numeric column. Returns NULL if no rows match (use COALESCE to default to 0). SUM(DISTINCT column) sums unique values.'),
    d('AVG()', 'AVG(column) — average of non-NULL values. Sum divided by count of non-NULL values. NULLs are not counted in the denominator. For integer columns, result may be truncated — cast to DECIMAL.'),
    d('MIN() and MAX()', 'MIN(column) — smallest value (numeric, date, or string). MAX(column) — largest value. For strings, uses alphabetical ordering. For dates, chronological order.'),
    d('Handling NULLs in Aggregates', 'Aggregate functions except COUNT(*) ignore NULLs. Use COALESCE: SUM(COALESCE(column, 0)). AVG of all NULLs returns NULL. Use WHERE column IS NOT NULL if you need explicit filtering.')
  ],
  'Aggregate functions are essential for data analysis. Understanding how they handle NULLs and using DISTINCT variants correctly is key to accurate results.',
  [
    q('What does COUNT(*) return?', 'Total number of rows in the table or group, including rows with NULL values.'),
    q('What is the difference between COUNT(*) and COUNT(column)?', 'COUNT(*) counts all rows. COUNT(column) counts only non-NULL values in that column.'),
    q('What does AVG() return?', 'The average (mean) of non-NULL numeric values. Sum divided by count.'),
    q('Do aggregate functions include NULLs?', 'Most aggregate functions ignore NULLs. COUNT(*) is the exception — it includes all rows.'),
    q('How do you count unique values?', 'COUNT(DISTINCT column) — counts unique non-NULL values.'),
    q('What does SUM(column) return if no rows?', 'NULL. Use COALESCE(SUM(column), 0) to default to 0.'),
    q('What does MIN() return for string columns?', 'The first value in alphabetical order (lexicographic minimum).'),
    q('Can you use aggregates without GROUP BY?', 'Yes. Without GROUP BY, the aggregate applies to all rows and returns a single row.'),
    q('How does AVG handle integer division?', 'AVG of integers returns an integer in some databases. Cast to DECIMAL: AVG(column::DECIMAL).'),
    q('What does MAX() return for dates?', 'The most recent date (chronologically latest).')
  ],
  R(10,40,100,30,'#0070f3','','COUNT','Count rows') +
  R(10,80,100,30,'#28a745','','SUM','Total values') +
  R(10,120,100,30,'#ffc107','','AVG','Average') +
  R(10,160,100,30,'#dc3545','','MIN/MAX','Extremes') +
  A(110,55,140,55) + A(110,95,140,95) + A(110,135,140,135) + A(110,175,140,175) +
  R(150,40,230,160,'#17a2b8','','Aggregate Functions','Summarize data: count, sum, average, min, max — with NULL handling.') +
  T(240,225,'Aggregate Functions: COUNT, SUM, AVG, MIN, MAX for data summarization.',9,'#666','middle'),
  [
    e('COUNT Examples', 'Different counting methods.', codeBlock([
      'SELECT',
      '  COUNT(*) AS total_rows,',
      '  COUNT(email) AS emails_provided,',
      '  COUNT(DISTINCT department) AS unique_depts',
      'FROM employees;'
    ]), 'Counts total rows, non-NULL emails, and unique departments.'),
    e('SUM and AVG', 'Salary statistics.', codeBlock([
      'SELECT',
      '  SUM(salary) AS total_payroll,',
      '  AVG(salary) AS avg_salary,',
      '  MIN(salary) AS lowest_salary,',
      '  MAX(salary) AS highest_salary',
      'FROM employees;'
    ]), 'Computes payroll totals and salary statistics.'),
    e('Aggregate with WHERE', 'Filtered aggregations.', codeBlock([
      'SELECT',
      '  COUNT(*) AS eng_count,',
      '  AVG(salary) AS avg_eng_salary',
      'FROM employees',
      "WHERE department = 'Engineering';"
    ]), 'Aggregates only Engineering employees.'),
    e('Handling NULLs with COALESCE', 'Avoid NULL results.', codeBlock([
      'SELECT',
      '  COALESCE(AVG(bonus), 0) AS avg_bonus,',
      '  COALESCE(SUM(bonus), 0) AS total_bonus',
      'FROM employees;'
    ]), 'Returns 0 instead of NULL when no bonuses exist.'),
    e('COUNT and GROUP BY Preview', 'Counts per group.', codeBlock([
      'SELECT department, COUNT(*) AS employee_count',
      'FROM employees',
      'GROUP BY department',
      'ORDER BY employee_count DESC;'
    ]), 'Counts employees per department, sorted by count.')
  ],
  [
    m('Which function counts non-NULL values only?', ['COUNT(*)', 'COUNT(column)', 'COUNT_ALL', 'COUNT DISTINCT'], 1, 'COUNT(column) counts only non-NULL values.'),
    m('What does AVG() return for all-NULL input?', ['0', 'NULL', '-1', 'Error'], 1, 'AVG of all NULL values returns NULL.'),
    m('How do you sum unique values?', ['SUM(column)', 'SUM(DISTINCT column)', 'UNIQUE SUM', 'SUM UNIQUE'], 1, 'SUM(DISTINCT column) sums unique values.'),
    m('What does MAX() return for dates?', ['Oldest date', 'Most recent date', 'NULL', 'Current date'], 1, 'MAX() returns the most recent date.'),
    m('Can you use aggregates without GROUP BY?', ['Yes', 'No', 'Only COUNT', 'Only with DISTINCT'], 0, 'Aggregates can be used without GROUP BY for overall results.'),
    m('Which aggregate ignores NULLs?', ['COUNT(*)', 'SUM', 'COUNT(column)', 'Both SUM and COUNT(column)'], 3, 'Aggregate functions (except COUNT(*)) ignore NULLs.')
  ]
);

/* =================== TOPIC 9: GROUP BY & HAVING =================== */
addTopic('sql-group-by', 'GROUP BY & HAVING', 'intermediate', 25,
  ['GROUP BY groups rows that have the same values in specified columns, enabling aggregate calculations per group.',
   'HAVING filters groups after aggregation, similar to how WHERE filters rows before aggregation.',
   'GROUP BY columns must appear in SELECT (unless aggregated). SELECT can only have GROUP BY columns and aggregate functions.',
   'GROUP BY works with COUNT, SUM, AVG, MIN, MAX to compute per-group statistics.'
  ],
  'GROUP BY is like sorting items into buckets by category. Once sorted, you can count items in each bucket, find the average weight, or calculate the total value per bucket.',
  [
    d('GROUP BY Basics', 'SELECT department, COUNT(*) FROM employees GROUP BY department. Groups employees by department and counts per group. GROUP BY collapses groups — one row per unique combination of grouping columns.'),
    d('GROUP BY Rules', 'SELECT can only include: columns in GROUP BY clause, aggregate functions, or expressions based on those. PostgreSQL is stricter than MySQL about this rule (MySQL allows non-aggregated columns not in GROUP BY — can lead to unexpected results).'),
    d('HAVING vs WHERE', 'WHERE filters individual rows before grouping. HAVING filters groups after aggregation. WHERE cannot use aggregate functions. HAVING can. Order: WHERE → GROUP BY → HAVING → ORDER BY.'),
    d('Multiple Columns in GROUP BY', 'GROUP BY col1, col2 — groups on unique combinations. Example: GROUP BY department, status groups by department and status together, creating subgroups.'),
    d('GROUP BY with Expressions', 'Group by computed values: GROUP BY EXTRACT(YEAR FROM order_date), GROUP BY UPPER(city). Can alias the expression in SELECT and use in GROUP BY (PostgreSQL: GROUP BY alias, MySQL: use expression).')
  ],
  'GROUP BY with HAVING is the standard pattern for grouped aggregations. Understanding the difference between WHERE and HAVING filtering is crucial.',
  [
    q('What does GROUP BY do?', 'Groups rows with same values in specified columns, enabling per-group aggregate calculations.'),
    q('What is the difference between WHERE and HAVING?', 'WHERE filters rows before grouping. HAVING filters groups after aggregation. WHERE cannot use aggregate functions.'),
    q('What columns can appear in SELECT with GROUP BY?', 'Only GROUP BY columns, aggregate functions, or expressions based on those columns.'),
    q('Can you GROUP BY multiple columns?', 'Yes. GROUP BY col1, col2 groups on unique combinations of both columns.'),
    q('What happens if you omit GROUP BY but use an aggregate?', 'The aggregate applies to all rows, returning a single row.'),
    q('Can you use aliases in GROUP BY?', 'PostgreSQL supports GROUP BY alias. MySQL requires the full expression.'),
    q('How do you filter before grouping?', 'Use WHERE before GROUP BY. WHERE processes individual rows, not groups.'),
    q('How do you filter after grouping?', 'Use HAVING after GROUP BY. HAVING checks conditions on aggregate results.'),
    q('What is the execution order of clauses?', 'FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.'),
    q('Can HAVING use non-aggregated columns?', 'Yes, if they appear in GROUP BY. HAVING department = \'Engineering\' is valid if GROUP BY department.')
  ],
  R(10,40,140,30,'#0070f3','','Raw Data','All rows') +
  A(150,55,180,55) +
  R(190,35,140,30,'#28a745','','WHERE','Filter rows') +
  A(190,65,190,80) +
  R(190,85,140,30,'#ffc107','','GROUP BY','Group rows') +
  A(330,70,360,70) + A(190,115,190,130) +
  R(190,135,140,30,'#e83e8c','','HAVING','Filter groups') +
  A(330,150,360,150) +
  R(370,35,110,150,'#6610f2','','Result','One row per group with aggregate values.') +
  T(240,210,'GROUP BY & HAVING: Group rows, apply aggregates, filter groups.',9,'#666','middle'),
  [
    e('GROUP BY with COUNT', 'Employees per department.', codeBlock([
      'SELECT department, COUNT(*) AS employee_count',
      'FROM employees',
      'GROUP BY department',
      'ORDER BY employee_count DESC;'
    ]), 'Counts employees per department, sorted by count descending.'),
    e('GROUP BY with Multiple Aggregates', 'Salary stats per dept.', codeBlock([
      'SELECT',
      '  department,',
      '  COUNT(*) AS count,',
      '  ROUND(AVG(salary), 2) AS avg_salary,',
      '  MAX(salary) AS max_salary',
      'FROM employees',
      'GROUP BY department;'
    ]), 'Multiple aggregates per department.'),
    e('HAVING to Filter Groups', 'Departments with high avg salary.', codeBlock([
      'SELECT department, AVG(salary) AS avg_salary',
      'FROM employees',
      'GROUP BY department',
      'HAVING AVG(salary) > 70000;'
    ]), 'Filters groups where average salary exceeds 70000.'),
    e('WHERE + GROUP BY + HAVING', 'Complete pipeline.', codeBlock([
      'SELECT department, AVG(salary) AS avg_salary',
      'FROM employees',
      "WHERE hire_date > '2020-01-01'",
      'GROUP BY department',
      'HAVING AVG(salary) > 50000',
      'ORDER BY avg_salary DESC;'
    ]), 'Filters recent hires, groups, filters groups, orders.'),
    e('GROUP BY Multiple Columns', 'Subtotals per combination.', codeBlock([
      'SELECT department, status, COUNT(*) AS count',
      'FROM employees',
      'GROUP BY department, status',
      'ORDER BY department, status;'
    ]), 'Groups by department and status together — unique combinations.')
  ],
  [
    m('What does GROUP BY do?', ['Filters rows', 'Groups rows for aggregation', 'Orders results', 'Limits rows'], 1, 'GROUP BY groups rows for per-group aggregation.'),
    m('Which filters groups after aggregation?', ['WHERE', 'HAVING', 'FILTER', 'GROUP FILTER'], 1, 'HAVING filters groups after aggregation.'),
    m('Can HAVING use aggregate functions?', ['Yes', 'No', 'Only COUNT', 'Only SUM'], 0, 'HAVING can use aggregate functions like AVG, COUNT, SUM.'),
    m('What columns are allowed in SELECT with GROUP BY?', ['Any column', 'GROUP BY columns + aggregates', 'Only aggregates', 'Only GROUP BY columns'], 1, 'Only GROUP BY columns and aggregate functions.'),
    m('What comes after GROUP BY in execution order?', ['WHERE', 'HAVING', 'ORDER BY', 'FROM'], 1, 'Execution order: WHERE → GROUP BY → HAVING → ORDER BY.'),
    m('What does GROUP BY col1, col2 do?', ['Groups on col1 only', 'Groups on unique pairs', 'Two separate groups', 'Errors'], 1, 'Groups rows on unique combinations of col1 and col2.')
  ]
);

/* =================== TOPIC 10: GROUPING SETS, ROLLUP, CUBE =================== */
addTopic('sql-grouping-sets', 'GROUPING SETS, ROLLUP & CUBE', 'advanced', 20,
  ['GROUPING SETS allow multiple GROUP BY queries in a single statement, returning combined results.',
   'ROLLUP generates hierarchical subtotals from the most detailed to the grand total level.',
   'CUBE generates subtotals for all possible combinations of grouping columns.',
   'These are advanced reporting features, fully supported in PostgreSQL and SQL Server, partially in MySQL.'
  ],
  'ROLLUP is like getting subtotals in a spreadsheet — department totals, then company total. CUBE is like every possible subtotal combination — by department, by status, by both, and grand total.',
  [
    d('GROUPING SETS', 'GROUP BY GROUPING SETS ((col1), (col2), ()) — runs three groupings: by col1, by col2, and grand total. More efficient than UNION ALL of separate GROUP BY queries. Each grouping set can have multiple columns.'),
    d('ROLLUP', 'GROUP BY ROLLUP (col1, col2) — generates subtotals at each level: (col1, col2), (col1), (). Hierarchy: col1 → col1+col2 → grand total. Useful for hierarchical data: year → month → day reports.'),
    d('CUBE', 'GROUP BY CUBE (col1, col2) — generates all possible subtotal combinations: (col1, col2), (col1), (col2), (). N columns = 2^N grouping sets. Can be expensive for many columns.'),
    d('GROUPING() Function', 'GROUPING(column) returns 1 if the row is a subtotal for that column (NULL means aggregated), 0 for detail rows. Essential for distinguishing NULL in data from NULL representing subtotals.'),
    d('Use Cases', 'Financial reports needing multiple aggregation levels. Sales dashboards: by region, by product, by both, total. Inventory summaries. Any report requiring drill-down with totals.')
  ],
  'ROLLUP, CUBE, and GROUPING SETS are powerful reporting features that produce multiple levels of aggregation in a single query, avoiding multiple UNION queries.',
  [
    q('What is GROUPING SETS?', 'A GROUP BY variant that specifies multiple groupings in one query. More efficient than UNION of separate GROUP BY queries.'),
    q('What does ROLLUP do?', 'Generates hierarchical subtotals. GROUP BY ROLLUP (a, b) produces totals at (a,b), (a), and () levels.'),
    q('What does CUBE do?', 'Generates subtotals for all combinations. GROUP BY CUBE (a, b) produces (a,b), (a), (b), and ().'),
    q('What is the GROUPING() function?', 'Returns 1 if a row is a subtotal for that column. Helps distinguish true NULLs from subtotal NULLs.'),
    q('How is ROLLUP different from CUBE?', 'ROLLUP generates only hierarchical subtotals (top-down). CUBE generates all possible combinations.'),
    q('How many groupings does CUBE of N columns produce?', '2^N grouping sets. CUBE (a, b, c) produces 8 groupings.'),
    q('Can you use WHERE with ROLLUP?', 'Yes. WHERE filters rows before the rollup aggregation.'),
    q('What databases support GROUPING SETS?', 'PostgreSQL, SQL Server, Oracle fully support. MySQL has partial support for ROLLUP but not CUBE or GROUPING SETS.'),
    q('How is ROLLUP used in reporting?', 'Sales reports by year → quarter → month. Employee counts by department → location → total.'),
    q('What is the alternative without GROUPING SETS?', 'Multiple GROUP BY queries combined with UNION ALL. Less efficient and more verbose.')
  ],
  R(10,40,130,30,'#0070f3','','GROUP BY','Basic grouping') +
  A(140,55,170,55) +
  R(180,35,130,35,'#28a745','','GROUPING SETS','Specific groupings') +
  A(310,53,340,53) +
  R(350,35,130,35,'#ffc107','','ROLLUP','Hierarchical totals') +
  R(180,80,130,30,'#e83e8c','','CUBE','All combinations') +
  R(350,80,130,30,'#6610f2','','GROUPING()','Identify subtotals') +
  T(240,155,'GROUPING SETS / ROLLUP / CUBE: Multiple aggregation levels in one query.',9,'#666','middle'),
  [
    e('ROLLUP Example', 'Department subtotals + grand total.', codeBlock([
      'SELECT department, status, COUNT(*) AS count',
      'FROM employees',
      'GROUP BY ROLLUP (department, status)',
      'ORDER BY department, status;'
    ]), 'Counts employees by dept+status, dept subtotal, and grand total.'),
    e('CUBE Example', 'All combination totals.', codeBlock([
      'SELECT department, status, COUNT(*) AS count',
      'FROM employees',
      'GROUP BY CUBE (department, status);'
    ]), 'Counts for all combinations: (dept,status), (dept), (status), and total.'),
    e('GROUPING SETS', 'Specific groupings only.', codeBlock([
      'SELECT department, status, COUNT(*) AS count',
      'FROM employees',
      'GROUP BY GROUPING SETS ((department), (status), ());'
    ]), 'Three groupings: by dept, by status, and grand total only.'),
    e('GROUPING() Function', 'Identify subtotal rows.', codeBlock([
      'SELECT',
      '  department,',
      '  status,',
      '  COUNT(*) AS count,',
      '  GROUPING(department) AS is_dept_total,',
      '  GROUPING(status) AS is_status_total',
      'FROM employees',
      'GROUP BY ROLLUP (department, status);'
    ]), 'GROUPING() returns 1 when the column is part of a subtotal row.'),
    e('ROLLUP with ORDER BY', 'Controlling sort order.', codeBlock([
      'SELECT',
      '  EXTRACT(YEAR FROM order_date) AS year,',
      '  EXTRACT(MONTH FROM order_date) AS month,',
      '  SUM(amount) AS total_sales',
      'FROM orders',
      'GROUP BY ROLLUP (year, month)',
      'ORDER BY year, month NULLS LAST;'
    ]), 'Monthly and yearly sales with grand total.')
  ],
  [
    m('What does ROLLUP generate?', ['All combinations', 'Hierarchical subtotals', 'Specific groupings', 'No subtotals'], 1, 'ROLLUP creates hierarchical subtotals.'),
    m('How many groupings for CUBE (a,b,c)?', ['3', '6', '8', '9'], 2, 'CUBE with 3 columns = 2^3 = 8 groupings.'),
    m('What does GROUPING() function do?', ['Counts rows', 'Identifies subtotal rows', 'Groups data', 'Orders results'], 1, 'GROUPING() identifies subtotal rows (returns 1).'),
    m('Which is more efficient than multiple UNION GROUP BY?', ['ROLLUP', 'GROUPING SETS', 'CUBE', 'All of the above'], 3, 'All are more efficient than multiple UNION queries.'),
    m('Does MySQL fully support CUBE?', ['Yes', 'No', 'Partial', 'Depends on version'], 1, 'MySQL does not support CUBE or GROUPING SETS.'),
    m('What is the hierarchy for ROLLUP (a,b)?', ['(a) then (a,b)', '(a,b) then (a) then ()', '(a), (b), ()', '(a,b) only'], 1, 'ROLLUP produces (a,b), then (a), then grand total ().')
  ]
);

/* =================== TOPIC 11: Joins =================== */
addTopic('sql-joins', 'Joins (INNER, LEFT, RIGHT, FULL, CROSS)', 'intermediate', 30,
  ['Joins combine rows from two or more tables based on a related column between them.',
   'INNER JOIN returns only matching rows from both tables. LEFT JOIN returns all rows from left table plus matched rows from right.',
   'RIGHT JOIN is the opposite of LEFT JOIN. FULL JOIN returns all rows from both tables. CROSS JOIN returns cartesian product.',
   'Joins use ON clause to specify the join condition. Natural JOIN matches columns with same name automatically.'
  ],
  'A JOIN is like inviting people from two different groups to a party. INNER JOIN only invites people confirmed from both groups. LEFT JOIN invites everyone from group A and anyone from group B who responds. FULL JOIN invites everyone from both groups.',
  [
    d('INNER JOIN', 'SELECT * FROM t1 INNER JOIN t2 ON t1.id = t2.fk_id. Returns rows only when the join condition matches in both tables. Most common join type. Can join multiple tables: t1 JOIN t2 ON ... JOIN t3 ON ...'),
    d('LEFT JOIN (LEFT OUTER JOIN)', 'SELECT * FROM t1 LEFT JOIN t2 ON t1.id = t2.fk_id. Returns all rows from t1. If match found in t2, columns populated; if not, t2 columns are NULL. Use WHERE t2.id IS NULL to find rows with no match.'),
    d('RIGHT JOIN', 'SELECT * FROM t1 RIGHT JOIN t2 ON t1.id = t2.fk_id. Returns all rows from t2 regardless of match in t1. Mirror of LEFT JOIN. Can always be rewritten as LEFT JOIN by swapping table order.'),
    d('FULL JOIN (FULL OUTER JOIN)', 'SELECT * FROM t1 FULL JOIN t2 ON t1.id = t2.fk_id. Returns all rows from both tables. Matching rows combined, non-matching rows get NULL on the other side. Not supported in MySQL (use UNION of LEFT and RIGHT joins).'),
    d('CROSS JOIN and Self-Join', 'CROSS JOIN produces cartesian product — every row of t1 matched with every row of t2. No ON clause needed. Self-join joins a table to itself using aliases: SELECT * FROM employees e1 JOIN employees e2 ON e1.manager_id = e2.id.')
  ],
  'Joins are fundamental SQL operations for combining data across related tables. Understanding the differences between join types and when to use each is essential for any data retrieval task.',
  [
    q('What is a JOIN?', 'Combines rows from two or more tables based on a related column. The ON clause specifies the matching condition.'),
    q('What is the difference between INNER and LEFT JOIN?', 'INNER JOIN returns only matching rows. LEFT JOIN returns all rows from left table, with NULLs for non-matching right table columns.'),
    q('When would you use RIGHT JOIN?', 'When you want all rows from the right table regardless of match. Usually LEFT JOIN is preferred by swapping table order.'),
    q('What does FULL JOIN return?', 'All rows from both tables. Rows without matches have NULL on the opposite side.'),
    q('What is a CROSS JOIN?', 'Returns the cartesian product — every combination of rows from both tables. No ON clause.'),
    q('What is a self-join?', 'Joining a table to itself using different aliases. Used for hierarchical data like employee-manager relationships.'),
    q('Can you join more than 2 tables?', 'Yes. Chain joins: t1 JOIN t2 ON ... JOIN t3 ON ... Each additional join narrows or expands the result set.'),
    q('What does USING do in a join?', 'Shortcut when join columns have the same name: t1 JOIN t2 USING (id). Equivalent to ON t1.id = t2.id.'),
    q('What is a NATURAL JOIN?', 'Automatically joins on columns with the same name. Dangerous because schema changes can break it. Avoid in production.'),
    q('Can WHERE filter after JOIN?', 'Yes. WHERE filters the joined result. The order of filtering matters: WHERE before JOIN filters individual tables, WHERE after JOIN filters the combined result.')
  ],
  R(10,35,100,25,'#0070f3','','INNER','Match only') +
  R(10,65,100,25,'#28a745','','LEFT','All left') +
  R(10,95,100,25,'#ffc107','','RIGHT','All right') +
  R(10,125,100,25,'#dc3545','','FULL','All both') +
  R(10,155,100,25,'#e83e8c','','CROSS','Cartesian') +
  A(110,48,140,48) + A(110,78,140,78) + A(110,108,140,108) + A(110,138,140,138) + A(110,168,140,168) +
  R(150,35,230,155,'#17a2b8','','JOIN Types','INNER and LEFT are most common. FULL and CROSS for specific use cases.') +
  T(240,220,'Joins: Combine related data from multiple tables using join conditions.',9,'#666','middle'),
  [
    e('INNER JOIN Example', 'Employees with their departments.', codeBlock([
      'SELECT e.name, e.salary, d.department_name',
      'FROM employees e',
      'INNER JOIN departments d ON e.dept_id = d.id',
      'ORDER BY e.name;'
    ]), 'Returns only employees that belong to a department.'),
    e('LEFT JOIN Finding Missing Records', 'Employees without departments.', codeBlock([
      'SELECT e.name, e.salary, d.department_name',
      'FROM employees e',
      'LEFT JOIN departments d ON e.dept_id = d.id',
      'WHERE d.id IS NULL;'
    ]), 'Finds employees with no matching department (orphan records).'),
    e('Self-Join for Hierarchies', 'Employee-manager relationships.', codeBlock([
      'SELECT e1.name AS employee, e2.name AS manager',
      'FROM employees e1',
      'LEFT JOIN employees e2 ON e1.manager_id = e2.id',
      'ORDER BY e1.name;'
    ]), 'Joins employees table to itself to show reporting structure.'),
    e('FULL JOIN for Comparison', 'All employees and departments.', codeBlock([
      'SELECT e.name, d.department_name',
      'FROM employees e',
      'FULL JOIN departments d ON e.dept_id = d.id',
      'WHERE e.id IS NULL OR d.id IS NULL;'
    ]), 'Finds orphaned records on either side of the relationship.'),
    e('Multiple Joins', 'Orders with customer and product details.', codeBlock([
      'SELECT o.id AS order_id, c.name AS customer, p.name AS product, oi.quantity',
      'FROM orders o',
      'JOIN customers c ON o.customer_id = c.id',
      'JOIN order_items oi ON o.id = oi.order_id',
      'JOIN products p ON oi.product_id = p.id',
      'ORDER BY o.id;'
    ]), 'Chains four tables together for a complete order report.')
  ],
  [
    m('Which JOIN returns only matching rows?', ['LEFT JOIN', 'INNER JOIN', 'RIGHT JOIN', 'FULL JOIN'], 1, 'INNER JOIN returns only rows with matches in both tables.'),
    m('Which JOIN returns all rows from the left table?', ['LEFT JOIN', 'INNER JOIN', 'RIGHT JOIN', 'CROSS JOIN'], 0, 'LEFT JOIN returns all left table rows with matching right table data.'),
    m('What does CROSS JOIN produce?', ['Only matching rows', 'Cartesian product', 'All left rows', 'Combined unique rows'], 1, 'CROSS JOIN creates every combination of rows from both tables.'),
    m('What is a self-join?', ['Two different tables', 'Table joined to itself', 'Two copies of same data', 'A view'], 1, 'Self-join joins a table to itself using different aliases.'),
    m('What is the safe alternative to NATURAL JOIN?', ['INNER JOIN with ON', 'LEFT JOIN', 'CROSS JOIN', 'FULL JOIN'], 0, 'Use INNER JOIN with explicit ON clause instead of NATURAL JOIN.'),
    m('Which join type is not supported in MySQL?', ['LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'INNER JOIN'], 2, 'MySQL does not support FULL OUTER JOIN directly.')
  ]
);

/* =================== TOPIC 12: Subqueries & EXISTS =================== */
addTopic('sql-subqueries', 'Subqueries & EXISTS', 'intermediate', 25,
  ['A subquery is a query nested inside another query, enclosed in parentheses. It can return scalar, single column, or multi-column results.',
   'Scalar subqueries return a single value and can be used in SELECT, WHERE, and SET clauses.',
   'IN, ANY, ALL operators compare expressions with subquery results. EXISTS checks if a subquery returns any rows.',
   'Correlated subqueries reference columns from the outer query and execute once per outer row. They can be slower than JOINs.'
  ],
  'A subquery is like asking a question inside another question. "Show me all employees who earn more than the average salary." The inner question (what is the average?) answers first, then the outer question uses that result.',
  [
    d('Scalar Subqueries', 'Return a single value (one row, one column). Used in SELECT: SELECT name, (SELECT AVG(salary) FROM employees) AS avg. Used in WHERE: WHERE salary > (SELECT AVG(salary) FROM employees). Must return exactly one value.'),
    d('Row and Column Subqueries', 'Column subquery: SELECT * FROM employees WHERE dept_id IN (SELECT id FROM departments). Multi-column: WHERE (dept_id, salary) IN (SELECT id, max_salary FROM dept_budgets).'),
    d('EXISTS and NOT EXISTS', 'EXISTS (subquery) returns true if the subquery returns at least one row. More efficient than IN for large datasets because it can use early exit. NOT EXISTS finds records with no match in the subquery.'),
    d('ANY and ALL Operators', 'column > ANY (subquery) — true if > any value returned. column > ALL (subquery) — true if > all values returned. ANY is equivalent to IN with = operator. ALL with != is equivalent to NOT IN.'),
    d('Correlated Subqueries', 'References outer query columns. Executed once per row of the outer query. Example: SELECT * FROM employees e WHERE salary > (SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id). Can be rewritten as JOIN with GROUP BY for better performance.')
  ],
  'Subqueries are powerful for dynamic filtering and calculations. Use them when the result depends on an aggregate or another query. Prefer JOINs for simple relationships and EXISTS for large dataset membership tests.',
  [
    q('What is a subquery?', 'A query nested inside another SQL query, enclosed in parentheses. Executed before the outer query (except correlated).'),
    q('What is a scalar subquery?', 'A subquery that returns a single value (one row, one column). Can be used in SELECT, WHERE, and SET clauses.'),
    q('How does EXISTS differ from IN?', 'EXISTS checks for row existence and can early-exit. IN retrieves all values first. EXISTS is often faster for large subquery results.'),
    q('What is a correlated subquery?', 'A subquery that references columns from the outer query. Executes once for each outer row. Can be slow for large datasets.'),
    q('What does ANY do?', 'Compares a value with any value returned by the subquery. x > ANY (1,2,3) is true if x > 1.'),
    q('What does ALL do?', 'Compares a value with all values returned. x > ALL (1,2,3) is true only if x > 3.'),
    q('Can subqueries be used in SELECT?', 'Yes. Scalar subqueries in SELECT: SELECT name, (SELECT MAX(salary) FROM employees) AS max_sal FROM employees;'),
    q('Can subqueries be used in FROM?', 'Yes. Called a derived table or subquery in FROM: SELECT * FROM (SELECT * FROM employees WHERE salary > 50000) AS high_earners.'),
    q('What is the difference between IN and = ANY?', 'They are equivalent. IN is syntactically cleaner for simple cases. = ANY is more explicit.'),
    q('What happens if a scalar subquery returns no rows?', 'It evaluates to NULL. The outer query handles it based on NULL comparison rules.')
  ],
  R(10,35,120,25,'#0070f3','','Scalar','Single value') +
  R(10,65,120,25,'#28a745','','Row/Column','Multiple values') +
  R(10,95,120,25,'#ffc107','','EXISTS','Row existence') +
  R(10,125,120,25,'#dc3545','','Correlated','Per-row exec') +
  A(130,48,160,48) + A(130,78,160,78) + A(130,108,160,108) + A(130,138,160,138) +
  R(170,35,210,130,'#17a2b8','','Subqueries','Nested queries for dynamic filtering and calculations in SQL.') +
  T(240,195,'Subqueries: Scalar, column, correlated, and EXISTS for powerful dynamic queries.',9,'#666','middle'),
  [
    e('Scalar Subquery in WHERE', 'Employees above average salary.', codeBlock([
      'SELECT name, salary',
      'FROM employees',
      'WHERE salary > (SELECT AVG(salary) FROM employees)',
      'ORDER BY salary DESC;'
    ]), 'Finds employees earning more than the company average.'),
    e('IN with Subquery', 'Employees in active departments.', codeBlock([
      'SELECT name, dept_id',
      'FROM employees',
      "WHERE dept_id IN (SELECT id FROM departments WHERE status = 'active');"
    ]), 'Returns employees belonging to active departments only.'),
    e('EXISTS Example', 'Customers who have placed orders.', codeBlock([
      'SELECT c.name, c.email',
      'FROM customers c',
      'WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);'
    ]), 'EXISTS returns true when the subquery finds at least one order.'),
    e('Correlated Subquery', 'Above-average salary by department.', codeBlock([
      'SELECT e.name, e.salary, e.dept_id',
      'FROM employees e',
      'WHERE e.salary > (',
      '  SELECT AVG(salary) FROM employees',
      '  WHERE dept_id = e.dept_id',
      ') ORDER BY e.dept_id;'
    ]), 'For each employee, compares salary to their own department average.'),
    e('Subquery in FROM (Derived Table)', 'Second highest salary per dept.', codeBlock([
      'SELECT dept_id, MAX(salary) AS second_highest',
      'FROM employees',
      'WHERE salary < (',
      '  SELECT MAX(salary) FROM employees e2',
      '  WHERE e2.dept_id = employees.dept_id',
      ') GROUP BY dept_id;'
    ]), 'Uses a subquery to exclude the highest salary, then finds the next highest.')
  ],
  [
    m('What does a scalar subquery return?', ['A list', 'A single value', 'A table', 'Multiple rows'], 1, 'Scalar subquery returns exactly one value (one row, one column).'),
    m('What is a correlated subquery?', 'References outer query', 'Executes once', 'Is faster than JOIN', 'Cannot use aggregates', 0, 'A correlated subquery references columns from the outer query.'),
    m('Which is faster for large datasets: EXISTS or IN?', ['IN', 'EXISTS', 'Same', 'Depends on indexes'], 1, 'EXISTS can short-circuit on first match, making it faster for large datasets.'),
    m('What does x > ALL (1,2,3) require?', ['x > 1', 'x > 3', 'x > 0', 'x > 2'], 1, 'ALL requires the value to be greater than every value in the set.'),
    m('Can a subquery be used in a SELECT clause?', ['Yes', 'No', 'Only in WHERE', 'Only in FROM'], 0, 'Scalar subqueries can be used in SELECT, WHERE, FROM, HAVING, and SET clauses.'),
    m('What is a derived table?', ['A view', 'A subquery in FROM', 'A temporary table', 'An indexed view'], 1, 'A derived table is a subquery placed in the FROM clause with an alias.')
  ]
);

/* =================== TOPIC 13: CTEs =================== */
addTopic('sql-ctes', 'CTEs (Common Table Expressions)', 'intermediate', 25,
  ['A CTE is a temporary named result set that exists only within the scope of a single SQL statement.',
   'CTEs improve readability by breaking complex queries into named, reusable blocks defined with the WITH clause.',
   'Unlike subqueries, CTEs can be referenced multiple times in the same query and can reference each other.',
   'CTEs are not materialized by default — the database optimizes them inline like subqueries.'
  ],
  'A CTE is like writing down a temporary calculation on a sticky note before using it in your final answer. You define it once (WITH), then use it by name in your main query. It makes complex SQL look cleaner and more organized.',
  [
    d('CTE Syntax', 'WITH cte_name AS (SELECT ...) SELECT * FROM cte_name. Multiple CTEs: WITH cte1 AS (...), cte2 AS (...) SELECT ... FROM cte1 JOIN cte2. CTEs can reference previously defined CTEs in the same WITH clause.'),
    d('CTE vs Subquery', 'CTEs are more readable for complex queries. CTEs can be referenced multiple times (subqueries would be duplicated). CTEs support recursion. Performance: CTEs are typically optimized the same as subqueries (not materialized).'),
    d('Multiple CTEs', 'WITH sales_data AS (...), avg_sales AS (SELECT AVG(total) FROM sales_data) SELECT * FROM avg_sales. Each CTE can access previous CTEs. Order matters — can only reference CTEs defined above.'),
    d('CTE Use Cases', 'Breaking down ETL pipelines step by step. Reusable subqueries. Recursive queries (tree structures). Pagination with complex filters. Data cleaning transformations before final query.'),
    d('Materialized CTEs (PostgreSQL)', 'PostgreSQL extension: WITH cte AS MATERIALIZED (...) forces materialization — CTE result is computed once and stored. WITH cte AS NOT MATERIALIZED (...) forces inlining. Useful for optimization tuning.')
  ],
  'CTEs are the preferred way to write complex queries in modern SQL. They improve readability, support recursion, and allow referencing the same result set multiple times without duplication.',
  [
    q('What does CTE stand for?', 'Common Table Expression — a temporary named result set within a query.'),
    q('How do you define a CTE?', 'WITH cte_name AS (SELECT query) SELECT * FROM cte_name.'),
    q('What is the advantage of CTEs over subqueries?', 'CTEs can be referenced multiple times in the same query. They improve readability for complex queries. They support recursion.'),
    q('Can you define multiple CTEs?', 'Yes. Separate with commas: WITH cte1 AS (...), cte2 AS (...). Each can reference previous ones.'),
    q('Are CTEs materialized?', 'Not by default. The database optimizer treats them like inline subqueries. PostgreSQL supports MATERIALIZED and NOT MATERIALIZED hints.'),
    q('What is a recursive CTE?', 'A CTE that references itself, used for hierarchical or graph data. Defined with WITH RECURSIVE.'),
    q('When should you use a CTE instead of a subquery?', 'When the same subquery is needed multiple times, for recursive queries, or for complex multi-step transformations.'),
    q('Can CTEs be used in UPDATE and DELETE?', 'Yes. WITH cte AS (...) UPDATE table SET ... FROM cte WHERE ...;'),
    q('Can a CTE be nested inside another CTE?', 'Yes. CTEs can reference previously defined CTEs in the same WITH clause.'),
    q('What is the performance impact of CTEs?', 'Generally same as subqueries. PostgreSQL MATERIALIZED hint can prevent repeated computation. PostgreSQL optimizes inlining automatically in most cases.')
  ],
  R(10,35,130,25,'#0070f3','','WITH cte AS','Define') +
  R(10,65,130,25,'#28a745','','SELECT cte','Use') +
  R(10,95,130,25,'#ffc107','','Multiple CTEs','Chain') +
  R(10,125,130,25,'#dc3545','','Recursive','Self-reference') +
  A(140,48,170,48) + A(140,78,170,78) + A(140,108,170,108) +
  R(180,35,200,120,'#17a2b8','','Common Table Expressions','Temporary named result sets for cleaner, modular SQL queries.') +
  T(240,195,'CTEs: Named temporary result sets for readable, modular, and reusable SQL queries.',9,'#666','middle'),
  [
    e('Basic CTE', 'Simple named query.', codeBlock([
      "WITH high_earners AS (",
      "  SELECT name, salary, dept_id",
      "  FROM employees WHERE salary > 80000",
      ")",
      "SELECT h.name, h.salary, d.department_name",
      "FROM high_earners h",
      "JOIN departments d ON h.dept_id = d.id",
      "ORDER BY h.salary DESC;"
    ]), 'Defines high earners CTE, then joins with departments.'),
    e('Multiple CTEs', 'Step-by-step data pipeline.', codeBlock([
      "WITH",
      "  dept_stats AS (",
      "    SELECT dept_id, AVG(salary) AS avg_sal",
      "    FROM employees GROUP BY dept_id",
      "  ),",
      "  dept_ranking AS (",
      "    SELECT d.department_name, ds.avg_sal,",
      "      RANK() OVER (ORDER BY ds.avg_sal DESC) AS rnk",
      "    FROM dept_stats ds",
      "    JOIN departments d ON ds.dept_id = d.id",
      "  )",
      "SELECT * FROM dept_ranking WHERE rnk <= 3;"
    ]), 'Two CTEs chained together for department salary ranking.'),
    e('CTE in INSERT/UPDATE', 'CTE with data modification.', codeBlock([
      "WITH avg_salary AS (",
      "  SELECT dept_id, AVG(salary) AS avg_sal",
      "  FROM employees GROUP BY dept_id",
      ")",
      "UPDATE employees e",
      "SET bonus = e.salary * 0.1",
      "FROM avg_salary a",
      "WHERE e.dept_id = a.dept_id",
      "  AND e.salary < a.avg_sal;"
    ]), 'Gives bonus to employees below department average salary.'),
    e('PostgreSQL MATERIALIZED CTE', 'Force or prevent materialization.', codeBlock([
      "WITH",
      "  heavy_cte AS MATERIALIZED (",
      "    SELECT * FROM large_table",
      "    WHERE complex_condition",
      "  )",
      "SELECT * FROM heavy_cte h1",
      "JOIN heavy_cte h2 ON h1.id = h2.related_id",
      "WHERE h1.status = 'active';"
    ]), 'MATERIALIZED forces the CTE to be computed once.'),
    e('CTE with Window Functions', 'Powerful combination.', codeBlock([
      "WITH ranked AS (",
      "  SELECT",
      "    name, salary, dept_id,",
      "    DENSE_RANK() OVER (",
      "      PARTITION BY dept_id ORDER BY salary DESC",
      "    ) AS rnk",
      "  FROM employees",
      ")",
      "SELECT * FROM ranked WHERE rnk <= 3",
      "ORDER BY dept_id, rnk;"
    ]), 'CTE combined with window functions for top-N per group.')
  ],
  [
    m('What does CTE stand for?', ['Common Table Expression', 'Common Temporary Expression', 'Computed Table Element', 'Central Table Engine'], 0, 'CTE stands for Common Table Expression.'),
    m('Which keyword defines a CTE?', ['WITH', 'CTE', 'DEFINE', 'TEMP'], 0, 'The WITH keyword is used to define CTEs.'),
    m('Can a CTE be referenced multiple times?', ['Yes', 'No', 'Once only', 'Depends on database'], 0, 'CTEs can be referenced multiple times in the same query.'),
    m('Are CTEs materialized by default?', ['Yes', 'No', 'Only in PostgreSQL', 'Only in recursive CTEs'], 1, 'CTEs are typically not materialized — they are inlined like subqueries.'),
    m('What keyword enables recursive CTEs?', ['RECURSIVE', 'ITERATE', 'REPEAT', 'LOOP'], 0, 'WITH RECURSIVE enables recursive CTEs.'),
    m('Which is more readable for complex queries?', ['Subqueries', 'CTEs', 'JOINs', 'Temporary tables'], 1, 'CTEs improve readability for complex multi-step queries.')
  ]
);

/* =================== TOPIC 14: Recursive CTEs =================== */
addTopic('sql-recursive-ctes', 'Recursive CTEs', 'advanced', 30,
  ['Recursive CTEs are CTEs that reference themselves, enabling traversal of hierarchical or graph-structured data.',
   'A recursive CTE has two parts: anchor member (initial result set) and recursive member (references the CTE itself).',
   'The recursive member repeatedly executes until it returns no rows. UNION ALL combines results from all iterations.',
   'Use cases: organizational charts, category trees, bill of materials, graph traversal, number generation.'
  ],
  'A recursive CTE is like starting with one person in a family tree, finding their children, then finding their children\'s children, and so on until there are no more generations. Each step builds on the previous one.',
  [
    d('Anatomy of Recursive CTE', 'WITH RECURSIVE cte AS (anchor UNION ALL SELECT ... FROM cte WHERE ...) SELECT * FROM cte. Anchor: the starting point. Recursive member: joins back to CTE. Termination: when recursive member returns no rows.'),
    d('Anchor Member', 'The first SELECT in a recursive CTE. Runs once to produce the initial result set. Typically a WHERE clause that identifies root nodes: WHERE parent_id IS NULL or WHERE level = 1.'),
    d('Recursive Member', 'The second SELECT (after UNION ALL) that references the CTE name. Joins the CTE with the source table to find the next level. Must use UNION ALL (not UNION). Must eventually return no rows to terminate.'),
    d('Hierarchical Data Patterns', 'Org charts: anchor = CEO, recursive = direct reports. Category trees: anchor = root categories, recursive = subcategories. File systems: anchor = root directory, recursive = subdirectories.'),
    d('MAXRECURSION Option', 'SQL Server: OPTION (MAXRECURSION n) limits recursion depth (default 100). PostgreSQL: no explicit limit but will error on infinite recursion. MySQL: cte_max_recursion_depth system variable. Always add depth tracking for safety.')
  ],
  'Recursive CTEs are the standard SQL way to handle tree and graph data. They replace recursive functions and procedural code with a declarative, set-based approach.',
  [
    q('What is a recursive CTE?', 'A CTE that references itself to process hierarchical data. Defined with WITH RECURSIVE and contains anchor + recursive members.'),
    q('What are the two parts of a recursive CTE?', 'Anchor member: initial query. Recursive member: references the CTE and adds next levels. UNION ALL combines them.'),
    q('How does a recursive CTE terminate?', 'When the recursive member returns zero rows, the recursion stops. A WHERE clause in the recursive member controls termination.'),
    q('What is the difference between UNION and UNION ALL in recursive CTEs?', 'UNION ALL is required. UNION would attempt deduplication, which breaks the recursion logic and may cause infinite loops.'),
    q('Can you track depth in a recursive CTE?', 'Yes. Add depth + 1 AS depth in the recursive member to track the current recursion level.'),
    q('What happens with infinite recursion?', 'PostgreSQL limits by work_mem and will error. SQL Server has MAXRECURSION (default 100). MySQL has cte_max_recursion_depth.'),
    q('Can recursive CTEs handle graphs with cycles?', 'Yes, by tracking visited nodes using arrays or path columns. Add a cycle detection column to prevent infinite loops.'),
    q('What is a common use case?', 'Org charts, category trees, folder structures, travel routes, dependency graphs, generating sequences of numbers/dates.'),
    q('How do you find all descendants?', 'Recursive CTE starting from a parent, joining children recursively until no more children found.'),
    q('How do you find the path from root to node?', 'Use a path column: CAST(node_name AS TEXT) AS path for anchor, and cte.path || \' > \' || t.node_name for recursive member.')
  ],
  R(10,35,100,25,'#0070f3','','Anchor','Root rows') +
  A(110,48,140,48) +
  R(150,35,100,25,'#28a745','','Recurse','Next level') +
  A(150,60,150,80) + A(250,48,280,48) +
  R(290,35,100,25,'#ffc107','','UNION ALL','Combine levels') +
  A(290,60,290,80) + A(390,48,420,48) +
  R(10,95,280,25,'#dc3545','','Stop when no more rows','Termination') +
  T(240,170,'Recursive CTEs: Anchor + Recursive member for hierarchical data traversal.',9,'#666','middle'),
  [
    e('Org Chart Traversal', 'Employee reporting hierarchy.', codeBlock([
      "WITH RECURSIVE org_chart AS (",
      "  SELECT id, name, manager_id, 1 AS level",
      "  FROM employees WHERE manager_id IS NULL",
      "  UNION ALL",
      "  SELECT e.id, e.name, e.manager_id, oc.level + 1",
      "  FROM employees e",
      "  JOIN org_chart oc ON e.manager_id = oc.id",
      ")",
      "SELECT * FROM org_chart ORDER BY level, name;"
    ]), 'Traverses from CEO (no manager) down through all reporting levels.'),
    e('Category Tree with Path', 'Nested categories with breadcrumb.', codeBlock([
      "WITH RECURSIVE cat_tree AS (",
      "  SELECT id, name, parent_id,",
      "    name::TEXT AS path, 1 AS level",
      "  FROM categories WHERE parent_id IS NULL",
      "  UNION ALL",
      "  SELECT c.id, c.name, c.parent_id,",
      "    ct.path || ' > ' || c.name,",
      "    ct.level + 1",
      "  FROM categories c",
      "  JOIN cat_tree ct ON c.parent_id = ct.id",
      ")",
      "SELECT * FROM cat_tree ORDER BY path;"
    ]), 'Builds full path for each category like "Electronics > Computers > Laptops".'),
    e('Number Series Generation', 'Generate date range.', codeBlock([
      "WITH RECURSIVE dates AS (",
      "  SELECT '2024-01-01'::DATE AS dt",
      "  UNION ALL",
      "  SELECT dt + INTERVAL '1 day'",
      "  FROM dates WHERE dt < '2024-01-31'",
      ")",
      "SELECT * FROM dates;"
    ]), 'Generates all dates in January 2024 without a calendar table.'),
    e('Cycle Detection', 'Handle circular references safely.', codeBlock([
      "WITH RECURSIVE traverse AS (",
      "  SELECT id, name, manager_id,",
      "    ARRAY[id] AS visited, 1 AS level",
      "  FROM employees WHERE id = 1",
      "  UNION ALL",
      "  SELECT e.id, e.name, e.manager_id,",
      "    t.visited || e.id, t.level + 1",
      "  FROM employees e",
      "  JOIN traverse t ON e.manager_id = t.id",
      "  WHERE NOT e.id = ANY(t.visited)",
      ")",
      "SELECT * FROM traverse ORDER BY level;"
    ]), 'Uses array tracking to prevent infinite loops in cyclic data.'),
    e('Dependency Resolution', 'Find all prerequisites.', codeBlock([
      "WITH RECURSIVE deps AS (",
      "  SELECT id, name, 0 AS depth",
      "  FROM courses WHERE id = 'ADV-SQL'",
      "  UNION ALL",
      "  SELECT c.id, c.name, d.depth + 1",
      "  FROM prerequisites p",
      "  JOIN deps d ON p.course_id = d.id",
      "  JOIN courses c ON p.prereq_id = c.id",
      ")",
      "SELECT * FROM deps ORDER BY depth DESC;"
    ]), 'Finds all prerequisite courses for Advanced SQL in dependency order.')
  ],
  [
    m('What is the anchor member?', ['First query that runs once', 'Recursive part', 'Termination condition', 'Final SELECT'], 0, 'The anchor runs once to produce the initial result set.'),
    m('What combines anchor and recursive results?', ['UNION', 'UNION ALL', 'JOIN', 'MERGE'], 1, 'UNION ALL combines results without deduplication.'),
    m('When does a recursive CTE stop?', ['Fixed iterations', 'No more rows from recursive member', 'Timeout', 'MAXRECURSION error'], 1, 'Recursion stops when the recursive member returns zero rows.'),
    m('Which clause must recursive CTEs use?', ['WITH RECURSIVE', 'WITH ITERATE', 'RECURSIVE CTE', 'WITH LOOP'], 0, 'WITH RECURSIVE is the required syntax.'),
    m('What prevents infinite recursion in PostgreSQL?', ['MAXRECURSION', 'work_mem', 'No safeguard', 'Automatic limit'], 2, 'PostgreSQL does not have MAXRECURSION — it relies on work_mem to eventually error.'),
    m('Can you track depth in a recursive CTE?', ['Yes', 'No', 'Only in anchor', 'Only in SQL Server'], 0, 'Add a level counter column incremented in the recursive member.')
  ]
);

/* =================== TOPIC 15: Window Functions =================== */
addTopic('sql-window-functions', 'Window Functions', 'advanced', 35,
  ['Window functions perform calculations across a set of rows related to the current row, without collapsing rows like GROUP BY.',
   'OVER clause defines the window (partition, order, frame). PARTITION BY divides rows into groups. ORDER BY orders rows within each partition.',
   'Ranking: ROW_NUMBER(), RANK(), DENSE_RANK(), NTILE(n). Value: LEAD(), LAG(), FIRST_VALUE(), LAST_VALUE(). Aggregate: SUM(), AVG() as window functions.',
   'Window functions are evaluated after WHERE and GROUP BY but before ORDER BY and LIMIT.'
  ],
  'A window function is like giving each person in a line a number based on their height WITHOUT making them leave the line. GROUP BY would make them form separate lines by category. Window functions keep everyone in place while still calculating group statistics.',
  [
    d('OVER and PARTITION BY', 'OVER () — window covers entire result set. OVER (PARTITION BY dept_id) — separate window per department. PARTITION BY divides rows into groups where the function operates independently. Without PARTITION BY, the function applies to all rows.'),
    d('Ranking Functions', 'ROW_NUMBER() — unique sequential number per row (ties get different numbers). RANK() — same rank for ties, skips numbers. DENSE_RANK() — same rank for ties, no gaps. NTILE(n) — divides rows into n buckets.'),
    d('Window ORDER BY', 'OVER (ORDER BY salary) — cumulative/windowed order. Changes behavior of aggregate window functions: SUM(salary) OVER (ORDER BY id) gives running total. For ranking functions, ORDER BY determines the ranking order.'),
    d('Frame Specification', 'ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW — default frame for ORDER BY aggregates. RANGE vs ROWS: RANGE includes peers (same ORDER BY value). ROWS is strict row positions. Frame options: UNBOUNDED PRECEDING, n PRECEDING, CURRENT ROW.'),
    d('LEAD and LAG', 'LAG(column, n, default) — access previous row value. LEAD(column, n, default) — access next row value. Default n is 1. Default is used when no previous/next row exists. Useful for comparing current value to previous/next: month-over-month growth.')
  ],
  'Window functions are arguably the most powerful SQL feature for analytical queries. They enable running totals, moving averages, rankings, period-over-period comparisons, and much more without self-joins or subqueries.',
  [
    q('What is a window function?', 'A function that performs calculations across a set of rows related to the current row, preserving individual row identity.'),
    q('What does PARTITION BY do?', 'Divides rows into groups where the window function operates independently. Like GROUP BY but without collapsing rows.'),
    q('What is the difference between ROW_NUMBER, RANK, and DENSE_RANK?', 'ROW_NUMBER: unique sequential (ties get different numbers). RANK: ties share rank, gaps. DENSE_RANK: ties share rank, no gaps.'),
    q('What does LEAD() do?', 'Accesses the value of the next row in the window order. LAG() accesses the previous row.'),
    q('What is a frame in window functions?', 'Defines the set of rows within the window for calculations. ROWS BETWEEN start AND end. Default: RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.'),
    q('What is the difference between ROWS and RANGE?', 'ROWS: strict physical row positions. RANGE: logical range including peers (rows with same ORDER BY value).'),
    q('Can you use aggregate functions as window functions?', 'Yes. SUM(salary) OVER (PARTITION BY dept_id) gives department total alongside each row.'),
    q('What is a running total?', 'SUM(column) OVER (ORDER BY date) — cumulative sum ordered by date.'),
    q('What is a moving average?', 'AVG(column) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) — 7-day moving average.'),
    q('Can window functions be used in WHERE?', 'No. Window functions are evaluated after WHERE. Use a subquery or CTE to filter on window function results.')
  ],
  R(10,35,110,25,'#0070f3','','ROW_NUMBER','Sequential') +
  R(10,65,110,25,'#28a745','','RANK/DENSE','Ranking') +
  R(10,95,110,25,'#ffc107','','LEAD/LAG','Prev/Next') +
  R(10,125,110,25,'#dc3545','','SUM/AVG','Aggregate') +
  R(10,155,110,25,'#e83e8c','','NTILE','Buckets') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,220,155,'#17a2b8','','Window Functions','Analytical calculations across related rows without collapsing data.') +
  T(240,220,'Window Functions: ROW_NUMBER, RANK, LEAD/LAG, aggregates — all with OVER clause.',9,'#666','middle'),
  [
    e('Ranking Employees by Salary', 'Top earners per department.', codeBlock([
      'SELECT',
      '  name, department, salary,',
      '  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn,',
      '  RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rk,',
      '  DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dr',
      'FROM employees',
      'ORDER BY department, rn;'
    ]), 'Compares ROW_NUMBER, RANK, and DENSE_RANK on department salary data.'),
    e('Running Total and Moving Average', 'Cumulative sales.', codeBlock([
      'SELECT',
      '  order_date, amount,',
      '  SUM(amount) OVER (ORDER BY order_date) AS running_total,',
      '  AVG(amount) OVER (ORDER BY order_date',
      '    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS moving_avg_7d',
      'FROM orders',
      'ORDER BY order_date;'
    ]), 'Running total and 7-day moving average of order amounts.'),
    e('LEAD and LAG for Comparison', 'Month-over-month growth.', codeBlock([
      'SELECT',
      '  month, total_sales,',
      '  LAG(total_sales, 1) OVER (ORDER BY month) AS prev_month,',
      '  ROUND((total_sales - LAG(total_sales, 1) OVER (ORDER BY month))',
      '    / LAG(total_sales, 1) OVER (ORDER BY month) * 100, 2)',
      '    AS growth_pct',
      'FROM monthly_sales',
      'ORDER BY month;'
    ]), 'Calculates month-over-month sales growth percentage.'),
    e('NTILE for Percentiles', 'Divide employees into quartiles.', codeBlock([
      'SELECT',
      '  name, salary,',
      '  NTILE(4) OVER (ORDER BY salary DESC) AS quartile',
      'FROM employees',
      'ORDER BY salary DESC;'
    ]), 'NTILE(4) divides employees into 4 salary quartiles.'),
    e('First and Last Values', 'Salary range per department.', codeBlock([
      'SELECT',
      '  department, name, salary,',
      '  FIRST_VALUE(name) OVER (PARTITION BY department ORDER BY salary DESC) AS highest_paid,',
      '  LAST_VALUE(name) OVER (PARTITION BY department ORDER BY salary DESC',
      '    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS lowest_paid',
      'FROM employees',
      'ORDER BY department, salary DESC;'
    ]), 'Shows highest and lowest paid employee name per department.')
  ],
  [
    m('Which function gives unique sequential numbers?', ['RANK', 'ROW_NUMBER', 'DENSE_RANK', 'NTILE'], 1, 'ROW_NUMBER gives unique sequential numbers with no ties.'),
    m('What does PARTITION BY do?', ['Groups rows', 'Orders rows', 'Limits rows', 'Filters rows'], 0, 'PARTITION BY divides rows into independent groups.'),
    m('What does LAG() return?', ['Next row value', 'Previous row value', 'First row value', 'Current row value'], 1, 'LAG() accesses the value from the previous row.'),
    m('What is the default frame with ORDER BY?', ['All rows', 'Current row only', 'UNBOUNDED PRECEDING TO CURRENT ROW', 'Previous 10 rows'], 2, 'Default frame with ORDER BY is RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.'),
    m('Can window functions be used in WHERE?', ['Yes', 'No', 'Only with aggregates', 'Only with ranking'], 1, 'Window functions execute after WHERE, so they cannot be used directly in WHERE.'),
    m('What does NTILE(10) do?', ['Top 10', 'Deciles', '10 rows', '10 partitions'], 1, 'NTILE(10) divides rows into 10 approximately equal buckets (deciles).')
  ]
);

/* =================== TOPIC 16: Set Operations =================== */
addTopic('sql-set-operations', 'Set Operations (UNION, INTERSECT, EXCEPT)', 'intermediate', 20,
  ['Set operations combine results from two or more queries into a single result set.',
   'UNION combines results and removes duplicates. UNION ALL combines results keeping all duplicates.',
   'INTERSECT returns rows common to both queries. EXCEPT returns rows from first query not in second.',
   'All set operations require same number of columns with compatible data types in all queries.'
  ],
  'Set operations are like combining two guest lists. UNION gives you everyone on both lists (no repeats). INTERSECT gives you people on BOTH lists. EXCEPT gives you people on the first list but NOT the second.',
  [
    d('UNION vs UNION ALL', 'UNION: SELECT a UNION SELECT b — combines results, removes duplicates (slower, requires sort). UNION ALL: combines results, keeps duplicates (faster, no sort). Use UNION ALL when duplicates are acceptable or impossible.'),
    d('INTERSECT', 'SELECT a INTERSECT SELECT b — returns rows present in both queries. Can use INTERSECT ALL to keep duplicates. Performance: typically slower than EXISTS or IN for simple cases but more readable.'),
    d('EXCEPT (MINUS)', 'SELECT a EXCEPT SELECT b — returns rows in first query not in second. EXCEPT ALL keeps duplicates. Called MINUS in Oracle. Useful for finding missing records: which customers have not placed orders?'),
    d('Order and Column Requirements', 'All queries must have same number of columns. Column data types must be compatible (PostgreSQL is strict about type matching). Column names come from the first query. ORDER BY applies to final result, placed after the last query.'),
    d('Use Cases', 'UNION: combining monthly sales tables. INTERSECT: finding common customers across regions. EXCEPT: identifying orphan records, validating data integrity, finding unused products.')
  ],
  'Set operations are essential for combining data from similar structures. UNION ALL is preferred for performance when duplicates are acceptable. INTERSECT and EXCEPT offer cleaner alternatives to complex JOIN and subquery patterns.',
  [
    q('What does UNION do?', 'Combines results from two queries and removes duplicate rows. UNION ALL keeps all duplicates.'),
    q('What is the difference between UNION and UNION ALL?', 'UNION removes duplicates (slower). UNION ALL keeps all rows (faster). Use UNION ALL unless you need deduplication.'),
    q('What does INTERSECT return?', 'Rows that appear in both query results. Like an INNER JOIN on the entire row.'),
    q('What does EXCEPT return?', 'Rows from the first query that are not in the second query. Like a LEFT JOIN with NULL check.'),
    q('What are the requirements for set operations?', 'Same number of columns in all queries. Compatible data types. ORDER BY only at the end.'),
    q('What happens if column types mismatch?', 'PostgreSQL will error. Some databases attempt implicit type conversion. Always ensure consistent types.'),
    q('How do you ORDER BY with UNION?', 'Place ORDER BY at the end of the combined statement. Column names from the first query are used.'),
    q('Is UNION ALL faster than UNION?', 'Yes. UNION ALL does not perform deduplication sorting. Use UNION ALL when duplicates are not a concern.'),
    q('Can you use more than two queries in set operations?', 'Yes. Chain them: SELECT a UNION SELECT b UNION SELECT c.'),
    q('What is the alternative to INTERSECT?', 'SELECT DISTINCT a.* FROM table1 a JOIN table2 b ON a.id = b.id. INTERSECT is cleaner when comparing entire rows.')
  ],
  R(10,35,110,25,'#0070f3','','UNION','Combine dedup') +
  R(10,65,110,25,'#28a745','','UNION ALL','Combine all') +
  R(10,95,110,25,'#ffc107','','INTERSECT','Common rows') +
  R(10,125,110,25,'#dc3545','','EXCEPT','First only') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) +
  R(160,35,220,125,'#17a2b8','','Set Operations','Combine, intersect, and subtract query results like mathematical sets.') +
  T(240,195,'Set Operations: UNION, INTERSECT, EXCEPT for combining query results.',9,'#666','middle'),
  [
    e('UNION Example', 'Combine employee and contractor names.', codeBlock([
      "SELECT name, email FROM employees",
      "UNION",
      "SELECT name, email FROM contractors",
      "ORDER BY name;"
    ]), 'Unified directory of employees and contractors (no duplicates).'),
    e('UNION ALL for Performance', 'Combine monthly sales tables.', codeBlock([
      "SELECT 'Jan' AS month, * FROM sales_jan",
      "UNION ALL",
      "SELECT 'Feb', * FROM sales_feb",
      "UNION ALL",
      "SELECT 'Mar', * FROM sales_mar",
      "ORDER BY amount DESC;"
    ]), 'UNION ALL is faster when combining disjoint data (no duplicates possible).'),
    e('INTERSECT for Common Records', 'Customers who bought from both stores.', codeBlock([
      "SELECT customer_id FROM store1_orders",
      "INTERSECT",
      "SELECT customer_id FROM store2_orders;"
    ]), 'Finds customers who have ordered from both store locations.'),
    e('EXCEPT to Find Missing Records', 'Unordered products.', codeBlock([
      "SELECT id, name FROM products",
      "EXCEPT",
      "SELECT p.id, p.name FROM products p",
      "JOIN order_items oi ON p.id = oi.product_id;"
    ]), 'Finds products that have never been ordered.'),
    e('Multiple Set Operations', 'Complex data comparison.', codeBlock([
      "SELECT user_id FROM active_users",
      "INTERSECT",
      "SELECT user_id FROM premium_users",
      "EXCEPT",
      "SELECT user_id FROM cancelled_users;"
    ]), 'Active premium users who have not cancelled their subscription.')
  ],
  [
    m('Which set operation keeps duplicates?', ['UNION', 'UNION ALL', 'INTERSECT', 'EXCEPT'], 1, 'UNION ALL keeps all rows including duplicates.'),
    m('Which returns rows common to both queries?', ['UNION', 'UNION ALL', 'INTERSECT', 'EXCEPT'], 2, 'INTERSECT returns rows present in both result sets.'),
    m('What is the column requirement for set operations?', ['Same names', 'Same number and compatible types', 'Same data', 'Same indexes'], 1, 'All queries must return the same number of columns with compatible data types.'),
    m('Where does ORDER BY go?', ['After first query', 'At end of combined statement', 'After each query', 'Before UNION'], 1, 'ORDER BY applies to the final result, placed after the last query.'),
    m('Which is faster?', ['UNION', 'UNION ALL', 'Same', 'Depends on indexes'], 1, 'UNION ALL is faster because it skips the deduplication sort step.'),
    m('Which operator is called MINUS in Oracle?', ['UNION', 'INTERSECT', 'EXCEPT', 'EXCLUDE'], 2, 'EXCEPT is called MINUS in Oracle databases.')
  ]
);

/* =================== TOPIC 17: Indexes =================== */
addTopic('sql-indexes', 'Indexes', 'intermediate', 25,
  ['Indexes are special data structures that improve query performance by allowing faster data retrieval.',
   'B-tree indexes are the default and work well for equality, range, sorting, and join operations.',
   'Composite indexes cover multiple columns. The order of columns in a composite index matters significantly.',
   'Indexes speed up SELECT but slow down INSERT, UPDATE, DELETE. They consume disk space and memory.'
  ],
  'An index is like the index at the back of a textbook. Without it, you have to flip through every page (full table scan). With it, you jump directly to the relevant pages. But the index takes up space and needs updating when new pages are added.',
  [
    d('B-Tree Indexes', 'Default index type. Balanced tree structure for O(log n) lookups. Supports: =, >, <, >=, <=, BETWEEN, IN, LIKE (prefix), ORDER BY, JOINs. Best for columns with high cardinality (many distinct values).'),
    d('Composite (Multi-Column) Indexes', 'Index on (col1, col2, col3). The order of columns is critical. Works for queries filtering on col1, (col1, col2), or (col1, col2, col3). Does NOT work for queries only filtering on col2 or col3 (leading column rule).'),
    d('Unique and Primary Key Indexes', 'PRIMARY KEY automatically creates a unique index. UNIQUE constraint creates a unique index. These enforce data integrity and provide fast lookup by the key column(s).'),
    d('Partial and Expression Indexes', 'Partial: CREATE INDEX ON employees(salary) WHERE status = \'active\' — indexes only active employees. Expression: CREATE INDEX ON employees(LOWER(email)) — indexes the expression result for case-insensitive lookups.'),
    d('Index Types Comparison', 'B-tree: general purpose (default). Hash: equality lookups only (PostgreSQL). GiST: full-text search, geometric data. GIN: array/JSONB containment. BRIN: huge tables with natural ordering. SP-GiST: clustering data.')
  ],
  'Indexes are the primary tool for query performance. Understanding B-tree structure, composite index column order, and index-only scans is essential for database optimization. Measure before adding indexes — monitor actual query plans.',
  [
    q('What is an index?', 'A data structure that speeds up data retrieval at the cost of slower writes and additional storage.'),
    q('What is the default index type?', 'B-tree (balanced tree). Provides O(log n) search, insert, and delete operations.'),
    q('What is a composite index?', 'An index on multiple columns. Column order matters: (a, b) is different from (b, a).'),
    q('What is the leading column rule?', 'A query must filter on the first (leading) column of a composite index to use it effectively.'),
    q('What are the trade-offs of indexes?', 'Faster SELECT, slower INSERT/UPDATE/DELETE, more disk space and memory usage.'),
    q('What is an index-only scan?', 'When all needed columns are in the index, the database reads only the index, avoiding table access. Extremely fast.'),
    q('What is a unique index?', 'Ensures all values in the indexed column(s) are unique. Automatically created for PRIMARY KEY and UNIQUE constraints.'),
    q('What is a partial index?', 'An index on a subset of rows: CREATE INDEX ON table(column) WHERE condition. Smaller, faster for filtered queries.'),
    q('What is an expression index?', 'Indexes the result of an expression: CREATE INDEX ON employees(LOWER(last_name)). Enables fast WHERE LOWER(last_name) = \'smith\'.'),
    q('How many indexes is too many?', 'There is no fixed number. Each index adds write overhead. Monitor: if an index is never used by query plans, drop it.')
  ],
  R(10,35,110,25,'#0070f3','','B-Tree','Default index') +
  R(10,65,110,25,'#28a745','','Composite','Multi-column') +
  R(10,95,110,25,'#ffc107','','Unique','No duplicates') +
  R(10,125,110,25,'#dc3545','','Partial','Conditional') +
  R(10,155,110,25,'#e83e8c','','Expression','Function-based') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,220,155,'#17a2b8','','Indexes','Data structures for fast query performance at the cost of slower writes.') +
  T(240,220,'Indexes: B-tree, composite, partial, expression indexes for query optimization.',9,'#666','middle'),
  [
    e('Creating Indexes', 'Different index types.', codeBlock([
      '-- B-tree (default)',
      'CREATE INDEX idx_emp_salary ON employees(salary);',
      '',
      '-- Unique index',
      'CREATE UNIQUE INDEX idx_emp_email ON employees(email);',
      '',
      '-- Composite index',
      'CREATE INDEX idx_emp_dept_salary ON employees(dept_id, salary);'
    ]), 'Creates different types of indexes for various query patterns.'),
    e('Partial Index', 'Index only active employees.', codeBlock([
      "CREATE INDEX idx_active_emp_salary",
      "ON employees(salary)",
      "WHERE status = 'active';",
      '',
      '-- Query that benefits:',
      "SELECT * FROM employees",
      "WHERE status = 'active' AND salary > 80000;"
    ]), 'Smaller, more efficient index for queries filtering by active employees.'),
    e('Expression Index', 'Case-insensitive search.', codeBlock([
      "CREATE INDEX idx_emp_lower_name",
      "ON employees(LOWER(last_name));",
      '',
      '-- Fast query using the index:',
      "SELECT * FROM employees",
      "WHERE LOWER(last_name) = 'smith';"
    ]), 'Enables fast case-insensitive text lookups.'),
    e('Index-Only Scan', 'Covering index pattern.', codeBlock([
      '-- Index includes all needed columns',
      'CREATE INDEX idx_emp_dept_name',
      'ON employees(dept_id, name, salary);',
      '',
      '-- This query needs only the index:',
      'SELECT name, salary FROM employees',
      'WHERE dept_id = 5',
      'ORDER BY name;'
    ]), 'Covering index avoids table access entirely for maximum speed.'),
    e('Checking Index Usage', 'Find unused indexes.', codeBlock([
      '-- PostgreSQL: check index usage',
      'SELECT',
      '  schemaname, tablename, indexname,',
      '  idx_scan AS times_used',
      'FROM pg_stat_user_indexes',
      'ORDER BY idx_scan ASC;'
    ]), 'Identifying unused indexes that should be dropped to reduce write overhead.')
  ],
  [
    m('What is the default index type?', ['Hash', 'B-tree', 'GiST', 'GIN'], 1, 'B-tree is the default general-purpose index type.'),
    m('What does a composite index require?', ['All columns used', 'Leading column filtered', 'Exact column match', 'Equal number of columns'], 1, 'The leading column of the index must be used in the query WHERE clause.'),
    m('What trade-off do indexes have?', ['Faster reads, slower writes', 'Faster writes, slower reads', 'More disk, faster writes', 'No trade-offs'], 0, 'Indexes speed up SELECT but slow down INSERT/UPDATE/DELETE.'),
    m('What is an index-only scan?', ['No index used', 'All data from index', 'Partial index scan', 'Full table scan'], 1, 'Index-only scan reads only the index without touching the table.'),
    m('Which index type supports array containment?', ['B-tree', 'Hash', 'GIN', 'GiST'], 2, 'GIN indexes are optimized for array and JSONB containment queries.'),
    m('What is a partial index?', ['Incomplete index', 'Index with WHERE', 'Index on part of column', 'Broken index'], 1, 'A partial index is created with a WHERE clause, indexing only a subset of rows.')
  ]
);

/* =================== TOPIC 18: Views =================== */
addTopic('sql-views', 'Views & Materialized Views', 'intermediate', 25,
  ['A view is a saved SQL query that acts like a virtual table. It does not store data itself — it runs the query each time.',
   'Views simplify complex queries, provide security (hide columns/rows), and create a logical data layer.',
   'Materialized views (PostgreSQL) store the query result physically, enabling fast reads but requiring refresh.',
   'Updatable views allow INSERT/UPDATE/DELETE through the view under certain conditions.'
  ],
  'A view is like a saved search filter on your email. Instead of typing the search every time, you save it as a Smart Folder. Every time you open it, it shows current results. A materialized view is like taking a screenshot of the results — instant to view but outdated until refreshed.',
  [
    d('Creating Views', 'CREATE VIEW view_name AS SELECT ... — creates a virtual table. Simple views can be updated. WITH CHECK OPTION prevents inserting rows that would not be visible through the view. Views can reference other views (view chaining).'),
    d('Updatable Views', 'Simple views on a single table without aggregates, DISTINCT, GROUP BY, or set operations are automatically updatable. WITH LOCAL/CASCADED CHECK OPTION controls whether inserts/updates must satisfy the view WHERE condition.'),
    d('Materialized Views (PostgreSQL)', 'CREATE MATERIALIZED VIEW mv AS SELECT ... WITH DATA — stores query results physically. Faster reads than regular views. Must be refreshed: REFRESH MATERIALIZED VIEW mv. CONCURRENTLY option allows reads during refresh.'),
    d('View Use Cases', 'Security: expose only specific columns (hide salary column). Simplification: complex JOINs become simple FROM view. Consistency: standardize query patterns. Migration: views maintain backward compatibility when schemas change.'),
    d('Performance Considerations', 'Regular views have no performance benefit — they inline the query. Nested views can be slow (multiple layers of inlining). Materialized views are fast but stale. Indexes can be created on materialized views for maximum speed.')
  ],
  'Views are a powerful tool for encapsulation, security, and simplicity. Use regular views as query shortcuts and security layers. Use materialized views for expensive queries that don\'t need real-time data.',
  [
    q('What is a view?', 'A saved SQL query that behaves like a virtual table. Does not store data — executes the query each time it is accessed.'),
    q('What is the difference between a view and a materialized view?', 'Regular view runs the query each time (no storage). Materialized view stores results physically (faster reads, stale data possible).'),
    q('Can you insert data through a view?', 'Yes, for simple views on a single table without aggregates, DISTINCT, GROUP BY, or set operations.'),
    q('What does WITH CHECK OPTION do?', 'Prevents INSERT or UPDATE operations that would create rows not visible in the view.'),
    q('How do you refresh a materialized view?', 'REFRESH MATERIALIZED VIEW view_name. In PostgreSQL, CONCURRENTLY option allows reads during refresh.'),
    q('What are the security benefits of views?', 'Grant access to views without granting access to underlying tables. Expose only necessary columns (hide sensitive data).'),
    q('Can views improve performance?', 'Regular views do not improve performance — they just inline the query. Materialized views can significantly improve read performance.'),
    q('Can a view reference another view?', 'Yes. Views can be chained. Be careful — deep nesting becomes hard to debug and can perform poorly.'),
    q('What happens when you DROP a table referenced by a view?', 'The view becomes invalid. Any query using it will error until the table is recreated or the view is dropped.'),
    q('Can you create indexes on a view?', 'On regular views: no (they are virtual). On materialized views: yes, indexes can be created for faster queries.')
  ],
  R(10,35,130,25,'#0070f3','','CREATE VIEW','Saved query') +
  A(140,48,170,48) +
  R(180,35,130,25,'#28a745','','Query View','Virtual table') +
  A(180,60,180,80) +
  R(10,70,130,25,'#ffc107','','MATERIALIZED','Stored result') +
  A(140,83,170,83) +
  R(180,75,130,25,'#dc3545','','REFRESH','Update data') +
  R(320,35,160,90,'#17a2b8','','Views vs Materialized','Query shortcut vs cached result. Trade-off: freshness vs speed.') +
  T(240,200,'Views: Virtual tables for query simplification, security, and data abstraction.',9,'#666','middle'),
  [
    e('Creating a Simple View', 'Encapsulate complex query.', codeBlock([
      "CREATE VIEW employee_details AS",
      "SELECT e.name, e.salary, d.department_name",
      "FROM employees e",
      "JOIN departments d ON e.dept_id = d.id",
      "WHERE e.status = 'active';",
      '',
      '-- Use the view like a table:',
      'SELECT * FROM employee_details ORDER BY salary DESC;'
    ]), 'Creates a simplified view of active employees with department names.'),
    e('Updatable View with CHECK OPTION', 'Controlled data entry.', codeBlock([
      "CREATE VIEW engineering_employees AS",
      "SELECT id, name, salary, dept_id",
      "FROM employees",
      "WHERE dept_id = 3",
      "WITH CHECK OPTION;",
      '',
      '-- This INSERT is allowed:',
      "INSERT INTO engineering_employees (name, salary, dept_id)",
      "VALUES ('John', 75000, 3);",
      '',
      '-- This INSERT is rejected by CHECK OPTION:',
      "INSERT INTO engineering_employees (name, salary, dept_id)",
      "VALUES ('Jane', 80000, 5); -- dept_id 5 not visible"
    ]), 'WITH CHECK OPTION ensures data integrity through the view.'),
    e('Materialized View', 'Expensive query caching.', codeBlock([
      "CREATE MATERIALIZED VIEW monthly_sales_summary AS",
      "SELECT",
      "  DATE_TRUNC('month', order_date) AS month,",
      "  product_id,",
      "  COUNT(*) AS orders,",
      "  SUM(amount) AS total_sales",
      "FROM orders",
      "GROUP BY month, product_id",
      "WITH DATA;",
      '',
      '-- Refresh periodically:',
      'REFRESH MATERIALIZED VIEW monthly_sales_summary;'
    ]), 'Stores pre-computed monthly sales for instant dashboard queries.'),
    e('Indexing a Materialized View', 'Maximize materialized view speed.', codeBlock([
      'CREATE INDEX idx_mv_month_product',
      'ON monthly_sales_summary(month, product_id);',
      '',
      '-- Now this query runs extremely fast:',
      'SELECT * FROM monthly_sales_summary',
      'WHERE month = \'2024-01-01\' AND product_id = 5;'
    ]), 'Materialized views support indexes like regular tables.'),
    e('View for Security', 'Hide sensitive columns.', codeBlock([
      "CREATE VIEW public_employee_info AS",
      "SELECT id, name, department, email",
      "FROM employees;",
      '',
      '-- Grant access without exposing salary:',
      'GRANT SELECT ON public_employee_info TO hr_readers;'
    ]), 'Exposes only non-sensitive employee information to specific roles.')
  ],
  [
    m('What is a view?', ['A stored result set', 'A saved query', 'A temporary table', 'A copy of data'], 1, 'A view is a saved SQL query that acts like a virtual table.'),
    m('How does a materialized view differ?', ['Faster queries', 'Stores data physically', 'Is automatically updated', 'Cannot be indexed'], 1, 'Materialized views store query results as a physical table.'),
    m('What command refreshes a materialized view?', ['UPDATE MATERIALIZED VIEW', 'REFRESH MATERIALIZED VIEW', 'REBUILD VIEW', 'RECALC VIEW'], 1, 'REFRESH MATERIALIZED VIEW updates the stored data.'),
    m('What does WITH CHECK OPTION prevent?', ['SQL injection', 'Invalid data entry', 'Duplicate rows', 'Slow queries'], 1, 'WITH CHECK OPTION prevents entering data invisible through the view.'),
    m('Can you index a regular view?', ['Yes', 'No', 'Only in PostgreSQL', 'Only materialized views'], 1, 'Regular views are virtual — they cannot be indexed.'),
    m('What happens when underlying table is dropped?', ['View still works', 'View becomes invalid', 'View auto-drops', 'Data is preserved'], 1, 'The view becomes invalid when its underlying table is dropped.')
  ]
);

/* =================== TOPIC 19: Transactions =================== */
addTopic('sql-transactions', 'Transactions & ACID', 'intermediate', 30,
  ['A transaction is a unit of work that is executed as a whole — all steps succeed or all are rolled back.',
   'ACID: Atomicity (all or nothing), Consistency (valid state to valid state), Isolation (concurrent transactions don\'t interfere), Durability (committed data persists).',
   'BEGIN / START TRANSACTION starts a transaction. COMMIT saves changes. ROLLBACK undoes changes since BEGIN.',
   'PostgreSQL uses auto-commit by default. MySQL uses auto-commit by default. Both support explicit transaction control.'
  ],
  'A transaction is like a bank transfer: money leaves account A and arrives at account B. If the system crashes after step 1, the entire transaction rolls back — account A gets the money back. Both steps succeed together or fail together.',
  [
    d('Transaction Control Statements', 'BEGIN / START TRANSACTION — begin. COMMIT — save all changes since BEGIN. ROLLBACK — undo all changes since BEGIN. SAVEPOINT sp_name — set a savepoint within a transaction. ROLLBACK TO SAVEPOINT — roll back to savepoint. RELEASE SAVEPOINT — discard savepoint.'),
    d('Isolation Levels (ANSI Standard)', 'READ UNCOMMITTED: dirty reads allowed. READ COMMITTED: no dirty reads (PostgreSQL default). REPEATABLE READ: no dirty/non-repeatable reads. SERIALIZABLE: fully isolated (highest level, lowest concurrency).'),
    d('PostgreSQL Isolation Behavior', 'Default: READ COMMITTED. REPEATABLE READ prevents non-repeatable reads but allows phantom reads. SERIALIZABLE uses SSI (Serializable Snapshot Isolation). PostgreSQL does not support READ UNCOMMITTED (upgrades to READ COMMITTED).'),
    d('Lost Updates and Race Conditions', 'Lost update: two transactions read same value, both modify it, last commit overwrites first. Solution: SELECT ... FOR UPDATE (row-level locking). Optimistic locking: version column with increment on update.'),
    d('Deadlocks', 'Transaction A locks row 1, needs row 2. Transaction B locks row 2, needs row 1. Neither can proceed. Database detects deadlocks and kills one transaction. Prevention: consistent lock ordering in application code.')
  ],
  'Transaction management is critical for data integrity in multi-user systems. Understanding isolation levels helps balance consistency and performance. Always use transactions for multi-step operations that must be atomic.',
  [
    q('What is a transaction?', 'A unit of work that is atomic — all changes succeed (COMMIT) or all are undone (ROLLBACK).'),
    q('What does ACID stand for?', 'Atomicity, Consistency, Isolation, Durability. The four properties of reliable database transactions.'),
    q('What does COMMIT do?', 'Saves all changes made in the current transaction to the database permanently.'),
    q('What does ROLLBACK do?', 'Undoes all changes made since the transaction began (or since a savepoint).'),
    q('What is a dirty read?', 'Reading uncommitted data from another transaction. Prevented by READ COMMITTED isolation level.'),
    q('What is the default isolation level in PostgreSQL?', 'READ COMMITTED. Prevents dirty reads but allows non-repeatable reads.'),
    q('What is the highest isolation level?', 'SERIALIZABLE. Ensures complete isolation but has the lowest concurrency.'),
    q('What is SELECT ... FOR UPDATE?', 'Locks the selected rows for update, preventing other transactions from modifying them until the transaction ends.'),
    q('What is a deadlock?', 'Two or more transactions waiting for each other\'s locks. The database detects and resolves by aborting one transaction.'),
    q('How do you prevent deadlocks?', 'Access resources in a consistent order across all transactions. Keep transactions short. Use appropriate isolation levels.')
  ],
  R(10,35,100,25,'#0070f3','','BEGIN','Start TX') +
  A(110,48,140,48) +
  R(150,35,100,25,'#28a745','','COMMIT','Save') +
  R(150,65,100,25,'#ffc107','','ROLLBACK','Undo') +
  R(150,95,100,25,'#dc3545','','SAVEPOINT','Partial undo') +
  A(250,48,280,48) + A(250,78,280,78) + A(250,108,280,108) +
  R(290,35,190,100,'#17a2b8','','ACID Properties','Atomicity, Consistency, Isolation, Durability — reliable transactions.') +
  T(240,175,'Transactions: ACID-compliant units of work for reliable data operations.',9,'#666','middle'),
  [
    e('Basic Transaction', 'Money transfer between accounts.', codeBlock([
      'BEGIN;',
      '',
      "UPDATE accounts SET balance = balance - 100 WHERE id = 1;",
      "UPDATE accounts SET balance = balance + 100 WHERE id = 2;",
      '',
      '-- If both succeed:',
      'COMMIT;',
      '',
      '-- If anything fails:',
      'ROLLBACK;'
    ]), 'Atomic transfer — both updates commit or both roll back.'),
    e('Savepoints', 'Partial rollback within transaction.', codeBlock([
      'BEGIN;',
      "INSERT INTO audit_log (action) VALUES ('step 1');",
      'SAVEPOINT sp1;',
      "INSERT INTO audit_log (action) VALUES ('step 2');",
      '',
      '-- Oops, step 2 was wrong:',
      'ROLLBACK TO SAVEPOINT sp1;',
      "INSERT INTO audit_log (action) VALUES ('step 2 corrected');",
      'COMMIT;'
    ]), 'Savepoints allow rolling back part of a transaction without aborting entirely.'),
    e('Row-Level Locking', 'Prevent race conditions.', codeBlock([
      'BEGIN;',
      '',
      '-- Lock the inventory row:',
      "SELECT quantity FROM products WHERE id = 10",
      "FOR UPDATE;",
      '',
      '-- Check and update safely:',
      "UPDATE products SET quantity = quantity - 1",
      "WHERE id = 10 AND quantity > 0;",
      '',
      'COMMIT;'
    ]), 'SELECT FOR UPDATE prevents lost updates in concurrent environments.'),
    e('Isolation Level Demonstration', 'Setting isolation level.', codeBlock([
      '-- Set isolation for current transaction:',
      'BEGIN;',
      'SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;',
      '',
      "SELECT SUM(balance) FROM accounts WHERE user_id = 5;",
      "UPDATE accounts SET balance = balance * 1.05 WHERE user_id = 5;",
      '',
      'COMMIT;'
    ]), 'SERIALIZABLE isolation ensures the SELECT result is consistent with the UPDATE.'),
    e('Deadlock Detection', 'PostgreSQL deadlock handling.', codeBlock([
      '-- Session 1:',
      'BEGIN; UPDATE accounts SET balance = 0 WHERE id = 1;',
      '',
      '-- Session 2:',
      'BEGIN; UPDATE accounts SET balance = 0 WHERE id = 2;',
      '',
      '-- Session 1:',
      'UPDATE accounts SET balance = 100 WHERE id = 2; -- waits',
      '',
      '-- Session 2:',
      'UPDATE accounts SET balance = 100 WHERE id = 1;',
      '-- One session gets: ERROR: deadlock detected',
      '-- The other session succeeds'
    ]), 'PostgreSQL automatically detects and resolves deadlocks.' )
  ],
  [
    m('What does COMMIT do?', ['Undoes changes', 'Saves changes permanently', 'Starts a transaction', 'Locks tables'], 1, 'COMMIT permanently saves all changes in the current transaction.'),
    m('What does ACID stand for?', ['Auto-Commit Isolation Durability', 'Atomicity Consistency Isolation Durability', 'Atomic Consistency Isolation Data', 'All Committed Integrity Data'], 1, 'ACID: Atomicity, Consistency, Isolation, Durability.'),
    m('What is the default isolation in PostgreSQL?', ['READ UNCOMMITTED', 'READ COMMITTED', 'REPEATABLE READ', 'SERIALIZABLE'], 1, 'READ COMMITTED is the PostgreSQL default.'),
    m('What prevents dirty reads?', ['READ UNCOMMITTED', 'READ COMMITTED', 'REPEATABLE READ', 'Both B and C'], 3, 'READ COMMITTED and higher prevent dirty reads.'),
    m('What does SELECT FOR UPDATE do?', ['Locks selected rows', 'Creates a view', 'Updates selected rows', 'Deletes old data'], 0, 'SELECT FOR UPDATE locks rows for update, preventing concurrent modifications.'),
    m('What is a deadlock?', ['Slow query', 'Two TX waiting on each other', 'Locked table', 'Out of memory'], 1, 'Deadlock occurs when transactions wait for locks held by each other.')
  ]
);

/* =================== TOPIC 20: String Functions =================== */
addTopic('sql-string-functions', 'String Functions', 'beginner', 20,
  ['String functions manipulate text data. Common operations: concatenation, case conversion, trimming, extraction, and pattern replacement.',
   'PostgreSQL and MySQL have different function names. PostgreSQL uses || for concatenation; MySQL uses CONCAT().',
   'SUBSTRING extracts parts of strings. POSITION/CHARINDEX finds substring location. REPLACE substitutes text.',
   'TRIM, LTRIM, RTRIM remove whitespace. UPPER/LOWER convert case. LENGTH returns character count.'
  ],
  'String functions are like editing tools for text. CONCAT is copy-paste, SUBSTRING is cutting out a piece, UPPER/LOWER is changing case, TRIM is trimming ragged edges, REPLACE is find-and-replace.',
  [
    d('Concatenation', 'PostgreSQL: \'Hello\' || \' \' || \'World\' or CONCAT(\'Hello\', \' \', \'World\'). MySQL: CONCAT(\'Hello\', \' \', \'World\'). SQL Server: \'Hello\' + \' \' + \'World\'. CONCAT ignores NULLs; || and + propagate NULLs.'),
    d('Case Conversion', 'UPPER(string) — all uppercase. LOWER(string) — all lowercase. INITCAP(string) / PostgreSQL: capitalize first letter of each word. Case-insensitive comparison: WHERE LOWER(name) = LOWER(\'John\').'),
    d('Substring Extraction', 'SUBSTRING(string FROM start FOR length) or SUBSTRING(string, pattern). LEFT(string, n) — first n chars. RIGHT(string, n) — last n chars. SPLIT_PART(string, delimiter, position) — splits and returns specific part.'),
    d('Search and Replace', 'POSITION(\'sub\' IN string) — find position (PostgreSQL). STRPOS(string, \'sub\') in PostgreSQL. CHARINDEX(\'sub\', string) in SQL Server. REPLACE(string, \'old\', \'new\') — substitution.'),
    d('Trimming and Padding', 'TRIM(string) — remove leading/trailing whitespace. TRIM(LEADING \'0\' FROM string) — specific char trim. LTRIM, RTRIM. LPAD(string, length, \'fill\') — pad left. RPAD — pad right.')
  ],
  'String functions are essential for data cleaning, formatting, and transformation in SQL queries. Knowing the database-specific function names is important for cross-platform compatibility.',
  [
    q('How do you concatenate strings in PostgreSQL?', 'Use || operator: \'Hello\' || \' \' || \'World\'. Or CONCAT(\'Hello\', \'World\').'),
    q('How do you convert text to uppercase?', 'UPPER(column). For lowercase: LOWER(column).'),
    q('How do you extract part of a string?', 'SUBSTRING(column FROM start FOR length). Or LEFT(column, n), RIGHT(column, n).'),
    q('How do you find the position of a substring?', 'POSITION(\'sub\' IN column) in PostgreSQL. STRPOS(column, \'sub\') also works.'),
    q('How do you replace text in a string?', 'REPLACE(column, \'old\', \'new\') replaces all occurrences.'),
    q('How do you remove whitespace?', 'TRIM(column) removes leading and trailing whitespace. LTRIM for leading, RTRIM for trailing.'),
    q('How do you pad a string?', 'LPAD(column, length, \'fill_char\') pads left. RPAD pads right.'),
    q('What function splits a string by delimiter?', 'SPLIT_PART(string, delimiter, position) in PostgreSQL. Returns the nth part.'),
    q('How do you get string length?', 'LENGTH(column) returns number of characters. OCTET_LENGTH returns bytes.'),
    q('How does CONCAT handle NULLs?', 'CONCAT ignores NULLs. || propagates NULLs (PostgreSQL). Use COALESCE to handle NULLs.')
  ],
  R(10,35,100,25,'#0070f3','','CONCAT','Join strings') +
  R(10,65,100,25,'#28a745','','UPPER/LOWER','Case') +
  R(10,95,100,25,'#ffc107','','SUBSTRING','Extract') +
  R(10,125,100,25,'#dc3545','','REPLACE','Substitute') +
  R(10,155,100,25,'#e83e8c','','TRIM','Clean') +
  A(110,48,140,48) + A(110,78,140,78) + A(110,108,140,108) + A(110,138,140,138) + A(110,168,140,168) +
  R(150,35,230,155,'#17a2b8','','String Functions','Text manipulation: concatenation, extraction, search, replace, and cleaning.') +
  T(240,220,'String Functions: Manipulate text with CONCAT, SUBSTRING, REPLACE, TRIM, and more.',9,'#666','middle'),
  [
    e('Basic String Operations', 'Common text transformations.', codeBlock([
      "SELECT",
      "  UPPER(name) AS uppercase,",
      "  LOWER(email) AS lowercase,",
      "  LENGTH(name) AS name_length,",
      "  TRIM(prefix || ' ' || name) AS full_name",
      "FROM employees;"
    ]), 'Demonstrates case conversion, length, concatenation, and trimming.'),
    e('Substring and Position', 'Extracting parts of strings.', codeBlock([
      "SELECT",
      "  email,",
      "  SUBSTRING(email FROM 1 FOR POSITION('@' IN email) - 1) AS username,",
      "  SUBSTRING(email FROM POSITION('@' IN email) + 1) AS domain",
      "FROM employees;"
    ]), 'Extracts username and domain from email addresses.'),
    e('REPLACE and SPLIT_PART', 'Text cleaning and parsing.', codeBlock([
      "SELECT",
      "  phone,",
      "  REPLACE(REPLACE(REPLACE(phone, '-', ''), '(', ''), ')', '') AS clean_phone,",
      "  SPLIT_PART(full_name, ' ', 1) AS first_name,",
      "  SPLIT_PART(full_name, ' ', 2) AS last_name",
      "FROM contacts;"
    ]), 'Cleans phone numbers and splits full names.'),
    e('Padding for Formatting', 'Fixed-width text output.', codeBlock([
      "SELECT",
      "  LPAD(id::TEXT, 5, '0') AS formatted_id,",
      "  RPAD(name, 20, '.') AS padded_name,",
      "  LPAD(salary::TEXT, 10, ' ') AS formatted_salary",
      "FROM employees",
      "ORDER BY id;"
    ]), 'Creates fixed-width formatted output using LPAD and RPAD.'),
    e('String Aggregation', 'Combine values into one string.', codeBlock([
      "SELECT",
      "  department,",
      "  STRING_AGG(name, ', ' ORDER BY name) AS employee_list,",
      "  COUNT(*) AS count",
      "FROM employees",
      "GROUP BY department;"
    ]), 'Aggregates employee names per department into comma-separated lists.')
  ],
  [
    m('What does UPPER() do?', ['Lowers case', 'Capitalizes all letters', 'Capitalizes first letter', 'Removes uppercase'], 1, 'UPPER() converts text to uppercase.'),
    m('How do you concatenate in PostgreSQL?', ['+', '||', '&', 'CONCATENATE'], 1, 'PostgreSQL uses || for concatenation.'),
    m('What does TRIM() remove?', ['Numbers', 'Whitespace', 'Punctuation', 'Vowels'], 1, 'TRIM removes leading and trailing whitespace.'),
    m('Which function replaces text?', ['CHANGE', 'REPLACE', 'MODIFY', 'ALTER'], 1, 'REPLACE() substitutes occurrences of a substring.'),
    m('What does SPLIT_PART return?', ['Split string count', 'Specific part by position', 'First word', 'Delimiter position'], 1, 'SPLIT_PART returns the nth part of a split string.'),
    m('How does CONCAT handle NULL?', ['Returns NULL', 'Ignores NULL', 'Errors', 'Converts to empty string'], 1, 'CONCAT ignores NULL arguments; || propagates NULLs.')
  ]
);

/* =================== TOPIC 21: Date/Time Functions =================== */
addTopic('sql-date-functions', 'Date/Time Functions', 'beginner', 20,
  ['SQL date/time functions handle date arithmetic, extraction, formatting, and conversion.',
   'CURRENT_DATE returns today\'s date. CURRENT_TIMESTAMP / NOW() returns current date and time.',
   'EXTRACT or DATE_PART retrieves specific parts (year, month, day, hour) from dates/timestamps.',
   'Date arithmetic: date + INTERVAL \'1 day\', AGE() for difference between dates, DATEDIFF() in MySQL.'
  ],
  'Date/time functions are like a calendar and clock built into the database. You can add days, find the difference between dates, extract the month, or format dates for display.',
  [
    d('Current Date/Time', 'CURRENT_DATE — today. CURRENT_TIME — current time. CURRENT_TIMESTAMP — date + time. NOW() — same as CURRENT_TIMESTAMP. LOCALTIME / LOCALTIMESTAMP — without timezone. PostgreSQL supports all of these.'),
    d('EXTRACT and DATE_PART', 'EXTRACT(YEAR FROM timestamp) — get year. EXTRACT(MONTH FROM date). EXTRACT(DOW FROM date) — day of week (0=Sunday). PostgreSQL also supports DATE_PART(\'year\', timestamp). MySQL: EXTRACT and YEAR(), MONTH(), DAY() functions.'),
    d('Date Arithmetic', 'PostgreSQL: date + INTERVAL \'1 day\', date - INTERVAL \'3 months\', date + integer (adds days). AGE(date1, date2) returns interval. MySQL: DATE_ADD(date, INTERVAL 1 DAY), DATEDIFF(date1, date2).'),
    d('Formatting Dates', 'TO_CHAR(timestamp, \'YYYY-MM-DD\') — format date as string (PostgreSQL). TO_CHAR(timestamp, \'Mon DD, YYYY\') — \'Jan 15, 2024\'. MySQL: DATE_FORMAT(date, \'%Y-%m-%d\').'),
    d('Date Truncation', 'DATE_TRUNC(\'month\', timestamp) — truncates to first of month (PostgreSQL). DATE_TRUNC(\'year\', timestamp) — truncates to Jan 1. Essential for grouping by month/year: GROUP BY DATE_TRUNC(\'month\', order_date).')
  ],
  'Date/time functions are essential for reporting, aging analysis, and time-based grouping. PostgreSQL has the most comprehensive date/time support of any SQL database.',
  [
    q('How do you get today\'s date?', 'CURRENT_DATE returns the current date. CURRENT_TIMESTAMP and NOW() return date and time.'),
    q('How do you extract the year from a date?', 'EXTRACT(YEAR FROM date_column). PostgreSQL also supports DATE_PART(\'year\', date_column).'),
    q('How do you add days to a date?', 'PostgreSQL: date + INTERVAL \'7 days\' or date + 7. MySQL: DATE_ADD(date, INTERVAL 7 DAY).'),
    q('How do you find the difference between two dates?', 'PostgreSQL: AGE(end_date, start_date) returns interval. MySQL: DATEDIFF(end_date, start_date) returns days.'),
    q('How do you format a date as a string?', 'PostgreSQL: TO_CHAR(date, \'YYYY-MM-DD\'). MySQL: DATE_FORMAT(date, \'%Y-%m-%d\').'),
    q('What does DATE_TRUNC do?', 'Truncates a timestamp to a specified precision. DATE_TRUNC(\'month\', date) returns first day of month at midnight.'),
    q('What is the difference between TIMESTAMP and TIMESTAMPTZ?', 'TIMESTAMP stores date/time without timezone. TIMESTAMPTZ (TIMESTAMP WITH TIME ZONE) stores with timezone and converts to UTC.'),
    q('How do you get the day of week?', 'EXTRACT(DOW FROM date) — 0=Sunday, 6=Saturday (PostgreSQL). MySQL: DAYOFWEEK(date) — 1=Sunday.'),
    q('How do you get the last day of the month?', 'PostgreSQL: (DATE_TRUNC(\'month\', date) + INTERVAL \'1 month\' - INTERVAL \'1 day\')::DATE.'),
    q('Can you index date columns?', 'Yes. B-tree indexes work well for date columns, especially for range queries and ORDER BY.')
  ],
  R(10,35,100,25,'#0070f3','','NOW()','Current time') +
  R(10,65,100,25,'#28a745','','EXTRACT','Get part') +
  R(10,95,100,25,'#ffc107','','+ INTERVAL','Add time') +
  R(10,125,100,25,'#dc3545','','AGE()','Difference') +
  R(10,155,100,25,'#e83e8c','','TO_CHAR','Format') +
  A(110,48,140,48) + A(110,78,140,78) + A(110,108,140,108) + A(110,138,140,138) + A(110,168,140,168) +
  R(150,35,230,155,'#17a2b8','','Date/Time Functions','Manipulate, extract, format, and compute with dates and timestamps.') +
  T(240,220,'Date/Time Functions: Date arithmetic, extraction, formatting, and timezone handling.',9,'#666','middle'),
  [
    e('Current Timestamp Variations', 'Getting current date/time.', codeBlock([
      'SELECT',
      '  CURRENT_DATE AS today,',
      '  CURRENT_TIME AS time_now,',
      '  CURRENT_TIMESTAMP AS ts_now,',
      '  NOW() AS now,',
      '  LOCALTIMESTAMP AS local_ts;'
    ]), 'Shows various ways to get current date and time in PostgreSQL.'),
    e('EXTRACT for Reporting', 'Analyze orders by time parts.', codeBlock([
      'SELECT',
      '  EXTRACT(YEAR FROM order_date) AS year,',
      '  EXTRACT(MONTH FROM order_date) AS month,',
      '  EXTRACT(DOW FROM order_date) AS day_of_week,',
      '  COUNT(*) AS orders',
      'FROM orders',
      'GROUP BY year, month, day_of_week',
      'ORDER BY year, month;'
    ]), 'Breaks down orders by year, month, and day of week.'),
    e('Date Arithmetic', 'Find pending actions.', codeBlock([
      "SELECT",
      "  name, last_login,",
      "  AGE(CURRENT_DATE, last_login) AS time_since_login,",
      "  last_login + INTERVAL '90 days' AS expiry_date",
      "FROM users",
      "WHERE last_login < CURRENT_DATE - INTERVAL '30 days'",
      "ORDER BY last_login;"
    ]), 'Finds inactive users and calculates their account expiry.'),
    e('DATE_TRUNC for Grouping', 'Monthly sales aggregation.', codeBlock([
      'SELECT',
      '  DATE_TRUNC(\'month\', order_date) AS month,',
      '  COUNT(*) AS orders,',
      '  SUM(amount) AS total_sales',
      'FROM orders',
      'WHERE order_date >= \'2024-01-01\'',
      'GROUP BY DATE_TRUNC(\'month\', order_date)',
      'ORDER BY month;'
    ]), 'Groups orders by month using date truncation.'),
    e('TO_CHAR Formatting', 'User-friendly date display.', codeBlock([
      "SELECT",
      "  TO_CHAR(order_date, 'Mon DD, YYYY') AS formatted_date,",
      "  TO_CHAR(order_date, 'Day') AS weekday,",
      "  TO_CHAR(order_date, 'HH12:MI AM') AS time_of_day",
      "FROM orders",
      "LIMIT 5;"
    ]), 'Formats dates and times for display in reports.')
  ],
  [
    m('Which function returns current date and time?', ['CURRENT_DATE', 'CURRENT_TIMESTAMP', 'CURRENT_TIME', 'TODAY()'], 1, 'CURRENT_TIMESTAMP returns current date and time.'),
    m('What does EXTRACT(YEAR FROM date) do?', ['Adds a year', 'Gets the year part', 'Removes year', 'Converts to year'], 1, 'EXTRACT retrieves a specific date part.'),
    m('How do you add 7 days to a date in PostgreSQL?', ['date + 7', 'date + INTERVAL \'7 days\'', 'DATE_ADD(date, 7)', 'Both A and B'], 3, 'PostgreSQL accepts date + integer (days) or date + INTERVAL.'),
    m('What does AGE() return?', ['Years only', 'An interval', 'Days only', 'A timestamp'], 1, 'AGE() returns the interval between two dates.'),
    m('What does DATE_TRUNC(\'month\', ts) do?', ['Removes month', 'First day of month', 'Last day of month', 'Middle of month'], 1, 'DATE_TRUNC truncates to the specified precision — first day of month.'),
    m('Which function formats dates?', ['FORMAT_DATE', 'TO_CHAR', 'DATE_FORMAT', 'Both B and C'], 3, 'TO_CHAR (PostgreSQL) and DATE_FORMAT (MySQL) format dates.')
  ]
);

/* =================== TOPIC 22: Conditional Expressions =================== */
addTopic('sql-conditional-expressions', 'Conditional Expressions', 'intermediate', 20,
  ['Conditional expressions enable if-then-else logic within SQL queries without procedural code.',
   'CASE is the most versatile conditional expression with two syntaxes: simple CASE (equality) and searched CASE (arbitrary conditions).',
   'COALESCE returns the first non-NULL value from a list. NULLIF returns NULL if two values are equal.',
   'GREATEST and LEAST return the maximum/minimum value from a list of expressions.'
  ],
  'CASE is like a switch statement in programming — it lets you transform values based on conditions. COALESCE is a safety net that catches NULLs and replaces them with defaults. NULLIF is the opposite — it creates NULLs intentionally.',
  [
    d('CASE Syntax Variants', 'Simple CASE: CASE column WHEN value1 THEN result1 WHEN value2 THEN result2 ELSE default END. Searched CASE: CASE WHEN condition1 THEN result1 WHEN condition2 THEN result2 ELSE default END. Searched allows any boolean expression, ranges, and subqueries.'),
    d('COALESCE and IFNULL', 'COALESCE(val1, val2, val3, ...) — returns first non-NULL. Takes multiple arguments, any data type. IFNULL(val1, val2) — two-argument version (MySQL). COALESCE is standard SQL.'),
    d('NULLIF', 'NULLIF(val1, val2) — returns NULL if val1 = val2, otherwise returns val1. Useful for preventing division by zero: NULLIF(denominator, 0). Also used to convert specific values to NULL for aggregate functions.'),
    d('GREATEST and LEAST', 'GREATEST(val1, val2, val3) — returns the largest value. LEAST returns the smallest. Works with numbers, strings, dates. NULLs cause NULL return (use COALESCE within).'),
    d('CASE in Different Clauses', 'CASE in SELECT transforms output. CASE in WHERE creates conditional filters. CASE in ORDER BY customizes sort order. CASE in GROUP BY creates conditional groupings. CASE in UPDATE provides conditional values.')
  ],
  'Conditional expressions bring programming logic to SQL. CASE is the workhorse, COALESCE handles NULLs elegantly, and NULLIF prevents division errors. Master these to write more flexible and robust queries.',
  [
    q('What is the searched CASE expression?', 'CASE WHEN condition THEN result ... END. Allows any boolean conditions, not just equality.'),
    q('What is the difference between simple and searched CASE?', 'Simple CASE checks equality against a single expression. Searched CASE evaluates independent boolean conditions.'),
    q('What does COALESCE do?', 'Returns the first non-NULL argument. Takes 2+ arguments of compatible types.'),
    q('What does NULLIF do?', 'Returns NULL if both arguments are equal. Otherwise returns the first argument.'),
    q('How do you prevent division by zero?', 'Use: value / NULLIF(denominator, 0). Returns NULL instead of error when denominator is 0.'),
    q('What does GREATEST do?', 'Returns the maximum value from a list of expressions. Opposite of LEAST.'),
    q('Can CASE be used in WHERE?', 'Yes. WHERE CASE WHEN condition THEN true ELSE false END. But often a simpler boolean expression works better.'),
    q('Can CASE be used in ORDER BY?', 'Yes. ORDER BY CASE WHEN department = \'Engineering\' THEN 1 ELSE 2 END — custom sort order.'),
    q('Can CASE be used in GROUP BY?', 'Yes. GROUP BY CASE WHEN salary > 100000 THEN \'High\' WHEN salary > 50000 THEN \'Medium\' ELSE \'Low\' END.'),
    q('What happens if no ELSE in CASE?', 'The CASE expression returns NULL when no condition matches. Always include ELSE for safety.')
  ],
  R(10,35,100,25,'#0070f3','','CASE','If-then-else') +
  R(10,65,100,25,'#28a745','','COALESCE','First non-NULL') +
  R(10,95,100,25,'#ffc107','','NULLIF','Create NULL') +
  R(10,125,100,25,'#dc3545','','GREATEST','Max value') +
  R(10,155,100,25,'#e83e8c','','LEAST','Min value') +
  A(110,48,140,48) + A(110,78,140,78) + A(110,108,140,108) + A(110,138,140,138) + A(110,168,140,168) +
  R(150,35,230,155,'#17a2b8','','Conditional Expressions','CASE, COALESCE, NULLIF — programming logic and NULL handling in SQL.') +
  T(240,220,'Conditional Expressions: CASE, COALESCE, NULLIF for flexible SQL logic.',9,'#666','middle'),
  [
    e('Searched CASE for Bucketing', 'Salary categories.', codeBlock([
      'SELECT',
      '  name, salary,',
      '  CASE',
      '    WHEN salary > 100000 THEN \'High\'',
      '    WHEN salary > 60000 THEN \'Medium\'',
      '    WHEN salary > 0 THEN \'Low\'',
      '    ELSE \'Unknown\'',
      '  END AS salary_bracket',
      'FROM employees',
      'ORDER BY salary DESC;'
    ]), 'Categorizes salaries into brackets using searched CASE.'),
    e('COALESCE for Default Values', 'Replace NULL with defaults.', codeBlock([
      'SELECT',
      '  name,',
      '  COALESCE(phone, \'No phone on file\') AS phone,',
      '  COALESCE(bonus, 0) AS bonus,',
      '  COALESCE(manager_id, 0) AS manager_id',
      'FROM employees;'
    ]), 'COALESCE provides fallback values for NULL columns.'),
    e('NULLIF to Prevent Division by Zero', 'Safe percentage calculation.', codeBlock([
      'SELECT',
      '  department,',
      '  COUNT(*) AS total,',
      '  SUM(CASE WHEN gender = \'F\' THEN 1 ELSE 0 END) AS female,',
      '  ROUND(SUM(CASE WHEN gender = \'F\' THEN 1 ELSE 0 END)',
      '    / NULLIF(COUNT(*), 0)::DECIMAL * 100, 2) AS female_pct',
      'FROM employees',
      'GROUP BY department;'
    ]), 'NULLIF prevents division by zero, returning NULL instead of an error.'),
    e('CASE in ORDER BY', 'Custom sort order for status.', codeBlock([
      "SELECT name, status, created_at",
      "FROM tasks",
      "ORDER BY",
      "  CASE status",
      "    WHEN 'critical' THEN 1",
      "    WHEN 'high' THEN 2",
      "    WHEN 'medium' THEN 3",
      "    WHEN 'low' THEN 4",
      "    ELSE 5",
      "  END,",
      "  created_at DESC;"
    ]), 'Custom sorting logic using CASE in ORDER BY clause.'),
    e('GREATEST and LEAST', 'Find extremes across columns.', codeBlock([
      'SELECT',
      '  student_name,',
      '  GREATEST(math, science, english) AS best_score,',
      '  LEAST(math, science, english) AS worst_score',
      'FROM exam_scores;'
    ]), 'GREATEST and LEAST find max/min across multiple columns per row.')
  ],
  [
    m('Which expression returns first non-NULL?', ['IFNULL', 'COALESCE', 'NULLIF', 'CASE'], 1, 'COALESCE returns the first non-NULL argument.'),
    m('When does NULLIF return NULL?', ['Always', 'When arguments are equal', 'When first is NULL', 'When second is NULL'], 1, 'NULLIF returns NULL when both arguments are equal.'),
    m('What is the ELSE value if omitted in CASE?', ['0', 'NULL', 'False', 'Empty string'], 1, 'CASE without ELSE returns NULL when no condition matches.'),
    m('Can CASE be used in ORDER BY?', ['Yes', 'No', 'Only in SELECT', 'Only in WHERE'], 0, 'CASE can be used in SELECT, WHERE, ORDER BY, GROUP BY, and HAVING.'),
    m('What does GREATEST(1, 5, 3) return?', ['1', '3', '5', '9'], 2, 'GREATEST returns the maximum value from the list (5).'),
    m('How do you safely divide in SQL?', ['value / 0', 'value / COALESCE(denom, 1)', 'value / NULLIF(denom, 0)', 'DIVIDE(value, denom)'], 2, 'NULLIF(denom, 0) returns NULL when denom is 0, preventing division by zero errors.')
  ]
);

/* =================== TOPIC 23: Stored Procedures & Functions =================== */
addTopic('sql-stored-procedures', 'Stored Procedures & Functions', 'advanced', 30,
  ['Stored procedures and functions are database-side programs written in SQL or procedural languages (PL/pgSQL).',
   'Stored procedures can perform transactions and do not return values. Functions must return a value and are used in SQL expressions.',
   'PostgreSQL uses CREATE FUNCTION for both functions and procedures (CREATE PROCEDURE added in PG 11).',
   'Benefits: performance (reduced network), security (encapsulation), reusability (write once, use everywhere).'
  ],
  'A stored procedure is like a macro or script saved in the database. Instead of sending five separate SQL statements, you send one CALL and the database does all five steps internally. It reduces network traffic and centralizes logic.',
  [
    d('Functions vs Procedures', 'Functions: CREATE FUNCTION, must return a value, used in SELECT/WHERE/expressions, cannot use transactions. Procedures: CREATE PROCEDURE, may return multiple result sets, called with CALL, can use transactions (PostgreSQL 11+).'),
    d('PL/pgSQL Language', 'PostgreSQL\'s procedural language. Syntax: $$ DECLARE ... BEGIN ... END; $$ LANGUAGE plpgsql. Supports variables, IF/ELSE, LOOP, WHILE, FOR, EXCEPTION handling, cursors, and dynamic SQL.'),
    d('Parameters', 'IN — input only (default). OUT — output only, like a return value. INOUT — both input and output. Parameters can have DEFAULT values. Named parameter syntax: func_name(param => value).'),
    d('Exception Handling', 'BEGIN ... EXCEPTION WHEN condition THEN ... END; — catch errors within a block. RAISE statement for custom error messages. GET DIAGNOSTICS for error details. Prevents transaction abortion from non-critical errors.'),
    d('Security: SQL Injection', 'Use parameterized queries (EXECUTE ... USING) instead of string concatenation in dynamic SQL. Set SECURITY DEFINER or SECURITY INVOKER to control execution privileges. Always validate input.')
  ],
  'Stored procedures and functions are powerful for encapsulating business logic in the database. Use them for complex multi-step operations, data validation, and scheduled tasks. PostgreSQL\'s PL/pgSQL is the most mature procedural extension.',
  [
    q('What is the difference between a function and a procedure?', 'Functions return a value and can be used in SQL expressions. Procedures can use transactions and are called with CALL.'),
    q('What is PL/pgSQL?', 'PostgreSQL\'s procedural language for writing functions and procedures. Supports variables, control structures, and error handling.'),
    q('How do you return a value from a function?', 'Use RETURN value; The function declares RETURNS type in its signature.'),
    q('Can stored procedures use transactions?', 'Yes, in PostgreSQL 11+ with CREATE PROCEDURE. Procedures can use COMMIT and ROLLBACK. Functions cannot.'),
    q('What are OUT parameters?', 'Output parameters that act like additional return values. Defined in the parameter list with OUT keyword.'),
    q('How do you handle errors in PL/pgSQL?', 'Using BEGIN ... EXCEPTION WHEN ... THEN ... END blocks within the function body.'),
    q('What is SECURITY DEFINER?', 'The function runs with the privileges of its owner, not the caller. Used for privilege escalation.'),
    q('What is dynamic SQL in PostgreSQL?', 'EXECUTE \'SELECT * FROM \' || table_name — constructing and running SQL strings. Use EXECUTE ... USING for parameterized dynamic SQL.'),
    q('How do you prevent SQL injection in dynamic SQL?', 'Always use EXECUTE ... USING for parameters. Never concatenate user input into SQL strings.'),
    q('Can you call a function from a SELECT?', 'Yes. SELECT function_name(args); Functions are first-class SQL expressions.')
  ],
  R(10,35,120,25,'#0070f3','','CREATE FUNCTION','Returns value') +
  R(10,65,120,25,'#28a745','','CREATE PROCEDURE','CALL only') +
  R(10,95,120,25,'#ffc107','','PL/pgSQL','Procedural lang') +
  R(10,125,120,25,'#dc3545','','EXCEPTION','Error handling') +
  A(130,48,160,48) + A(130,78,160,78) + A(130,108,160,108) + A(130,138,160,138) +
  R(170,35,210,130,'#17a2b8','','Stored Programs','Database-side logic: functions, procedures, and PL/pgSQL programming.') +
  T(240,195,'Stored Procedures: Server-side logic for encapsulation, performance, and reusability.',9,'#666','middle'),
  [
    e('Creating a Function', 'Calculate annual salary.', codeBlock([
      "CREATE FUNCTION get_annual_salary(emp_id INT)",
      "RETURNS DECIMAL AS $$",
      "DECLARE",
      "  sal DECIMAL;",
      "BEGIN",
      "  SELECT salary * 12 INTO sal FROM employees WHERE id = emp_id;",
      "  RETURN sal;",
      "END;",
      "$$ LANGUAGE plpgsql;",
      '',
      '-- Usage:',
      'SELECT get_annual_salary(5);'
    ]), 'Creates a function that calculates and returns annual salary.'),
    e('Stored Procedure with Transaction', 'Transfer between accounts.', codeBlock([
      "CREATE PROCEDURE transfer_funds(",
      "  from_id INT, to_id INT, amount DECIMAL",
      ") LANGUAGE plpgsql AS $$",
      "BEGIN",
      "  COMMIT; -- end any existing transaction",
      "  BEGIN; -- start new transaction",
      "  UPDATE accounts SET balance = balance - amount WHERE id = from_id;",
      "  UPDATE accounts SET balance = balance + amount WHERE id = to_id;",
      "  COMMIT;",
      "EXCEPTION",
      "  WHEN OTHERS THEN",
      "    ROLLBACK;",
      "    RAISE NOTICE 'Transfer failed: %', SQLERRM;",
      "END;",
      "$$;",
      '',
      'CALL transfer_funds(1, 2, 100.00);'
    ]), 'Procedure with transaction management and error handling.'),
    e('Function with OUT Parameters', 'Return multiple values.', codeBlock([
      "CREATE FUNCTION get_emp_stats(dept_id INT,",
      "  OUT avg_sal DECIMAL,",
      "  OUT max_sal DECIMAL,",
      "  OUT emp_count INT",
      ") LANGUAGE plpgsql AS $$",
      "BEGIN",
      "  SELECT AVG(salary), MAX(salary), COUNT(*)",
      "  INTO avg_sal, max_sal, emp_count",
      "  FROM employees WHERE dept_id = dept_id;",
      "END;",
      "$$;",
      '',
      'SELECT * FROM get_emp_stats(3);'
    ]), 'OUT parameters return multiple values from a single function call.'),
    e('Trigger Function Example', 'Audit log on update.', codeBlock([
      "CREATE FUNCTION log_employee_changes()",
      "RETURNS TRIGGER AS $$",
      "BEGIN",
      "  INSERT INTO audit_log(table_name, record_id, old_data, new_data)",
      "  VALUES ('employees', OLD.id,",
      "    ROW(OLD.name, OLD.salary)::TEXT,",
      "    ROW(NEW.name, NEW.salary)::TEXT);",
      "  RETURN NEW;",
      "END;",
      "$$ LANGUAGE plpgsql;"
    ]), 'Trigger function that logs changes to an audit table.'),
    e('Dynamic SQL with EXECUTE', 'Safe dynamic table access.', codeBlock([
      "CREATE FUNCTION get_count(tbl TEXT, col TEXT, val TEXT)",
      "RETURNS INT LANGUAGE plpgsql AS $$",
      "DECLARE",
      "  cnt INT;",
      "BEGIN",
      "  EXECUTE format(",
      "    'SELECT COUNT(*) FROM %I WHERE %I = %L',",
      "    tbl, col, val",
      "  ) INTO cnt;",
      "  RETURN cnt;",
      "END;",
      "$$;",
      '',
      "SELECT get_count('employees', 'department', 'Engineering');"
    ]), 'Dynamic SQL using EXECUTE with format() for safe identifier quoting.')
  ],
  [
    m('Which can use transactions?', ['Functions', 'Procedures', 'Both', 'Neither'], 1, 'Procedures (PostgreSQL 11+) can use transactions. Functions cannot.'),
    m('What language is native to PostgreSQL for procedures?', ['PL/SQL', 'PL/pgSQL', 'T-SQL', 'PL/SQL Plus'], 1, 'PL/pgSQL is PostgreSQL\'s procedural language.'),
    m('What keyword returns a value from a function?', ['RESULT', 'RETURN', 'OUTPUT', 'SEND'], 1, 'RETURN sends the value back from a function.'),
    m('What does SECURITY DEFINER do?', ['Runs as caller', 'Runs as owner', 'Runs as DBA', 'Runs as PUBLIC'], 1, 'SECURITY DEFINER runs the function with the owner\'s privileges.'),
    m('How do you call a procedure?', ['SELECT', 'CALL', 'EXEC', 'RUN'], 1, 'CALL invokes a stored procedure.'),
    m('What prevents SQL injection in dynamic SQL?', ['EXECUTE', 'EXECUTE ... USING', 'format()', 'Both B and C'], 3, 'EXECUTE ... USING and format() with %I prevent SQL injection.')
  ]
);

/* =================== TOPIC 24: Triggers =================== */
addTopic('sql-triggers', 'Triggers', 'advanced', 25,
  ['A trigger is a database function that automatically executes when a specified event occurs on a table.',
   'Trigger events: INSERT, UPDATE, DELETE, or TRUNCATE. Timing: BEFORE, AFTER, or INSTEAD OF.',
   'Statement-level triggers fire once per SQL statement. Row-level triggers fire once per affected row.',
   'Triggers enforce business rules, maintain audit logs, update summary tables, and cascade changes.'
  ],
  'A trigger is like an automatic action that happens whenever something changes. Like setting up an automatic email notification when a new user signs up. You define the trigger once, and it runs every time the event occurs without manual intervention.',
  [
    d('Trigger Timing', 'BEFORE trigger — runs before the operation. Can modify the new row or prevent the operation. AFTER trigger — runs after the operation. Cannot modify the row but can access OLD and NEW data. INSTEAD OF — replaces the operation (views).'),
    d('Row vs Statement Level', 'FOR EACH ROW — fires once per affected row. Has access to OLD and NEW row data. FOR EACH STATEMENT — fires once per SQL statement regardless of rows affected. No per-row data access. Row-level is more common.'),
    d('OLD and NEW References', 'OLD — the row before the operation (UPDATE/DELETE). NEW — the row after the operation (INSERT/UPDATE). OLD and NEW are RECORD types. Access fields: OLD.salary, NEW.name.'),
    d('Trigger Functions', 'Must return TRIGGER type. RETURN NEW — proceed with operation. RETURN NULL — skip operation (for BEFORE triggers). RETURN OLD — for DELETE. Created with CREATE FUNCTION ... RETURNS TRIGGER, then attached with CREATE TRIGGER.'),
    d('Triggers and Performance', 'Row-level triggers on large operations can be slow. Each row execution adds overhead. Minimize trigger logic. Use statement-level triggers when per-row data is not needed. Avoid triggers that query the same table (recursion risk).')
  ],
  'Triggers are powerful for maintaining data integrity automatically. However, they can make debugging difficult since the execution is implicit. Use triggers sparingly and document them thoroughly. Prefer application-level logic when possible.',
  [
    q('What is a trigger?', 'A database function that automatically executes on INSERT, UPDATE, DELETE, or TRUNCATE events.'),
    q('What are the trigger timing options?', 'BEFORE (before operation), AFTER (after operation), INSTEAD OF (replaces operation for views).'),
    q('What is the difference between row and statement triggers?', 'Row-level (FOR EACH ROW) fires per row, has OLD/NEW access. Statement-level fires once per statement.'),
    q('What does OLD represent in a trigger?', 'The row data before the operation. Available in UPDATE and DELETE triggers.'),
    q('What does NEW represent?', 'The row data after the operation. Available in INSERT and UPDATE triggers.'),
    q('Can a trigger prevent an operation?', 'Yes. In a BEFORE trigger, RETURN NULL aborts the operation. Raise an exception to produce an error.'),
    q('Can triggers be recursive?', 'Yes. A trigger that modifies the same table can fire itself again. PostgreSQL limits recursion depth (max_stack_depth).'),
    q('What is an INSTEAD OF trigger?', 'Replaces the triggering operation entirely. Mainly used on views to make them updatable.'),
    q('How do you view triggers?', 'PostgreSQL: SELECT * FROM pg_triggers; or \\dy in psql.'),
    q('Can you disable a trigger temporarily?', 'Yes. ALTER TABLE table_name DISABLE TRIGGER trigger_name; For all: ALTER TABLE table_name DISABLE TRIGGER ALL;')
  ],
  R(10,35,100,25,'#0070f3','','BEFORE','Pre-check') +
  R(10,65,100,25,'#28a745','','AFTER','Post-action') +
  R(10,95,100,25,'#ffc107','','INSTEAD OF','View modify') +
  R(170,35,100,25,'#dc3545','','FOR EACH ROW','Per row') +
  R(170,65,100,25,'#e83e8c','','FOR EACH STMT','Per stmt') +
  R(170,95,100,25,'#6610f2','','OLD / NEW','Row data') +
  A(100,48,130,48) + A(100,78,130,78) + A(100,108,130,108) +
  R(280,35,200,95,'#17a2b8','','Triggers','Automatic execution on table events. Use for validation, audit, and cascading.') +
  T(240,170,'Triggers: Automatic functions executed on INSERT, UPDATE, DELETE events.',9,'#666','middle'),
  [
    e('Before Insert Validation', 'Ensure data quality.', codeBlock([
      "CREATE FUNCTION validate_employee()",
      "RETURNS TRIGGER AS $$",
      "BEGIN",
      "  IF NEW.salary < 0 THEN",
      "    RAISE EXCEPTION 'Salary cannot be negative: %', NEW.salary;",
      "  END IF;",
      "  IF NEW.email IS NULL THEN",
      "    NEW.email = LOWER(NEW.name) || '@company.com';",
      "  END IF;",
      "  RETURN NEW;",
      "END;",
      "$$ LANGUAGE plpgsql;",
      '',
      "CREATE TRIGGER trg_validate_employee",
      "BEFORE INSERT ON employees",
      "FOR EACH ROW EXECUTE FUNCTION validate_employee();"
    ]), 'Validates and auto-fills data before insert.'),
    e('Audit Log Trigger', 'Track all changes.', codeBlock([
      "CREATE FUNCTION audit_employee_changes()",
      "RETURNS TRIGGER AS $$",
      "BEGIN",
      "  INSERT INTO employee_audit(employee_id, changed_by, changed_at, old_data, new_data)",
      "  VALUES (OLD.id, current_user, NOW(),",
      "    ROW(OLD.*)::TEXT, ROW(NEW.*)::TEXT);",
      "  RETURN NEW;",
      "END;",
      "$$ LANGUAGE plpgsql;",
      '',
      "CREATE TRIGGER trg_audit_employees",
      "AFTER UPDATE ON employees",
      "FOR EACH ROW EXECUTE FUNCTION audit_employee_changes();"
    ]), 'Logs all employee updates to an audit table for compliance.'),
    e('Update Summary Table Trigger', 'Maintain aggregated data.', codeBlock([
      "CREATE FUNCTION update_dept_summary()",
      "RETURNS TRIGGER AS $$",
      "BEGIN",
      "  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN",
      "    INSERT INTO dept_summary(dept_id, emp_count, total_salary)",
      "    VALUES (NEW.dept_id, 1, NEW.salary)",
      "    ON CONFLICT (dept_id) DO UPDATE SET",
      "      emp_count = dept_summary.emp_count + 1,",
      "      total_salary = dept_summary.total_salary + NEW.salary;",
      "  END IF;",
      "  RETURN NEW;",
      "END;",
      "$$ LANGUAGE plpgsql;"
    ]), 'Keeps department summary table in sync with employee changes.'),
    e('INSTEAD OF Trigger on View', 'Make views updatable.', codeBlock([
      "CREATE FUNCTION update_employee_view()",
      "RETURNS TRIGGER AS $$",
      "BEGIN",
      "  UPDATE employees SET",
      "    name = NEW.name, salary = NEW.salary",
      "  WHERE id = OLD.id;",
      "  RETURN NEW;",
      "END;",
      "$$ LANGUAGE plpgsql;",
      '',
      "CREATE TRIGGER trg_update_emp_view",
      "INSTEAD OF UPDATE ON employee_details_view",
      "FOR EACH ROW EXECUTE FUNCTION update_employee_view();"
    ]), 'INSTEAD OF trigger makes a complex view support UPDATE operations.'),
    e('Delete Cascade Trigger', 'Custom cascade logic.', codeBlock([
      "CREATE FUNCTION cascade_delete_department()",
      "RETURNS TRIGGER AS $$",
      "BEGIN",
      "  -- Archive employees before delete",
      "  INSERT INTO employee_archive SELECT * FROM employees WHERE dept_id = OLD.id;",
      "  DELETE FROM employees WHERE dept_id = OLD.id;",
      "  RETURN OLD;",
      "END;",
      "$$ LANGUAGE plpgsql;",
      '',
      "CREATE TRIGGER trg_cascade_dept",
      "BEFORE DELETE ON departments",
      "FOR EACH ROW EXECUTE FUNCTION cascade_delete_department();"
    ]), 'Custom cascade: archives employees before deleting a department.')
  ],
  [
    m('When does a BEFORE trigger fire?', ['Before the operation', 'After the operation', 'Instead of operation', 'On commit'], 0, 'BEFORE triggers fire before the data modification.'),
    m('What does FOR EACH ROW mean?', ['Once per statement', 'Once per row', 'Once per table', 'Once per transaction'], 1, 'FOR EACH ROW fires the trigger once per affected row.'),
    m('What does OLD contain?', ['New row data', 'Old row data', 'Table metadata', 'Trigger data'], 1, 'OLD contains the row data before modification.'),
    m('How do you abort an operation in a trigger?', ['RETURN NULL', 'RAISE EXCEPTION', 'ROLLBACK', 'Both A and B'], 3, 'RETURN NULL or RAISE EXCEPTION both abort the operation.'),
    m('What trigger type makes views updatable?', ['BEFORE', 'AFTER', 'INSTEAD OF', 'FOR EACH ROW'], 2, 'INSTEAD OF triggers replace the operation, making views writable.'),
    m('How do you disable a trigger?', ['DROP TRIGGER', 'DISABLE TRIGGER', 'ALTER TABLE ... DISABLE TRIGGER', 'DEACTIVATE TRIGGER'], 2, 'ALTER TABLE table_name DISABLE TRIGGER trigger_name disables it.')
  ]
);

/* =================== TOPIC 25: Database Normalization =================== */
addTopic('sql-normalization', 'Database Normalization', 'intermediate', 30,
  ['Normalization organizes database schema to reduce data redundancy and improve data integrity.',
   '1NF: each cell contains a single value, each column has a unique name, rows are unique.',
   '2NF: 1NF + every non-key column is fully functionally dependent on the entire primary key.',
   '3NF: 2NF + no transitive dependencies (non-key column depends on another non-key column).'
  ],
  'Normalization is like organizing a messy desk. 1NF is making sure each drawer has one type of item. 2NF is making sure items in a drawer actually belong there (not just because of the desk). 3NF is making sure nothing depends on something that could move.',
  [
    d('First Normal Form (1NF)', 'Each column has a single atomic value (no arrays or comma-separated lists). Each column has a unique name. All entries in a column are the same type. Each row is unique (has a primary key). Table: Student | Courses (CS101,CS102) → split to Student | Course.'),
    d('Second Normal Form (2NF)', 'Must be 1NF. Every non-key column must depend on the entire primary key (for composite keys). If a table has PK (StudentID, CourseID) and column Instructor depends only on CourseID, it violates 2NF. Solution: split into separate tables.'),
    d('Third Normal Form (3NF)', 'Must be 2NF. No transitive dependencies: a non-key column depends on another non-key column. Example: Order → CustomerID → CustomerName violates 3NF because CustomerName depends on CustomerID, not directly on Order. Solution: separate Customers table.'),
    d('Boyce-Codd Normal Form (BCNF)', 'Stricter version of 3NF. Every determinant must be a candidate key. Every functional dependency X → Y, X must be a superkey. Resolves anomalies that 3NF misses when there are overlapping candidate keys.'),
    d('Denormalization', 'Intentionally adding redundancy for performance. Common in data warehouses (star schema). Benefits: fewer JOINs, faster reads. Costs: data inconsistency risk, more storage, more complex writes. Trade-off decision based on read/write patterns.')
  ],
  'Normalization up to 3NF is standard practice for transactional databases. BCNF handles edge cases. Denormalization is a deliberate optimization for read-heavy workloads like data warehouses.',
  [
    q('What is database normalization?', 'The process of organizing schema to reduce redundancy and dependency by dividing tables and defining relationships.'),
    q('What is 1NF?', 'First Normal Form: atomic values, unique column names, same type per column, unique rows with primary key.'),
    q('What is 2NF?', 'Second Normal Form: 1NF + every non-key column fully depends on the entire primary key (no partial dependency).'),
    q('What is 3NF?', 'Third Normal Form: 2NF + no transitive dependencies (non-key column depends only on the primary key).'),
    q('What is a transitive dependency?', 'When column A determines column B, and B determines column C. C depends on B, not directly on the primary key.'),
    q('What is BCNF?', 'Boyce-Codd Normal Form: every determinant is a candidate key. Stricter than 3NF.'),
    q('What is denormalization?', 'Intentionally adding redundancy for read performance. Common in data warehouses and reporting systems.'),
    q('What are the benefits of normalization?', 'Reduces data redundancy, improves data integrity, simplifies maintenance, prevents update/insert/delete anomalies.'),
    q('What are the costs of normalization?', 'More tables, more JOINs, potentially slower reads. Complex queries with many JOINs can impact performance.'),
    q('Is it always good to normalize to 3NF?', 'For OLTP (transactional) systems, yes generally. For OLAP (analytical/reporting) systems, denormalization is often beneficial.')
  ],
  R(10,35,110,25,'#0070f3','','1NF','Atomic values') +
  R(10,65,110,25,'#28a745','','2NF','Full key dep') +
  R(10,95,110,25,'#ffc107','','3NF','No transitive') +
  R(10,125,110,25,'#dc3545','','BCNF','Every det = key') +
  R(10,155,110,25,'#e83e8c','','Denormal','Perf tradeoff') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,220,155,'#17a2b8','','Normalization','Organize schema to reduce redundancy and improve integrity step by step.') +
  T(240,220,'Normalization: 1NF → 2NF → 3NF — reducing redundancy at each level.',9,'#666','middle'),
  [
    e('Unnormalized to 1NF', 'Remove repeating groups.', codeBlock([
      '-- Unnormalized:',
      'CREATE TABLE student_courses (',
      '  student_name VARCHAR(100),',
      '  courses TEXT -- comma separated: "CS101,CS102"',
      ');',
      '',
      '-- 1NF: atomic values',
      'CREATE TABLE student_courses_1nf (',
      '  student_name VARCHAR(100),',
      '  course_code VARCHAR(10),',
      '  PRIMARY KEY (student_name, course_code)',
      ');'
    ]), 'Split comma-separated courses into individual rows for 1NF.'),
    e('1NF to 2NF Example', 'Remove partial dependency.', codeBlock([
      '-- 1NF (violates 2NF):',
      '-- PK: (student_id, course_id)',
      '-- course_name depends only on course_id (partial)',
      '',
      '-- 2NF: split into two tables',
      'CREATE TABLE enrollments (',
      '  student_id INT, course_id INT,',
      '  grade CHAR(1),',
      '  PRIMARY KEY (student_id, course_id)',
      ');',
      '',
      'CREATE TABLE courses (',
      '  id INT PRIMARY KEY,',
      '  name VARCHAR(100),',
      '  instructor VARCHAR(100)',
      ');'
    ]), 'Partial dependency (course_name on course_id only) is resolved by extracting a courses table.'),
    e('2NF to 3NF', 'Remove transitive dependency.', codeBlock([
      '-- 2NF (violates 3NF):',
      '-- order_id PK, customer_id, customer_name, order_total',
      '-- customer_name depends on customer_id, not order_id (transitive)',
      '',
      '-- 3NF:',
      'CREATE TABLE orders (',
      '  id INT PRIMARY KEY,',
      '  customer_id INT REFERENCES customers(id),',
      '  order_total DECIMAL(10,2)',
      ');',
      '',
      'CREATE TABLE customers (',
      '  id INT PRIMARY KEY,',
      '  name VARCHAR(100),',
      '  email VARCHAR(100)',
      ');'
    ]), 'Transitive dependency (customer_name → customer_id) resolved by separate customers table.'),
    e('Normalization in Practice', 'Complete example.', codeBlock([
      '-- Start: one big table with redundancy',
      'CREATE TABLE raw_orders (',
      '  order_id INT, customer_name VARCHAR(100),',
      '  customer_email VARCHAR(100),',
      '  product_name VARCHAR(100),',
      '  product_price DECIMAL,',
      '  quantity INT, order_date DATE',
      ');',
      '',
      '-- Normalized (3NF) schema:',
      '-- customers(id, name, email)',
      '-- products(id, name, price)',
      '-- orders(id, customer_id, order_date)',
      '-- order_items(order_id, product_id, quantity)'
    ]), 'Transforming a denormalized table into a normalized 3NF schema with four tables.'),
    e('Denormalization for Reporting', 'Star schema example.', codeBlock([
      '-- Data warehouse star schema (denormalized)',
      'CREATE TABLE fact_sales (',
      '  sale_id INT,',
      '  date_id INT REFERENCES dim_date(id),',
      '  product_id INT REFERENCES dim_product(id),',
      '  customer_id INT REFERENCES dim_customer(id),',
      '  quantity INT,',
      '  amount DECIMAL(10,2)',
      ');',
      '',
      '-- Dimension tables are denormalized for fast queries',
      'CREATE TABLE dim_product (',
      '  id INT PRIMARY KEY,',
      '  name VARCHAR(100), category, brand, supplier',
      ');'
    ]), 'Star schema uses controlled denormalization for analytical query performance.')
  ],
  [
    m('Which normal form requires atomic values?', ['1NF', '2NF', '3NF', 'BCNF'], 0, '1NF requires atomic (single) values in each cell.'),
    m('What does 2NF remove?', ['Duplicate rows', 'Partial dependencies', 'Transitive dependencies', 'NULL values'], 1, '2NF removes partial dependencies on composite keys.'),
    m('What does 3NF remove?', ['Partial dependencies', 'Transitive dependencies', 'Atomic values', 'Foreign keys'], 1, '3NF removes transitive dependencies (non-key → non-key).'),
    m('What is a typical use for denormalization?', ['OLTP systems', 'Data warehouses', 'Every application', 'Mobile apps'], 1, 'Denormalization is common in data warehouses and reporting databases.'),
    m('Which normal form is stricter than 3NF?', ['4NF', 'BCNF', 'DKNF', '5NF'], 1, 'Boyce-Codd Normal Form (BCNF) is stricter than 3NF.'),
    m('What is a transitive dependency?', ['A depends on B, B depends on PK', 'C depends on B, B depends on A', 'A depends on PK through B', 'Both B and C'], 3, 'Transitive: non-key column depends on another non-key column.')
  ]
);

/* =================== TOPIC 26: JSON & JSONB =================== */
addTopic('sql-json', 'JSON & JSONB', 'advanced', 25,
  ['PostgreSQL offers two JSON types: JSON (stores exact text copy, re-parsed each query) and JSONB (stores binary/decomposed, supports indexing).',
   'JSONB is generally preferred: faster to query (indexes, no re-parsing), supports GIN indexing for containment/existence queries, and removes duplicate keys.',
   'Operators: -> (JSON field as JSON), ->> (JSON field as text), @> (contains), ? (key exists), || (concatenate).',
   'Functions: jsonb_build_object, jsonb_agg, jsonb_array_elements, jsonb_set, jsonb_pretty.'
  ],
  'JSONB is like filing a document in a filing cabinet with a detailed index of every word. JSON is like filing the document as-is — every time you want to read it, you pull out the whole thing. JSONB is faster to search through but takes slightly more space.',
  [
    d('JSON vs JSONB', 'JSON: stores exact input (preserves whitespace, key order, duplicate keys). Slower operations (re-parsed each time). No indexes. JSONB: stores parsed binary format. Supports indexing (GIN, B-tree). More operators. Preferred for most use cases.'),
    d('JSONB Operators', '-> \'key\' — get value as JSON. ->> \'key\' — get value as TEXT. @> \'{"key": "val"}\' — top-level contains. ? \'key\' — key exists. ?| ARRAY[\'a\',\'b\'] — any key exists. ?& — all keys exist. || — merge/concatenate JSONB objects.'),
    d('GIN Indexes on JSONB', 'CREATE INDEX ON table USING GIN (jsonb_col); — indexes all keys/values. Supports @>, ?, ?|, ?& operators. JSON path ops (@? and @*) also use GIN. Much faster than sequential scan for JSON queries.'),
    d('JSONB Functions', 'jsonb_build_object(\'key\', val) — build JSONB from key-value pairs. jsonb_agg(expr) — aggregate rows into JSONB array. jsonb_array_elements(jsonb) — expand array to rows. jsonb_set(target, path, newval) — update nested value.'),
    d('JSON Path Queries (PG 12+)', 'jsonb_path_exists(data, \'$.phone[*].type ? (@ == "mobile")\') — SQL/JSON path language. Path access: \'$.store.book[0].title\'. Powerful for complex JSON document queries with filters and conditions.')
  ],
  'PostgreSQL\'s JSONB support is best-in-class, offering NoSQL-like document storage within a relational database. Use JSONB for flexible schemas, event sourcing, and when combining structured and semi-structured data.',
  [
    q('What is the difference between JSON and JSONB?', 'JSON stores text (re-parsed each query). JSONB stores binary (faster, supports indexing, preferred).'),
    q('What does the @> operator do?', 'Checks if a JSONB document contains another JSONB value at the top level.'),
    q('What does the ? operator do?', 'Checks if a key exists in a JSONB object.'),
    q('What index type supports JSONB containment queries?', 'GIN (Generalized Inverted Index). CREATE INDEX ON table USING GIN (jsonb_col);'),
    q('How do you extract a JSON field as text?', 'column ->> \'key\' returns the value as TEXT. column -> \'key\' returns as JSON.'),
    q('How do you aggregate rows into a JSON array?', 'jsonb_agg(column) or jsonb_agg(column ORDER BY ...) aggregates values into a JSONB array.'),
    q('What does jsonb_set do?', 'Updates a nested value in a JSONB document: jsonb_set(data, \'{path,to,field}\', \'new_value\'::jsonb).'),
    q('How do you expand a JSON array to rows?', 'jsonb_array_elements(jsonb_col) — one row per array element.'),
    q('What is jsonb_pretty?', 'Formats JSONB with indentation for readability.'),
    q('Can JSONB have indexes on specific paths?', 'Yes. CREATE INDEX ON table USING GIN ((jsonb_col -> \'email\')); — index on specific key.')
  ],
  R(10,35,110,25,'#0070f3','','JSON','Text storage') +
  R(10,65,110,25,'#28a745','','JSONB','Binary storage') +
  R(10,95,110,25,'#ffc107','','@>','Contains') +
  R(10,125,110,25,'#dc3545','','->>','Extract') +
  R(10,155,110,25,'#e83e8c','','GIN Index','Fast search') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,220,155,'#17a2b8','','JSON & JSONB','PostgreSQL\'s NoSQL-style document storage with indexing and powerful operators.') +
  T(240,220,'JSON & JSONB: Flexible document storage with relational integrity in PostgreSQL.',9,'#666','middle'),
  [
    e('Creating and Querying JSONB', 'Store and retrieve nested data.', codeBlock([
      'CREATE TABLE products (',
      '  id SERIAL PRIMARY KEY,',
      '  name VARCHAR(100),',
      '  attributes JSONB',
      ');',
      '',
      "INSERT INTO products (name, attributes) VALUES (",
      "  'Laptop',",
      "  '{\"brand\": \"Dell\", \"specs\": {\"ram\": \"16GB\", \"cpu\": \"i7\"}, \"tags\": [\"electronics\", \"computers\"]}'",
      ");",
      '',
      "SELECT name, attributes->'brand' AS brand,",
      "  attributes->'specs'->>'ram' AS ram",
      'FROM products',
      "WHERE attributes @> '{\"brand\": \"Dell\"}';"
    ]), 'JSONB with nested objects, extraction, and containment query.'),
    e('JSONB GIN Index', 'Fast JSON searches.', codeBlock([
      'CREATE INDEX idx_products_attrs',
      'ON products USING GIN (attributes);',
      '',
      '-- These queries use the index:',
      "SELECT * FROM products WHERE attributes ? 'brand';",
      "SELECT * FROM products WHERE attributes @> '{\"tags\": [\"electronics\"]}';",
      "SELECT * FROM products WHERE attributes ?| ARRAY['color', 'size'];"
    ]), 'GIN index enables fast containment, existence, and key lookups in JSONB.'),
    e('Aggregate to JSON', 'Build JSON from relational data.', codeBlock([
      'SELECT',
      '  department,',
      '  jsonb_agg(jsonb_build_object(',
      "    'name', name,",
      "    'salary', salary",
      '  ) ORDER BY name) AS employees',
      'FROM employees',
      'GROUP BY department;'
    ]), 'Creates nested JSON documents from relational GROUP BY results.'),
    e('jsonb_set to Update', 'Modify nested JSON values.', codeBlock([
      "-- Update laptop specs",
      "UPDATE products SET attributes = jsonb_set(",
      "  attributes,",
      "  '{specs, ram}',",
      "  '\"32GB\"'",
      ") WHERE name = 'Laptop';",
      '',
      '-- Result: specs.ram changes from "16GB" to "32GB"'
    ]), 'jsonb_set updates deeply nested JSONB fields without rewriting the entire document.'),
    e('JSON Path Queries', 'SQL/JSON path expressions.', codeBlock([
      '-- Find products with mobile phone in tags',
      'SELECT name FROM products',
      "WHERE jsonb_path_exists(attributes, '$.tags[*] ? (@ == \"mobile\")');",
      '',
      '-- Extract all tag values',
      'SELECT jsonb_path_query(attributes, \'$.tags[*]\')',
      'FROM products;'
    ]), 'JSON path expressions (PG 12+) for complex document queries.')
  ],
  [
    m('Which JSON type supports indexing?', ['JSON', 'JSONB', 'Both', 'Neither'], 1, 'JSONB supports GIN and B-tree indexing. JSON does not.'),
    m('What operator checks if a key exists?', ['@>', '?', '->', '||'], 1, 'The ? operator checks if a key exists in a JSONB object.'),
    m('What does @> check?', ['Key existence', 'Containment', 'Equality', 'Type match'], 1, '@> checks if the left JSONB contains the right JSONB.'),
    m('How do you extract a JSON field as text?', ['->', '->>', '#>', '@>'], 1, '->> extracts a JSON field as TEXT.'),
    m('What index is best for JSONB?', ['B-tree', 'Hash', 'GIN', 'GiST'], 2, 'GIN (Generalized Inverted Index) is best for JSONB containment queries.'),
    m('What function aggregates rows to JSON?', ['jsonb_agg', 'jsonb_build', 'jsonb_row', 'jsonb_collect'], 0, 'jsonb_agg aggregates values into a JSONB array.')
  ]
);

/* =================== TOPIC 27: Full-Text Search =================== */
addTopic('sql-full-text-search', 'Full-Text Search', 'advanced', 25,
  ['Full-text search enables natural language search across text columns, going beyond simple LIKE patterns.',
   'PostgreSQL uses tsvector (document) and tsquery (query) types with stemming, ranking, and stop word removal.',
   'LIKE is fine for small datasets. Full-text search is essential for large text collections, articles, and product descriptions.',
   'GIN indexes on tsvector columns enable fast full-text search queries.'
  ],
  'Full-text search is like having a smart index in the back of a book. LIKE \'%running%\' only finds "running". Full-text search finds "run", "runs", "running", "ran" — it understands word variations (stemming). It also ignores common words like "the" and "and" (stop words).',
  [
    d('tsvector and tsquery', 'tsvector: text search document — list of lexemes (stemmed words) with positions. to_tsvector(\'english\', text) — converts text to tsvector. tsquery: search query — lexemes combined with & (AND), | (OR), ! (NOT). to_tsquery(\'english\', \'cat & dog\') — creates query.'),
    d('Match Operator @@', 'tsvector @@ tsquery — returns true if document matches query. SELECT * FROM articles WHERE to_tsvector(\'english\', body) @@ to_tsquery(\'english\', \'database & performance\'). Indexable operator.'),
    d('Ranking Results', 'ts_rank(tsvector, tsquery) — computes relevance score based on term frequency, proximity, and document structure. ts_rank_cd — cover density ranking. ORDER BY ts_rank DESC for relevance-ordered results.'),
    d('GIN Indexes for FTS', 'CREATE INDEX ON articles USING GIN (to_tsvector(\'english\', body)); — pre-computes and indexes tsvector. Makes @@ queries fast. GiST indexes work too but are slower for updates and larger.'),
    d('Configuration and Customization', 'Language configuration: \'english\', \'simple\', \'french\', etc. Controls stemming rules and stop words. Custom dictionaries: add custom stop words, synonyms, thesaurus. Use ALTER TEXT SEARCH CONFIGURATION.')
  ],
  'Full-text search is a game-changer for text-heavy applications. It handles word variations, ignores noise words, ranks by relevance, and performs well at scale with proper indexing. PostgreSQL\'s built-in FTS rivals dedicated search tools for many applications.',
  [
    q('What is full-text search?', 'Natural language search with stemming, stop words, ranking, and phrase matching — beyond simple LIKE patterns.'),
    q('What is a tsvector?', 'A text search document type containing lexemes (stemmed words) with positional information. Created with to_tsvector().'),
    q('What is a tsquery?', 'A text search query type with boolean operators. Created with to_tsquery() or plainto_tsquery().'),
    q('What does the @@ operator do?', 'Matches a tsvector against a tsquery. Returns true if the document satisfies the query.'),
    q('How do you rank full-text search results?', 'ts_rank(tsvector, tsquery) returns a relevance score. Use ORDER BY ts_rank DESC for best matches first.'),
    q('What index supports fast full-text search?', 'GIN index on the tsvector column. CREATE INDEX ON table USING GIN (to_tsvector(\'english\', column)).'),
    q('What is stemming?', 'Reducing words to their root form: "running", "runs", "ran" all stem to "run". Handled automatically by the text search configuration.'),
    q('What are stop words?', 'Common words like "the", "and", "in" that are ignored in full-text search. Controlled by the language configuration.'),
    q('What is the difference between to_tsquery and plainto_tsquery?', 'to_tsquery uses operators (&, |, !). plainto_tsquery treats all words as AND and adds & between them.'),
    q('Can full-text search handle phrases?', 'Yes. Use phraseto_tsquery() for exact phrase matching. Also use <-> (followed by) operator in tsquery for word proximity.')
  ],
  R(10,35,110,25,'#0070f3','','LIKE','Simple match') +
  R(10,65,110,25,'#28a745','','tsvector','Document') +
  R(10,95,110,25,'#ffc107','','tsquery','Query') +
  R(10,125,110,25,'#dc3545','','@@','Match op') +
  R(10,155,110,25,'#e83e8c','','GIN','Index') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,220,155,'#17a2b8','','Full-Text Search','Natural language search with stemming, ranking, and indexes — beyond LIKE.') +
  T(240,220,'Full-Text Search: Language-aware text search with stemming, weighting, and ranking.',9,'#666','middle'),
  [
    e('Basic Full-Text Search', 'Search articles by content.', codeBlock([
      "SELECT id, title,",
      "  ts_rank(to_tsvector('english', body), to_tsquery('english', 'performance & tuning')) AS rank",
      "FROM articles",
      "WHERE to_tsvector('english', body) @@ to_tsquery('english', 'performance & tuning')",
      "ORDER BY rank DESC",
      "LIMIT 10;"
    ]), 'Searches for articles containing both "performance" and "tuning" with relevance ranking.'),
    e('Creating FTS Index', 'GiST index for speed.', codeBlock([
      '-- Add a tsvector column',
      'ALTER TABLE articles ADD COLUMN fts tsvector;',
      '',
      "-- Populate with trigger",
      "CREATE FUNCTION update_fts() RETURNS TRIGGER AS $$",
      "BEGIN",
      "  NEW.fts := to_tsvector('english', COALESCE(NEW.title, '') || ' ' || COALESCE(NEW.body, ''));",
      "  RETURN NEW;",
      "END;",
      "$$ LANGUAGE plpgsql;",
      '',
      'CREATE TRIGGER trg_article_fts',
      'BEFORE INSERT OR UPDATE ON articles',
      'FOR EACH ROW EXECUTE FUNCTION update_fts();',
      '',
      '-- Create GIN index',
      'CREATE INDEX idx_articles_fts ON articles USING GIN (fts);'
    ]), 'Sets up automatic tsvector maintenance with trigger and GIN index.'),
    e('Phrase Search', 'Exact phrase matching.', codeBlock([
      "SELECT id, title",
      "FROM articles",
      "WHERE to_tsvector('english', body) @@ phraseto_tsquery('english', 'database performance tuning')",
      "ORDER BY ts_rank(to_tsvector('english', body), phraseto_tsquery('english', 'database performance tuning')) DESC;"
    ]), 'phraseto_tsquery matches the exact phrase with word order.'),
    e('Weighted Search', 'Title vs body weighting.', codeBlock([
      '-- Assign weights: A=title (highest), B=body',
      "SELECT id, ts_rank(",
      "  setweight(to_tsvector('english', title), 'A') ||",
      "  setweight(to_tsvector('english', body), 'B'),",
      "  to_tsquery('english', 'database')",
      ") AS rank",
      "FROM articles",
      "WHERE setweight(to_tsvector('english', title), 'A') ||",
      "  setweight(to_tsvector('english', body), 'B')",
      "  @@ to_tsquery('english', 'database')",
      "ORDER BY rank DESC;"
    ]), 'Title matches get higher weight than body matches for better relevance ranking.'),
    e('Highlighting Results', 'Show matching snippets.', codeBlock([
      "SELECT",
      "  id, title,",
      "  ts_headline('english', body, to_tsquery('english', 'performance'),",
      "    'StartSel = <mark>, StopSel = </mark>, MaxWords=30, MinWords=10') AS snippet",
      "FROM articles",
      "WHERE to_tsvector('english', body) @@ to_tsquery('english', 'performance')",
      "LIMIT 5;"
    ]), 'ts_headline generates HTML snippets with search terms highlighted.')
  ],
  [
    m('What type stores search documents?', ['tsquery', 'tsvector', 'text', 'jsonb'], 1, 'tsvector stores parsed search documents with lexemes.'),
    m('What operator matches document to query?', ['@@', '@>', '&&', '##'], 0, '@@ is the full-text search match operator.'),
    m('What is the default FTS configuration language?', ['english', 'simple', 'default', 'standard'], 0, 'english is the default with stemming and stop words.'),
    m('What index is best for full-text search?', ['B-tree', 'Hash', 'GIN', 'BRIN'], 2, 'GIN indexes are optimal for full-text search.'),
    m('What function ranks search results?', ['ts_rank', 'ts_headline', 'tsvector', 'to_tsquery'], 0, 'ts_rank computes relevance scores for ordering results.'),
    m('What is stemming?', ['Finding word roots', 'Removing stop words', 'Indexing phrases', 'Ranking results'], 0, 'Stemming reduces words to their root form for broader matching.')
  ]
);

/* =================== TOPIC 28: Query Optimization & EXPLAIN =================== */
addTopic('sql-explain', 'Query Optimization & EXPLAIN', 'advanced', 30,
  ['EXPLAIN shows the query execution plan — how the database will execute a query, including index usage, join methods, and cost estimates.',
   'EXPLAIN ANALYZE actually executes the query and shows actual vs estimated times. Use with caution on write queries.',
   'Key plan nodes: Seq Scan (full table scan), Index Scan (index lookup), Index Only Scan (all data in index), Bitmap Heap Scan.',
   'Optimization: index creation, query rewriting, avoiding full scans, proper join order, and analyzing table statistics.'
  ],
  'EXPLAIN is like looking at a GPS route before driving. It shows the roads (scans), the turns (joins), and the estimated time (cost). EXPLAIN ANALYZE is like actually driving the route and recording the real time — it tells you where you got stuck in traffic.',
  [
    d('EXPLAIN Output', 'Seq Scan: scans entire table (slowest, but sometimes fastest for small tables). Index Scan: uses index to find rows (fast for selective queries). Index Only Scan: reads only index, no table access (fastest). Bitmap Heap Scan: combines multiple index results.'),
    d('Cost Values', 'Format: cost=0.00..42.35 rows=10 width=4. First number: startup cost before first row. Second: total cost to return all rows. rows: estimated row count. width: estimated average row width in bytes. Compare costs between different query plans.'),
    d('Join Methods', 'Nested Loop: for each row in outer, scan inner (good for small outer + indexed inner). Hash Join: build hash table on one input, probe with other (good for large, unsorted data). Merge Join: sort both inputs then merge (good for large, pre-sorted data).'),
    d('ANALYZE and Statistics', 'ANALYZE table_name; — updates table statistics (row count, value distribution). The query planner relies on accurate statistics. autovacuum runs ANALYZE automatically. pg_stat_user_tables shows last analyze time.'),
    d('Common Optimization Patterns', 'Add missing indexes on WHERE/JOIN/ORDER BY columns. Rewrite OR conditions as UNION ALL. Use EXISTS instead of DISTINCT for existence checks. Avoid functions on indexed columns in WHERE (e.g., WHERE LOWER(name) = — use expression index).')
  ],
  'EXPLAIN is the most important tool for query optimization. Understanding execution plans tells you exactly why a query is slow and what to fix. Always check EXPLAIN ANALYZE before and after making optimization changes.',
  [
    q('What does EXPLAIN do?', 'Shows the query execution plan: how the database will access tables, which indexes it uses, and cost estimates.'),
    q('What is the difference between EXPLAIN and EXPLAIN ANALYZE?', 'EXPLAIN shows only the estimated plan. EXPLAIN ANALYZE executes the query and shows actual timing and row counts.'),
    q('What is a Sequential Scan?', 'Reading every row of a table one by one. Fast for small tables, slow for large tables. Indicates missing indexes.'),
    q('What is an Index Scan?', 'Using an index to find rows. Fast for selective queries (returning a small percentage of rows).'),
    q('What is an Index Only Scan?', 'Reading only the index without accessing the table. Fastest scan type — requires a covering index.'),
    q('What is a Nested Loop Join?', 'For each row in the outer table, scan the inner table for matches. Best for small outer + indexed inner.'),
    q('What is a Hash Join?', 'Build a hash table on one input, probe it with the other. Best for large, unsorted data with equality conditions.'),
    q('What is a Merge Join?', 'Sort both inputs then merge. Best for large, pre-sorted datasets or when ORDER BY is already needed.'),
    q('What do cost numbers in EXPLAIN mean?', 'cost=X..Y: X is startup cost, Y is total cost. Higher cost = slower plan. Compare different plans.'),
    q('How do you update statistics?', 'ANALYZE table_name; Updates table statistics for the query planner. PostgreSQL runs autovacuum/autoanalyze automatically.')
  ],
  R(10,35,110,25,'#0070f3','','EXPLAIN','Estimated plan') +
  R(10,65,110,25,'#28a745','','EXPLAIN ANALYZE','Actual timing') +
  R(10,95,110,25,'#ffc107','','Seq Scan','Full table') +
  R(10,125,110,25,'#dc3545','','Index Scan','Fast lookup') +
  R(10,155,110,25,'#e83e8c','','Hash Join','Merge large') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,220,155,'#17a2b8','','Query Optimization','Understand execution plans, indexes, join methods, and statistics.') +
  T(240,220,'EXPLAIN & Optimization: Understand execution plans to write faster SQL queries.',9,'#666','middle'),
  [
    e('Reading EXPLAIN Output', 'Understanding a basic plan.', codeBlock([
      'EXPLAIN SELECT * FROM employees WHERE salary > 80000;',
      '',
      '-- Output:',
      '-- Seq Scan on employees  (cost=0.00..324.50 rows=15 width=72)',
      '--   Filter: (salary > 80000)',
      '',
      '-- After adding an index:',
      'CREATE INDEX ON employees(salary);',
      '',
      '-- Output:',
      '-- Index Scan using employees_salary_idx on employees  (cost=0.28..8.29 rows=15 width=72)',
      '--   Index Cond: (salary > 80000)'
    ]), 'Shows how adding an index changes Seq Scan to Index Scan with lower cost.'),
    e('EXPLAIN ANALYZE', 'Actual vs estimated.', codeBlock([
      'EXPLAIN ANALYZE',
      'SELECT e.name, d.department_name',
      'FROM employees e',
      'JOIN departments d ON e.dept_id = d.id',
      "WHERE d.department_name = 'Engineering';",
      '',
      '-- Shows actual time, rows, loops',
      '-- Look for: actual time vs estimated time mismatch',
      '-- Look for: "rows" vs "rows" mismatch (stale statistics)'
    ]), 'EXPLAIN ANALYZE shows actual execution metrics to compare with estimates.'),
    e('Optimizing a Slow Query', 'Step-by-step optimization.', codeBlock([
      '-- Slow query:',
      'EXPLAIN ANALYZE SELECT * FROM orders',
      'WHERE status = \'pending\' AND amount > 1000',
      'ORDER BY created_at DESC;',
      '',
      '-- Add composite index:',
      'CREATE INDEX idx_orders_status_amount_date',
      'ON orders(status, amount, created_at DESC);',
      '',
      '-- Now: Index Scan with index condition, no separate sort',
      '-- Much faster for this query pattern'
    ]), 'A covering composite index can turn a slow query into an instant one.'),
    e('Detecting Missing Indexes', 'Using pg_stat_user_tables.', codeBlock([
      '-- Find tables with most sequential scans',
      'SELECT',
      '  schemaname, relname,',
      '  seq_scan, seq_tup_read,',
      '  idx_scan, idx_tup_fetch',
      'FROM pg_stat_user_tables',
      'ORDER BY seq_scan DESC',
      'LIMIT 10;'
    ]), 'Identifies tables where sequential scans dominate — candidates for indexing.'),
    e('Optimizing JOINs', 'Rewrite for better performance.', codeBlock([
      '-- Instead of:',
      'SELECT DISTINCT c.name',
      'FROM customers c',
      'JOIN orders o ON c.id = o.customer_id',
      'WHERE o.status = \'shipped\';',
      '',
      '-- Better:',
      'SELECT c.name',
      'FROM customers c',
      'WHERE EXISTS (',
      "  SELECT 1 FROM orders o",
      "  WHERE o.customer_id = c.id AND o.status = 'shipped'",
      ');',
      '',
      '-- EXISTS can early-exit on first match'
    ]), 'EXISTS is often faster than DISTINCT for existence checks.')
  ],
  [
    m('What does EXPLAIN show?', ['Query results', 'Execution plan', 'Table data', 'Index contents'], 1, 'EXPLAIN shows the query execution plan.'),
    m('What scan type is fastest?', ['Seq Scan', 'Index Scan', 'Index Only Scan', 'Bitmap Scan'], 2, 'Index Only Scan reads only the index, no table access.'),
    m('What does EXPLAIN ANALYZE do?', ['Shows estimated plan only', 'Executes query and shows actuals', 'Shows indexes only', 'Shows table statistics'], 1, 'EXPLAIN ANALYZE executes the query and shows actual timing.'),
    m('Which join is best for large unsorted data?', ['Nested Loop', 'Hash Join', 'Merge Join', 'Cross Join'], 1, 'Hash Join is best for large, unsorted datasets with equality joins.'),
    m('What does cost=X..Y mean?', ['X=total, Y=startup', 'X=startup, Y=total', 'X=index, Y=scan', 'X=rows, Y=width'], 1, 'X is startup cost before first row, Y is total cost.'),
    m('How do you update planner statistics?', ['UPDATE STATS', 'ANALYZE', 'VACUUM', 'REINDEX'], 1, 'ANALYZE updates table statistics for the query planner.')
  ]
);

/* =================== TOPIC 29: SQL Injection & Prevention =================== */
addTopic('sql-injection', 'SQL Injection & Prevention', 'intermediate', 25,
  ['SQL injection is a code injection technique where attackers insert malicious SQL into application queries.',
   'Common payloads: \' OR 1=1 --, \' UNION SELECT ... --, \' DROP TABLE users --',
   'Prevention: parameterized queries (prepared statements), input validation, least privilege, escaping.',
   'SQL injection is the #1 vulnerability in web applications according to OWASP Top 10.'
  ],
  'SQL injection is like a thief tricking your digital doorman. Instead of saying "I\'m John from apartment 3B", they say "I\'m John from apartment 3B OR I\'m a resident anyway". The OR condition makes the check always pass. Parameterized queries are like requiring a key card — no tricks allowed.',
  [
    d('How SQL Injection Works', 'Input: \' OR 1=1; -- becomes: SELECT * FROM users WHERE email = \'\' OR 1=1; --\' . The -- comments out the rest. Returns all users. UNION injection: \' UNION SELECT username, password FROM admins -- extracts data from other tables.'),
    d('Parameterized Queries (Prepared Statements)', 'Separates SQL code from data. Placeholders: $1, $2 (PostgreSQL), ? (MySQL). Driver safely escapes values. Example (Node.js/pg): client.query(\'SELECT * FROM users WHERE email = $1\', [userInput]). Data can never be interpreted as SQL.'),
    d('ORM Protection', 'Sequelize, TypeORM, Prisma, Knex use parameterized queries by default. But raw queries and $raw in WHERE filters can bypass protection. Never concatenate user input into raw query strings even within ORMs.'),
    d('Additional Defenses', 'Input validation: whitelist allowed characters, reject suspicious patterns. Least privilege: application DB user should only have needed permissions (no DROP TABLE). WAF (Web Application Firewall) can detect and block injection attempts.'),
    d('Stored Procedure Safety', 'Stored procedures can help if they use parameterized internal queries. But procedures with EXECUTE (dynamic SQL) are vulnerable if they concatenate input. Always use EXECUTE ... USING for parameterized dynamic SQL.')
  ],
  'SQL injection is entirely preventable. Never concatenate user input into SQL strings. Use parameterized queries for all database operations. This single practice eliminates the vast majority of SQL injection vulnerabilities.',
  [
    q('What is SQL injection?', 'An attack where malicious SQL code is inserted into application queries through user input, potentially exposing or destroying data.'),
    q('How does parameterized query prevent injection?', 'Separates SQL code from data. User input is treated as data values, never executable SQL.'),
    q('What is the most common SQL injection payload?', '\' OR 1=1 -- bypasses authentication by making the WHERE clause always true.'),
    q('Are ORMs safe from SQL injection?', 'ORMs use parameterized queries by default. But raw queries and bypass methods can still be vulnerable.'),
    q('What is least privilege?', 'Database users should have only the minimum permissions needed. The app user should not have DROP TABLE or administrative access.'),
    q('What does the -- do in SQL injection?', 'Comments out the rest of the SQL query, preventing syntax errors from the injected payload.'),
    q('Can stored procedures prevent SQL injection?', 'Only if they use parameterized queries internally. Dynamic SQL within procedures (EXECUTE with concatenation) is still vulnerable.'),
    q('What is blind SQL injection?', 'Injection where the attacker does not see error messages. They infer information through true/false responses (boolean-based) or timing delays (time-based).'),
    q('What is second-order SQL injection?', 'Malicious input is stored in the database, then executed later when retrieved and used in another query without proper escaping.'),
    q('How do you test for SQL injection?', 'Input special characters (\', ", ;, --). Error messages revealing SQL syntax suggest vulnerability. Automated tools: SQLMap, OWASP ZAP.')
  ],
  R(10,35,120,25,'#0070f3','','Input: \' OR 1=1--','Malicious payload') +
  A(130,48,160,48) +
  R(170,35,120,25,'#28a745','','Parameterized','Safe query') +
  A(170,60,170,80) +
  R(10,70,120,25,'#ffc107','','Validation','Input check') +
  R(10,105,120,25,'#dc3545','','Least Priv','Min perms') +
  A(130,83,160,83) + A(130,118,160,118) +
  R(170,75,120,50,'#e83e8c','','Escaping','Data > Code') +
  R(300,35,180,160,'#17a2b8','','SQL Injection Prevention','Parameterized queries + input validation + least privilege = defense in depth.') +
  T(240,225,'SQL Injection: Code injection attack. Prevention via parameterized queries and defense in depth.',9,'#666','middle'),
  [
    e('Vulnerable vs Safe (Node.js/pg)', 'Compare bad vs good.', codeBlock([
      '// VULNERABLE — NEVER DO THIS:',
      'const sql = `SELECT * FROM users WHERE email = \'${userInput}\'`;',
      "const result = await client.query(sql);",
      '',
      '// SAFE — parameterized query:',
      'const sql = \'SELECT * FROM users WHERE email = $1\';',
      "const result = await client.query(sql, [userInput]);"
    ]), 'String interpolation vs parameterized query — the difference between vulnerable and safe.'),
    e('Python/psycopg2 Example', 'Parameterized in Python.', codeBlock([
      'import psycopg2',
      '',
      '# VULNERABLE:',
      'cur.execute(f"SELECT * FROM users WHERE email = \'{user_input}\'")',
      '',
      '# SAFE — parameterized:',
      'cur.execute("SELECT * FROM users WHERE email = %s", (user_input,))'
    ]), 'Python psycopg2 parameterized query with %s placeholder.'),
    e('SQL Injection in Action', 'How authentication is bypassed.', codeBlock([
      '-- Normal query:',
      "SELECT * FROM users WHERE email = 'alice@x.com' AND password = 'secret123';",
      '',
      '-- Injection: Login with email:',
      "  ' OR 1=1 --",
      '',
      '-- Query becomes:',
      "SELECT * FROM users WHERE email = '' OR 1=1 --' AND password = 'anything';",
      '',
      '-- 1=1 is always true, -- comments out password check',
      '-- Returns first user — logged in as that user!'
    ]), 'Classic authentication bypass using OR 1=1 injection.'),
    e('Union-Based Injection', 'Extracting data from other tables.', codeBlock([
      '-- Vulnerable query:',
      "SELECT name, price FROM products WHERE id = ' + userInput",
      '',
      '-- Injection: id = 1 UNION SELECT username, password FROM admins',
      '',
      '-- Query becomes:',
      'SELECT name, price FROM products WHERE id = 1',
      'UNION',
      'SELECT username, password FROM admins;',
      '',
      '-- Returns product data + admin credentials!'
    ]), 'UNION injection extracts data from unrelated tables.'),
    e('Input Validation Defense', 'Whitelist approach.', codeBlock([
      '// Whitelist validation (Node.js):',
      'function validateUserId(input) {',
      '  const num = parseInt(input, 10);',
      '  if (isNaN(num) || num < 1) {',
      '    throw new Error("Invalid user ID");',
      '  }',
      '  return num;',
      '}',
      '',
      '// Safe query with validated input:',
      'const id = validateUserId(req.params.id);',
      'const result = await client.query("SELECT * FROM users WHERE id = $1", [id]);'
    ]), 'Input validation as an additional defense layer beyond parameterization.')
  ],
  [
    m('What is SQL injection?', ['A performance issue', 'A code injection attack', 'A data type error', 'A connection problem'], 1, 'SQL injection is a code injection attack through malicious input.'),
    m('What is the primary prevention?', ['Input validation', 'Parameterized queries', 'Encryption', 'Firewalls'], 1, 'Parameterized queries (prepared statements) are the primary defense.'),
    m('What does \' OR 1=1 -- do?', ['Returns no rows', 'Makes WHERE always true', 'Deletes the table', 'Shows an error'], 1, 'OR 1=1 makes the condition always true; -- comments out the rest.'),
    m('Can ORMs be vulnerable?', ['Never', 'Only raw queries can be', 'Always safe', 'Depends on database'], 1, 'ORMs are safe by default but raw queries and some bypasses can be vulnerable.'),
    m('What is least privilege?', ['Minimum permissions needed', 'Maximum permissions', 'No permissions', 'Admin access'], 0, 'Least privilege means the minimum permissions necessary for the application.'),
    m('What does -- do in SQL?', ['Comments out rest of query', 'Ends the query', 'Adds condition', 'Drops table'], 0, '-- is a SQL comment that removes the rest of the query.')
  ]
);

/* =================== TOPIC 30: Backup & Restore =================== */
addTopic('sql-backup-restore', 'Backup & Restore', 'intermediate', 25,
  ['PostgreSQL backup tools: pg_dump (single database, custom/plain/tar format), pg_dumpall (all databases, globals).',
   'pg_dump creates consistent snapshots without blocking reads. For zero-downtime backups, use pg_basebackup or replication.',
   'pg_restore restores from custom/directory/tar format. psql runs plain SQL dumps. Point-in-time recovery (PITR) uses WAL archives.',
   'Backup strategies: full weekly + daily incremental + continuous WAL archiving for PITR.'
  ],
  'Database backups are like insurance for your data. pg_dump is like taking a photo of your database at a specific moment. WAL archiving is like keeping a detailed diary of every single change — allowing you to "rewind" to any point in time.',
  [
    d('pg_dump (Logical Backup)', 'pg_dump -d dbname > backup.sql — plain SQL. pg_dump -Fc -d dbname > backup.dump — custom format (compressed, restorable selectively). pg_dump -Fd -d dbname backup_dir — directory format (parallel).'),
    d('pg_dumpall', 'pg_dumpall > all.sql — dumps all databases plus global objects (roles, tablespaces). pg_dumpall --globals-only > globals.sql — roles and tablespaces only. Restore with psql -f all.sql postgres.'),
    d('pg_restore', 'pg_restore -d dbname backup.dump — restore custom format. --clean — drop existing objects before restore. --jobs=n — parallel restore. -t table — restore single table. -l — list contents.'),
    d('Physical Backup and PITR', 'pg_basebackup — takes physical copy of entire cluster. Enable WAL archiving: archive_mode=on, archive_command. Restore: configure restore_command, create recovery.signal. Replay WAL to desired point in time (PITR).'),
    d('Backup Automation', 'cron job for pg_dump. pgBackRest or barman for enterprise backup management. Test restores regularly. 3-2-1 rule: 3 copies, 2 media types, 1 offsite.')
  ],
  'Regular backups and tested restore procedures are non-negotiable for production databases. Logical backups (pg_dump) are portable and human-readable. Physical backups (pg_basebackup + WAL) enable PITR and faster restores for large databases.',
  [
    q('What does pg_dump do?', 'Creates a logical backup of a single PostgreSQL database. Can output plain SQL, custom, directory, or tar format.'),
    q('What is the difference between pg_dump and pg_dumpall?', 'pg_dump backs up a single database. pg_dumpall backs up all databases and global objects (roles, tablespaces).'),
    q('What is the -Fc format in pg_dump?', 'Custom format — compressed, supports selective restore, parallel restore. Recommended for most backups.'),
    q('How do you restore a custom format dump?', 'pg_restore -d dbname backup.dump. With --clean to drop existing objects first.'),
    q('What is PITR?', 'Point-in-Time Recovery — the ability to restore a database to any moment in time using base backup + WAL archives.'),
    q('What is WAL archiving?', 'Continuous archiving of Write-Ahead Log (WAL) files that record every database change. Required for PITR.'),
    q('How do you restore a plain SQL dump?', 'psql -d dbname -f backup.sql. Plain SQL dumps are universal but can only restore the entire database.'),
    q('What is pg_basebackup?', 'Creates a physical base backup of the entire PostgreSQL cluster. Used for replication and PITR setup.'),
    q('How often should you backup?', 'Full backup weekly, incremental daily, continuous WAL archiving. Regular restore testing is more important than backup frequency.'),
    q('What is the 3-2-1 backup rule?', '3 copies of data, 2 different media types, 1 copy offsite.')
  ],
  R(10,35,110,25,'#0070f3','','pg_dump','Logical backup') +
  R(10,65,110,25,'#28a745','','pg_dumpall','All databases') +
  R(10,95,110,25,'#ffc107','','pg_restore','Restore dump') +
  R(10,125,110,25,'#dc3545','','WAL Archive','Continuous') +
  R(10,155,110,25,'#e83e8c','','PITR','Point-in-time') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,220,155,'#17a2b8','','Backup & Restore','Logical and physical backups, WAL archiving, and PITR strategies.') +
  T(240,220,'Backup & Restore: pg_dump, pg_restore, WAL archiving, and Point-in-Time Recovery.',9,'#666','middle'),
  [
    e('pg_dump Examples', 'Common backup commands.', codeBlock([
      '# Plain SQL format (portable)',
      'pg_dump -h localhost -U postgres mydb > mydb_backup.sql',
      '',
      '# Custom format (compressed, selective restore)',
      'pg_dump -Fc -h localhost -U postgres mydb > mydb_backup.dump',
      '',
      '# Directory format (parallel dump)',
      'pg_dump -Fd -j 4 -h localhost -U postgres mydb -f mydb_backup_dir/'
    ]), 'Different pg_dump formats for different needs.'),
    e('pg_restore Examples', 'Restoring backups.', codeBlock([
      '# Restore entire custom dump',
      'pg_restore -d mydb --clean mydb_backup.dump',
      '',
      '# Restore single table',
      'pg_restore -d mydb -t employees mydb_backup.dump',
      '',
      '# List contents of a dump',
      'pg_restore -l mydb_backup.dump',
      '',
      '# Parallel restore',
      'pg_restore -d mydb -j 4 mydb_backup.dump'
    ]), 'Selective restore and parallel restore with pg_restore.'),
    e('WAL Archiving Setup', 'Configure for PITR.', codeBlock([
      '# postgresql.conf',
      "wal_level = replica",
      "archive_mode = on",
      "archive_command = 'cp %p /archive/%f'",
      '',
      '# Take base backup',
      'pg_basebackup -D /backup/base -Ft -z',
      '',
      '# Recovery: create recovery.signal in data directory',
      "# and set restore_command = 'cp /archive/%f %p'",
      "# in postgresql.conf"
    ]), 'WAL archiving setup for continuous backup and point-in-time recovery.'),
    e('Automated Backup Script', 'Simple cron backup routine.', codeBlock([
      '#!/bin/bash',
      'BACKUP_DIR="/backups/$(date +%Y-%m-%d)"',
      'mkdir -p $BACKUP_DIR',
      '',
      '# Full backup',
      'pg_dump -Fc mydb > $BACKUP_DIR/mydb.dump',
      '',
      '# Globals only',
      'pg_dumpall --globals-only > $BACKUP_DIR/globals.sql',
      '',
      '# Remove backups older than 30 days',
      'find /backups/* -mtime +30 -exec rm -rf {} \\;'
    ]), 'Automated daily backup script with rotation.'),
    e('Testing Restores', 'Verify backup integrity.', codeBlock([
      '# Create a test database',
      'createdb test_restore',
      '',
      '# Restore into test database',
      'pg_restore -d test_restore mydb_backup.dump',
      '',
      '# Verify data integrity',
      'psql -d test_restore -c "SELECT COUNT(*) FROM employees;"',
      'psql -d test_restore -c "SELECT * FROM employees ORDER BY id DESC LIMIT 5;"',
      '',
      '# Drop test database',
      'dropdb test_restore'
    ]), 'Regular restore testing is essential — a backup is only as good as its last successful restore.')
  ],
  [
    m('What does pg_dump do?', ['Backs up a single database', 'Backs up all databases', 'Restores a backup', 'Creates a new database'], 0, 'pg_dump creates a logical backup of one database.'),
    m('What format supports selective restore?', ['Plain SQL', 'Custom (-Fc)', 'Tar', 'All formats'], 1, 'Custom format supports restoring individual tables selectively.'),
    m('What enables point-in-time recovery?', ['pg_dump', 'WAL archiving', 'pg_dumpall', 'Regular backups'], 1, 'WAL archiving enables PITR by recording every change.'),
    m('What command creates custom format backup?', ['pg_dump -Fc', 'pg_dump -Fp', 'pg_dumpall', 'pg_basebackup'], 0, 'pg_dump -Fc creates custom format backup.'),
    m('What does pg_restore --clean do?', ['Removes old backups', 'Drops existing objects before restore', 'Cleans temporary files', 'Optimizes database'], 1, '--clean drops existing database objects before restoring.'),
    m('How do you restore a plain SQL dump?', ['pg_restore', 'psql -f', 'pg_dump -r', 'psql -r'], 1, 'Use psql -f backup.sql to restore a plain SQL dump.')
  ]
);

/* =================== TOPIC 31: Users, Roles & Permissions =================== */
addTopic('sql-users-permissions', 'Users, Roles & Permissions', 'intermediate', 25,
  ['PostgreSQL manages access through roles (which can act as users or groups). Permissions are granted at database, schema, table, and column levels.',
   'CREATE ROLE creates a role. LOGIN attribute allows login. CREATE USER is equivalent to CREATE ROLE WITH LOGIN.',
   'GRANT assigns privileges. REVOKE removes privileges. Privileges: SELECT, INSERT, UPDATE, DELETE, ALL, and more.',
   'Row-Level Security (RLS) enables fine-grained per-row access control based on policy expressions.'
  ],
  'Roles and permissions are like building security. CREATE ROLE is getting a master key. GRANT is deciding which doors each person can open. RLS is like a security guard who checks if a person is allowed to see specific files, not just enter the room.',
  [
    d('Roles as Users and Groups', 'CREATE ROLE alice LOGIN PASSWORD \'secure\'; — user-level role. CREATE ROLE developers; GRANT developers TO alice; — group-level role. Roles can be nested (role groups containing other roles). Roles own database objects.'),
    d('Database-Level Privileges', 'GRANT CONNECT, CREATE ON DATABASE dbname TO role; — connect and create schema permissions. GRANT ALL ON DATABASE — all permissions. Default: public schema grants CREATE to PUBLIC (usually revoked in production).'),
    d('Schema and Table Permissions', 'GRANT USAGE ON SCHEMA public TO role; — schema access. GRANT SELECT, INSERT, UPDATE ON table TO role; — table operations. GRANT ALL ON ALL TABLES IN SCHEMA public TO role; — all tables in schema.'),
    d('Column-Level Permissions', 'GRANT SELECT (name, email) ON users TO role; — only specific columns visible. GRANT UPDATE (status) ON orders TO role; — can only update specific columns. Useful for hiding sensitive data (salary columns).'),
    d('Row-Level Security (RLS)', 'ALTER TABLE employees ENABLE ROW LEVEL SECURITY; CREATE POLICY emp_policy ON employees USING (department = current_setting(\'app.dept\')); — users only see rows matching their department. Requires superuser or table owner.')
  ],
  'Proper permission management is essential for security and compliance. Use roles for access groups, grant minimal privileges, and consider RLS for multi-tenant applications. Regularly audit permissions with \\dp or information_schema.',
  [
    q('What is a role in PostgreSQL?', 'An entity that can own objects and hold privileges. Can act as a user (with LOGIN) or a group (membership).'),
    q('What is the difference between CREATE ROLE and CREATE USER?', 'CREATE USER is equivalent to CREATE ROLE WITH LOGIN. CREATE ROLE does not include LOGIN by default.'),
    q('How do you grant privileges?', 'GRANT privilege ON object TO role; Example: GRANT SELECT ON employees TO app_user;'),
    q('How do you remove privileges?', 'REVOKE privilege ON object FROM role; Example: REVOKE DELETE ON employees FROM app_user;'),
    q('What are the main privilege types?', 'SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER, CREATE, CONNECT, TEMPORARY, EXECUTE, USAGE, ALL.'),
    q('What is Row-Level Security?', 'RLS limits which rows a user can see or modify based on a policy expression. Enables per-row access control.'),
    q('How do you enable RLS?', 'ALTER TABLE table_name ENABLE ROW LEVEL SECURITY; Then CREATE POLICY ... USING (condition).'),
    q('What is the PUBLIC role?', 'A special role that represents all database users. Default privileges often grant access to PUBLIC.'),
    q('What does GRANT USAGE ON SCHEMA do?', 'Allows accessing objects within the schema. Required before granting table-level permissions.'),
    q('How do you view privileges?', '\\dp table_name (psql), \\du for roles, information_schema.table_privileges for programmatic access.')
  ],
  R(10,35,100,25,'#0070f3','','CREATE ROLE','User/group') +
  R(10,65,100,25,'#28a745','','GRANT','Add perms') +
  R(10,95,100,25,'#ffc107','','REVOKE','Remove perms') +
  R(10,125,100,25,'#dc3545','','RLS','Row security') +
  A(110,48,140,48) + A(110,78,140,78) + A(110,108,140,108) + A(110,138,140,138) +
  R(150,35,230,130,'#17a2b8','','Users & Permissions','Roles, privileges, schemas, columns, and row-level security for access control.') +
  T(240,195,'Users & Permissions: Role-based access control from database level to row level.',9,'#666','middle'),
  [
    e('Creating Roles and Groups', 'User and group management.', codeBlock([
      "-- Create group role",
      "CREATE ROLE engineers NOLOGIN;",
      '',
      "-- Create user roles",
      "CREATE ROLE alice LOGIN PASSWORD 'secure123' IN ROLE engineers;",
      "CREATE ROLE bob LOGIN PASSWORD 'pass456' IN ROLE engineers;",
      '',
      "-- Grant permissions to group",
      "GRANT SELECT, INSERT ON employees TO engineers;"
    ]), 'Group roles simplify permission management — add users to groups rather than granting individually.'),
    e('Schema and Table Grants', 'Controlled access patterns.', codeBlock([
      '-- Application user needs minimal access',
      'CREATE ROLE app_user LOGIN PASSWORD \'app_pass\';',
      '',
      '-- Schema access',
      'GRANT USAGE ON SCHEMA public TO app_user;',
      '',
      '-- Table permissions (not all tables)',
      'GRANT SELECT, INSERT, UPDATE ON orders TO app_user;',
      'GRANT SELECT ON products TO app_user;',
      '-- No access to salaries, audit logs, etc.',
      '',
      '-- Default privileges for future tables',
      'ALTER DEFAULT PRIVILEGES IN SCHEMA public',
      'GRANT SELECT ON TABLES TO app_user;'
    ]), 'Minimal permissions for application user — only what is needed.'),
    e('Column-Level Security', 'Hide sensitive columns.', codeBlock([
      '-- Managers can see salaries:',
      'CREATE ROLE managers LOGIN PASSWORD \'mgmt_pass\';',
      'GRANT SELECT ON employees TO managers;',
      '',
      '-- HR staff see only non-sensitive columns:',
      'CREATE ROLE hr_staff LOGIN PASSWORD \'hr_pass\';',
      "GRANT SELECT (id, name, email, department, hire_date)",
      '  ON employees TO hr_staff;',
      '',
      '-- hr_staff query:',
      'SELECT id, name, email FROM employees; -- works',
      'SELECT salary FROM employees; -- ERROR: permission denied'
    ]), 'Column-level GRANT restricts access to specific columns.'),
    e('Row-Level Security Setup', 'Multi-tenant isolation.', codeBlock([
      '-- Enable RLS on orders table',
      'ALTER TABLE orders ENABLE ROW LEVEL SECURITY;',
      '',
      '-- Policy: users only see their own orders',
      'CREATE POLICY user_orders ON orders',
      'USING (customer_id = current_setting(\'app.user_id\')::INT);',
      '',
      '-- Bypass RLS for admins',
      'CREATE POLICY admin_all ON orders',
      'FOR ALL USING (current_setting(\'app.role\') = \'admin\');'
    ]), 'RLS ensures users can only access rows belonging to their organization or themselves.'),
    e('Revoking Dangerous Privileges', 'Secure production setup.', codeBlock([
      '-- Remove public create privilege',
      'REVOKE CREATE ON SCHEMA public FROM PUBLIC;',
      '',
      '-- App user should not modify schema',
      'REVOKE CREATE ON SCHEMA public FROM app_user;',
      '',
      '-- App user should not delete',
      'REVOKE DELETE, TRUNCATE ON ALL TABLES IN SCHEMA public FROM app_user;',
      '',
      '-- Review privileges',
      'SELECT grantee, privilege_type',
      'FROM information_schema.table_privileges',
      "WHERE table_name = 'employees';"
    ]), 'Production hardening — remove dangerous privileges from application users.')
  ],
  [
    m('What creates a login-capable role?', ['CREATE ROLE name LOGIN', 'CREATE USER name', 'CREATE GROUP name', 'Both A and B'], 3, 'CREATE USER and CREATE ROLE WITH LOGIN both create login-capable roles.'),
    m('What does GRANT do?', ['Removes permissions', 'Adds permissions', 'Creates users', 'Drops roles'], 1, 'GRANT assigns privileges to roles.'),
    m('What does RLS stand for?', ['Row-Level Security', 'Role-Level Security', 'Remote Login Service', 'Relational Lock System'], 0, 'RLS is Row-Level Security — per-row access control.'),
    m('What privilege allows schema access?', ['SELECT', 'USAGE', 'CREATE', 'ALL'], 1, 'USAGE ON SCHEMA allows accessing objects within the schema.'),
    m('What is the special PUBLIC role?', ['A superuser', 'All database users', 'Application users', 'Database owner'], 1, 'PUBLIC represents all current and future database users.'),
    m('How do you bypass RLS?', ['WITH ADMIN OPTION', 'BYPASSRLS attribute', 'SUPERUSER', 'Both B and C'], 3, 'BYPASSRLS role attribute or superuser status bypasses RLS.')
  ]
);

/* =================== TOPIC 32: UPSERT & MERGE =================== */
addTopic('sql-upsert', 'UPSERT & MERGE', 'intermediate', 20,
  ['UPSERT = INSERT + UPDATE (insert or update if already exists). PostgreSQL uses INSERT ... ON CONFLICT DO UPDATE.',
   'ON CONFLICT specifies the conflict target (unique constraint/index) and the action: DO NOTHING or DO UPDATE.',
   'MERGE (SQL standard, PostgreSQL 15+) combines INSERT, UPDATE, DELETE in a single statement based on a source/target match.',
   'UPSERT is atomic and concurrent-safe — no race conditions between check and insert/update.'
  ],
  'UPSERT is like "save or update" in a to-do app. When you save a task, if it already exists (same ID), update it instead. ON CONFLICT is saying "if this unique value already exists, here is what to do instead of erroring".',
  [
    d('INSERT ... ON CONFLICT DO NOTHING', 'INSERT INTO products (id, name) VALUES (1, \'Laptop\') ON CONFLICT (id) DO NOTHING; — inserts if no conflict, silently skips if conflict. Useful for idempotent inserts.'),
    d('INSERT ... ON CONFLICT DO UPDATE', 'INSERT INTO ... VALUES (...) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, updated_at = NOW(). EXCLUDED refers to the values that would have been inserted. Can reference both original table columns and EXCLUDED pseudo-table.'),
    d('Conflict Target', 'ON CONFLICT (column) — specify the unique column/index. ON CONFLICT ON CONSTRAINT constraint_name — specify constraint name. ON CONFLICT WHERE condition — partial unique indexes. Without target, DO UPDATE is not allowed.'),
    d('MERGE (PG 15+)', 'MERGE INTO target USING source ON condition WHEN MATCHED THEN UPDATE SET ... WHEN NOT MATCHED THEN INSERT .... Also supports WHEN MATCHED THEN DELETE. More flexible than ON CONFLICT but more verbose.'),
    d('Use Cases', 'Importing data with upserts (CSV imports, ETL). Session management (insert or update last seen). Inventory updates (insert new product or update stock). Counter tables (insert or increment).')
  ],
  'UPSERT is essential for any application that imports data or handles concurrent inserts/updates. ON CONFLICT DO UPDATE is the standard PostgreSQL approach — it is atomic, fast, and handles race conditions automatically.',
  [
    q('What is UPSERT?', 'INSERT + UPDATE — insert a row, or if a conflict occurs (unique violation), update the existing row.'),
    q('What is the PostgreSQL UPSERT syntax?', 'INSERT INTO table VALUES (...) ON CONFLICT (column) DO UPDATE SET column = EXCLUDED.column;'),
    q('What does EXCLUDED refer to?', 'A pseudo-table containing the values that would have been inserted. EXCLUDED.column refers to the proposed new value.'),
    q('What does ON CONFLICT DO NOTHING do?', 'Inserts if no conflict occurs. If a conflict occurs, silently does nothing (no error).'),
    q('What is the conflict target?', 'The unique column, constraint, or index that defines what constitutes a conflict.'),
    q('What is MERGE?', 'A SQL standard statement (PG 15+) that conditionally inserts, updates, or deletes based on source/target matching.'),
    q('What is the difference between MERGE and ON CONFLICT?', 'ON CONFLICT is simpler and PostgreSQL-specific. MERGE is more flexible (supports DELETE) but more verbose.'),
    q('Is UPSERT atomic?', 'Yes. ON CONFLICT is atomic — no race condition between the check and the insert/update.'),
    q('Can you use WHERE in DO UPDATE?', 'Yes: ON CONFLICT DO UPDATE SET column = value WHERE condition. Only updates if the condition is met.'),
    q('When would you use DO NOTHING vs DO UPDATE?', 'DO NOTHING: bulk imports where you want to skip duplicates. DO UPDATE: syncing data where you want latest values.')
  ],
  R(10,35,130,25,'#0070f3','','INSERT','First attempt') +
  A(140,48,170,48) +
  R(180,35,130,25,'#28a745','','ON CONFLICT','Conflict?') +
  A(180,60,180,80) + A(310,48,340,48) +
  R(10,70,130,25,'#ffc107','','DO NOTHING','Skip') +
  R(180,75,130,25,'#dc3545','','DO UPDATE','Update') +
  R(350,35,130,80,'#17a2b8','','UPSERT','Insert or Update. Atomic and race-condition-free.') +
  T(240,160,'UPSERT & MERGE: Insert or update in one atomic statement without race conditions.',9,'#666','middle'),
  [
    e('Basic UPSERT', 'Insert or update product.', codeBlock([
      "INSERT INTO products (id, name, price, stock)",
      "VALUES (101, 'Wireless Mouse', 29.99, 50)",
      "ON CONFLICT (id) DO UPDATE SET",
      "  name = EXCLUDED.name,",
      "  price = EXCLUDED.price,",
      "  stock = products.stock + EXCLUDED.stock,",
      "  updated_at = NOW();"
    ]), 'Inserts new product or adds stock and updates details for existing product.'),
    e('ON CONFLICT DO NOTHING', 'Idempotent inserts.', codeBlock([
      "-- Insert if not exists, skip if exists",
      "INSERT INTO user_sessions (user_id, session_token, created_at)",
      "VALUES (42, 'abc123', NOW())",
      "ON CONFLICT (user_id) DO NOTHING;",
      '',
      '-- Returns INSERT 0 0 if skipped,',
      '-- INSERT 0 1 if inserted'
    ]), 'Prevents duplicate session creation without raising errors.'),
    e('Using EXCLUDED', 'Reference proposed values.', codeBlock([
      'INSERT INTO counters (page, views, last_viewed)',
      "VALUES ('/home', 1, NOW())",
      'ON CONFLICT (page) DO UPDATE SET',
      '  views = counters.views + EXCLUDED.views,',
      '  last_viewed = EXCLUDED.last_viewed;'
    ]), 'EXCLUDED references the proposed values; table name references existing values.'),
    e('MERGE Statement (PG 15+)', 'Full-featured merge.', codeBlock([
      'MERGE INTO products p',
      'USING (VALUES (101, \'Mouse\', 25.00)) AS s(id, name, price)',
      'ON p.id = s.id',
      'WHEN MATCHED THEN UPDATE SET',
      '  name = s.name, price = s.price, updated_at = NOW()',
      'WHEN NOT MATCHED THEN INSERT (id, name, price)',
      '  VALUES (s.id, s.name, s.price);'
    ]), 'MERGE provides standard SQL syntax with WHEN MATCHED / NOT MATCHED clauses.'),
    e('Conditional UPSERT', 'Update only certain conditions.', codeBlock([
      "INSERT INTO orders (id, status, amount, updated_at)",
      "VALUES (5001, 'shipped', 150.00, NOW())",
      'ON CONFLICT (id) DO UPDATE SET',
      '  status = EXCLUDED.status,',
      '  updated_at = NOW()',
      "WHERE orders.status != 'cancelled';",
      '',
      '-- Only updates if the existing order is not cancelled'
    ]), 'Conditional DO UPDATE prevents overwriting certain states (e.g., cancelled orders).')
  ],
  [
    m('What does UPSERT stand for?', ['Update + Select', 'Insert + Update', 'Union + Select', 'Unique + Insert'], 1, 'UPSERT = INSERT + UPDATE (insert or update).'),
    m('What PostgreSQL feature enables UPSERT?', ['MERGE', 'ON CONFLICT', 'UPSERT keyword', 'REPLACE'], 1, 'INSERT ... ON CONFLICT is the PostgreSQL UPSERT mechanism.'),
    m('What does EXCLUDED represent?', ['Existing row data', 'Proposed new values', 'Excluded columns', 'Error data'], 1, 'EXCLUDED refers to the values that would have been inserted.'),
    m('What does ON CONFLICT DO NOTHING do?', ['Errors on conflict', 'Skips silently on conflict', 'Updates on conflict', 'Deletes on conflict'], 1, 'DO NOTHING skips the insert silently on conflict without error.'),
    m('When was MERGE added to PostgreSQL?', ['PG 10', 'PG 12', 'PG 14', 'PG 15'], 3, 'MERGE was added in PostgreSQL 15.'),
    m('Is UPSERT atomic?', ['Yes', 'No', 'Depends on index', 'Only with DO NOTHING'], 0, 'ON CONFLICT is atomic — no race conditions.')
  ]
);

/* =================== TOPIC 33: Sequences & Identity =================== */
addTopic('sql-sequences', 'Sequences & Identity', 'beginner', 15,
  ['Sequences are database objects that generate unique numeric values, typically used for auto-incrementing primary keys.',
   'PostgreSQL: CREATE SEQUENCE, SERIAL (old), GENERATED AS IDENTITY (new, standard).',
   'SERIAL is a shorthand for creating a sequence and setting a DEFAULT. GENERATED AS IDENTITY is the SQL standard and more robust.',
   'Sequences can be shared across tables, have min/max values, cycle, cache, and be customized.'
  ],
  'A sequence is like a ticket dispenser at a deli counter. Every time you pull a ticket, you get the next number. One person gets #42, the next gets #43. Sequences guarantee unique numbers even when multiple people (users) are taking tickets simultaneously.',
  [
    d('SERIAL Pseudo-Type', 'id SERIAL PRIMARY KEY — creates integer column with auto-incrementing sequence. SERIAL = INT + DEFAULT nextval(\'table_id_seq\'). BIGSERIAL for bigint. SMALLSERIAL for smallint. Cannot alter the sequence behavior.'),
    d('GENERATED AS IDENTITY (PG 10+)', 'id INT GENERATED ALWAYS AS IDENTITY — SQL standard. GENERATED BY DEFAULT — allows manual inserts. ALWAYS prevents manual override (cannot INSERT explicit value). BY DEFAULT allows manual values. Preferred over SERIAL.'),
    d('Sequence Operations', 'nextval(\'seq\') — get next value. currval(\'seq\') — current value in session. setval(\'seq\', n) — set current value. ALTER SEQUENCE — change min/max/cache/cycle. Sequence values are transaction-independent (cannot be rolled back).'),
    d('Shared Sequences', 'Multiple tables can share one sequence: CREATE SEQUENCE global_id; DEFAULT nextval(\'global_id\') in multiple tables. Useful for global unique IDs across tables. Cannot be used with SERIAL (auto-creates per-table sequence).'),
    d('Sequence Gaps', 'Sequences generate unique numbers but not gapless. Gaps occur from: ROLLBACK (values consumed but not rolled back), cache losses (server crash), concurrent transactions. For gapless sequences, use a counter table with transactions.')
  ],
  'Sequences are the standard way to generate unique identifiers in PostgreSQL. GENERATED AS IDENTITY is the modern, standard-conforming approach. SERIAL is legacy but widely used. Neither guarantees gapless numbers — only uniqueness.',
  [
    q('What is a sequence?', 'A database object that generates a unique numeric value each time nextval() is called.'),
    q('What is the difference between SERIAL and GENERATED AS IDENTITY?', 'SERIAL creates a sequence + DEFAULT. GENERATED AS IDENTITY (PG 10+) is SQL standard, more robust, supports ALWAYS/BY DEFAULT.'),
    q('What does nextval() do?', 'Advances the sequence to the next value and returns it. Cannot be rolled back.'),
    q('What does currval() do?', 'Returns the current value of the sequence for this session. Returns the last nextval() called.'),
    q('What does setval() do?', 'Sets the sequence\'s current value (or next value depending on third parameter).'),
    q('Can sequences roll back?', 'No. Once nextval() is called, the value is consumed even if the transaction rolls back. This prevents blocking concurrent inserts.'),
    q('What is the default increment for a sequence?', '1. Can be changed with ALTER SEQUENCE ... INCREMENT BY n.'),
    q('Can multiple tables share a sequence?', 'Yes. Create a standalone sequence and reference it in DEFAULT clauses of multiple tables.'),
    q('What is a sequence cache?', 'Pre-allocates sequence values in memory for performance. Default cache is 1. Higher cache improves speed but loses more values on crash.'),
    q('How do you reset a sequence?', 'ALTER SEQUENCE seq_name RESTART WITH n; or setval(\'seq_name\', n, false);')
  ],
  R(10,35,120,25,'#0070f3','','CREATE SEQUENCE','Standalone') +
  R(10,65,120,25,'#28a745','','SERIAL','Auto ID') +
  R(10,95,120,25,'#ffc107','','IDENTITY','Standard') +
  R(10,125,120,25,'#dc3545','','nextval','Get next') +
  R(10,155,120,25,'#e83e8c','','Cache','Performance') +
  A(130,48,160,48) + A(130,78,160,78) + A(130,108,160,108) + A(130,138,160,138) + A(130,168,160,168) +
  R(170,35,210,155,'#17a2b8','','Sequences & Identity','Auto-incrementing unique values for primary keys and identifiers.') +
  T(240,220,'Sequences & Identity: Auto-incrementing unique ID generation for primary keys.',9,'#666','middle'),
  [
    e('SERIAL vs IDENTITY Comparison', 'Different syntax approaches.', codeBlock([
      '-- SERIAL (legacy approach)',
      'CREATE TABLE products_serial (',
      '  id SERIAL PRIMARY KEY,',
      '  name VARCHAR(100)',
      ');',
      '',
      '-- GENERATED ALWAYS (modern approach)',
      'CREATE TABLE products_identity (',
      '  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,',
      '  name VARCHAR(100)',
      ');',
      '',
      '-- GENERATED BY DEFAULT (allow manual IDs)',
      'CREATE TABLE products_default (',
      '  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,',
      '  name VARCHAR(100)',
      ');'
    ]), 'SERIAL vs GENERATED AS IDENTITY — the modern approach is preferred.'),
    e('Custom Sequence', 'Standalone sequence usage.', codeBlock([
      'CREATE SEQUENCE order_number_seq',
      '  START WITH 10000',
      '  INCREMENT BY 1',
      '  MINVALUE 10000',
      '  MAXVALUE 99999',
      '  CYCLE;  -- wrap around when max reached',
      '',
      'CREATE TABLE orders (',
      '  order_number INT DEFAULT nextval(\'order_number_seq\') PRIMARY KEY,',
      '  customer_id INT,',
      '  total DECIMAL(10,2)',
      ');',
      '',
      "INSERT INTO orders (customer_id, total) VALUES (42, 150.00);",
      '-- order_number is auto-populated: 10000'
    ]), 'Custom sequence with specific range and CYCLE behavior.'),
    e('Shared Sequence Across Tables', 'Global unique IDs.', codeBlock([
      'CREATE SEQUENCE global_id_seq;',
      '',
      'CREATE TABLE users (',
      '  id INT DEFAULT nextval(\'global_id_seq\') PRIMARY KEY,',
      '  name VARCHAR(100)',
      ');',
      '',
      'CREATE TABLE products (',
      '  id INT DEFAULT nextval(\'global_id_seq\') PRIMARY KEY,',
      '  name VARCHAR(100)',
      ');',
      '',
      '-- All IDs are unique across both tables',
      '-- Useful for audit logs referencing any entity'
    ]), 'Shared sequence ensures globally unique IDs across multiple tables.'),
    e('Sequence Operations', 'Managing sequences.', codeBlock([
      "-- View current value",
      "SELECT currval('products_id_seq');",
      '',
      '-- Get next value without inserting',
      "SELECT nextval('products_id_seq');",
      '',
      '-- Reset sequence',
      "SELECT setval('products_id_seq', 1000);",
      '',
      '-- Alter sequence properties',
      "ALTER SEQUENCE products_id_seq INCREMENT BY 10 CACHE 20;"
    ]), 'Sequence management functions for inspection and modification.'),
    e('Handling Gaps', 'Understanding why gaps happen.', codeBlock([
      '-- Gap example:',
      'BEGIN;',
      "INSERT INTO products (name) VALUES ('Laptop'); -- gets id=1",
      'ROLLBACK; -- id=1 is consumed',
      '',
      'BEGIN;',
      "INSERT INTO products (name) VALUES ('Phone'); -- gets id=2",
      'COMMIT;',
      '',
      '-- Table has: id=2 (no id=1)',
      '-- Gap occurred because id=1 was consumed and rolled back'
    ]), 'Understanding sequence gaps — rollback, cache, and concurrent transactions cause gaps.')
  ],
  [
    m('What does SERIAL do?', ['Creates a unique index', 'Creates auto-increment column', 'Creates a sequence only', 'Creates a primary key'], 1, 'SERIAL creates an auto-incrementing integer column with a backing sequence.'),
    m('What is GENERATED ALWAYS?', ['Allows manual values', 'Prevents manual values', 'Creates a sequence', 'Drops a table'], 1, 'GENERATED ALWAYS prevents inserting explicit values — only the system generates IDs.'),
    m('What function gets the next sequence value?', ['currval', 'nextval', 'setval', 'lastval'], 1, 'nextval() advances and returns the next sequence value.'),
    m('Can sequence values be rolled back?', ['Yes', 'No', 'Only with savepoints', 'Depends on configuration'], 1, 'Sequence values persist even if the transaction rolls back.'),
    m('What is the purpose of sequence cache?', ['Increases uniqueness', 'Improves performance', 'Reduces gaps', 'Enables rollback'], 1, 'Cache pre-allocates sequence values for better concurrent performance.'),
    m('Which is the modern PostgreSQL approach?', ['SERIAL', 'GENERATED AS IDENTITY', 'AUTO_INCREMENT', 'SEQUENCE DEFAULT'], 1, 'GENERATED AS IDENTITY (PG 10+) is the modern SQL standard approach.')
  ]
);

/* =================== TOPIC 34: Data Types Deep Dive =================== */
addTopic('sql-data-types', 'Data Types Deep Dive', 'intermediate', 25,
  ['PostgreSQL has the richest set of data types including numeric, character, date/time, boolean, enumerated, geometric, network, bit string, text search, UUID, XML, JSON, array, range, and composite types.',
   'Numeric types: SMALLINT, INTEGER, BIGINT, DECIMAL/NUMERIC (exact), REAL, DOUBLE PRECISION (floating).',
   'Character types: CHAR(n), VARCHAR(n), TEXT (unlimited). TEXT and VARCHAR have same performance in PostgreSQL.',
   'Special types: UUID, INET/CIDR (network), TSVECTOR/TSQUERY (text search), INT4RANGE/NUMRANGE (range).'
  ],
  'Data types are like different containers in a kitchen. SMALLINT is a shot glass (small), INT is a regular glass, BIGINT is a pitcher. VARCHAR(50) is a labeled container that can hold up to 50 items, TEXT is a giant bin. Using the right container prevents spills and wasted space.',
  [
    d('Numeric Types', 'SMALLINT (2 bytes, -32k to 32k). INTEGER/INT (4 bytes, -2B to 2B). BIGINT (8 bytes). DECIMAL(p,s)/NUMERIC(p,s) — exact precision, perfect for money. REAL (4 bytes float). DOUBLE (8 bytes float). SERIAL/BIGSERIAL — auto-increment integers.'),
    d('Character Types', 'CHAR(n) — fixed-length, padded with spaces (wastes space). VARCHAR(n) — variable up to n. TEXT — unlimited. All have same performance in PostgreSQL (unlike other databases). No performance penalty for using TEXT over VARCHAR.'),
    d('Date/Time Types', 'DATE — calendar date (no time). TIME — time of day. TIMESTAMP — date + time (no timezone). TIMESTAMPTZ — with timezone (stored as UTC). INTERVAL — duration. Always use TIMESTAMPTZ for application timestamps.'),
    d('Boolean and Enumerated', 'BOOLEAN — true/false. Accepts TRUE, \'t\', \'true\', \'1\', \'yes\'. FALSE: FALSE, \'f\', \'false\', \'0\', \'no\'. CREATE TYPE mood AS ENUM (\'sad\', \'ok\', \'happy\') — enumerated type with ordered values. Cannot add/remove values without ALTER TYPE.'),
    d('Array, Range, and Composite', 'INT[] — array type. INT4RANGE — range type with inclusive/exclusive bounds. CREATE TYPE composite AS (a INT, b TEXT) — composite type for table definitions and functions. Custom types extend PostgreSQL\'s type system.')
  ],
  'Mastering PostgreSQL data types is crucial for schema design. Choosing the right type impacts storage, performance, and data integrity. PostgreSQL\'s extensible type system supports custom types, domains, and enumerations.',
  [
    q('What are the numeric types in PostgreSQL?', 'SMALLINT, INTEGER, BIGINT, DECIMAL/NUMERIC, REAL, DOUBLE PRECISION. Plus serial variants.'),
    q('What is the difference between VARCHAR and TEXT?', 'No performance difference in PostgreSQL. VARCHAR(n) has a length limit. TEXT is unlimited. Use VARCHAR when length constraint is needed.'),
    q('What is the difference between TIMESTAMP and TIMESTAMPTZ?', 'TIMESTAMP stores date/time without timezone. TIMESTAMPTZ stores with timezone, normalized to UTC for storage, displayed in session timezone.'),
    q('What is NUMERIC/DECIMAL used for?', 'Exact precision fixed-point numbers. Perfect for monetary values where floating-point rounding is unacceptable.'),
    q('What is an enumerated type?', 'A custom type with a fixed set of values: CREATE TYPE status AS ENUM (\'active\', \'inactive\', \'pending\').'),
    q('What is a range type?', 'A type that represents a range of values: INT4RANGE (integer range), DATERANGE (date range), NUMRANGE.'),
    q('What is a composite type?', 'A custom type with multiple fields: CREATE TYPE address AS (street TEXT, city TEXT, zip TEXT).'),
    q('What is UUID type?', 'Stores Universally Unique Identifiers. Good for distributed systems. Use gen_random_uuid() to generate.'),
    q('What is INET type?', 'Stores IPv4 or IPv6 addresses. Supports subnet operations and sorting. Built-in validation.'),
    q('What is BYTEA?', 'Binary data storage. Up to 1GB per value. Two formats: BYTEA (escape) and BYTEA (hex).')
  ],
  R(10,35,100,25,'#0070f3','','Numeric','INT, DECIMAL') +
  R(10,65,100,25,'#28a745','','Text','VARCHAR, TEXT') +
  R(10,95,100,25,'#ffc107','','Date/Time','TIMESTAMP') +
  R(10,125,100,25,'#dc3545','','Special','UUID, INET') +
  R(10,155,100,25,'#e83e8c','','Custom','ENUM, COMPOSITE') +
  A(110,48,140,48) + A(110,78,140,78) + A(110,108,140,108) + A(110,138,140,138) + A(110,168,140,168) +
  R(150,35,230,155,'#17a2b8','','Data Types Deep Dive','PostgreSQL\'s rich type system: numeric, text, temporal, network, custom types.') +
  T(240,220,'Data Types: PostgreSQL\'s extensive type system for precise and efficient data storage.',9,'#666','middle'),
  [
    e('Choosing the Right Numeric Type', 'Match type to data.', codeBlock([
      '-- Age: SMALLINT (range: -32768 to 32767)',
      'CREATE TABLE people (age SMALLINT);',
      '',
      '-- Population: INTEGER (fits 2 billion)',
      'CREATE TABLE cities (population INT);',
      '',
      '-- Large counter: BIGINT',
      'CREATE TABLE page_views (count BIGINT);',
      '',
      '-- Monetary: DECIMAL (exact precision)',
      'CREATE TABLE accounts (balance DECIMAL(12,2));',
      '',
      '-- Scientific: DOUBLE PRECISION',
      'CREATE TABLE measurements (value DOUBLE PRECISION);'
    ]), 'Choosing the appropriate numeric type for different data ranges and precision needs.'),
    e('UUID as Primary Key', 'Distributed-friendly IDs.', codeBlock([
      'CREATE EXTENSION IF NOT EXISTS pgcrypto;',
      '',
      'CREATE TABLE users (',
      '  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,',
      '  name VARCHAR(100),',
      '  email VARCHAR(255)',
      ');',
      '',
      "INSERT INTO users (name, email) VALUES ('Alice', 'alice@x.com');",
      '-- id = \'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11\' (random)'
    ]), 'UUID primary keys are ideal for distributed systems and avoiding sequential ID guessing.'),
    e('Range Types Usage', 'Date range for bookings.', codeBlock([
      'CREATE TABLE room_bookings (',
      '  room_id INT,',
      '  booking_period DATERANGE,',
      '  EXCLUDE USING gist (room_id WITH =, booking_period WITH &&)',
      ');',
      '',
      "INSERT INTO room_bookings VALUES",
      "  (101, '[2024-01-01, 2024-01-05)');",
      '',
      '-- This will be rejected (overlap):',
      "INSERT INTO room_bookings VALUES",
      "  (101, '[2024-01-03, 2024-01-07)');",
      '-- ERROR: conflicting key'
    ]), 'Range types with exclusion constraints prevent overlapping bookings.'),
    e('Enumerated Types', 'Fixed status values.', codeBlock([
      "CREATE TYPE order_status AS ENUM (",
      "  'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'",
      ");",
      '',
      'CREATE TABLE orders (',
      '  id INT PRIMARY KEY,',
      '  status order_status DEFAULT \'pending\'',
      ');',
      '',
      "INSERT INTO orders (id, status) VALUES (1, 'pending');",
      '-- Order respects enum order: pending < confirmed < shipped < delivered'
    ]), 'ENUM types enforce valid values and maintain sort order.'),
    e('Network Types', 'Store IP addresses.', codeBlock([
      'CREATE TABLE access_log (',
      '  ip INET,',
      '  mac MACADDR,',
      '  accessed_at TIMESTAMPTZ',
      ');',
      '',
      "INSERT INTO access_log VALUES",
      "  ('192.168.1.100', '08:00:2b:01:02:03', NOW());",
      '',
      '-- Network queries:',
      "SELECT * FROM access_log",
      "WHERE ip <<= '192.168.1.0/24'; -- subnet containment"
    ]), 'INET and MACADDR types provide built-in validation and network operations.')
  ],
  [
    m('Which type is best for monetary values?', ['FLOAT', 'DOUBLE', 'DECIMAL', 'INTEGER'], 2, 'DECIMAL/NUMERIC provides exact precision for monetary values.'),
    m('What is the difference between VARCHAR and TEXT in PostgreSQL?', ['Performance', 'TEXT is unlimited', 'VARCHAR is faster', 'No real difference'], 3, 'VARCHAR and TEXT have identical performance in PostgreSQL.'),
    m('Which timestamp type stores timezone?', ['TIMESTAMP', 'TIMESTAMPTZ', 'TIMESTAMP WITH LOCAL TZ', 'All of them'], 1, 'TIMESTAMPTZ stores timezone-aware timestamps.'),
    m('What is UUID ideal for?', ['Sequential IDs', 'Distributed systems', 'Small tables', 'Foreign keys'], 1, 'UUID is ideal for distributed systems where unique IDs must be generated independently.'),
    m('What does ENUM provide?', ['Unlimited values', 'Fixed valid values', 'Faster queries', 'Smaller storage'], 1, 'ENUM restricts values to a predefined set.'),
    m('What type stores IP addresses?', ['TEXT', 'VARCHAR', 'INET', 'IP'], 2, 'INET provides built-in IP address validation and operations.')
  ]
);

/* =================== TOPIC 35: Table Partitioning =================== */
addTopic('sql-partitioning', 'Table Partitioning', 'advanced', 30,
  ['Table partitioning divides a large table into smaller, more manageable pieces called partitions, improving query performance and data management.',
   'Partition methods: RANGE (by date range), LIST (by discrete values), HASH (by hash of a column).',
   'Partition pruning: the query planner skips irrelevant partitions based on the WHERE clause, dramatically reducing I/O.',
   'PostgreSQL supports declarative partitioning (PG 10+) with sub-partitioning and partition maintenance operations.'
  ],
  'Table partitioning is like organizing a giant filing cabinet by year. Instead of searching through 10 years of documents, you open the 2024 drawer. Partition pruning means the database only looks in relevant partitions, making queries much faster.',
  [
    d('RANGE Partitioning', 'PARTITION BY RANGE (created_at). Partitions: FOR VALUES FROM (\'2024-01-01\') TO (\'2024-04-01\'). Best for time-series data: logs, transactions, historical data. Supports automatic partition creation with pg_partman extension.'),
    d('LIST Partitioning', 'PARTITION BY LIST (region). Partitions: FOR VALUES IN (\'US\'), FOR VALUES IN (\'EU\'). Best for data with discrete categories: regions, departments, status values. Each partition holds matching values.'),
    d('HASH Partitioning', 'PARTITION BY HASH (id). Partitions: FOR VALUES WITH (MODULUS 4, REMAINDER 0). Distributes data evenly across N partitions. Best for load balancing and when no natural partition key exists.'),
    d('Partition Pruning', 'Automatic: query planner examines WHERE clause and accesses only matching partitions. EXPLAIN shows "Partitions: excluded=3" for a 4-partition table when 3 are skipped. Critical for performance on large partitioned tables.'),
    d('Partition Maintenance', 'CREATE TABLE ... PARTITION OF — attach new partition. DROP TABLE partition_name — drop old partition (fast, no vacuum). ALTER TABLE ... DETACH PARTITION — detach then drop. REINDEX each partition separately.')
  ],
  'Table partitioning is essential for managing large tables (100M+ rows). It improves query performance via partition pruning, enables fast data deletion (DROP PARTITION), and simplifies data lifecycle management.',
  [
    q('What is table partitioning?', 'Dividing a large table into smaller physical pieces (partitions) while maintaining a single logical table interface.'),
    q('What are the three partitioning methods?', 'RANGE (date ranges), LIST (value lists), HASH (hash distribution).'),
    q('What is partition pruning?', 'The query planner automatically skips partitions that do not match the WHERE conditions, reducing I/O.'),
    q('What is RANGE partitioning best for?', 'Time-series data: logs, transactions, sensor data, audit tables. Common: monthly or yearly partitions.'),
    q('What is LIST partitioning best for?', 'Discrete categories: regions (\'US\', \'EU\', \'APAC\'), status values, departments.'),
    q('What is HASH partitioning best for?', 'Even data distribution when no natural partition key exists. Good for load balancing.'),
    q('How do you add a new partition?', 'CREATE TABLE partition_name PARTITION OF main_table FOR VALUES FROM (x) TO (y);'),
    q('How do you remove old data?', 'DROP TABLE partition_name; — much faster than DELETE from a non-partitioned table.'),
    q('Can partitions be indexed?', 'Yes. Indexes are created per partition. In PG 11+, indexes on parent are automatically created on new partitions.'),
    q('What are the limitations of partitioning?', 'No cross-partition foreign keys. Unique indexes must include the partition key. No global indexes (each partition indexed separately).')
  ],
  R(10,35,110,25,'#0070f3','','RANGE','Date ranges') +
  R(10,65,110,25,'#28a745','','LIST','Categories') +
  R(10,95,110,25,'#ffc107','','HASH','Distribution') +
  R(10,125,110,25,'#dc3545','','Pruning','Skip parts') +
  R(10,155,110,25,'#e83e8c','','Maintenance','Add/drop') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,220,155,'#17a2b8','','Table Partitioning','Split large tables into smaller pieces for performance and manageability.') +
  T(240,220,'Table Partitioning: RANGE, LIST, HASH — partition pruning for faster queries on large tables.',9,'#666','middle'),
  [
    e('RANGE Partitioning by Month', 'Time-series data management.', codeBlock([
      'CREATE TABLE orders (',
      '  id INT, order_date DATE, amount DECIMAL, customer_id INT',
      ') PARTITION BY RANGE (order_date);',
      '',
      "CREATE TABLE orders_2024_q1 PARTITION OF orders",
      "  FOR VALUES FROM ('2024-01-01') TO ('2024-04-01');",
      '',
      "CREATE TABLE orders_2024_q2 PARTITION OF orders",
      "  FOR VALUES FROM ('2024-04-01') TO ('2024-07-01');",
      '',
      "CREATE TABLE orders_2024_q3 PARTITION OF orders",
      "  FOR VALUES FROM ('2024-07-01') TO ('2024-10-01');",
      '',
      "CREATE TABLE orders_2024_q4 PARTITION OF orders",
      "  FOR VALUES FROM ('2024-10-01') TO ('2025-01-01');"
    ]), 'Creates quarterly partitions for orders table. Queries by date range only scan relevant partitions.'),
    e('LIST Partitioning by Region', 'Categorical data.', codeBlock([
      'CREATE TABLE customers (',
      '  id INT, name TEXT, region TEXT, signup_date DATE',
      ') PARTITION BY LIST (region);',
      '',
      "CREATE TABLE customers_us PARTITION OF customers",
      "  FOR VALUES IN ('US', 'CA', 'MX');",
      '',
      "CREATE TABLE customers_eu PARTITION OF customers",
      "  FOR VALUES IN ('UK', 'DE', 'FR', 'IT');",
      '',
      "CREATE TABLE customers_apac PARTITION OF customers",
      "  FOR VALUES IN ('JP', 'CN', 'IN', 'AU');",
      '',
      '-- Query: WHERE region = \'DE\' only scans eu partition'
    ]), 'LIST partitioning separates data by geographic region for regional data isolation.'),
    e('HASH Partitioning', 'Even data distribution.', codeBlock([
      'CREATE TABLE events (',
      '  id INT, event_data TEXT, created_at TIMESTAMPTZ',
      ') PARTITION BY HASH (id);',
      '',
      'CREATE TABLE events_0 PARTITION OF events',
      '  FOR VALUES WITH (MODULUS 4, REMAINDER 0);',
      'CREATE TABLE events_1 PARTITION OF events',
      '  FOR VALUES WITH (MODULUS 4, REMAINDER 1);',
      'CREATE TABLE events_2 PARTITION OF events',
      '  FOR VALUES WITH (MODULUS 4, REMAINDER 2);',
      'CREATE TABLE events_3 PARTITION OF events',
      '  FOR VALUES WITH (MODULUS 4, REMAINDER 3);'
    ]), 'HASH partitioning distributes data evenly across 4 partitions for load balancing.'),
    e('Partition Pruning in Action', 'Verify with EXPLAIN.', codeBlock([
      "EXPLAIN SELECT * FROM orders",
      "WHERE order_date >= '2024-06-01' AND order_date < '2024-07-01';",
      '',
      '-- Output shows only q2 partition scanned:',
      '-- Seq Scan on orders_2024_q2 ...',
      '--   Filter: (order_date >= \'2024-06-01\'::date)',
      '-- Other partitions: excluded (pruned)'
    ]), 'EXPLAIN shows partition pruning in action — only relevant partitions are scanned.'),
    e('Managing Partitions', 'Adding and dropping partitions.', codeBlock([
      '-- Add a new partition for next quarter',
      "CREATE TABLE orders_2025_q1 PARTITION OF orders",
      "  FOR VALUES FROM ('2025-01-01') TO ('2025-04-01');",
      '',
      '-- Drop old data (fast, no vacuum)',
      'DROP TABLE orders_2023_q1;',
      '',
      '-- Detach partition for archival',
      'ALTER TABLE orders DETACH PARTITION orders_2023_q2;',
      '-- Can now move the detached table to archive storage'
    ]), 'Efficient data lifecycle management with partition add, drop, and detach operations.')
  ],
  [
    m('What is table partitioning?', ['Indexing strategy', 'Splitting tables into smaller pieces', 'Joining tables', 'Caching strategy'], 1, 'Partitioning divides a large table into smaller physical partitions.'),
    m('Which method is best for time-series?', ['LIST', 'RANGE', 'HASH', 'KEY'], 1, 'RANGE partitioning is ideal for time-series data by date ranges.'),
    m('What is partition pruning?', ['Deleting partitions', 'Skipping irrelevant partitions', 'Creating partitions', 'Merging partitions'], 1, 'Partition pruning skips partitions that do not match the query WHERE clause.'),
    m('Which method distributes data evenly?', ['RANGE', 'LIST', 'HASH', 'KEY'], 2, 'HASH partitioning distributes data evenly across a fixed number of partitions.'),
    m('How do you remove old data efficiently?', ['DELETE FROM', 'DROP PARTITION', 'TRUNCATE', 'VACUUM'], 1, 'DROP TABLE on a partition is much faster than DELETE from a large table.'),
    m('What is a limitation of partitioning?', ['No indexes allowed', 'No cross-partition FKs', 'Slow queries', 'No INSERT allowed'], 1, 'Foreign keys cannot reference a partitioned table (no cross-partition FKs).')
  ]
);

/* =================== TOPIC 36: PIVOT & Crosstab Queries =================== */
addTopic('sql-pivot', 'PIVOT & Crosstab Queries', 'advanced', 25,
  ['Pivot queries transform rows into columns, creating crosstab or matrix-style reports from normalized data.',
   'Crosstab queries are necessary for: sales by month (rows=products, columns=months), attendance by department, survey results by category.',
   'PostgreSQL does not have a built-in PIVOT operator. Use tablefunc extension (crosstab function) or conditional aggregation with CASE.',
   'Conditional aggregation (CASE inside aggregate) is the most portable approach, working in all SQL databases.'
  ],
  'A pivot is like turning a vertical list into a spreadsheet. Instead of a list like "Product A - Jan - 100, Product A - Feb - 200", you get a table with months as columns: "Product A | Jan: 100 | Feb: 200 | Mar: 150". Rows become columns.',
  [
    d('Conditional Aggregation (CASE Pivot)', 'SELECT category, SUM(CASE WHEN month = \'Jan\' THEN amount END) AS jan, ... FROM sales GROUP BY category. Most portable — works in all databases. Easy to understand. Column count is fixed at query time.'),
    d('tablefunc Extension (crosstab)', 'CREATE EXTENSION tablefunc; SELECT * FROM crosstab(\'source_sql\', \'category_sql\') AS ct(row_name TYPE, col1 TYPE, col2 TYPE, ...). Source query must return (row_name, category, value) ordered correctly. Dynamic columns are not supported.'),
    d('FILTER Clause (PostgreSQL 9.4+)', 'SELECT category, COUNT(*) FILTER (WHERE month = \'Jan\') AS jan, ... FROM sales GROUP BY category. Cleaner syntax than CASE. PostgreSQL-specific. Same performance as CASE.'),
    d('Dynamic Pivot with crosstab + hstore', 'For unknown columns at query time: use crosstab with hstore or jsonb_agg. SELECT jsonb_object_agg(month, total) FROM ... Returns a JSON object instead of separate columns. Flexible for dynamic reporting.'),
    d('Use Cases', 'Sales reports: products x months. Employee headcount by department and status. Survey responses by question and rating. Any grid/matrix report where rows and columns come from data.')
  ],
  'Pivoting is essential for reporting and dashboards. Conditional aggregation with CASE is the most portable approach. The crosstab function is faster for large datasets but requires fixed column definitions. For truly dynamic columns, use JSON aggregation.',
  [
    q('What is a pivot query?', 'Transforms row values into column headers, creating a crosstab/matrix from normalized data.'),
    q('What is the most portable pivot technique?', 'Conditional aggregation: SUM(CASE WHEN condition THEN value END). Works in all SQL databases.'),
    q('What does the tablefunc extension provide?', 'The crosstab() function for pivot queries in PostgreSQL.'),
    q('What is the FILTER clause for pivots?', 'PostgreSQL syntax: COUNT(*) FILTER (WHERE month = \'Jan\'). Cleaner than CASE.'),
    q('What are the requirements for crosstab()?', 'Source query must return (row_name, category, value) sorted by row_name then category. Column definition must match the output.'),
    q('How do you create dynamic pivot columns?', 'Use jsonb_object_agg() to aggregate into a JSON object instead of separate columns.'),
    q('What is a common pivot use case?', 'Monthly sales report: rows = products, columns = months, values = sales amounts.'),
    q('Can you pivot with multiple value columns?', 'Yes. Use multiple CASE expressions or crosstab() with multiple value columns.'),
    q('What is the difference between CASE and FILTER for pivots?', 'CASE is portable. FILTER is cleaner syntax but PostgreSQL-only. Performance is similar.'),
    q('How do you handle NULLs in pivot results?', 'Use COALESCE(SUM(CASE ...), 0) to show 0 instead of NULL for missing combinations.')
  ],
  R(10,35,130,25,'#0070f3','','CASE','Portable pivot') +
  R(10,65,130,25,'#28a745','','FILTER','Clean syntax') +
  R(10,95,130,25,'#ffc107','','crosstab()','Fast pivot') +
  R(10,125,130,25,'#dc3545','','jsonb_agg','Dynamic cols') +
  A(140,48,170,48) + A(140,78,170,78) + A(140,108,170,108) + A(140,138,170,138) +
  R(180,35,200,130,'#17a2b8','','Pivot & Crosstab','Transform rows to columns for matrix-style reports and dashboards.') +
  T(240,195,'Pivot Queries: Convert rows to columns for crosstab reports using CASE, FILTER, or crosstab().',9,'#666','middle'),
  [
    e('CASE-Based Pivot', 'Monthly sales by product.', codeBlock([
      'SELECT',
      '  product_name,',
      '  SUM(CASE WHEN month = 1 THEN amount ELSE 0 END) AS jan,',
      '  SUM(CASE WHEN month = 2 THEN amount ELSE 0 END) AS feb,',
      '  SUM(CASE WHEN month = 3 THEN amount ELSE 0 END) AS mar,',
      '  SUM(amount) AS total',
      'FROM monthly_sales',
      'WHERE year = 2024',
      'GROUP BY product_name',
      'ORDER BY product_name;'
    ]), 'CASE-based pivoting: months become columns, products are rows.'),
    e('FILTER Clause Pivot', 'Cleaner PostgreSQL syntax.', codeBlock([
      'SELECT',
      '  department,',
      '  COUNT(*) FILTER (WHERE status = \'active\') AS active,',
      '  COUNT(*) FILTER (WHERE status = \'inactive\') AS inactive,',
      '  COUNT(*) FILTER (WHERE status = \'on_leave\') AS on_leave,',
      '  COUNT(*) AS total',
      'FROM employees',
      'GROUP BY department',
      'ORDER BY department;'
    ]), 'FILTER clause provides cleaner syntax than CASE for aggregate pivots.'),
    e('crosstab() Function', 'Using tablefunc extension.', codeBlock([
      'CREATE EXTENSION IF NOT EXISTS tablefunc;',
      '',
      'SELECT * FROM crosstab(',
"  'SELECT product_name, month, amount'",
"   FROM monthly_sales",
      "   WHERE year = 2024",
      "   ORDER BY 1, 2',",
      "  'SELECT generate_series(1, 12) AS month'",
      ') AS ct(',
      '  product_name TEXT,',
      '  jan NUMERIC, feb NUMERIC, mar NUMERIC,',
      '  apr NUMERIC, may NUMERIC, jun NUMERIC,',
      '  jul NUMERIC, aug NUMERIC, sep NUMERIC,',
      '  oct NUMERIC, nov NUMERIC, dec NUMERIC',
      ');'
    ]), 'crosstab() function creates the pivot with fixed column definitions.'),
    e('Dynamic JSON Pivot', 'Unknown columns at query time.', codeBlock([
      'SELECT',
      '  department,',
      '  jsonb_object_agg(status, count ORDER BY status) AS status_breakdown',
      'FROM (',
      '  SELECT department, status, COUNT(*) AS count',
      '  FROM employees',
      '  GROUP BY department, status',
      ') sub',
      'GROUP BY department',
      'ORDER BY department;',
      '',
      '-- Result: department | {"active": 15, "inactive": 3}'
    ]), 'jsonb_object_agg creates flexible pivots when column names are not known in advance.'),
    e('Multiple Value Columns', 'Pivot with multiple measures.', codeBlock([
      'SELECT',
      '  department,',
      '  SUM(CASE WHEN status = \'active\' THEN 1 ELSE 0 END) AS active_count,',
      '  ROUND(AVG(CASE WHEN status = \'active\' THEN salary END), 0) AS active_avg_sal,',
      '  SUM(CASE WHEN status = \'inactive\' THEN 1 ELSE 0 END) AS inactive_count',
      'FROM employees',
      'GROUP BY department',
      'ORDER BY department;'
    ]), 'Pivoting multiple measures (count and average) across categories.')
  ],
  [
    m('What does a pivot query do?', ['Columns to rows', 'Rows to columns', 'Sorts data', 'Filters data'], 1, 'Pivot transforms row values into column headers.'),
    m('What is the most portable pivot technique?', ['crosstab()', 'FILTER clause', 'CASE aggregation', 'PIVOT keyword'], 2, 'CASE-based conditional aggregation works in all SQL databases.'),
    m('What PostgreSQL extension provides crosstab?', ['tablefunc', 'pivot', 'crosstab', 'matricies'], 0, 'The tablefunc extension provides the crosstab() function.'),
    m('How do you create dynamic pivot columns?', ['crosstab()', 'jsonb_object_agg()', 'FILTER clause', 'Multiple CASE'], 1, 'jsonb_object_agg creates flexible JSON pivots for dynamic columns.'),
    m('What is required for crosstab() source SQL?', ['Any order', 'Sorted by row then category', 'Sorted by value', 'Grouped'], 1, 'The source query must return rows sorted by row_name then category.'),
    m('What PostgreSQL syntax is cleaner than CASE for pivots?', ['PIVOT', 'FILTER', 'crosstab', 'UNPIVOT'], 1, 'The FILTER clause provides cleaner aggregate pivot syntax.')
  ]
);

/* =================== TOPIC 37: ER Diagrams & Database Design =================== */
addTopic('sql-er-diagrams', 'ER Diagrams & Database Design', 'intermediate', 25,
  ['Entity-Relationship (ER) diagrams visually represent database structure: entities (tables), attributes (columns), and relationships (foreign keys).',
   'Chen notation and Crow\'s Foot notation are the two most common ER diagram styles.',
   'Relationships: one-to-one (1:1), one-to-many (1:N), many-to-many (M:N). Many-to-many requires a junction table.',
   'Good database design considers normal forms, indexing strategy, naming conventions, and future scalability.'
  ],
  'An ER diagram is like a blueprint for a building. Before you start constructing tables, you draw how they connect. A Customer "has many" Orders (one-to-many). An Order "has many" Products through Order_Items (many-to-many). The blueprint ensures you build the right structure.',
  [
    d('Entities and Attributes', 'Entity: a real-world object (Customer, Order, Product). Represented as a table. Attribute: a property of an entity (Customer.name, Order.date). Represented as columns. Key attribute: uniquely identifies an entity (primary key).'),
    d('Relationships and Cardinality', 'One-to-One (1:1): User has one Profile. One-to-Many (1:N): Customer has many Orders. Many-to-Many (M:N): Student takes many Courses, Course has many Students. M:N uses junction table: Student_Courses with composite PK.'),
    d('Crow\'s Foot Notation', '|| — one (exactly one). >|— — one (zero or one). —< — many. ||—< — one to many. >|—< — many to many. Lines connect entities with crow\'s foot symbols at the "many" end.'),
    d('Design Process', '1. Identify entities. 2. Define relationships. 3. Add attributes. 4. Assign keys. 5. Normalize to 3NF. 6. Add indexes. 7. Document with naming conventions. 8. Review with stakeholders.'),
    d('Naming Conventions', 'Tables: plural nouns (users, orders, products). Columns: snake_case lower_case (first_name, order_date). Primary keys: id or table_name_id. Foreign keys: referenced_table_id. Junction tables: table1_table2 (students_courses).')
  ],
  'ER diagrams and thoughtful database design are the foundation of any well-functioning application. Invest time in the design phase — it is much cheaper than migrating data from a poorly designed schema later.',
  [
    q('What is an ER diagram?', 'Entity-Relationship diagram — a visual representation of database entities, attributes, and relationships.'),
    q('What is an entity?', 'A real-world object or concept that can be distinctly identified. Represented as a table in the database.'),
    q('What is an attribute?', 'A property or characteristic of an entity. Represented as a column in a table.'),
    q('What does one-to-many mean?', 'One record in table A relates to many records in table B. Example: one customer has many orders.'),
    q('What is a many-to-many relationship?', 'Multiple records in table A relate to multiple records in table B. Requires a junction table.'),
    q('What is a junction table?', 'A table that resolves many-to-many relationships. Contains foreign keys to both related tables.'),
    q('What are the two common ER notation styles?', 'Chen notation (entities in rectangles, relationships in diamonds). Crow\'s Foot notation (lines with symbols).'),
    q('What is Crow\'s Foot notation?', 'A notation using lines with symbols (crow\'s feet) to indicate relationship cardinality.'),
    q('What naming convention is recommended for tables?', 'Plural snake_case: users, orders, products. Consistent naming improves readability and maintenance.'),
    q('What is the first step in database design?', 'Identify the entities (nouns) in the system domain. Then define their relationships.')
  ],
  R(10,35,100,25,'#0070f3','','Entities','Tables') +
  R(10,65,100,25,'#28a745','','Attributes','Columns') +
  R(10,95,100,25,'#ffc107','','Relations','FK links') +
  R(10,125,100,25,'#dc3545','','Cardinality','1:1, 1:N, M:N') +
  R(10,155,100,25,'#e83e8c','','Normalize','3NF design') +
  A(110,48,140,48) + A(110,78,140,78) + A(110,108,140,108) + A(110,138,140,138) + A(110,168,140,168) +
  R(150,35,230,155,'#17a2b8','','ER Diagrams & Design','Visual database blueprint: entities, relationships, cardinality, and normalization.') +
  T(240,220,'ER Diagrams: Visual database design with entities, relationships, and cardinality.',9,'#666','middle'),
  [
    e('Simple Schema Example', 'E-commerce database design.', codeBlock([
      '-- E-commerce schema (3NF)',
      '',
      'CREATE TABLE customers (',
      '  id SERIAL PRIMARY KEY,',
      '  name VARCHAR(100) NOT NULL,',
      '  email VARCHAR(255) UNIQUE NOT NULL',
      ');',
      '',
      'CREATE TABLE orders (',
      '  id SERIAL PRIMARY KEY,',
      '  customer_id INT NOT NULL REFERENCES customers(id),',
      '  order_date DATE DEFAULT CURRENT_DATE,',
      '  status VARCHAR(20) DEFAULT \'pending\'',
      ');',
      '',
      'CREATE TABLE products (',
      '  id SERIAL PRIMARY KEY,',
      '  name VARCHAR(100) NOT NULL,',
      '  price DECIMAL(10,2) NOT NULL',
      ');',
      '',
      '-- Junction table for M:N relationship',
      'CREATE TABLE order_items (',
      '  order_id INT REFERENCES orders(id) ON DELETE CASCADE,',
      '  product_id INT REFERENCES products(id),',
      '  quantity INT NOT NULL DEFAULT 1,',
      '  PRIMARY KEY (order_id, product_id)',
      ');'
    ]), 'Complete normalized e-commerce schema with 1:N and M:N relationships.'),
    e('Implementing 1:1 Relationship', 'User and profile.', codeBlock([
      'CREATE TABLE users (',
      '  id SERIAL PRIMARY KEY,',
      '  username VARCHAR(50) UNIQUE NOT NULL,',
      '  password_hash TEXT NOT NULL',
      ');',
      '',
      'CREATE TABLE user_profiles (',
      '  id SERIAL PRIMARY KEY,',
      '  user_id INT UNIQUE NOT NULL REFERENCES users(id),',
      '  first_name VARCHAR(50),',
      '  last_name VARCHAR(50),',
      '  avatar_url TEXT,',
      '  bio TEXT',
      ');',
      '',
      '-- UNIQUE on user_id enforces 1:1'
    ]), 'One-to-one relationship enforced by UNIQUE constraint on the foreign key.'),
    e('Resolving M:N with Junction Table', 'Students and courses.', codeBlock([
      'CREATE TABLE students (',
      '  id SERIAL PRIMARY KEY,',
      '  name VARCHAR(100),',
      '  enrolled_date DATE',
      ');',
      '',
      'CREATE TABLE courses (',
      '  id SERIAL PRIMARY KEY,',
      '  title VARCHAR(100),',
      '  credits INT',
      ');',
      '',
      '-- Junction table with extra attribute (grade)',
      'CREATE TABLE enrollments (',
      '  student_id INT REFERENCES students(id),',
      '  course_id INT REFERENCES courses(id),',
      '  grade CHAR(1),',
      '  enrolled_at TIMESTAMP DEFAULT NOW(),',
      '  PRIMARY KEY (student_id, course_id)',
      ');'
    ]), 'Many-to-many relationship with a junction table containing additional attributes.'),
    e('Self-Referential Relationship', 'Category hierarchy.', codeBlock([
      'CREATE TABLE categories (',
      '  id SERIAL PRIMARY KEY,',
      '  name VARCHAR(100) NOT NULL,',
      '  parent_id INT REFERENCES categories(id),',
      '  sort_order INT DEFAULT 0',
      ');',
      '',
      '-- Insert hierarchy',
      "INSERT INTO categories (name, parent_id) VALUES",
      "  ('Electronics', NULL),",
      "  ('Computers', 1),",
      "  ('Laptops', 2),",
      "  ('Desktops', 2),",
      "  ('Phones', 1);",
      '',
      '-- Use recursive CTE to traverse'
    ]), 'Self-referential foreign key enables parent-child hierarchies in a single table.'),
    e('ER Diagram in Text', 'Visualize relationships.', codeBlock([
      '┌──────────────┐       ┌────────────────┐',
      '│  customers   │       │    orders      │',
      '├──────────────┤       ├────────────────┤',
      '│  id (PK)     │──1:N──│  id (PK)       │',
      '│  name        │       │  customer_id   │',
      '│  email       │       │  order_date    │',
      '└──────────────┘       │  status        │',
      '                       └───────┬────────┘',
      '                               │',
      '                      ┌────────┴────────┐',
      '                      │   order_items   │',
      '                      ├────────────────┤',
      '                      │  order_id (PK)  │',
      '                      │  product_id(PK) │',
      '                      │  quantity       │',
      '                      └───┬────┬────┬───┘',
      '              M:N──────────┘    │    └──────────M:N',
      '              ┌─────────────────┴─────────────────┐',
      '              │             products              │',
      '              ├──────────────────────────────────┤',
      '              │  id (PK)                         │',
      '              │  name                            │',
      '              │  price                           │',
      '              └──────────────────────────────────┘'
    ]), 'Text-based ER diagram showing the relationships in the e-commerce schema.')
  ],
  [
    m('What does an ER diagram represent?', ['Query plans', 'Database structure visually', 'Index usage', 'Query performance'], 1, 'ER diagrams show database entities and their relationships visually.'),
    m('What is a many-to-many relationship?', ['One to one', 'Multiple to multiple via junction', 'One to multiple', 'Multiple to one'], 1, 'M:N requires a junction table with foreign keys to both related tables.'),
    m('What enforces a one-to-one relationship?', ['PRIMARY KEY', 'UNIQUE on FK', 'NOT NULL', 'CHECK constraint'], 1, 'A UNIQUE constraint on the foreign key enforces one-to-one.'),
    m('What is a junction table?', ['Single table join', 'Resolves M:N relationships', 'Temporary table', 'Indexed view'], 1, 'Junction tables bridge many-to-many relationships.'),
    m('Which cardinality needs a junction table?', ['1:1', '1:N', 'M:N', 'All of the above'], 2, 'Many-to-many (M:N) relationships require a junction table.'),
    m('What is a self-referential FK?', ['FK to different table', 'FK to the same table', 'Circular reference', 'Composite FK'], 1, 'A self-referential foreign key references the same table (hierarchies).')
  ]
);

/* =================== TOPIC 38: NULL Handling & Three-Valued Logic =================== */
addTopic('sql-null-handling', 'NULL Handling & Three-Valued Logic', 'intermediate', 20,
  ['NULL represents missing or unknown data in SQL. It is not a value — it is the absence of a value.',
   'Three-valued logic: comparisons with NULL return UNKNOWN (neither TRUE nor FALSE). WHERE filters out rows where the condition is UNKNOWN.',
   'NULL is not equal to NULL. NULL = NULL returns UNKNOWN, not TRUE. Use IS NULL to check for NULL.',
   'Aggregate functions (except COUNT(*)) ignore NULLs. String concatenation with NULL returns NULL (in most databases).'
  ],
  'NULL is like an empty box in a storage unit. You cannot tell if the box is empty by comparing it to another empty box — "is this empty box the same as that empty box?" has no meaningful answer. You need to check each box individually with IS NULL.',
  [
    d('NULL = NULL is Not TRUE', 'NULL = NULL evaluates to UNKNOWN, not TRUE. NULL <> NULL also evaluates to UNKNOWN. This is the most common source of SQL bugs. Use IS NULL / IS NOT NULL for NULL checks. Use IS DISTINCT FROM (PostgreSQL) for NULL-safe equality comparison.'),
    d('Three-Valued Logic Truth Tables', 'TRUE AND UNKNOWN = UNKNOWN. FALSE AND UNKNOWN = FALSE. TRUE OR UNKNOWN = TRUE. FALSE OR UNKNOWN = UNKNOWN. NOT UNKNOWN = UNKNOWN. WHERE clause includes rows only where the condition evaluates to TRUE.'),
    d('NULL in WHERE Clauses', 'WHERE column = NULL returns no rows (because NULL = NULL is UNKNOWN). WHERE column <> NULL also returns no rows. WHERE column IS NULL correctly finds NULL rows. Always use IS NULL/NOT NULL for NULL checks.'),
    d('NULL in Aggregates', 'COUNT(*) counts all rows including NULLs. COUNT(column) counts non-NULL values. SUM, AVG, MIN, MAX ignore NULLs. AVG of all NULLs returns NULL. Use COALESCE: AVG(COALESCE(column, 0)) to handle NULLs.'),
    d('NULL in Expressions', 'NULL + 5 = NULL. NULL || \'text\' = NULL (PostgreSQL). CONCAT ignores NULLs (standard SQL). CASE WHEN NULL THEN ... END — the WHEN condition is NULL, which is UNKNOWN, so it falls to ELSE. IN with NULL: NULL IN (1,2,3) returns UNKNOWN.')
  ],
  'NULL handling is one of the most important and misunderstood SQL concepts. Every SQL developer should understand three-valued logic, IS NULL vs = NULL, and how NULLs behave in WHERE, JOIN, aggregation, and expressions.',
  [
    q('What is NULL in SQL?', 'A marker indicating missing or unknown data. It is not a value — it represents the absence of a value.'),
    q('Why does NULL = NULL return UNKNOWN?', 'NULL represents unknown. Comparing two unknown values has no meaningful result. SQL uses three-valued logic: TRUE, FALSE, UNKNOWN.'),
    q('How do you check for NULL?', 'Use IS NULL or IS NOT NULL. Never use = NULL or <> NULL.'),
    q('What is IS DISTINCT FROM?', 'A PostgreSQL operator that treats NULL as a comparable value. NULL IS DISTINCT FROM NULL is FALSE, unlike NULL = NULL which is UNKNOWN.'),
    q('How do aggregate functions handle NULLs?', 'COUNT(*) includes NULLs. COUNT(column) excludes NULLs. SUM, AVG, MIN, MAX ignore NULLs.'),
    q('What happens when NULL appears in a WHERE clause?', 'Rows where the WHERE condition evaluates to UNKNOWN (from NULL comparisons) are excluded. Only TRUE rows are included.'),
    q('What does NULL + 5 return?', 'NULL. Any arithmetic with NULL yields NULL. Use COALESCE to provide a default.'),
    q('What does NOT IN with NULL subquery return?', 'If the subquery returns any NULL, NOT IN returns no rows. Use NOT EXISTS instead for safe NULL handling.'),
    q('How does CASE handle NULL?', 'CASE WHEN NULL THEN ... is UNKNOWN, so it falls to the next WHEN or ELSE. Use WHEN expr IS NULL THEN ... for explicit NULL handling.'),
    q('What is COALESCE?', 'Returns the first non-NULL argument. COALESCE(NULL, 5, 10) returns 5. Useful for providing default values for NULL columns.')
  ],
  R(10,35,100,25,'#0070f3','','= NULL?','UNKNOWN') +
  R(10,65,100,25,'#28a745','','IS NULL','Correct check') +
  R(10,95,100,25,'#ffc107','','AND/OR','3VL logic') +
  R(10,125,100,25,'#dc3545','','COALESCE','Default val') +
  R(10,155,100,25,'#e83e8c','','NOT IN','NULL trap') +
  A(110,48,140,48) + A(110,78,140,78) + A(110,108,140,108) + A(110,138,140,138) + A(110,168,140,168) +
  R(150,35,230,155,'#17a2b8','','NULL & Three-Valued Logic','NULL is not a value. Understand three-valued logic to avoid the #1 SQL bug.') +
  T(240,220,'NULL Handling: Three-valued logic, IS NULL, COALESCE, and the NULL pitfalls to avoid.',9,'#666','middle'),
  [
    e('NULL = NULL Trap', 'Demonstrating the issue.', codeBlock([
      '-- Create test data',
      'CREATE TABLE test (id INT, name TEXT);',
      "INSERT INTO test VALUES (1, 'Alice'), (2, NULL);",
      '',
      '-- This returns NO rows:',
      'SELECT * FROM test WHERE name = NULL;',
      '',
      '-- This also returns NO rows:',
      'SELECT * FROM test WHERE name <> NULL;',
      '',
      '-- This correctly finds NULL rows:',
      'SELECT * FROM test WHERE name IS NULL; -- returns id=2',
      '',
      '-- This finds non-NULL rows:',
      'SELECT * FROM test WHERE name IS NOT NULL; -- returns id=1'
    ]), 'Demonstrates why = NULL never works and IS NULL is required.'),
    e('NOT IN vs NOT EXISTS', 'The NULL trap.', codeBlock([
      '-- NOT IN with NULL in subquery returns nothing:',
      'SELECT * FROM employees',
      'WHERE dept_id NOT IN (',
      '  SELECT id FROM departments WHERE status = \'inactive\'',
      ');',
      '-- If any dept id is NULL, this returns 0 rows!',
      '',
      '-- Safe alternative with NOT EXISTS:',
      'SELECT * FROM employees e',
      'WHERE NOT EXISTS (',
      '  SELECT 1 FROM departments d',
      "  WHERE d.id = e.dept_id AND d.status = 'inactive'",
      ');'
    ]), 'NOT IN with NULL subquery returns no rows — use NOT EXISTS instead.'),
    e('COALESCE and NULLIF', 'Practical NULL handling.', codeBlock([
      '-- COALESCE: first non-NULL value',
      'SELECT',
      '  name,',
      '  COALESCE(phone, email, \'No contact\') AS contact,',
      '  COALESCE(salary, 0) AS salary',
      'FROM employees;',
      '',
      '-- NULLIF: create NULL when equal',
      'SELECT',
      '  department,',
      '  SUM(salary) / NULLIF(COUNT(*), 0) AS avg_salary',
      'FROM employees',
      'GROUP BY department;'
    ]), 'COALESCE provides defaults; NULLIF prevents division by zero.'),
    e('IS DISTINCT FROM', 'NULL-safe comparison (PostgreSQL).', codeBlock([
      '-- Regular comparison (NULL unsafe):',
      "SELECT * FROM products WHERE price = 100; -- misses NULL prices",
      '',
      '-- NULL-safe comparison:',
      "SELECT * FROM products WHERE price IS NOT DISTINCT FROM 100;",
      '-- Returns rows where price = 100 OR price IS NULL',
      '',
      '-- Opposite:',
      "SELECT * FROM products WHERE price IS DISTINCT FROM 100;",
      '-- Returns rows where price <> 100 AND price IS NOT NULL'
    ]), 'IS DISTINCT FROM treats NULL as a comparable value.'),
    e('NULL in JOIN Conditions', 'How NULLs affect JOINs.', codeBlock([
      '-- INNER JOIN with NULL FK:',
      'SELECT e.name, d.department_name',
      'FROM employees e',
      'JOIN departments d ON e.dept_id = d.id;',
      '-- Employees with NULL dept_id are EXCLUDED',
      '',
      '-- LEFT JOIN shows NULL dept:',
      'SELECT e.name, d.department_name',
      'FROM employees e',
      'LEFT JOIN departments d ON e.dept_id = d.id;',
      '-- NULL dept_id shows department_name as NULL'
    ]), 'INNER JOIN silently drops rows with NULL foreign keys; LEFT JOIN preserves them.')
  ],
  [
    m('What does NULL = NULL evaluate to?', ['TRUE', 'FALSE', 'UNKNOWN', 'NULL'], 2, 'NULL = NULL evaluates to UNKNOWN in three-valued logic.'),
    m('How do you correctly check for NULL?', ['= NULL', 'IS NULL', '== NULL', 'EQUALS NULL'], 1, 'Use IS NULL to check for NULL values.'),
    m('Which aggregate includes NULLs?', ['COUNT(column)', 'COUNT(*)', 'SUM', 'AVG'], 1, 'COUNT(*) counts all rows including NULLs.'),
    m('What does COALESCE(NULL, 5, 10) return?', ['NULL', '5', '10', 'Error'], 1, 'COALESCE returns the first non-NULL value, which is 5.'),
    m('What happens with NOT IN if the subquery has NULL?', ['Works normally', 'Returns no rows', 'Errors', 'Ignores NULL'], 1, 'NOT IN with NULL in the subquery returns zero rows.'),
    m('What PostgreSQL operator is NULL-safe?', ['<=>', 'IS DISTINCT FROM', '===', 'IS NOT'], 1, 'IS DISTINCT FROM treats NULL as a comparable value.')
  ]
);

/* =================== TOPIC 39: LATERAL Joins =================== */
addTopic('sql-lateral-joins', 'LATERAL Joins', 'advanced', 25,
  ['LATERAL allows a subquery in the FROM clause to reference columns from preceding FROM items, enabling row-by-row subquery execution.',
   'Without LATERAL, subqueries in FROM execute independently. With LATERAL, they can reference columns from tables/CTEs listed before them.',
   'LATERAL is powerful for: top-N per group, applying functions per row, and complex joins that depend on outer row values.',
   'PostgreSQL, Oracle, and SQL Server support LATERAL. MySQL does not support it (before 8.0.14).'
  ],
  'A regular subquery in FROM is like a caterer who brings the same food to every table regardless of who is sitting there. A LATERAL subquery is like a chef who asks each table what they want and customizes the dish individually based on the table\'s preferences.',
  [
    d('Basic LATERAL Syntax', 'SELECT * FROM table1 t1, LATERAL (SELECT * FROM table2 WHERE t2.id = t1.id) sub. The LATERAL subquery runs once for each row in t1. Can also use JOIN LATERAL ... ON true for explicit join syntax.'),
    d('Top-N Per Group with LATERAL', 'SELECT d.name, sub.* FROM departments d, LATERAL (SELECT * FROM employees WHERE dept_id = d.id ORDER BY salary DESC LIMIT 3) sub. Gets top 3 earners per department without complex window functions.'),
    d('LATERAL with Set-Returning Functions', 'SELECT t.id, f.value FROM table t, LATERAL jsonb_array_elements(t.data) AS f(value). Expands JSON arrays per row. Also works with generate_series, unnest, and other set-returning functions.'),
    d('LATERAL vs Correlated Subquery', 'LATERAL subqueries can return multiple columns and rows (like a table). Correlated subqueries in WHERE/SELECT return scalar values. LATERAL in FROM can reference multiple preceding tables.'),
    d('Multiple LATERAL Subqueries', 'SELECT * FROM table t, LATERAL (SELECT ... WHERE ... = t.id) sub1, LATERAL (SELECT ... WHERE ... = sub1.id) sub2. Each subsequent LATERAL can reference all preceding FROM items.')
  ],
  'LATERAL is one of PostgreSQL\'s most powerful features. It enables per-row subquery execution, top-N per group queries, and clean expansion of array/JSON data. It often replaces complex window functions and correlated subqueries with more readable code.',
  [
    q('What is LATERAL?', 'A keyword that allows a FROM subquery to reference columns from preceding FROM items, enabling per-row execution.'),
    q('How is LATERAL different from a regular subquery?', 'Regular subqueries in FROM execute independently. LATERAL subqueries can reference columns from tables listed before them.'),
    q('What is the LATERAL syntax?', 'FROM table1 t1, LATERAL (SELECT ... WHERE col = t1.col) sub. Or: FROM table1 t1 JOIN LATERAL (...) sub ON true.'),
    q('What is a common use for LATERAL?', 'Top-N per group: for each department, get top 3 employees by salary. Best performing employees per team, etc.'),
    q('How does LATERAL work with set-returning functions?', 'LATERAL is automatically applied when using set-returning functions in FROM: FROM table, jsonb_array_elements(data).'),
    q('Can you have multiple LATERAL subqueries?', 'Yes. Each subsequent one can reference all preceding FROM items including previous LATERAL subqueries.'),
    q('Does MySQL support LATERAL?', 'MySQL 8.0.14+ supports LATERAL (limited). Not fully supported in older versions.'),
    q('What is the alternative to LATERAL for top-N?', 'Window functions with ROW_NUMBER() in a subquery/CTE, then filter WHERE rn <= N. LATERAL is often more readable.'),
    q('Can LATERAL reference CTEs?', 'Yes. WITH cte AS (...) SELECT * FROM cte, LATERAL (SELECT ... WHERE ... = cte.id).'),
    q('Can LATERAL return multiple rows?', 'Yes. LATERAL subqueries can return multiple rows, causing the outer query to multiply rows (like JOIN).')
  ],
  R(10,35,120,25,'#0070f3','','FROM t1, LATERAL','Row-by-row') +
  A(130,48,160,48) +
  R(170,35,120,25,'#28a745','','Top-N/Group','Per group LIMIT') +
  R(170,65,120,25,'#ffc107','','Set-Return','jsonb, unnest') +
  R(170,95,120,25,'#dc3545','','Multiple','Chain LATERALs') +
  R(10,100,120,25,'#e83e8c','','vs Correlated','Multi-row/col') +
  A(290,48,320,48) + A(290,78,320,78) + A(290,108,320,108) +
  R(330,35,150,100,'#17a2b8','','LATERAL Joins','Row-by-row subqueries that can reference preceding FROM items.') +
  T(240,195,'LATERAL: Per-row subquery execution for top-N per group and set-returning functions.',9,'#666','middle'),
  [
    e('Top-N Per Department', '3 highest paid per dept.', codeBlock([
      'SELECT d.department_name, sub.name, sub.salary',
      'FROM departments d,',
      'LATERAL (',
      '  SELECT name, salary',
      '  FROM employees',
      '  WHERE dept_id = d.id',
      '  ORDER BY salary DESC',
      '  LIMIT 3',
      ') sub',
      'ORDER BY d.department_name, sub.salary DESC;'
    ]), 'Gets top 3 employees per department using LATERAL. Cleaner than ROW_NUMBER() approach.'),
    e('LATERAL with JSONB', 'Expand JSON arrays per row.', codeBlock([
      'CREATE TABLE orders (',
      '  id INT,',
      '  items JSONB -- [{"product": "A", "qty": 2}, {"product": "B", "qty": 1}]',
      ');',
      '',
      'SELECT o.id, item->>\'product\' AS product,',
      '  (item->>\'qty\')::INT AS quantity',
      'FROM orders o,',
      'LATERAL jsonb_array_elements(o.items) AS item;'
    ]), 'Expands JSON array into rows using LATERAL with set-returning function.'),
    e('LATERAL with generate_series', 'Fill missing dates.', codeBlock([
      '-- Generate last 7 days for each product',
      "SELECT p.name, d.date",
      'FROM products p,',
      'LATERAL generate_series(',
      "  CURRENT_DATE - 6, CURRENT_DATE, '1 day'",
      ') AS d(date)',
      'WHERE p.status = \'active\'',
      'ORDER BY p.name, d.date;'
    ]), 'Creates date/product cross-product using LATERAL with generate_series.'),
    e('Multiple LATERAL References', 'Chained subqueries.', codeBlock([
      'SELECT e.name, e.salary,',
      '  sub1.dept_avg, sub2.company_max',
      'FROM employees e,',
      'LATERAL (',
      '  SELECT AVG(salary) AS dept_avg',
      '  FROM employees WHERE dept_id = e.dept_id',
      ') sub1,',
      'LATERAL (',
      '  SELECT MAX(salary) AS company_max',
      '  FROM employees',
      ') sub2;'
    ]), 'Each LATERAL subquery builds on the previous, computing per-row statistics.'),
    e('LATERAL with LIMIT for Recommendations', 'Related products.', codeBlock([
      'SELECT c.name AS customer, rp.name AS recommended',
      'FROM customers c,',
      'LATERAL (',
      '  SELECT DISTINCT p2.name',
      '  FROM orders o1',
      '  JOIN order_items oi1 ON o1.id = oi1.order_id',
      '  JOIN products p1 ON oi1.product_id = p1.id',
      '  JOIN order_items oi2 ON oi1.product_id <> oi2.product_id',
      '  JOIN products p2 ON oi2.product_id = p2.id',
      '  JOIN orders o2 ON oi2.order_id = o2.id',
      '  WHERE o1.customer_id = c.id',
      '  AND o2.customer_id = c.id',
      '  ORDER BY RANDOM()',
      '  LIMIT 3',
      ') rp;'
    ]), 'Recommends 3 related products per customer based on purchase history.')
  ],
  [
    m('What keyword enables per-row subqueries in FROM?', ['CROSS', 'LATERAL', 'ROW', 'PER ROW'], 1, 'LATERAL allows FROM subqueries to reference preceding columns.'),
    m('What is LATERAL commonly used for?', ['Simple filtering', 'Top-N per group', 'Bulk updates', 'Table creation'], 1, 'LATERAL excels at top-N per group queries.'),
    m('Can LATERAL return multiple rows?', ['Yes', 'No', 'Only one column', 'Only scalars'], 0, 'LATERAL subqueries can return multiple rows like a joined table.'),
    m('What databases support LATERAL?', ['MySQL only', 'PostgreSQL, Oracle, SQL Server', 'SQLite only', 'All databases'], 1, 'PostgreSQL, Oracle, and SQL Server support LATERAL.'),
    m('How does LATERAL differ from a correlated subquery?', ['Same thing', 'LATERAL can return multiple cols/rows', 'Correlated is faster', 'LATERAL is only for WHERE'], 1, 'LATERAL can return multiple columns and rows; correlated scalar subqueries return single values.'),
    m('Is LATERAL automatic with set-returning functions?', ['Yes', 'No', 'Only in PostgreSQL', 'Only in Oracle'], 0, 'Set-returning functions in FROM automatically use LATERAL behavior.')
  ]
);

/* =================== TOPIC 40: Locking & Concurrency =================== */
addTopic('sql-locking-concurrency', 'Locking & Concurrency', 'intermediate', 25,
  ['PostgreSQL uses Multi-Version Concurrency Control (MVCC) — each transaction sees a snapshot of data as of when it started.',
  'Row-level locks: FOR UPDATE (write lock), FOR NO KEY UPDATE, FOR SHARE (read lock), FOR KEY SHARE.',
  'SKIP LOCKED skips rows locked by other transactions — useful for job queues. NOWAIT errors immediately if row is locked.',
  'Deadlocks occur when two transactions wait for each other\'s locks. PostgreSQL detects and resolves them automatically.'
  ],
  'Locking is like a bathroom key at a restaurant. When you use the bathroom (update a row), you lock the door (row lock). Others wait. MVCC is like a window that shows the bathroom as it was when you entered — even if someone else changes it later, you still see the old state until you leave.',
  [
    d('MVCC (Multi-Version Concurrency Control)', 'Each transaction sees a snapshot of data at its start time. Readers never block writers; writers never block readers. Old row versions remain visible to concurrent transactions that started before the change. Cleaned up by VACUUM.'),
    d('Row-Level Lock Types', 'FOR UPDATE — strongest lock, prevents other transactions from updating, deleting, or locking the row. FOR NO KEY UPDATE — weaker than FOR UPDATE (allows other FOR KEY SHARE locks). FOR SHARE — read lock, prevents writes. FOR KEY SHARE — weakest, allows NO KEY UPDATE.'),
    d('SKIP LOCKED and NOWAIT', 'SELECT ... FOR UPDATE SKIP LOCKED — skip rows locked by others, only return available rows. Perfect for job queues. SELECT ... FOR UPDATE NOWAIT — error immediately if any selected row is locked (no waiting).'),
    d('Deadlock Detection', 'PostgreSQL checks for deadlock cycles every deadlock_timeout (default 1 second). When detected, one transaction is aborted with ERROR: deadlock detected. The aborted transaction can be retried. Prevention: consistent lock ordering.'),
    d('Advisory Locks', 'pg_advisory_lock(key) — application-level locks not tied to rows. pg_try_advisory_lock — non-blocking attempt. Useful for coordinating across transactions or applications. Session-level or transaction-level variants.')
  ],
  'PostgreSQL\'s MVCC means SELECT queries never block writes and writes never block SELECTs. Row-level locking with FOR UPDATE is for explicit coordination. SKIP LOCKED is ideal for queue systems. Always design for the lowest lock level that ensures correctness.',
  [
    q('What is MVCC?', 'Multi-Version Concurrency Control — each transaction sees a consistent snapshot. Readers don\'t block writers.'),
    q('What does FOR UPDATE do?', 'Locks selected rows exclusively. Other transactions cannot UPDATE, DELETE, or lock the rows until the lock is released.'),
    q('What is the difference between FOR UPDATE and FOR SHARE?', 'FOR UPDATE is an exclusive write lock. FOR SHARE is a shared read lock — other transactions can also read-lock but cannot write-lock.'),
    q('What does SKIP LOCKED do?', 'Skips rows that are already locked by other transactions, returning only available rows.'),
    q('What does NOWAIT do?', 'Returns an error immediately if any selected row is locked, instead of waiting for the lock to be released.'),
    q('What causes a deadlock?', 'Two or more transactions each holding locks that the others need. PostgreSQL detects and resolves by aborting one transaction.'),
    q('How do you prevent deadlocks?', 'Access tables in a consistent order across all transactions. Keep transactions short. Use the lowest lock level needed.'),
    q('What is an advisory lock?', 'An application-level lock not tied to specific rows. Useful for coordinating access to shared resources across transactions.'),
    q('Does SELECT block INSERT?', 'No. Under MVCC, SELECT reads a snapshot. INSERT adds new rows. Readers and writers do not block each other.'),
    q('What is the default lock timeout?', 'PostgreSQL has no default lock timeout — it waits indefinitely. Set lock_timeout in postgresql.conf or per session.')
  ],
  R(10,35,110,25,'#0070f3','','MVCC','Snapshots') +
  R(10,65,110,25,'#28a745','','FOR UPDATE','Write lock') +
  R(10,95,110,25,'#ffc107','','FOR SHARE','Read lock') +
  R(10,125,110,25,'#dc3545','','SKIP LOCKED','Queue') +
  R(10,155,110,25,'#e83e8c','','Deadlock','Detection') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,220,155,'#17a2b8','','Locking & Concurrency','MVCC, row locks, SKIP LOCKED, and deadlock handling in PostgreSQL.') +
  T(240,220,'Locking & Concurrency: MVCC, FOR UPDATE, SKIP LOCKED, and deadlock prevention.',9,'#666','middle'),
  [
    e('FOR UPDATE with SKIP LOCKED', 'Job queue worker.', codeBlock([
      '-- Worker picks next available job (queue pattern)',
      'BEGIN;',
      '',
      'SELECT id, payload FROM job_queue',
      'WHERE status = \'pending\'',
      'ORDER BY created_at ASC',
      'LIMIT 1',
      'FOR UPDATE SKIP LOCKED;',
      '',
      '-- If row found, update status',
      "UPDATE job_queue SET status = 'processing',",
      '  started_at = NOW()',
      'WHERE id = <selected_id>;',
      '',
      'COMMIT;',
      '',
      '-- SKIP LOCKED ensures workers don\'t fight over the same job'
    ]), 'Concurrent job queue with SKIP LOCKED — each worker gets a unique job.'),
    e('Locking for Inventory', 'Prevent overselling.', codeBlock([
      'BEGIN;',
      '',
      '-- Lock the product row',
      'SELECT quantity FROM products WHERE id = 10',
      'FOR UPDATE;',
      '',
      '-- Check stock',
      '-- quantity = 5',
      '',
      '-- Decrement safely',
      'UPDATE products SET quantity = quantity - 1',
      'WHERE id = 10 AND quantity > 0;',
      '',
      '-- Insert order',
      'INSERT INTO orders (product_id, quantity)',
      'VALUES (10, 1);',
      '',
      'COMMIT;'
    ]), 'FOR UPDATE prevents two concurrent buyers from purchasing the last item.'),
    e('NOWAIT for Immediate Feedback', 'Fail fast if locked.', codeBlock([
      '-- Try to lock, error immediately if locked',
      "SELECT * FROM employees WHERE id = 5",
      "FOR UPDATE NOWAIT;",
      '',
      '-- If another transaction holds a lock:',
      '-- ERROR: could not obtain lock on row in relation "employees"',
      '-- Application catches this and retries later'
    ]), 'NOWAIT provides immediate feedback instead of waiting for potentially long-held locks.'),
    e('Advisory Lock for Application Coordinatio', 'Cross-session locking.', codeBlock([
      '-- Lock application resource',
      'SELECT pg_advisory_lock(12345);',
      '',
      '-- Critical section',
      'UPDATE accounts SET balance = balance + 100 WHERE id = 1;',
      '',
      '-- Release lock',
      'SELECT pg_advisory_unlock(12345);',
      '',
      '-- Non-blocking version:',
      'SELECT pg_try_advisory_lock(12345);',
      '-- Returns true if lock acquired, false if already locked'
    ]), 'Advisory locks coordinate access across transactions without row-level locking.'),
    e('Deadlock Example', 'How deadlocks happen.', codeBlock([
      '-- Transaction A:',
      'BEGIN;',
      'UPDATE accounts SET balance = 0 WHERE id = 1;',
      '-- (holds lock on account 1)',
      '',
      '-- Transaction B:',
      'BEGIN;',
      'UPDATE accounts SET balance = 0 WHERE id = 2;',
      '-- (holds lock on account 2)',
      '',
      '-- Transaction A:',
      'UPDATE accounts SET balance = 100 WHERE id = 2;',
      '-- (waits for B\'s lock on account 2)',
      '',
      '-- Transaction B:',
      'UPDATE accounts SET balance = 100 WHERE id = 1;',
      '-- (waits for A\'s lock on account 1)',
      '-- DEADLOCK! PostgreSQL kills one transaction'
    ]), 'Classic deadlock scenario. Prevention: always lock accounts in the same order.')
  ],
  [
    m('What does MVCC stand for?', ['Multi-Value Consistency Check', 'Multi-Version Concurrency Control', 'Multi-View Consistent Copy', 'Main Version Control Cache'], 1, 'MVCC stands for Multi-Version Concurrency Control.'),
    m('What does FOR UPDATE do?', ['Read lock', 'Write (exclusive) lock', 'Table lock', 'Schema lock'], 1, 'FOR UPDATE acquires an exclusive write lock on selected rows.'),
    m('What does SKIP LOCKED skip?', ['Locked tables', 'Locked rows', 'NULL values', 'Indexes'], 1, 'SKIP LOCKED returns only unlocked rows, skipping those with locks.'),
    m('How does PostgreSQL handle deadlocks?', ['Ignores them', 'Detects and aborts one transaction', 'Waits forever', 'Rolls back both'], 1, 'PostgreSQL detects deadlocks automatically and aborts one transaction.'),
    m('What lock level allows concurrent reads?', ['FOR UPDATE', 'FOR SHARE', 'FOR NO KEY UPDATE', 'All of the above'], 1, 'FOR SHARE allows other transactions to also take FOR SHARE locks.'),
    m('What type of lock is not tied to rows?', ['Row lock', 'Table lock', 'Advisory lock', 'Page lock'], 2, 'Advisory locks are application-level locks not associated with specific rows.')
  ]
);

/* =================== TOPIC 41: Advanced Pattern Matching =================== */
addTopic('sql-pattern-matching', 'Advanced Pattern Matching', 'intermediate', 20,
  ['PostgreSQL offers multiple pattern matching methods: LIKE (basic), SIMILAR TO (regex-like), POSIX regex (~), and full-text search.',
   'LIKE: % (any sequence), _ (single char). ILIKE is case-insensitive LIKE.',
   'SIMILAR TO: SQL standard with regex features: | (OR), * (quantifier), [chars] (character class).',
   'POSIX Regular Expressions: ~ (matches), ~* (case-insensitive), !~ (not matches), !~* (not matches, case-insensitive).'
  ],
  'Pattern matching in SQL ranges from simple wildcards to full regular expressions. LIKE is like searching for a file with *.txt — simple and fast. SIMILAR TO adds OR and quantifiers. POSIX regex is the full power of regular expressions — like grep inside your database.',
  [
    d('LIKE and ILIKE', 'LIKE \'prefix%\' — starts with. LIKE \'%suffix\' — ends with. LIKE \'%contains%\' — contains anywhere. LIKE \'A_\' — two chars starting with A. ILIKE — case-insensitive version. Backslash escapes special chars. All patterns are full-string matches.'),
    d('SIMILAR TO', 'Intermediate between LIKE and regex. Supports: | (alternation), * (0+ repetitions), + (1+), ? (0 or 1), [a-z] (character class), [^a-z] (negation). Must match entire string (like LIKE). Example: SIMILAR TO \'(abc|def)%\' starts with abc or def.'),
    d('POSIX Regex (~ Operator)', '~ \'pattern\' — matches (case-sensitive). ~* \'pattern\' — matches (case-insensitive). !~ \'pattern\' — does not match. !~* \'pattern\' — does not match (case-insensitive). Partial match (unlike LIKE which requires full match).'),
    d('Regex Functions', 'REGEXP_MATCH(string, pattern) — returns first match as text[]. REGEXP_MATCHES — returns all matches. REGEXP_REPLACE — substitution. REGEXP_SPLIT_TO_TABLE — split into rows. REGEXP_SPLIT_TO_ARRAY — split into array.'),
    d('Performance Considerations', 'LIKE with prefix pattern (\'abc%\') can use B-tree index. ILIKE and regex patterns can use GIN or GiST indexes with pg_trgm extension. SIMILAR TO is typically slower than LIKE or regex. Avoid heavy regex on large unindexed tables.')
  ],
  'Use LIKE for simple wildcard matching (it is the fastest and can use indexes). Use POSIX regex (~) for complex patterns. Use SIMILAR TO mainly for SQL standard compliance — it bridges LIKE and regex. Consider pg_trgm extension for fuzzy search at scale.',
  [
    q('What does LIKE \'A%\' match?', 'Any string starting with A. % matches any sequence of characters.'),
    q('What is ILIKE?', 'PostgreSQL-specific case-insensitive version of LIKE. Same syntax, but ignores case.'),
    q('What does _ match in LIKE?', 'A single character. LIKE \'A_B\' matches any 3-char string starting with A and ending with B.'),
    q('What is SIMILAR TO?', 'SQL standard pattern matching with simple regex features like |, *, +, and character classes.'),
    q('What does the ~ operator do?', 'POSIX regex match. ~ \'^A.*B$\' matches strings starting with A and ending with B.'),
    q('What is the difference between LIKE and ~?', 'LIKE requires full string match. ~ is a partial match (use ^ and $ for full match). LIKE has limited wildcards; ~ supports full regex.'),
    q('How do you do case-insensitive regex?', 'Use ~* (tilde asterisk). !~* for negated case-insensitive match.'),
    q('What does REGEXP_REPLACE do?', 'Replaces regex matches with replacement text. REGEXP_REPLACE(\'abc123\', \'[0-9]\', \'\', \'g\') removes digits.'),
    q('How do you split a string into rows?', 'REGEXP_SPLIT_TO_TABLE(string, delimiter_pattern) — splits string and returns each part as a row.'),
    q('What extension improves regex performance?', 'pg_trgm (trigram) extension enables GiST/GIN indexes for fast LIKE and regex queries.')
  ],
  R(10,35,100,25,'#0070f3','','LIKE/ILIKE','Basic wildcard') +
  R(10,65,100,25,'#28a745','','SIMILAR TO','Simple regex') +
  R(10,95,100,25,'#ffc107','','~ Operator','Full regex') +
  R(10,125,100,25,'#dc3545','','REGEXP_*','Functions') +
  R(10,155,100,25,'#e83e8c','','pg_trgm','Index fuzzy') +
  A(110,48,140,48) + A(110,78,140,78) + A(110,108,140,108) + A(110,138,140,138) + A(110,168,140,168) +
  R(150,35,230,155,'#17a2b8','','Pattern Matching','LIKE, SIMILAR TO, POSIX regex, and regex functions for text pattern matching.') +
  T(240,220,'Pattern Matching: LIKE, SIMILAR TO, POSIX Regex — from simple wildcards to full regex.',9,'#666','middle'),
  [
    e('LIKE Basics', 'Common LIKE patterns.', codeBlock([
      "SELECT name FROM employees WHERE name LIKE 'A%';    -- starts with A",
      "SELECT name FROM employees WHERE name LIKE '%son';  -- ends with son",
      "SELECT name FROM employees WHERE name LIKE '%mith%'; -- contains mith",
      "SELECT name FROM employees WHERE name LIKE 'A_';     -- A + 1 char",
      "SELECT name FROM employees WHERE name ILIKE 'alice%'; -- case-insensitive"
    ]), 'Common LIKE patterns for different matching scenarios.'),
    e('SIMILAR TO Examples', 'Regex-like patterns.', codeBlock([
      "SELECT email FROM users",
      "WHERE email SIMILAR TO '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}';",
      '',
      "SELECT name FROM products",
      "WHERE name SIMILAR TO '(Pro|Ultra|Max)%';"
    ]), 'SIMILAR TO with character classes and alternation for email validation.'),
    e('POSIX Regex for Complex Patterns', 'Full regex power.', codeBlock([
      '-- Valid email format (partial match)',
      "SELECT email FROM users",
      "WHERE email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$';",
      '',
      '-- Phone numbers (various formats)',
      "SELECT phone FROM contacts",
      "WHERE phone ~ '^\\(?[0-9]{3}\\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}$';",
      '',
      '-- Case-insensitive search',
      "SELECT * FROM articles WHERE body ~* 'database';"
    ]), 'POSIX regex for complex validation and search patterns.'),
    e('REGEXP_REPLACE and REGEXP_SPLIT', 'Text transformation.', codeBlock([
      "-- Remove all non-numeric characters",
      "SELECT REGEXP_REPLACE(phone, '[^0-9]', '', 'g') AS clean_phone",
      "FROM contacts;",
      '',
      '-- Split comma-separated values into rows',
      "SELECT REGEXP_SPLIT_TO_TABLE('apple,banana,cherry', ',') AS fruit;",
      '',
      '-- Extract all numbers from text',
      "SELECT REGEXP_MATCHES('Order #123: $45.99', '[0-9]+', 'g') AS nums;"
    ]), 'Regex functions for data cleaning, splitting, and extraction.'),
    e('pg_trgm for Fuzzy Search', 'Efficient fuzzy matching.', codeBlock([
      'CREATE EXTENSION IF NOT EXISTS pg_trgm;',
      '',
      '-- Create GiST index for fuzzy search',
      'CREATE INDEX idx_names_trgm ON users',
      'USING GIST (name gist_trgm_ops);',
      '',
      '-- Similarity search',
      "SELECT *, similarity(name, 'Jonhson') AS sim",
      'FROM users',
      "WHERE name % 'Jonhson'  -- % operator means similar enough",
      'ORDER BY sim DESC;',
      '',
      '-- Also speeds up:',
      "SELECT * FROM users WHERE name LIKE '%mith%'; -- with index"
    ]), 'pg_trgm extension enables fast fuzzy text search and wildcard queries at scale.')
  ],
  [
    m('What does % match in LIKE?', ['One character', 'Any sequence of characters', 'A digit', 'A word'], 1, '% matches any sequence of characters (including zero).'),
    m('What operator does POSIX regex matching?', ['~~', '~', ':=', '##'], 1, '~ is the POSIX regex match operator in PostgreSQL.'),
    m('What is ILIKE?', ['Case-sensitive LIKE', 'Case-insensitive LIKE', 'Indexed LIKE', 'Inverse LIKE'], 1, 'ILIKE is the case-insensitive version of LIKE.'),
    m('What extension enables fuzzy search?', ['pg_trgm', 'pg_fuzzy', 'pg_search', 'pg_similar'], 0, 'pg_trgm provides trigram-based similarity search and GiST/GIN index support.'),
    m('What function extracts all regex matches?', ['REGEXP_MATCH', 'REGEXP_MATCHES', 'REGEXP_EXTRACT', 'REGEXP_FIND'], 1, 'REGEXP_MATCHES returns all matches (with g flag) as multiple rows.'),
    m('What is SIMILAR TO?', ['SQL standard regex', 'Like LIKE with more features', 'PostgreSQL only', 'Same as ~ operator'], 1, 'SIMILAR TO is SQL standard with OR, quantifiers, and character classes.')
  ]
);

/* =================== TOPIC 42: Pagination Strategies =================== */
addTopic('sql-pagination', 'Pagination Strategies', 'intermediate', 20,
  ['Pagination splits large result sets into pages for UI display. Two main strategies: offset-based and keyset-based (cursor).',
   'OFFSET/LIMIT pagination: simple, but slow for large offsets because the database scans and discards rows.',
   'Keyset pagination (cursor-based): uses WHERE conditions on sorted columns. Fast for any page depth but requires unique sort order.',
   'For large datasets (millions of rows), keyset pagination is dramatically faster than offset pagination.'
  ],
  'OFFSET pagination is like reading a book by counting pages from the start each time — to get to page 1000, you still count 1-1000. Keyset pagination is like using a bookmark — you remember the last item and start from there. Much faster for deep pages.',
  [
    d('OFFSET/LIMIT Pagination', 'LIMIT 20 OFFSET 0 — page 1. LIMIT 20 OFFSET 40 — page 3. Simple to implement. Database must scan and discard OFFSET rows (sequential scan or index scan + skip). Performance degrades significantly at large offsets.'),
    d('Keyset (Cursor) Pagination', 'SELECT * FROM table WHERE id > last_seen_id ORDER BY id LIMIT 20. Uses index to jump directly to the starting point. No rows are scanned and discarded. Constant performance regardless of page depth.'),
    d('Keyset with Multiple Columns', 'WHERE (created_at, id) > (last_created_at, last_id) ORDER BY created_at, id — composite tuple comparison for tie-breaking. Requires composite unique index on the sort columns.'),
    d('Comparison', 'OFFSET: simple, URL-friendly (?page=3), allows jumping to any page, stable page numbers. Keyset: fast at scale, no page number jumping, sort order must be stable, requires unique sort column.'),
    d('Hybrid Approach', 'Use OFFSET for first few pages (users rarely go deep). Use keyset for deeper pages or infinite scroll. Many APIs use keyset (cursor) pagination exclusively: Twitter API, GitHub API, Stripe API.')
  ],
  'Choose offset pagination for small datasets and admin tables (where page jumping is needed). Choose keyset/cursor pagination for large datasets, APIs, and infinite scroll. The performance difference at scale is enormous — keyset is O(log n), offset is O(n).',
  [
    q('What is offset pagination?', 'LIMIT n OFFSET m — skips m rows and returns n. Simple but slow for large offsets.'),
    q('What is keyset pagination?', 'WHERE sort_column > last_value ORDER BY sort_column LIMIT n — uses index to fast-forward.'),
    q('Why is OFFSET slow for large offsets?', 'The database must scan and discard all OFFSET rows. Scanning 100,000 rows to show page 500 is expensive.'),
    q('Is keyset always faster than OFFSET?', 'For deep pagination, yes. For the first few pages, the difference is negligible.'),
    q('What is required for keyset pagination?', 'A unique sort column (or unique combination). A stable sort order. An index on the sort column.'),
    q('Can keyset pagination jump to a specific page?', 'No. Keyset pagination cannot jump to page N arbitrarily — it requires knowing the last item of the previous page.'),
    q('What is tuple comparison for keyset?', 'WHERE (created_at, id) > (\'2024-01-15\', 100) — compares both columns for tie-breaking. Requires composite index.'),
    q('What APIs use cursor pagination?', 'Twitter, GitHub, Stripe, Slack — most modern APIs use cursor (keyset) pagination for their main endpoints.'),
    q('What is the hybrid approach?', 'Use OFFSET for first few pages (users rarely go deep). Use keyset for deeper pages or infinite scrolling.'),
    q('What is the SQL for keyset with descending order?', 'WHERE created_at < last_created_at OR (created_at = last_created_at AND id < last_id) ORDER BY created_at DESC, id DESC LIMIT n.')
  ],
  R(10,35,110,25,'#0070f3','','OFFSET','Skip rows') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','LIMIT','Page size') +
  R(10,70,110,25,'#ffc107','','Keyset','WHERE > last') +
  R(10,105,110,25,'#dc3545','','Tuple','Multi-col') +
  R(280,35,200,100,'#17a2b8','','Pagination','OFFSET vs Keyset. Keyset is O(log n). OFFSET is O(n). Choose wisely.') +
  T(240,175,'Pagination: OFFSET/LIMIT vs Keyset/Cursor — performance implications at scale.',9,'#666','middle'),
  [
    e('OFFSET Pagination', 'Simple but slow at depth.', codeBlock([
      '-- Page 1 (rows 1-20)',
      'SELECT id, name, created_at',
      'FROM employees',
      'ORDER BY id',
      'LIMIT 20 OFFSET 0;',
      '',
      '-- Page 50 (rows 981-1000)',
      'SELECT id, name, created_at',
      'FROM employees',
      'ORDER BY id',
      'LIMIT 20 OFFSET 980;',
      '-- Database scans 1000 rows, returns 20!'
    ]), 'OFFSET pagination — simple but inefficient for deep pages.'),
    e('Keyset Pagination', 'Fast at any depth.', codeBlock([
      '-- Initial query (no cursor)',
      'SELECT id, name, created_at',
      'FROM employees',
      'ORDER BY id',
      'LIMIT 20;',
      '-- Last item: id = 20',
      '',
      '-- Next page (using cursor)',
      'SELECT id, name, created_at',
      'FROM employees',
      'WHERE id > 20',
      'ORDER BY id',
      'LIMIT 20;',
      '-- Direct index lookup — no scan!'
    ]), 'Keyset pagination uses the id > last_seen pattern for O(log n) performance.'),
    e('Keyset with Multiple Columns', 'Tie-breaking pagination.', codeBlock([
      '-- Initial query',
      'SELECT id, name, created_at',
      'FROM employees',
      "ORDER BY created_at DESC, id DESC",
      'LIMIT 20;',
      '-- Last item: created_at = \'2024-06-15\', id = 500',
      '',
      '-- Next page with tuple comparison',
      'SELECT id, name, created_at',
      'FROM employees',
      "WHERE (created_at, id) < ('2024-06-15', 500)",
      "ORDER BY created_at DESC, id DESC",
      'LIMIT 20;',
      '',
      '-- Needs composite index on (created_at DESC, id DESC)'
    ]), 'Tuple comparison handles ties when multiple rows share the same sort value.'),
    e('Keyset for Forward/Backward', 'Bi-directional pagination.', codeBlock([
      '-- Forward (next page)',
      'SELECT * FROM employees',
      'WHERE created_at < \'2024-06-15\'',
      'ORDER BY created_at DESC',
      'LIMIT 20;',
      '',
      '-- Backward (previous page)',
      'SELECT * FROM employees',
      'WHERE created_at > \'2024-06-01\'',
      'ORDER BY created_at ASC',
      'LIMIT 20;',
      '',
      '-- Reverse results on client side for display'
    ]), 'Bi-directional keyset pagination for both next and previous page support.'),
    e('Seek Method (Alternative)', 'WHERE on unique column.', codeBlock([
      '-- Seek method (alternative to keyset)',
      'SELECT * FROM employees',
      'ORDER BY salary DESC, id ASC',
      'LIMIT 20;',
      '-- Cursor: salary=85000, id=42',
      '',
      '-- Next page:',
      'SELECT * FROM employees',
      'WHERE salary < 85000',
      '   OR (salary = 85000 AND id > 42)',
      'ORDER BY salary DESC, id ASC',
      'LIMIT 20;',
      '',
      '-- Requires composite index on (salary DESC, id ASC)'
    ]), 'Seek method handles complex ORDER BY with multiple columns and directions.')
  ],
  [
    m('Why is OFFSET slow at deep pages?', ['Network latency', 'Database scans discarded rows', 'Index lookup', 'Query parsing'], 1, 'The database must scan and discard all rows up to the OFFSET value.'),
    m('What drives keyset pagination?', ['LIMIT only', 'WHERE > last_value', 'OFFSET', 'RANDOM'], 1, 'Keyset pagination uses WHERE condition on the sort column to fast-forward.'),
    m('What is required for keyset pagination?', ['Unique sort column', 'Table index', 'Sequential IDs', 'Both A and B'], 3, 'A unique sort column with an index is needed for reliable keyset pagination.'),
    m('Can keyset pagination jump to page N?', ['Yes', 'No', 'Only with OFFSET', 'Only with cursors'], 1, 'Keyset pagination cannot arbitrarily jump to a specific page number.'),
    m('What APIs commonly use cursor pagination?', ['GitHub', 'Twitter', 'Stripe', 'All of the above'], 3, 'Modern APIs use cursor (keyset) pagination for performance.'),
    m('What comparison handles multi-column keyset?', ['AND', 'Tuple comparison', 'OR comparison', 'Subquery'], 1, 'Tuple comparison (col1, col2) > (val1, val2) handles multi-column keyset.')
  ]
);

/* =================== TOPIC 43: SQL Anti-Patterns =================== */
addTopic('sql-anti-patterns', 'SQL Anti-Patterns', 'intermediate', 25,
  ['SQL anti-patterns are common design and query practices that seem reasonable but cause problems at scale.',
   'Anti-patterns lead to poor performance, data integrity issues, maintenance nightmares, and race conditions.',
   'Recognizing anti-patterns is a hallmark of experienced SQL developers. The goal is not just to write SQL, but to write good SQL.',
   'Most anti-patterns have well-known solutions or better alternatives.'
  ],
  'SQL anti-patterns are like bad habits in cooking — putting your knives in the dishwasher seems convenient until they get dull. SELECT * seems quick until you break the frontend by adding a column. Each anti-pattern has a better way that you learn through experience.',
  [
    d('SELECT * in Production', 'Problem: returns unnecessary columns (wasted bandwidth), breaks when schema changes (new columns may cause errors), prevents index-only scans. Solution: explicitly list needed columns. Exception: EXISTS (SELECT 1) or COUNT(*) which optimize * effectively.'),
    d('Implicit Columns / SELECT DISTINCT as Band-Aid', 'Problem: writing SELECT * on a JOIN and adding DISTINCT to deduplicate — hides the underlying data issue (missing join condition or unintended cross product). Solution: specify exact columns needed and fix the join logic.'),
    d('Non-Indexed Foreign Keys', 'Problem: FK columns without indexes. Every INSERT on child table checks parent (fast enough). Every DELETE on parent checks children (full table scan on child unless indexed). Solution: always index foreign key columns.'),
    d('Death by a Thousand ORs', 'Problem: WHERE status = \'x\' OR status = \'y\' OR status = \'z\' — multiple OR conditions on the same column. Solution: use IN (status IN (\'x\', \'y\', \'z\')) and ensure the column is indexed.'),
    d('Using Functions on Indexed Columns in WHERE', 'Problem: WHERE YEAR(date_col) = 2024 prevents index usage (function must evaluate for every row). Solution: WHERE date_col >= \'2024-01-01\' AND date_col < \'2025-01-01\' (sargable — can use index).')
  ],
  'Recognizing SQL anti-patterns comes with experience. The most common ones are easy to fix and prevent. Always measure (EXPLAIN ANALYZE) before optimizing. The biggest anti-pattern is premature optimization without understanding the actual query plan.',
  [
    q('What is wrong with SELECT *?', 'Returns unnecessary columns (wasted bandwidth), prevents index-only scans, breaks on schema changes, and makes dependencies unclear.'),
    q('Why should you index foreign keys?', 'DELETE on parent requires scanning child table for references. Without index, this is a full table scan. INSERT on child also checks parent.'),
    q('What is the problem with functions in WHERE?', 'Functions on indexed columns prevent index usage (non-sargable). Database cannot use index because it would need to compute the function for every index entry.'),
    q('What is the problem with OR conditions?', 'Multiple OR conditions on the same column are less efficient than IN. IN uses a single index lookup; OR may use multiple scans or fall back to sequential scan.'),
    q('What is the EAV anti-pattern?', 'Entity-Attribute-Value: a general-purpose table (entity_id, attribute, value) instead of proper columns. Leads to complex queries, poor performance, and no type safety.'),
    q('What is the God Table anti-pattern?', 'A single table with too many columns, trying to handle multiple entity types. Leads to sparse columns, confusing schema, and maintenance issues. Solution: normalize.'),
    q('What is the implicit column problem?', 'Using SELECT * on JOINs and adding DISTINCT to remove duplicates masks incorrect join conditions. Always specify columns to make dependencies explicit.'),
    q('What is n+1 query problem?', 'Making one query to get parent rows, then N queries to get child data for each parent. Solution: use JOIN, batch queries, or eager loading in ORMs.'),
    q('What is metadata tribbles?', 'Adding columns for every new attribute without normalization. The table grows wider and wider with sparse columns. Solution: use JSONB for variable attributes or normalize.'),
    q('What is the rounding error anti-pattern?', 'Using FLOAT/DOUBLE for monetary values causes rounding errors over time. Always use DECIMAL/NUMERIC for exact precision money calculations.')
  ],
  R(10,35,130,25,'#0070f3','','SELECT *','Bad practice') +
  R(10,65,130,25,'#28a745','','Unindexed FK','Slow DELETE') +
  R(10,95,130,25,'#ffc107','','Fn on col','No index use') +
  R(10,125,130,25,'#dc3545','','EAV pattern','Complex query') +
  R(10,155,130,25,'#e83e8c','','God Table','Too wide') +
  A(140,48,170,48) + A(140,78,170,78) + A(140,108,170,108) + A(140,138,170,138) + A(140,168,170,168) +
  R(180,35,200,155,'#17a2b8','','SQL Anti-Patterns','Common mistakes: SELECT *, unindexed FKs, non-sargable queries, EAV, and more.') +
  T(240,220,'SQL Anti-Patterns: Common design and query mistakes and their better alternatives.',9,'#666','middle'),
  [
    e('Non-Sargable Query', 'Fix functions in WHERE.', codeBlock([
      '-- BAD: Function on indexed column',
      "SELECT * FROM orders",
      "WHERE EXTRACT(YEAR FROM order_date) = 2024;",
      '',
      '-- GOOD: Sargable range query',
      "SELECT * FROM orders",
      "WHERE order_date >= '2024-01-01'",
      "  AND order_date < '2025-01-01';",
      '',
      '-- Also bad:',
      "SELECT * FROM users WHERE LOWER(email) = 'alice@x.com';",
      '',
      '-- Fix: expression index',
      "CREATE INDEX ON users(LOWER(email));"
    ]), 'Non-sargable vs sargable queries — the latter can use indexes.'),
    e('EAV Anti-Pattern', 'Entity-Attribute-Value problem.', codeBlock([
      '-- BAD: EAV table (anti-pattern)',
      'CREATE TABLE product_attributes (',
      '  product_id INT,',
      '  attribute VARCHAR(50),',
      '  value TEXT',
      ');',
      '',
      '-- Query becomes painful:',
      "SELECT p.name, a1.value AS color, a2.value AS weight",
      "FROM products p",
      "LEFT JOIN product_attributes a1",
      "  ON a1.product_id = p.id AND a1.attribute = 'color'",
      "LEFT JOIN product_attributes a2",
      "  ON a2.product_id = p.id AND a2.attribute = 'weight';",
      '',
      '-- GOOD: Proper columns',
      'CREATE TABLE products (',
      '  id INT, name TEXT, color TEXT, weight DECIMAL',
      ');'
    ]), 'EAV leads to painful pivot queries. Normalize properly.'),
    e('N+1 Query Problem', 'Avoid in application code.', codeBlock([
      '// BAD: N+1 queries (application code)',
      'const departments = await db.query("SELECT * FROM departments");',
      'for (const dept of departments) {',
      '  const employees = await db.query(',
      '    "SELECT * FROM employees WHERE dept_id = " + dept.id',
      '  );',
      '  // 1 query for departments + N for employees',
      '}',
      '',
      '// GOOD: Single JOIN query',
      'const result = await db.query("',
      '  SELECT d.name AS dept, e.name AS emp',
      '  FROM departments d',
      '  JOIN employees e ON e.dept_id = d.id',
      '  ORDER BY d.name;',
      '");'
    ]), 'N+1 problem: one query for parents, N for children. Fix with JOIN or eager loading.'),
    e('Unindexed Foreign Key', 'Index FKs for DELETE performance.', codeBlock([
      '-- BAD: FK without index',
      'CREATE TABLE orders (',
      '  id SERIAL PRIMARY KEY,',
      '  customer_id INT REFERENCES customers(id) -- no index!',
      ');',
      '',
      '-- DELETE FROM customers WHERE id = 5',
      '-- must full scan orders table to check FK reference',
      '',
      '-- GOOD: FK with index',
      'CREATE INDEX idx_orders_customer ON orders(customer_id);',
      '',
      '-- Now DELETE is fast (index lookup on orders)'
    ]), 'Unindexed FKs cause full table scans on parent DELETE operations.'),
    e('Implicit DISTINCT Mask', 'Hidden join problem.', codeBlock([
      '-- BAD: DISTINCT masking a join issue',
      'SELECT DISTINCT c.*',
      'FROM customers c',
      'JOIN orders o ON c.id = o.customer_id;',
      '-- DISTINCT is needed because customers appear multiple times',
      '-- But why? Do we actually want all customers with orders?',
      '',
      '-- GOOD: Be explicit',
      'SELECT c.* FROM customers c',
      'WHERE EXISTS (',
      '  SELECT 1 FROM orders o WHERE o.customer_id = c.id',
      ');',
      '',
      '-- Or if duplicates are expected:',
      'SELECT DISTINCT c.* FROM customers c',
      'JOIN orders o ON c.id = o.customer_id'
    ]), 'DISTINCT often masks unintended row multiplication. Use EXISTS for existence checks.')
  ],
  [
    m('What is wrong with SELECT *?', ['Faster queries', 'Returns unnecessary columns', 'Uses less memory', 'Better for indexes'], 1, 'SELECT * returns unnecessary columns and prevents index-only scans.'),
    m('What does non-sargable mean?', ['Uses indexes', 'Cannot use index efficiently', 'Very fast', 'Uses sequential scan'], 1, 'Non-sargable queries cannot use indexes because of functions on indexed columns.'),
    m('What is the EAV anti-pattern?', ['Entity-Attribute-Value design', 'Eager loading pattern', 'Error handling pattern', 'Execution plan view'], 0, 'EAV is a general-purpose table design that leads to complex queries.'),
    m('What problem does n+1 describe?', ['1 + N queries for parent + children', 'N + 1 table join', 'N + 1 indexes', '1 + N columns'], 0, 'N+1: one query for parents, N queries for children.'),
    m('What is the solution to unindexed foreign keys?', ['Remove the FK', 'Add an index', 'Use a view', 'Denormalize'], 1, 'Always add an index on foreign key columns.'),
    m('Why avoid functions on indexed columns in WHERE?', ['They error', 'They prevent index usage', 'They are slow syntax', 'They return wrong results'], 1, 'Functions on indexed columns make the query non-sargable — indexes cannot be used.')
  ]
);

/* =================== TOPIC 44: PostgreSQL vs MySQL vs SQL Server =================== */
addTopic('sql-db-comparison', 'PostgreSQL vs MySQL vs SQL Server', 'beginner', 20,
  ['PostgreSQL: most advanced open-source RDBMS, strict SQL standards compliance, extensible, feature-rich.',
   'MySQL: fast for simple read-heavy workloads, widespread LAMP stack usage, simpler replication.',
   'SQL Server: excellent tooling (SSMS), deep .NET integration, business intelligence features.',
   'SQLite: embedded database, zero configuration, file-based, ideal for mobile and small applications.'
  ],
  'Choosing a database is like choosing a vehicle. PostgreSQL is a heavy-duty truck — powerful, can handle any job, but takes more skill. MySQL is a reliable sedan — simple, fast for commuting, and easy to maintain. SQLite is a bicycle — perfect for short trips, no fuel needed.',
  [
    d('PostgreSQL Strengths', 'Advanced features: JSONB, full-text search, window functions, CTEs, recursion, GiST/GIN indexes, table inheritance, foreign data wrappers. Strict ACID compliance. Extensible: custom types, operators, functions. Best open-source choice for complex workloads.'),
    d('MySQL Strengths', 'Simple and fast for basic CRUD. Widespread hosting support. Easy replication (built-in). Lighter memory footprint. Great ecosystem (WordPress, Drupal, Laravel). InnoDB with ACID. Good for read-heavy applications.'),
    d('SQL Server Strengths', 'Best tooling: SSMS, SSIS, SSRS, SSAS. Deep .NET integration (Entity Framework). T-SQL with advanced analytics. Columnstore indexes for data warehousing. Always On availability groups. Best for Microsoft shops.'),
    d('Feature Comparison', 'CTEs: PostgreSQL (with recursion), SQL Server (with recursion), MySQL 8+ (no recursion). Window functions: all three modern versions. JSON: PostgreSQL (JSONB best), MySQL (JSON type), SQL Server (JSON functions). Array type: PostgreSQL only.'),
    d('Performance Characteristics', 'MySQL: faster for simple SELECT/INSERT with good indexes. PostgreSQL: faster for complex queries, joins, aggregations. SQL Server: excellent optimizer, best with large data warehouses. SQLite: fastest for single-user/small datasets.')
  ],
  'PostgreSQL is the best general-purpose choice for new applications — it is the most feature-rich, standards-compliant, and extensible open-source database. MySQL is a proven choice for simple web applications. SQL Server is the choice for Microsoft ecosystems.',
  [
    q('What is PostgreSQL best at?', 'Advanced queries, JSON, full-text search, CTEs, window functions, extensibility, and standards compliance.'),
    q('What is MySQL best at?', 'Simple read-heavy workloads, LAMP stack applications, ubiquitous hosting support, easy replication.'),
    q('What is SQL Server best at?', '.NET integration, BI/analytics, SSMS tooling, columnstore indexes, enterprise features.'),
    q('Which database has the best JSON support?', 'PostgreSQL with JSONB — indexed, fast operators, binary format.'),
    q('Does MySQL support CTEs?', 'MySQL 8.0+ supports non-recursive CTEs but not recursive CTEs.'),
    q('Which database supports array types?', 'Only PostgreSQL has native array types among the major databases.'),
    q('What is the best database for a new web application?', 'PostgreSQL — best combination of features, performance, and community.'),
    q('What is SQLite best for?', 'Mobile apps, embedded systems, testing, small-scale applications, single-user desktop apps.'),
    q('Which has the best query optimizer?', 'PostgreSQL and SQL Server both have excellent optimizers. MySQL\'s optimizer has improved significantly.'),
    q('Which database has the best free tooling?', 'PostgreSQL: pgAdmin, DBeaver. MySQL: MySQL Workbench. SQL Server: SSMS (best overall tooling).')
  ],
  R(10,35,110,25,'#0070f3','','PostgreSQL','Feature-rich') +
  R(10,65,110,25,'#28a745','','MySQL','Simple/fast') +
  R(10,95,110,25,'#ffc107','','SQL Server','Enterprise') +
  R(10,125,110,25,'#dc3545','','SQLite','Embedded') +
  R(10,155,110,25,'#e83e8c','','Choose','Match needs') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,220,155,'#17a2b8','','Database Comparison','PostgreSQL vs MySQL vs SQL Server vs SQLite — choose the right tool.') +
  T(240,220,'Database Comparison: Strengths, weaknesses, and use cases for each major SQL database.',9,'#666','middle'),
  [
    e('Feature Comparison Table', 'Key features across databases.', codeBlock([
      '-- Feature           | PostgreSQL | MySQL  | SQL Server |',
      '-- CTEs (Recursive) | Yes        | 8+ only| Yes        |',
      '-- Window Functions | Yes        | 8+     | Yes        |',
      '-- JSON/JSONB       | Yes (best) | Yes    | Functions  |',
      '-- Array Type       | Yes        | No     | No         |',
      '-- Full-Text Search | Excellent  | Basic  | Excellent  |',
      '-- GIN/GiST Index   | Yes        | No     | No         |',
      '-- FDW/Linked Srvr  | Yes (FDW)  | FEDERATED| Linked Svr|',
      '-- Materialized View| Yes        | No     | Yes        |',
      '-- Table Partition  | Yes        | Yes    | Yes        |',
      '-- UUID Type        | Native     | Binary | GUID       |',
      '-- License          | Open (MIT) | Dual   | Commercial |',
      '-- Default Port     | 5432       | 3306   | 1433       |'
    ]), 'Feature comparison across major SQL databases.'),
    e('Migration Paths', 'Moving between databases.', codeBlock([
      '-- PostgreSQL to MySQL:',
      '--   Replace SERIAL with AUTO_INCREMENT',
      '--   Replace || with CONCAT()',
      '--   Replace ILIKE with LOWER() + LIKE',
      '--   Remove RETURNING, change order',
      '',
      '-- MySQL to PostgreSQL:',
      '--   Replace AUTO_INCREMENT with SERIAL',
      '--   Replace CONCAT() with ||',
      '--   Add explicit type casts',
      '--   Change backtick quoting to double quotes',
      '',
      '-- Common gotchas:',
      '--   LIMIT/OFFSET syntax is the same',
      '--   JOIN syntax is standard across all',
      '--   String comparison: PostgreSQL is case-sensitive'
    ]), 'Key differences when migrating between databases.'),
    e('Sample Query Comparison', 'Same query in different dialects.', codeBlock([
      '-- PostgreSQL:',
      "SELECT name, salary FROM employees",
      "WHERE salary > (SELECT AVG(salary) FROM employees)",
      "ORDER BY salary DESC LIMIT 10;",
      '',
      '-- MySQL (same, but backtick quoting):',
      "SELECT `name`, `salary` FROM `employees`",
      "WHERE `salary` > (SELECT AVG(`salary`) FROM `employees`)",
      "ORDER BY `salary` DESC LIMIT 10;",
      '',
      '-- SQL Server (TOP instead of LIMIT):',
      "SELECT TOP 10 name, salary FROM employees",
      "WHERE salary > (SELECT AVG(salary) FROM employees)",
      "ORDER BY salary DESC;"
    ]), 'Syntax differences for the same query across databases.'),
    e('Benchmarking Advice', 'How to choose.', codeBlock([
      '-- Read-heavy web app: MySQL or PostgreSQL',
      '-- Complex analytics/reporting: PostgreSQL or SQL Server',
      '-- .NET / Microsoft ecosystem: SQL Server',
      '-- Embedded / mobile: SQLite',
      '-- Full-text search heavy: PostgreSQL',
      '-- JSON document needs: PostgreSQL (JSONB is best)',
      '-- Budget constrained: PostgreSQL (free, full-featured)',
      '-- Enterprise with support needs: SQL Server or MySQL (Oracle)',
      '',
      '-- Best practice: benchmark with YOUR workload,',
      '-- not generic benchmarks'
    ]), 'Decision guide for choosing the right database for your project.'),
    e('SQLite for Testing', 'SQLite in development.', codeBlock([
      '-- Why SQLite for testing:',
      '--   No server setup needed',
      '--   In-memory option for tests',
      '--   Fast test execution',
      '--   File-based for easy clean-up',
      '',
      '-- Gotchas when using SQLite vs PostgreSQL:',
      '--   No array type',
      '--   Limited ALTER TABLE',
      '--   No JSON functions (before 3.38)',
      '--   Flexible type system (no type enforcement)',
      '--   Different date/time functions'
    ]), 'SQLite is ideal for testing but has important differences from PostgreSQL.')
  ],
  [
    m('Which database has the best JSON support?', ['MySQL', 'PostgreSQL', 'SQL Server', 'SQLite'], 1, 'PostgreSQL with JSONB has the best JSON support with indexing and operators.'),
    m('Which databases support recursive CTEs?', ['PostgreSQL and SQL Server', 'MySQL only', 'SQLite only', 'All of them'], 0, 'PostgreSQL and SQL Server support recursive CTEs; MySQL 8+ has non-recursive only.'),
    m('What is SQLite best for?', ['Enterprise apps', 'Embedded/mobile', 'Web apps', 'Data warehousing'], 1, 'SQLite is ideal for embedded systems, mobile apps, and testing.'),
    m('Which database has native array types?', ['MySQL', 'PostgreSQL', 'SQL Server', 'None'], 1, 'PostgreSQL is the only major database with native array types.'),
    m('What port does PostgreSQL use by default?', ['3306', '5432', '1433', '27017'], 1, 'PostgreSQL default port is 5432.'),
    m('Which database uses TOP instead of LIMIT?', ['PostgreSQL', 'MySQL', 'SQL Server', 'SQLite'], 2, 'SQL Server uses SELECT TOP n instead of LIMIT n.')
  ]
);

/* =================== TOPIC 45: ORMs & SQL =================== */
addTopic('sql-orms', 'ORMs & SQL', 'intermediate', 20,
  ['Object-Relational Mappers (ORMs) bridge the gap between object-oriented programming and relational databases.',
   'Popular ORMs: Sequelize (Node.js), Prisma (Node.js), TypeORM (TypeScript), Django ORM (Python), Entity Framework (.NET).',
   'ORMs handle: connection pooling, query generation, migration management, relationship mapping, and type casting.',
   'ORMs are great for CRUD but can produce inefficient queries for complex operations. Know when to drop to raw SQL.'
  ],
  'An ORM is like having a translator between two people who speak different languages. Your application speaks objects (JavaScript/Python classes), the database speaks tables and rows. The ORM translates: save this object → INSERT, find by id → SELECT, update fields → UPDATE.',
  [
    d('How ORMs Work', 'Model class maps to table. Class instances map to rows. Properties map to columns. Methods like find(), create(), update() generate SQL. Relationships defined with belongsTo, hasMany decorators. Query builder builds SQL programmatically.'),
    d('ORM Advantages', 'Productivity: write application code, not SQL. Type safety: TypeScript/type-checking. Migration management: version-controlled schema changes. Relationship loading: eager/lazy loading with simple method calls. Connection management built-in.'),
    d('ORM Disadvantages', 'N+1 query problem (if lazy loading). Inefficient queries (loading too much data). Complex queries are hard to express. Hidden performance costs (SELECT * by default). Learning SQL is still necessary to debug ORM-generated queries.'),
    d('When to Use Raw SQL', 'Complex aggregations and window functions. Bulk operations. Reporting queries. Full-text search. Recursive CTEs. Performance-critical paths. Any query where you need specific index usage or query plan.'),
    d('Common ORM Patterns', 'Eager loading: .include() or JOIN (prevents N+1). Batch operations: bulk create/update. Transactions: database-level ACID. Raw queries: .query() or .raw() for complex SQL. Pagination: built-in .paginate() or manual limit/offset.')
  ],
  'ORMs are essential for productivity but are not a replacement for SQL knowledge. Use ORMs for 80% of queries (simple CRUD). Use raw SQL for the 20% that are complex or performance-critical. Always check the actual SQL that your ORM generates.',
  [
    q('What is an ORM?', 'Object-Relational Mapper — bridges application objects with database tables by auto-generating SQL from code.'),
    q('What are popular Node.js ORMs?', 'Sequelize (oldest, mature), Prisma (modern, type-safe), TypeORM (TypeScript-first), Knex (query builder).'),
    q('What is the N+1 problem in ORMs?', 'Loading parent objects triggers N child queries (one per parent). Solved by eager loading (.include() or JOIN).'),
    q('Why might an ORM be inefficient?', 'SELECT * by default, loading unnecessary columns. Generating multiple queries instead of JOINs. Not using indexes optimally.'),
    q('When should you use raw SQL instead of ORM?', 'Complex aggregations, window functions, recursive CTEs, bulk operations, reporting queries.'),
    q('What does eager loading do?', 'Loads related data in a single query using JOINs, preventing the N+1 problem.'),
    q('What is a migration in ORM context?', 'Version-controlled schema changes. Migrations are code files that describe table creation, alteration, and seeding.'),
    q('What is a query builder?', 'A programmatic API for constructing SQL queries (like Knex). More control than ORM but less verbose than raw SQL.'),
    q('Does every ORM support raw SQL?', 'Yes. All major ORMs provide a way to execute raw SQL for complex queries.'),
    q('Should you learn SQL if you use an ORM?', 'Absolutely. Debugging ORM issues requires understanding the generated SQL. Complex queries need raw SQL. Performance tuning requires knowledge of indexes and query plans.')
  ],
  R(10,35,120,25,'#0070f3','','ORM Layer','App <-> DB') +
  A(130,48,160,48) +
  R(170,35,120,25,'#28a745','','CRUD','Auto SQL') +
  R(170,65,120,25,'#ffc107','','Complex','Raw SQL') +
  R(170,95,120,25,'#dc3545','','N+1','Eager load') +
  R(10,95,120,25,'#e83e8c','','Migration','Schema versions') +
  A(290,48,320,48) + A(290,78,320,78) + A(290,108,320,108) +
  R(330,35,150,100,'#17a2b8','','ORMs & SQL','ORMs for productivity. Raw SQL for performance. Know both.') +
  T(240,195,'ORMs & SQL: Understanding ORM-generated SQL and knowing when to drop to raw queries.',9,'#666','middle'),
  [
    e('Sequelize Example', 'Node.js ORM in action.', codeBlock([
      '// Model definition',
      'const User = sequelize.define(\'User\', {',
      '  name: DataTypes.STRING,',
      '  email: { type: DataTypes.STRING, unique: true },',
      '  salary: DataTypes.DECIMAL(10,2)',
      '});',
      '',
      '// ORM generates:',
      '// CREATE TABLE "Users" (',
      '//   id SERIAL PRIMARY KEY,',
      '//   name VARCHAR(255),',
      '//   email VARCHAR(255) UNIQUE,',
      '//   salary DECIMAL(10,2),',
      '//   createdAt TIMESTAMPTZ,',
      '//   updatedAt TIMESTAMPTZ',
      '// );'
    ]), 'Sequelize model definition and the SQL it generates.'),
    e('Prisma Example', 'Modern type-safe ORM.', codeBlock([
      '// Schema (schema.prisma)',
      'model User {',
      '  id    Int     @id @default(autoincrement())',
      '  name  String',
      '  posts Post[]',
      '}',
      '',
      'model Post {',
      '  id      Int  @id @default(autoincrement())',
      '  title   String',
      '  userId  Int',
      '  user    User @relation(fields: [userId], references: [id])',
      '}',
      '',
      '// Query with eager loading:',
      '// const users = await prisma.user.findMany({',
      '//   include: { posts: true }',
      '// });',
      '// Generates: SELECT u.*, p.* FROM User u LEFT JOIN Post p ...'
    ]), 'Prisma schema and eager loading prevents N+1 queries.'),
    e('N+1 vs Eager Loading', 'Critical ORM pattern.', codeBlock([
      '// BAD: N+1 queries',
      'const orders = await Order.findAll(); // 1 query',
      'for (const order of orders) {',
      '  const customer = await order.getCustomer(); // N queries!',
      '}',
      '// Total: 1 + N queries (slow!)',
      '',
      '// GOOD: Eager loading',
      'const orders = await Order.findAll({',
      '  include: [Customer]  // LEFT JOIN, 1 query',
      '});',
      '// Total: 1 query (fast!)'
    ]), 'Eager loading prevents the N+1 problem by using JOINs.'),
    e('Raw SQL in ORM', 'When ORM is not enough.', codeBlock([
      '// Prisma raw query',
      'const result = await prisma.$queryRaw`',
      '  SELECT department, COUNT(*) as count,',
      '    AVG(salary) as avg_salary',
      '  FROM employees',
      '  GROUP BY department',
      '  HAVING COUNT(*) > 5',
      '  ORDER BY avg_salary DESC',
      '`;',
      '',
      '// TypeORM raw query',
      'const result = await connection.query(`',
      '  WITH ranked AS (',
      '    SELECT *, ROW_NUMBER() OVER (',
      '      PARTITION BY dept_id ORDER BY salary DESC',
      '    ) AS rn FROM employees',
      '  ) SELECT * FROM ranked WHERE rn <= 3',
      '`);'
    ]), 'Raw SQL in ORMs for complex queries like aggregations and window functions.'),
    e('Migration Example', 'Version-controlled schema.', codeBlock([
      '// Migration file (Sequelize)',
      'module.exports = {',
      '  up: async (queryInterface, Sequelize) => {',
      '    await queryInterface.createTable(\'Tasks\', {',
      '      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },',
      '      title: { type: Sequelize.STRING, allowNull: false },',
      '      status: { type: Sequelize.ENUM(\'todo\', \'done\') },',
      '      userId: {',
      '        type: Sequelize.INTEGER,',
      '        references: { model: \'Users\', key: \'id\' },',
      '        onDelete: \'CASCADE\'',
      '      }',
      '    });',
      '  },',
      '  down: async (queryInterface) => {',
      '    await queryInterface.dropTable(\'Tasks\');',
      '  }',
      '};'
    ]), 'Migrations provide version-controlled, reversible schema changes.')
  ],
  [
    m('What does ORM stand for?', ['Object-Relational Mapping', 'Object-Relational Model', 'Object-Resource Mapper', 'Online Relational Manager'], 0, 'ORM stands for Object-Relational Mapping.'),
    m('What problem does eager loading solve?', ['Slow queries', 'N+1 queries', 'Connection pooling', 'Type safety'], 1, 'Eager loading with .include() or JOIN prevents N+1 query problems.'),
    m('When should you use raw SQL over ORM?', ['Simple CRUD', 'Complex aggregations/window functions', 'Model definitions', 'Migration creation'], 1, 'Use raw SQL for complex queries like aggregations, window functions, and recursive CTEs.'),
    m('What is a migration?', ['Schema versioning', 'Data backup', 'Query optimization', 'Connection management'], 0, 'Migrations are version-controlled, reversible schema changes.'),
    m('Which is a modern type-safe ORM for Node.js?', ['Sequelize', 'Prisma', 'Mongoose', 'Knex'], 1, 'Prisma is a modern type-safe ORM for Node.js and TypeScript.'),
    m('Why should you learn SQL if you use an ORM?', ['No need', 'To debug and optimize ORM queries', 'ORMs are always perfect', 'SQL is obsolete'], 1, 'Understanding SQL is essential for debugging ORM-generated queries and writing efficient raw queries.')
  ]
);

/* =================== TOPIC 46: Database Migration & Version Control =================== */
addTopic('sql-migrations', 'Database Migration & Version Control', 'intermediate', 20,
  ['Database migrations are version-controlled scripts that evolve the database schema over time in a reproducible way.',
   'Migrations solve: shared schema across environments, team collaboration on schema changes, rollback capability, and deployment automation.',
   'Tools: node-pg-migrate, Flyway (Java), Alembic (Python), ActiveRecord Migrations (Rails), golang-migrate.',
   'Best practice: one migration per change, always test both up and down, never modify existing migrations.'
  ],
  'Migrations are like Git for your database schema. Just as you commit code changes incrementally, you create migration files for each schema change. "Up" applies the change, "down" reverts it. This means you can reproduce any version of your schema at any point in time.',
  [
    d('Migration Structure', 'Each migration has: up function (apply change) and down function (revert change). Naming: YYYYMMDDHHMMSS_description.sql or versioned numbers (001_create_users.sql). Tools track which migrations have been applied using a migrations table.'),
    d('Migration Workflow', 'Create migration → review → apply to dev → test → apply to staging → apply to production. Never modify an applied migration (create a new one to fix). Always test down before deploying up (ensures rollback works).'),
    d('Common Migration Types', 'CREATE/ALTER/DROP TABLE. Add/drop columns. Add/drop indexes. Add/drop constraints (FK, UNIQUE). Data migrations (backfill, transform). Seed data (reference data, test data).'),
    d('Database Version Table', 'Tools create a schema_migrations (or _migrations) table that records which migrations have been applied. Columns: version (unique ID), name, applied_at (timestamp), checksum. This table must never be modified manually.'),
    d('Migration Safety', 'Always have a tested down migration. Avoid locking large tables — use CONCURRENTLY for indexes. Test on a copy of production data. Have a rollback plan. For zero-downtime deployments: expand → migrate → contract pattern.')
  ],
  'Database migrations are essential for professional software development. They make schema changes repeatable, reviewable, and reversible. The investment in a good migration workflow pays back enormously in reduced deployment stress and incident recovery time.',
  [
    q('What is a database migration?', 'A version-controlled, reversible script that changes the database schema.'),
    q('Why use migrations?', 'Reproducible schema across environments. Team collaboration. Rollback capability. Deployment automation.'),
    q('What is the up function?', 'Applies the migration — creates tables, adds columns, creates indexes, etc.'),
    q('What is the down function?', 'Reverts the migration — drops tables, removes columns, drops indexes.'),
    q('Should you modify an applied migration?', 'Never. Create a new migration to fix issues. Applied migrations are immutable history.'),
    q('What is a data migration?', 'A migration that transforms existing data — backfilling new columns, splitting fields, correcting values.'),
    q('What is a seed migration?', 'Populates reference data: countries, status values, admin users.'),
    q('What is the expand-migrate-contract pattern?', 'Zero-downtime migration: add new column (expand), migrate data gradually, remove old column (contract).'),
    q('What tool is commonly used with Node.js?', 'node-pg-migrate, Knex.js migrations, Sequelize migrations, Prisma migrations.'),
    q('How do you test a migration?', 'Apply up, verify schema/data, apply down, verify schema is restored. Test on a copy of production data.')
  ],
  R(10,35,110,25,'#0070f3','','Up','Apply change') +
  R(10,65,110,25,'#28a745','','Down','Revert') +
  R(10,95,110,25,'#ffc107','','Test','Verify both') +
  R(10,125,110,25,'#dc3545','','Deploy','Environments') +
  R(10,155,110,25,'#e83e8c','','Immutable','Never modify') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,220,155,'#17a2b8','','Migrations & Versioning','Version-controlled, reversible, and testable schema evolution.') +
  T(240,220,'Database Migrations: Version-controlled schema changes with up/down for reproducibility.',9,'#666','middle'),
  [
    e('Basic Migration (node-pg-migrate)', 'Create users table.', codeBlock([
      "exports.up = (pgm) => {",
      "  pgm.createTable('users', {",
      "    id: 'id', // serial primary key",
      "    name: { type: 'varchar(100)', notNull: true },",
      "    email: { type: 'varchar(255)', unique: true, notNull: true },",
      "    created_at: { type: 'timestamptz', default: pgm.func('now()') }",
      "  });",
      "};",
      '',
      "exports.down = (pgm) => {",
      "  pgm.dropTable('users');",
      "};"
    ]), 'Basic create table migration with up (create) and down (drop).'),
    e('Adding a Column Migration', 'Schema evolution.', codeBlock([
      '// 002_add_salary_to_users.js',
      "exports.up = (pgm) => {",
      "  pgm.addColumn('users', {",
      "    salary: { type: 'decimal(10,2)', default: 0 }",
      "  });",
      '};',
      '',
      "exports.down = (pgm) => {",
      "  pgm.dropColumn('users', 'salary');",
      "};",
      '',
      '// Applied order: 001_create_users, 002_add_salary_to_users'
    ]), 'Incremental schema change — adding a column in a new migration.'),
    e('Data Migration Example', 'Backfill data.', codeBlock([
      '// 003_backfill_full_name.js',
      "exports.up = async (pgm) => {",
      "  // Backfill full_name from first_name + last_name",
      "  await pgm.sql(`",
      "    UPDATE users",
      "    SET full_name = TRIM(",
      "      COALESCE(first_name, '') || ' ' || COALESCE(last_name, '')",
      "    )",
      "    WHERE full_name IS NULL;",
      "  `);",
      "};",
      '',
      "exports.down = (pgm) => {",
      "  // Data migration down is often left empty or reversed",
      "  pgm.sql(`UPDATE users SET full_name = NULL`);",
      "};"
    ]), 'Data migration for backfilling a new column from existing data.'),
    e('Migration for Index with CONCURRENTLY', 'Zero-downtime index.', codeBlock([
      '// 004_add_index_concurrently.js',
      "exports.up = async (pgm) => {",
      "  // CREATE INDEX CONCURRENTLY does not lock the table",
      "  await pgm.sql(`",
      "    CREATE INDEX CONCURRENTLY idx_users_email",
      "    ON users (email);",
      "  `);",
      "};",
      '',
      "exports.down = async (pgm) => {",
      "  await pgm.sql(`",
      "    DROP INDEX CONCURRENTLY IF EXISTS idx_users_email;",
      "  `);",
      "};"
    ]), 'CONCURRENTLY allows index creation without locking the table for writes.'),
    e('Migrations Table', 'How tools track state.', codeBlock([
      '-- Tools create a tracking table:',
      'SELECT * FROM schema_migrations;',
      '',
      '-- Output:',
      '-- version  |        applied_at',
      '-- ---------+----------------------------',
      '-- 001      | 2024-01-15 10:00:00+00',
      '-- 002      | 2024-01-20 14:30:00+00',
      '-- 003      | 2024-02-01 09:15:00+00',
      '',
      '-- To see pending migrations:',
      'SELECT * FROM migrations_to_apply();',
      '',
      '-- Never manually modify this table!'
    ]), 'The schema_migrations table tracks which migrations have been applied.')
  ],
  [
    m('What is the up function in a migration?', ['Reverts changes', 'Applies changes', 'Seeds data', 'Drops tables'], 1, 'The up function applies the schema change.'),
    m('What is the down function for?', ['Reverting the change', 'Applying again', 'Checking status', 'Optimizing'], 0, 'The down function reverts the change made by up.'),
    m('Should you modify an applied migration?', ['Yes', 'No, create a new one', 'Only the down', 'Only for bugs'], 1, 'Never modify an applied migration — create a new one to fix issues.'),
    m('What pattern enables zero-downtime migrations?', ['Up and down', 'Expand-migrate-contract', 'Forward only', 'Rolling update'], 1, 'Expand-migrate-contract: add new, migrate data, remove old.'),
    m('What table tracks applied migrations?', ['pg_tables', 'schema_migrations', 'applied_migrations', 'versions'], 1, 'Migration tools create a schema_migrations table.'),
    m('Which keyword avoids table locking when creating an index?', ['ONLINE', 'CONCURRENTLY', 'LOCK FREE', 'ASYNC'], 1, 'CREATE INDEX CONCURRENTLY avoids table locks.')
  ]
);

// ---- GENERATE ----
var dataDir = __dirname;

// Write topics-data.js (embedded TOPICS_DATA)
var lines = [];
lines.push('var TOPICS_DATA = TOPICS_DATA || {};');
lines.push('TOPICS_DATA["sql"] = TOPICS_DATA["sql"] || {};');
for (var id in topics) {
  lines.push('TOPICS_DATA["sql"]["' + id + '"] = ' + JSON.stringify(topics[id]) + ';');
}
fs.writeFileSync(dataDir + '/topics-data.js', lines.join('\n'));

// Write topics.json (metadata index)
fs.writeFileSync(dataDir + '/topics.json', JSON.stringify({ topics: topicList }, null, 2));

console.log('Generated SQL topics: ' + Object.keys(topics).length);


