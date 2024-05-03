const express = require("express");
const router = express.Router();

const { getCharity, addCharity, removeCharity } = require("../controllers/charityController");
const { getStore, addStore, removeStore } = require("../controllers/storeController");
const { register, login, logout, getUsers, addToCart, deleteUser, getIdFromCookie } = require("../controllers/userController");
const { getAllProducts, createProduct, getProductById, getProductsForStore, updateProduct, deleteProduct } = require("../controllers/productController");
const { getAllCharityList, addToCharityList, getFromCharityListById, getMembersForCharity,  updateCharityList, deleteCharityListMember } = require("../controllers/charityListController");
const {submitOrder, getOrders, getOrderById, updateOrder, deleteOrder} = require("../controllers/orderController");


router.get("/", (req, res) => {
  console.log("what's up dawg ?!");
});

// Routes for stores
router.get("/api/getStore", getStore);
router.post("/api/addStore", addStore);
router.delete("/api/removeStore/:id", removeStore);

// Routes for charities
router.get("/api/getCharity", getCharity);
router.post("/api/addCharity", addCharity);
router.delete("/api/removeCharity/:id", removeCharity);

// Routes for user operations
router.post("/api/register", register);
router.post("/api/login", login);
router.get("/api/logout", logout);
router.get("/api/getUsers", getUsers);
router.post("/api/cart", addToCart);
router.delete("/api/deleteUser", deleteUser);
router.get("/api/user-id", getIdFromCookie);

//Routes for Product operations
router.get("/api/getAllProducts", getAllProducts);
router.post("/api/createProduct", createProduct);
router.get("/api/getProductById/:id", getProductById);
router.get("api/stores/:storeId/products", getProductsForStore);
router.put("/api/updateProduct", updateProduct);
router.delete("/api/deleteProduct/:id", deleteProduct);

//Routes for Charity List operations
router.get("/api/getAllCharityList", getAllCharityList);
router.post("/api/addToCharityList", addToCharityList);
router.get("/api/getFromCharityListById/:id", getFromCharityListById);
router.get("api/charities/:charityId/charityMembers", getMembersForCharity);
router.put("/api/updateCharityList", updateCharityList);
router.delete("/api/deleteCharityListMember/:id", deleteCharityListMember);

//Routes for order operations
router.post("/api/submitOrder", submitOrder);
router.get("/api/getOrders", getOrders);
router.get("/api/getOrderById/:id", getOrderById);
router.put("/api/updateOrder/:id", updateOrder);
router.delete("/api/deleteOrder/:id", deleteOrder);


module.exports = router;
//npm run dev to connect to server
