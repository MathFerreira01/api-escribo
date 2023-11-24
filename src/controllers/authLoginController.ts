import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    // Validations
    if (!email || !senha) {
      return res.status(401).json({ msg: 'Email e senha são obrigatórios!' });
    }

    // Verificar se o usuário existe
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado!' });
    }

    // Verificar se a senha está correta
    const checkPassword = await bcrypt.compare(senha, user.passwordHash);

    if (!checkPassword) {
      return res.status(401).json({ msg: 'Senha inválida' });
    }

    // Atualizar a última data de login
    user.ultimo_login = new Date();
    await user.save();

    // Gerar token JWT
    const secret = process.env.SECRET || '';
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret,
      { expiresIn: '30m' }
    );

    // Formatar a resposta
    const output = {
      id: user._id,
      data_criacao: user.createdAt,
      data_atualizacao: user.updatedAt,
      ultimo_login: user.ultimo_login,
      token: token,
    };

    res.status(200).json(output);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro interno do servidor' });
  }
}
