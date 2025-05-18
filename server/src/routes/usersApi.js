const express = require("express")

const userControllers = require("../controllers/userController");
const { VerifyToken } = require("../middlewares/verifyToken");
const { AuthrizedRoles } = require("../middlewares/roleMiddleware");




const router = express.Router();


router.post("/registration", userControllers.Registration);
router.post("/login", userControllers.Login);

// only admin can access this router

router.get("/product1", VerifyToken, AuthrizedRoles("admin"), (req, res) => {
    res.send({ message: "Only admin can access this product1" })
})


//Both admin & manager can access this router
router.get("/product2", VerifyToken, AuthrizedRoles("admin", "manager"), (req, res) => {
    res.send({ message: "Only admin & manager can access product no 2" })
})


// All Three can access this router
router.get("/product3", VerifyToken, AuthrizedRoles("admin", "manager", "user"), (req, res) => {
    res.send({ message: "All three can access product no 3" })
})








module.exports = router;