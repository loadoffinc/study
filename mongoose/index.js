const mongoose = require('mongoose',);

const uri = ""

const Schema = mongoose.Schema;
const user = new Schema({
  _id: Number,
  user_id: String,
  password: String
});


(async () => {
  console.log("BEFORE CONNECT")
  await mongoose.connect(uri)
  console.log("AFTER CONNECT")

  const User = mongoose.model('User', user, 'user')
  const res = await User.findOne()
  console.log(res)
  await mongoose.disconnect()
})()
