DROP DATABASE bamazon_db;

CREATE DATABASE IF NOT EXISTS bamazon_db;

USE bamazon_db;


CREATE TABLE IF NOT EXISTS products (
-- create an id item_id for each item--
item_id INTEGER (10) auto_increment primary key,
-- create product_name fpr each product--
product_name VARCHAR (50) NOT NULL,
-- department_name
department_name VARCHAR (50),
-- price (cost to customer)--
price DECIMAL(5,2),
-- stock_quantity (quantity available to customer)--
stock_quantity INTEGER (10)
);

INSERT INTO products 
(product_name, department_name, price, stock_quantity)
VALUES
('paper_500', 'office', 2.99, 50),
('blue_pens', 'office', 1.99, 34),
('pwderd_milk', 'dry_goods', 3.99, 17),
('paper_college','office', 1.49, 56),
('veg_oil_32oz','dry_goods', 3.89, 45),
('razors_4ct','beauty',12.99, 28),
('mouth_wash','beauty',6.99, 28),
('vitamin_c', 'pharmacy', 8.99, 8),
('tylenol', 'pharmacy', 2.99, 8),
('black_pens','office', 1.89, 37);

SELECT DISTINCT * FROM products

ORDER BY item_id;




