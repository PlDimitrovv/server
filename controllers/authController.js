const { register, login } = require("../services/userService");


const authController = require("express").Router();

authController.post("/register", async (req, res) => {

  const { username, email, password, repass } = req.body
  
  try {

    const user = await register(email, username, password)

    res.status(201).json(user)
  } catch (err) {

    res.status(400).json({ error: err.message })

  }
  res.end()
})

authController.post("/login", async (req, res) => {

  const { email, password } = req.body

  try {
    const user = await login(email, password)
    res.cookie("token", user.accessToken)
    res.status(201).json(user)
  } catch (err) {

    res.status(400).json({ error: err.message })

  }
  res.end()
});

authController.get('/logout', (req, res) => {
  res.clearCookie('token')
})

module.exports = authController;
