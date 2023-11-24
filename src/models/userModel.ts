import mongoose, { Document, Schema } from 'mongoose';

interface ITelefone {
  numero: string;
  ddd: string;
}

interface IUser extends Document {
  nome: string;
  email: string;
  passwordHash: string;
  telefones: ITelefone[];
  createdAt: Date;
  updatedAt: Date;
  ultimo_login?: Date;
}

const userSchema = new Schema<IUser>(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    telefones: [{ numero: String, ddd: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    ultimo_login: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;