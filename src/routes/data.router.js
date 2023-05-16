const { Router } = require('express')
const Data = require('../models/Data')

const router = Router()

router.post('/data', async (req, res) => {
  try {

    const data = await Data.findOne({name: "Karim Sharafutdinov"})
    res.json(data)

  } catch (error) {
    res.status(500).json({ message: "Something wrong, try later"})
  }
})

module.exports = router