import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '@models/Users'

function generateToken(params = {}) {
  return jwt.sign(params, process.env.SECRET, {
    // expiresIn: 48000 
  })
}

class UserController {
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body

    try {
      let newUser = await User.findOne({ email })

      if (!newUser) {
        const encryptedPassword = bcrypt.hashSync(password, 10)

        newUser = await User.create({
          name,
          email,
          password: encryptedPassword
        })

        return response.status(201).json({
          id: newUser.get('_id'),
          name: newUser.get('name'),
          email: newUser.get('email'),
          token: generateToken({ id: newUser.get('id') })
        })
      } else {
        return response.status(409).json({ error: 'Usuário já cadastrado' })
      }
    } catch (error) {
      response.status(500).json({ error: 'Erro no servidor. Tente novamente!' })
    }
  }

  async show(_: Request, response: Response) {
    try {
      const users = await User.find({}).select('-password')

      return response.status(200).json(users)
    } catch (error) {
      response.status(500).json({ error: 'Erro no servidor. Tente novamente!' })
    }
  }

  async get(request: Request, response: Response) {
    const userEmail = request.get('userEmail')

    try {
      const user = await User.findOne({ email: userEmail }).select('-password')

      if (user) {
        return response.status(200).json(user)
      } else {
        return response.status(404).json({ error: 'Usuário não encontrado' })
      }

    } catch (error) {
      response.status(500).json({ error: 'Erro no servidor. Tente novamente!' })
    }
  }

  async update(request: Request, response: Response) {
    try {

    } catch (error) {
      response.status(500).json({ error: 'Erro no servidor. Tente novamente!' })
    }
  }

  async delete(request: Request, response: Response) {
    try {

    } catch (error) {
      response.status(500).json({ error: 'Erro no servidor. Tente novamente!' })
    }
  }
}

export default UserController