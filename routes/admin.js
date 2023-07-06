const express = require("express");
const router = express.Router()
router.get("/", (req, res) => {
  res.send('User main page')
})

router.get("/profile", (req, res) => {
  res.send('Users profile page')
})

router.get("/cart", (req, res) =>  {
  res.send('Users cart')
})

module.exports = router