import User from "../modles/userModel.js"
import generateToken from "../utils/generatetoken.js"


const registerUser = async (req,res) =>{
    const {name,email,password} = req.body 

const userExists = await User.findOne({email})
if(userExists){
     return res.status(400).json({ message: "User Already Exists" });
    
}
const user = await User.create({name,email,password})
if(user){
    res.status(201).json({
        _id : user._id,
        name: user.name,
        email: user.email,
        isAdmin : user.isAdmin,
        token : generateToken(user._id)
    })
}else{
   return res.status(400).json({ message: "Invalid Credential" });
}
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      // Send the response with user data and token
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      // Incorrect credentials
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ message: "Server error" });
  }
};

const getUserProfile = async(req,res) => {
    const user = await User.findById(req.user._id)
    if(user){
        res.json({
            _id : user._id,
            email : user.email,
            password : user.password,
            isAdmin : user.isAdmin,
        })
    }else{
        res.status(404);
        throw Error("User Not Found")
    }
}
export {getUserProfile, registerUser,loginUser,}
