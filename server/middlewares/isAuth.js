const User = require("../models/user.model");
const isAuth = (req, res, next) => {
  const body_token = req.body.token;
  const header_token = req.headers.token;
  console.log(req.body.token);
  console.log(req.headers.token);
  if (body_token || header_token) {
    console.log(body_token || header_token);
    const token = body_token || header_token;

    User.find({ token })
      .then(user => {
        if (user.length !== 0 && user) {
        //   console.log(req);
        //   res.status(200).json({ logged: true });
          next();
        }
      else{
            res.status(200).json({
              message: "Error in hitting route"
            });
      }
      })
      .catch(err => {
        console.log("error auth");
        res.status(501).json({ logged: false });
      });
  }
};
module.exports = isAuth;
