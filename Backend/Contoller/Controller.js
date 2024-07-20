const user = require("../Model/userCredential");
const JWT = require("jsonwebtoken");
const secretkey = process.env.JWT_SECRET_KEY;
//userRegistration
const userRegistration = async (req, res) => {
  try {
    const userData = req.body;
    const userResponse = await user.insertMany(userData);
    if (Object.keys(userResponse).length > 0) {
      res.status(200).send({ message: "user register successfully" });
    }
  } catch (err) {
    console.log("error", err);
    res.status(500).send({ ErrorMessage: `${err} Internal Server Error` });
  }
};

//user login

const userLogin = async (req, res) => {
  try {
    const userType = req?.body?.contactDetails?.userType;
    const phonenumber = req?.body?.contactDetails?.phonenumber;
    const password = req.body.contactDetails.password;
    const email = req?.body?.contactDetails?.email;
    const userResponse = await user.findOne({
      $or: [
        {
          "contactDetails.userType": userType,
          "contactDetails.email": email,
          "contactDetails.password": password,
        },
        {
          "contactDetails.userType": userType,
          "contactDetails.phonenumber": phonenumber,
          "contactDetails.password": password,
        },
      ],
    });
    if (userResponse !== null && Object.keys(userResponse).length > 0) {
      JWT.sign(
        { userResponse },
        secretkey,
        { expiresIn: "24h" },
        (err, token) => {
          if (err) {
            res.status(500).send({ errorMessage: `Internal server error` });
          }
          if (token) {
            res.status(200).send({
              userId: userResponse?._id,
              message: "user login successfully",
              token: token,
            });
          }
        }
      );
    } else if (userResponse === null) {
      res.status(401).send({ errorMessage: "user not found" });
    }
  } catch (err) {
    res.status(500).send({ errorMessage: `Internal Server Error` });
  }
};

//get User

const getUser = async (req, res) => {
  try {
    console.log(req.params);
    const id = req?.params?.id;
    const userResponse = await user.findById({ _id: id });
    res.status(200).send(userResponse);
  } catch (err) {
    console.log(err);
    res.status(500).send({ errorMessage: "Internal Server Error" });
  }
};

module.exports = {
  userRegistration,
  userLogin,
  getUser,
};
