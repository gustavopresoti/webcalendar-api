import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import User from '@models/Users'

function generateToken(params = {}) {
  return jwt.sign(params, process.env.SECRET, {
    // expiresIn: 48000
  })
}

class AuthController {
  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    try {
      const user = await User.findOne({ email })

      if (user && bcrypt.compareSync(password, user.get('password'))) {
        return response.status(202).json({
          auth: true,
          token: generateToken({})
        })
      } else {
        return response.status(404).json({ error: 'Email ou senha inválidos' })
      }
    } catch (error) {
      response.status(500).json({ error: "Erro no servidor. Tente novamente!" })
    }
  }

  async passwordRecovery(request: Request, response: Response) {
    try {

    } catch (error) {
      response.status(500).json({ error: "Erro no servidor. Tente novamente!" })
    }
  }
}

export default AuthController