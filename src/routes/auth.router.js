const { Router } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

const router = Router()

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body

    const condidate = await User.findOne({ email })

    if (condidate) {
      return res.status(500).json({ message: "This user already exist"})
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = new User({ email, password: hashedPassword})
    await user.save()

    res.status(200).json({ message: 'User created successful'})


  } catch (error) {
    res.status(500).json({ message: "Something wrong, try later"})
  }
})

module.exports = router