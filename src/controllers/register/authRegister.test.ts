import { Request, Response } from 'express';
import User from '../../models/userModel';
import { register } from './authRegisterController';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../models/userModel');

describe('Register Function', () => {
  let req: Partial<Request>;
  let res: Response;
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

  it('should return 422 if any field is missing', async () => {
    await register(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(mockJson).toHaveBeenCalledWith({ msg: 'Todos os campos são obrigatórios!' });
  });

  it('should return 422 if email already exists', async () => {
    req.body = {
      nome: 'Test User',
      email: 'existing@example.com',
      senha: 'password',
      telefones: [{ numero: '123456789', ddd: '11' }],
    };
    (User.findOne as jest.Mock).mockResolvedValueOnce({ email: 'existing@example.com' });

    await register(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(mockJson).toHaveBeenCalledWith({ msg: 'E-mail já existente!' });
  });
});
