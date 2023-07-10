const uuid = require("uuid");
const express = require("express");

const getUsers = (req, res) => {
  res.send(array);
};

const createUser = (req, res) => {
  const id = uuid.v4();
  let userDetail = req.body[0];
  const userDetailwithUniqueID = { id: id, ...userDetail };
  array.push(userDetailwithUniqueID);
  res.send(`User added ${userDetail}`);
};

const getUser = (req, res) => {
  const userID = req.params.id;

  const findUser = array.find((element) => element.id === userID);
  res.send(findUser);
};

const deleteUser = (req, res) => {
  const userID = req.params.id;
  array = array.filter((item) => item.id !== userID);
  res.send(`Deleted`);
};

const patchUser = (req, res) => {
  const userID = req.params.id;
  const findUser = array.find((element) => element.id === userID);

  const { firstName, lastName, userName, delivery, orders, basket } =
    req.body[0];
  if (firstName) findUser.firstName = firstName;
  if (lastName) findUser.lastName = lastName;
  if (delivery) findUser.delivery = delivery;
  if (userName) findUser.userName = userName;
  if (orders) {
    const { productName } = orders.products[0];
    findUser.orders.products[0].productName = productName;
  }
  if (basket) {
    const { productName } = basket.products[0];
    findUser.basket.products[0].productName = productName;
  }
  res.send("Got it");
};
