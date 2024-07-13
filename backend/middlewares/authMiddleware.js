const { User } = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

const isAdminAuthenticated = async(req, res, next) => {
    const token = req.cookies.adminToken;

    if(!token){
        return res.status(400).json({
            success: false,
            message: "Admin not authenticated!"
        });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);

    if(req.user.role !== "Admin"){
        return res.status(403).json({
            success: false,
            message: `${req.user.role} not authorized for this resource!`
        });
    }
    next();
};

const isUserAuthenticated = async(req, res, next) => {
    const token = req.cookies.userToken;

    if(!token){
        return res.status(400).json({
            success: false,
            message: "User not authenticated!"
        });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);

    if(req.user.role !== "User"){
        return res.status(403).json({
            success: false,
            message: `${req.user.role} not authorized for this resource!`
        });
    }
    next();
};

const isDriverAuthenticated = async(req, res, next) => {
    const token = req.cookies.driverToken;

    if(!token){
        return res.status(400).json({
            success: false,
            message: "Driver not authenticated!"
        });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);

    if(req.user.role !== "User"){
        return res.status(403).json({
            success: false,
            message: `${req.user.role} not authorized for this resource!`
        });
    }
    next();
};


module.exports = { isAdminAuthenticated, isUserAuthenticated, isDriverAuthenticated };



// const JWT = require("jsonwebtoken");
// //next is used to further execute the code
// module.exports = async (req, res, next) => {
//     try {
//         const token = req.headers["authorization"].split(" ")[1];

//         //let the token be lhfskubdfsiubfsu but the representation is like /Bearer lhfskubdfsiubfsu/ so ny [1] i.e the second element of the array will be the token i.e. lhfskubdfsiubfsu and the [0] i.e. first element will be Bearer

//         JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
//         if (err) {
//             return res.status(200).send({ message: "Auth Failed", success: false });
//         } else {
//             req.body.userId = decode.id;
//             next();
//         }
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(401).send({
//         message: "Auth failed",
//         success: false,
//         });
//     }
// };