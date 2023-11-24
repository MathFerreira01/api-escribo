import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

export const register = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, telefones } = req.body;

    // Validations
    if (!nome || !email || !senha || !telefones || telefones.length === 0) {
      return res.status(422).json({ msg: 'Todos os campos são obrigatórios!' });
    }

    // Check if user exists
    const emailExists = await User.findOne({ email: email });

    if (emailExists) {
      return res.status(422).json({ msg: 'E-mail já existente!' });
    }

    // Create password hash
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(senha, salt);

    // Create user
    const user = new User({
      nome: nome,
      email: email,
      passwordHash: passwordHash,
      telefones: telefones,
    });

    await user.save();

    // Generate JWT token
    const secret = process.env.SECRET || '';
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret,
      { expiresIn: '30m' }
    );

    // Format output
    const output = {
      id: user._id,
      data_criacao: user.createdAt,
      data_atualizacao: user.updatedAt,
      ultimo_login: user.ultimo_login,
      token: token,
    };

    res.status(201).json(output);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro interno do servidor' });
  }
}

