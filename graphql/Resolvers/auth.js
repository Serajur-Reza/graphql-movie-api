const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  createUser: async (args) =>{

    try{
      const existingUser = await User.findOne({email: args.userInput.email})

      if(exisgingUser){
        throw new Error("user already exist")
      }

      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });

      const result = await user.save()
      return {
        ...result._doc,
        password: null,
        _id: result.id
      }
    }

    catch(err){
      console.log(err.message)
    }
  },

  login: async({email, password})=>{
    const user = await User.findOne({ email });

    if(!user){
      throw new Error("user does not exist")
    }

    const matchedPassword = await bcrypt.compare(password, user.password)

    if(!matchedPassword){
      throw new Error("Password does not match")
    }

    const token = jwt.sign({userId: user.id, email: user.email}, "somesecretkey",{
      expiresIn: '1h'
    })

    return {userId: user.id, token: token, tokenExpiration: 1}
  }
}