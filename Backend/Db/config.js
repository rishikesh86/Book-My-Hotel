const mongoose = require("mongoose");
mongoose
  .connect(process.env.MongoDb_Url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connecting database successfully");
  })
  .catch((err) => {
    console.log("connection failed with db", err);
  });
