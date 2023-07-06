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
  console.log(array);
  //res.render(PATH.join(__dirname + "/../public/login"));
  res.send(array);
});

router.post("/", (req, res) => {
  let userDetail = req.body;
  console.log(userDetail[0].firstName);
  array.push(userDetail);
  //res.render(PATH.join(__dirname + "/../public/login"));
  res.send(`User added ${userDetail[0].firstName} `);
  //console.log(req.body);
  //res.send("Got it");
});

module.exports = router;
