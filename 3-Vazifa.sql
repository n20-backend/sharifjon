CREATE DATABASE market;

\c market


CREATE TABLE telefonlar (
    telefon_id SERIAL PRIMARY KEY,
    model VARCHAR(255) NOT NULL,
    narxi FLOAT NOT NULL,
    ishlab_chiqaruvchi VARCHAR(255) NOT NULL,
    xotira INT NOT NULL
);


CREATE TABLE mijozlar (
    mijoz_id SERIAL PRIMARY KEY,
    ism VARCHAR(255) NOT NULL,
    familiya VARCHAR(255) NOT NULL,
    telefon VARCHAR(255) UNIQUE NOT NULL
);


CREATE TABLE xodimlar (
    xodim_id SERIAL PRIMARY KEY,
    ism VARCHAR(255) NOT NULL,
    familiya VARCHAR(255) NOT NULL,
    lavozimi VARCHAR(255) NOT NULL
);


CREATE TABLE sotuvlar (
    sotuv_id SERIAL PRIMARY KEY,
    telefon_id INT REFERENCES telefonlar(telefon_id) ON DELETE CASCADE,
    mijoz_id INT REFERENCES mijozlar(mijoz_id) ON DELETE CASCADE,
    xodim_id INT REFERENCES xodimlar(xodim_id) ON DELETE CASCADE,
    sotuv_sanasi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    miqdori INT NOT NULL,
    umumiy_narx FLOAT NOT NULL
);





INSERT INTO telefonlar (model, narxi, ishlab_chiqaruvchi, xotira) VALUES
('iPhone 15', 1300, 'Apple', 256),
('iPhone 15 Pro', 1500, 'Apple', 512),
('Samsung Galaxy S23', 1100, 'Samsung', 256),
('Samsung Galaxy S23 Ultra', 1400, 'Samsung', 512),
('Google Pixel 8', 1000, 'Google', 128),
('Google Pixel 8 Pro', 1300, 'Google', 256),
('Xiaomi 13 Pro', 950, 'Xiaomi', 256),
('OnePlus 11', 900, 'OnePlus', 256),
('Oppo Find X6 Pro', 980, 'Oppo', 512),
('Sony Xperia 1 V', 1200, 'Sony', 256);


INSERT INTO telefonlar (model, narxi, ishlab_chiqaruvchi, xotira) VALUES
('iPhone 14', 1200.00, 'Apple', 128),
('Galaxy S22', 1000.00, 'Samsung', 256),
('Pixel 7', 900.00, 'Google', 128),
('Xiaomi 12', 800.00, 'Xiaomi', 256),
('OnePlus 10', 850.00, 'OnePlus', 128);




INSERT INTO mijozlar (ism, familiya, telefon) VALUES
('Ali', 'Karimov', '+998901234567'),
('Bekzod', 'Nurmatov', '+998902345678'),
('Shahnoza', 'Olimova', '+998903456789'),
('Dilshod', 'Rajabov', '+998904567890'),
('Malika', 'Rustamova', '+998905678901');

INSERT INTO xodimlar (ism, familiya, lavozimi) VALUES
('Javlon', 'Xolmatov', 'Sotuvchi'),
('Aziz', 'Turgunov', 'Sotuvchi'),
('Nodir', 'Mahmudov', 'Menejer'),
('Madina', 'Solieva', 'Sotuvchi'),
('Sardor', 'Rahimov', 'Admin');

INSERT INTO sotuvlar (telefon_id, mijoz_id, xodim_id, miqdori, umumiy_narx) VALUES
(1, 1, 1, 1, 1200.00),
(2, 2, 2, 2, 2000.00),
(3, 3, 3, 1, 900.00),
(4, 4, 4, 3, 2400.00),
(5, 5, 5, 1, 850.00);



-- 1

SELECT Ishlab_chiqaruvchi, AVG(narxi) AS Ortacha_Narx 
FROM telefonlar 
GROUP BY ishlab_chiqaruvchi;



-- 2

SELECT mijozlar.ism, mijozlar.familiya, COUNT(sotuvlar.telefon_id) AS sotib_olgan_telefonlar_soni 
FROM mijozlar 
JOIN sotuvlar ON mijozlar.mijoz_id = sotuvlar.mijoz_id 
GROUP BY mijozlar.ism, mijozlar.familiya;




-- 3

SELECT xodimlar.ism, xodimlar.familiya, COUNT(sotuvlar.sotuv_id) AS jami_sotuvlar 
FROM xodimlar 
JOIN sotuvlar ON xodimlar.xodim_id = sotuvlar.xodim_id 
GROUP BY xodimlar.ism, xodimlar.familiya 
ORDER BY jami_sotuvlar DESC 
LIMIT 1;


-- 4

SELECT * FROM telefonlar 
ORDER BY narxi 
OFFSET 4 LIMIT 6;


-- 5

SELECT ishlab_chiqaruvchi, 
       AVG(narxi) AS ortacha_narx, 
       MAX(narxi) AS eng_qimmat, 
       MIN(narxi) AS eng_arzon 
FROM telefonlar 
GROUP BY ishlab_chiqaruvchi;



-- 6

SELECT * FROM telefonlar 
WHERE (ishlab_chiqaruvchi, xotira) IN 
      (SELECT ishlab_chiqaruvchi, MAX(xotira) 
       FROM telefonlar 
       GROUP BY ishlab_chiqaruvchi);



-- 7

SELECT telefonlar.model, 
       AVG(sotuvlar.umumiy_narx / sotuvlar.miqdori) AS ortacha_narx, 
       COUNT(sotuvlar.sotuv_id) AS jami_sotuv_soni 
FROM telefonlar 
JOIN sotuvlar ON telefonlar.telefon_id = sotuvlar.telefon_id 
GROUP BY telefonlar.model 
ORDER BY jami_sotuv_soni DESC;