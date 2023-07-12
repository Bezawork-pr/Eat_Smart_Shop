CREATE DATABASE Eat_Smart_Shop;
USE Eat_Smart_Shop;
CREATE TABLE User (
  PersonId int NOT NULL,
  FirstName varchar(255) NOT NULL,
  LastName varchar(255) NOT NULL,
  ProductDict JSON,
  OrderId int NOT NULL,
  FOREIGN KEY (OrderId) REFERENCES Orders(OrderId)
);
-- CREATE TABLE TotalPurchase (
--    TotalPurchasedID int NOT NULL,
--    TotalProductsPurchased int NOT NULL,
--    ProductId int NOT NULL,
--    OrderId int NOT NULL,
--    PRIMARY KEY (TotalPurchasedID),
--    FOREIGN KEY (ProductId) REFERENCES Product(ProductId),
--    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId)
-- );
CREATE TABLE Product (
  ProductId int NOT NULL,
  ProductName varchar(255) NOT NULL,
  InitialQuantity int NOT NULL,
  HowManyLeft int NOT NULL,
  PRIMARY KEY (ProductId)
);

CREATE TABLE Orders (
  OrderId int NOT NULL,
  ProductId int NOT NULL,
  HowManyOrdered int NOT NULL,
  OrderReceipt int NOT NULL,
  PRIMARY KEY (OrderId),
  FOREIGN KEY (ProductId) REFERENCES Product(ProductId)
);


INSERT INTO Product (ProductId, ProductName, InitialQuantity, HowManyLeft)
VALUES (1, "Iphone", 20, 20);

INSERT INTO Product (ProductId, ProductName, InitialQuantity, HowManyLeft)
VALUES (2, "Samsung", 50, 50);

INSERT INTO Product (ProductId, ProductName, InitialQuantity, HowManyLeft)
VALUES (3, "Vodaphone", 100, 100);

INSERT INTO Product (ProductId, ProductName, InitialQuantity, HowManyLeft)
VALUES (4, "Sony", 20, 20);

INSERT INTO Product (ProductId, ProductName, InitialQuantity, HowManyLeft)
VALUES (5, "Google", 40, 40);

INSERT INTO Product (ProductId, ProductName, InitialQuantity, HowManyLeft)
VALUES (6, "Xperia", 35, 35);

INSERT INTO Orders (OrderId, HowManyOrdered, ProductId, OrderReceipt)
VALUES(1, 1, 1, 1);

INSERT INTO Orders (OrderId, HowManyOrdered, ProductId, OrderReceipt)
VALUES(2, 5, 2, 2);

-- INSERT INTO TotalPurchase(TotalPurchasedID, TotalProductsPurchased, ProductId, OrderId)
-- VALUES(1, 6, )
INSERT INTO USER (PersonId, FirstName, LastName, ProductDict, OrderId)
Values(1, "John", "Doe", '["Iphone", "Samsung"]',  1);

INSERT INTO USER(ProductDict)
VALUES('["Iphone", "Samsung"]')
