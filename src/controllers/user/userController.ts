import { Request, Response } from 'express';
import User from '../models/userModel';

export async function getUserById(req: Request, res: Response) {
  try {
    const id = req.params.id;

    // Verificar se o usuário existe
    const user = await User.findById(id, '-password');

    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado!' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro interno do servidor' });
  }
}
