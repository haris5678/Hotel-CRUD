var express = require("express");
var router = express.Router();
var hotelController = require("../controllers/hotelController");
var jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log(token);
  if (!token) {
    res.send("We need a token");
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log("you failed authenticate");
        res.json({ auth: false, message: "you failed authenticate" });
      } else {
        req.userId = decoded.id;
        console.log("you authenticated");
        next();
      }
    });
  }
};

//Route for creating registration OTP
router.post("/create", hotelController.createHotel);
router.get("/getHotel", hotelController.getHotel);
router.patch("/updateHotel", hotelController.updateHotel);
router.delete("/deleteHotel", hotelController.deleteHotel);

module.exports = router;
