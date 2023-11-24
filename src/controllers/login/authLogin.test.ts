import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { login } from './authLoginController';
import User from '../../models/userModel';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../models/userModel');

describe('Login Function', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let mockJson: jest.Mock;

  beforeEach(() => {
    req = {
      body: {},
    };
    mockJson = jest.fn();
    res = {
      status: jest.fn(() => ({ json: mockJson })) as any,
    } as Response; 
  });

  it('should return 401 if email or password is missing', async () => {
    await login(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(mockJson).toHaveBeenCalledWith({ msg: 'Email e senha são obrigatórios!' });
  });

  it('should return 404 if user is not found', async () => {
    req.body = { email: 'nonexistent@example.com', senha: 'password' };
    (User.findOne as jest.Mock).mockResolvedValueOnce(null);

    await login(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({ msg: 'Usuário não encontrado!' });
  });

  it('should return 401 if password is incorrect', async () => {
    req.body = { email: 'existing@example.com', senha: 'incorrectpassword' };
    (User.findOne as jest.Mock).mockResolvedValueOnce({
      passwordHash: 'hashedpassword',
    });
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

    await login(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(mockJson).toHaveBeenCalledWith({ msg: 'Senha inválida' });
  });
});
