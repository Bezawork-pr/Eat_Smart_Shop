const uuid = require("uuid");

const express = require("express");

const router = express.Router();

const PATH = require("path");
const internal = require("stream");
const { getUsers, createUser, getUser, deleteUser, updateUser } = require('../controllers/users.js')

router.get("/", getUsers);

router.post("/", createUser);

router.get("/:id", getUser);

router.delete("/:id", deleteUser);

router.patch("/:id", updateUser );
module.exports = router;
