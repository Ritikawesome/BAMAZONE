DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
item_id INT(10) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT (100) NOT NULL,
  PRIMARY KEY (item_id)
);


SELECT * FROM products; 

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tshirt", "clothes", 22.00, 10),
("Fan", "Electronics", 299.99, 8),
("Mixer", "Kitchen", 45.00, 15),
("Xbox", "Games", 299.99, 8),
("Bracelets", "Jewelry", 500.00, 20),
("iPhone 10 Case", "Electronics", 44.99, 100),
("Lamps", "Home", 50.99, 72),
("speakers ", "Automobile", 50.00, 107);