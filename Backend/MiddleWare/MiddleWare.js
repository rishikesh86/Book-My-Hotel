const user = require("../Model/userCredential");
const JWT = require("jsonwebtoken");
const secretkey = process.env.JWT_SECRET_KEY;

//signupvalidation middleware

const signupValidation = async (req, res, next) => {
  try {
    const userData = req.body;
    if (userData) {
      const userType = userData?.contactDetails?.userType;
      const email = userData?.contactDetails?.email;
      const phonenumber = userData?.contactDetails?.phonenumber;
      const userResponse = await user.findOne({
        $or: [
          {
            "contactDetails.userType": userType,
            "contactDetails.email": email,
          },
          {
            "contactDetails.userType": userType,
            "contactDetails.phonenumber": phonenumber,
          },
        ],
      });
      if (userResponse !== null && Object.keys(userResponse).length > 0) {
        res
          .status(401)
          .send({ errorMessage: "user email or phonenumber already exist" });
      } else if (userResponse === null) {
        next();
      }
    } else {
      res.status(401).send({ errorMessage: "user not found" });
    }
  } catch (err) {
    res.status(500).send({ errorMessage: `Internal Server Error` });
  }
};

// jwt verified token

const JwtVerifiedToken = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization.split(" ")[1];
    if (token) {
      const verified = JWT.verify(token, secretkey);
      if (verified) {
        next();
      }
    }
  } catch (err) {
    if (err instanceof JWT.JsonWebTokenError) {
      res.status(500).send({ errorMessage: "Token is not valid" });
    }
    if (err instanceof JWT.TokenExpiredError) {
      res.status(500).send({ errorMessage: "Token is not valid" });
    } else {
      res.status(500).send({
        errorMessage: "Token is not valid",
      });
    }
  }
};

module.exports = {
  signupValidation,
  JwtVerifiedToken,
};
