const uuid = require("uuid");

const express = require("express");

const router = express.Router();

const PATH = require("path");
const internal = require("stream");

let array = [
  {
    id: uuid.v4(),
    firstName: "Emanuel",
    lastName: "Abraham",
    userName: "Emanuel",
    delivery: "Ethiopia",
    orders: {
      products: [
        {
          productId: uuid.v4(),
          productName: "BearMug",
          receiptNumber: 1,
        },
      ],
    },
    basket: {
      products: [
        {
          productId: 2,
          productName: "T-shirt",
        },
      ],
    },
  },
];

router.get("/", (req, res) => {
  res.send(array);
});

router.post("/", (req, res) => {
  const id = uuid.v4();
  let userDetail = req.body[0];
  const userDetailwithUniqueID = { id: id, ...userDetail };
  array.push(userDetailwithUniqueID);
  res.send(`User added ${userDetail}`);
});

router.get("/:id", (req, res) => {
  const userID = req.params.id;

  const findUser = array.find((element) => element.id === userID);
  res.send(findUser);
});

router.delete("/:id", (req, res) => {
  const userID = req.params.id;
  array = array.filter((item) => item.id !== userID);
  res.send(`Deleted`);
});

router.patch("/:id", (req, res) => {
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
});
module.exports = router;
