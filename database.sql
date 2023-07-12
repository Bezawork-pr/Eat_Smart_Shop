CREATE DATABASE Eat_Smart_Shop;
USE Eat_Smart_Shop;
CREATE TABLE User (
  PersonId int NOT NULL,
  FirstName varchar(255) NOT NULL,
  LastName varchar(255) NOT NULL,
  ProductId int NOT NULL,
  OrderId int NOT NULL,
  PRIMARY KEY (PersonId),
  FOREIGN KEY (ProductId) REFERENCES Product(ProductId),
  FOREIGN KEY (OrderId) REFERENCES Orders(OrderId)
);
CREATE TABLE Product (
  ProductId int NOT NULL,
  ProductName varchar(255) NOT NULL,
  Quantity int NOT NULL,
  PRIMARY KEY (ProductId)
);
CREATE TABLE Orders (
  OrderId int NOT NULL,
  ProductId int NOT NULL,
  OrderRecipt int NOT NULL,
  PRIMARY KEY (OrderId),
  FOREIGN KEY (ProductId) REFERENCES Product(ProductId)
);

