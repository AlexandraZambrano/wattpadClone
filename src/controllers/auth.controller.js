import bcrypt from "bcryptjs";
import User from "../Models/user.model.js";
import Jwt  from "jsonwebtoken";

//REGISTERS USER
export const register = async (req, res) => {

    const { uname, email, password } = req.body

    try {
      const existingUser = await User.findOne({ email: email });
      if(existingUser) {
        return res.status(400).json({ message: "The email already exists" })
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      const user = new User({
        uname,
        email,
        password: hashedPassword,
      });

      await user.save();

      res.status(200).json({ message: "You've been registered successfully" })

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

//LOGINS USER
export const login = async (req, res) => {

    //LOOKS UP FOR THE DATA THAT'S BEING PUT ON THE INPUTS
    const { uname, email, password } = req.body
    const user = await User.findOne({ email }) || await User.findOne({ uname });

    if(!user) {
        return res.status(400).json({message: "Incorrect Email or username"})
    } else {
        const validPassword = await bcrypt.compare(password, user.password)

        if(!validPassword) {
            return res.status(400).json({ message: "invalid password" })
        } 
        
        
    }
    const token = Jwt.sign({ _id:  user._id, username: user.uname, email: user.email}, process.env.TOKEN_SECRET)
    res.header("auth-token", token).json(token)

}