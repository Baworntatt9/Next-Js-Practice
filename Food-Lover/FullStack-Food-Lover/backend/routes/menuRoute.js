const express = require("express");
const {
  getMenus,
  getMenu,
  createMenu,
} = require("../controllers/menuController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getMenus).post(protect, createMenu);
router.route("/:id").get(getMenu);

module.exports = router;
