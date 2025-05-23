const Menu = require("../models/MenuModel");

// @desc    Get all menus
// @route   GET /api/v1/menus
// @access  Public
exports.getMenus = async (req, res, next) => {
  try {
    const menus = await Menu.find();
    return res.status(200).json({
      success: true,
      count: menus.length,
      data: menus,
    });
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json({ success: false });
  }
};

// @desc    Get single menu
// @route   GET /api/v1/menus/:id
// @access  Public
exports.getMenu = async (req, res, next) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: menu,
    });
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json({ success: false });
  }
};

// @desc    Create new menu
// @route   POST /api/v1/menus
// @access  Private
exports.createMenu = async (req, res, next) => {
  try {
    const menu = await Menu.create(req.body);
    return res.status(201).json({
      success: true,
      data: menu,
    });
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json({ success: false });
  }
};
