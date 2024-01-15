// var jwt = require("jsonwebtoken");
// export const verifyToken = (req, res, next) => {
//   const token = req.headers["x-access-token"];
//   console.log(token);
//   if (!token) {
//     res.send("We need a token");
//   } else {
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         console.log("you failed authenticate");
//         res.json({ auth: false, message: "you failed authenticate" });
//       } else {
//         req.userId = decoded.id;
//         console.log("you authenticated");
//         next();
//       }
//     });
//   }
// };
