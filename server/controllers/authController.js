const User = require("../models/UserModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { secret } = require("../config")


const generateAccessToken = id => {
  const payload = {
    id,
  }

  return jwt.sign(payload, secret, { expiresIn: "24h" })
}

class authController {
  async registration(req, res) {
    try {
      const { username, email, password } =
        req.body

      console.log( username, email, password)

      const candidate = await User.findOne({ email })
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Користувач з таким email уже існує" })
      }
      const hashPassword = bcrypt.hashSync(password, 7)
   
      const user = new User({
        username,
        email,
        password: hashPassword,

        //roles: [userRole._id],
      })

      await user.save()
      
      return res.json({ message: "Користувач успішно зареєстрований" })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "Registration error" })
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user) {
        return res
          .status(400)
          .json({
            message: `Email: Користувач з email: ${email} не знайдений`,
          })
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res
          .status(400)
          .json({ message: `Password: Введений неправильний пароль` })
      }

      const token = generateAccessToken(user._id)
      
      return res.json({ token: token, id: user._id })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "Login error" })
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find()

      const usersList = users.map(user => {
        return {
          id: user._id,
          name: user.username,
        }
      })

      res.json(usersList)
    } catch (e) {
      res.status(400).json({ message: "Users Error" })
    }
  }

  async getIdByToken(req, res) {
    try {
      const token = req.query.token

      console.log("here")
      console.log(token)
      if (!token) {
        return res.status(403).json({ message: "Користувач не авторизований" })
      }
      const { id: userIdInBrowser } = jwt.verify(token, secret)

      return res.json({ id: userIdInBrowser })
    } catch (e) {
      res.status(400).json({ message: "Помилка пошуку id" })
    }
  }

  async getUser(req, res) {
    try {
      console.log("role: " + req.tokenRoles)

      const user = await User.findById(req.params.id)
      const roles = user.roles
      const listOfUserRoles = []

      for (const role of roles) {
        const roleById = await Role.findOne({ _id: role })

        listOfUserRoles.push(roleById.value)
      }

      let isAdmin = false
      if (req.tokenRoles.includes("Admin")) {
        isAdmin = true
      }
      
      return res.json({
        user: user,
        userRoles: listOfUserRoles,
        admin: isAdmin,
      })
    } catch (e) {
      res
        .status(400)
        .json({ message: "Такого користувача не знайдено в системі" })
    }
  }

  async updateUser(req, res) {
    try {
      const { username, phone, id, faculty, birthday, role } = req.body
      const userRole = await Role.findOne({ value: role })

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { username, phone, id, faculty, birthday, roles: [userRole._id] },
        {
          new: true,
          runValidators: true,
          context: "query",
        },
      )

      res.status(200).json({ success: true, data: user })
    } catch (e) {
      res.status(400).json({ message: "Update error" })
    }
  }

  async deleteUser(req, res) {
    try {
      const id = req.params.id
      if (!id) {
        throw new Error("not found id")
      }
      await User.findByIdAndDelete(id)
      
      return res.json({ message: "Користувач успішно видалений" })
    } catch (e) {
      res.status(400).json({ message: "Delete error" })
    }
  }
}

module.exports = new authController()
