const uuid = require("uuid");
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
