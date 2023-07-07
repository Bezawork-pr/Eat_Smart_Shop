const uuid = require("uuid");

const express = require("express");

const router = express.Router();

const PATH = require("path");

const array = [
  {
    id: 1,
    firstName: "Emanuel",
    lastName: "Abraham",
    userName: "Emanuel",
    delivery: "Ethiopia",
    orders: {
      products: [
        {
          productId: 1,
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
  let userDetail = req.body;
  const userDetailwithUniqueID = { id: id, ...userDetail };
  array.push(userDetailwithUniqueID);
  res.send(`User added ${userDetail}`);
});

router.get("/:id", (req, res) => {
  const userID = req.params.id;
  const findUser = array.find((userID) => userID === id);
  res.send("got it");
});
module.exports = router;
