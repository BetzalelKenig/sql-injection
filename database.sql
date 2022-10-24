CREATE TABLE tUsers (
    id int identity primary key,
    firstName varchar(1000) not null,
    lastName varchar(1000) not null,
    email nvarchar(100) not null unique,
    password nvarchar(100) not null
);

INSERT INTO tUsers(firstName, lastName, email, password)
VALUES ('John', 'Doue', 'john@doue.com', 'secret'),
('Mike', 'Johnson', 'mike@johnson.com', '123'),
('Mery', 'Levy', 'mery@levy.com', 'qwer'),
('Sum', 'Mar', 'Sum@Mar.com', 'pass123');