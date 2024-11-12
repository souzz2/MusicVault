import { Request, Response } from "express";
import {
  insertUserData as insertUser,
  getUserByEmailData as getUserByEmail,
} from "../data/dataUsers";
import { generateToken } from "../services/authenticator";
import { hash } from "../services/hashManager";
import { generatedId } from "../services/idGenerator";
import { compare } from "bcrypt";
import { user } from "../data/dataUsers";

export const signup = async (req: Request, res: Response) => {
  try {
    const { nickname, emailuser, password, role } = req.body;

    if (!nickname || !emailuser || !password || !role) {
      throw new Error(
        'Preencha os campos "name","nickname", "email" e "password"'
      );
    }
    /*ciar get email para validar usuário existente*/
    const iduser: string = generatedId();

    const cypherPassword = await hash(password);

    await insertUser({
      iduser,
      nickname,
      emailuser,
      password: cypherPassword,
      role,
    });

    const token: string = generateToken({
      iduser,
      role: role,
    });

    res.status(201).send({
      message: "Usuário criado!",
      token,
    });
  } catch (error) {
    res.status(404).json({ message: "Erro ao se registrar.", error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { emailuser, password } = req.body;

    if (!emailuser || !password) {
      throw new Error("'email' e 'senha' são obrigatórios");
    }

    const user: user = await getUserByEmail(emailuser);

    if (!user) {
      throw new Error("Usuário não encontrado ou senha incorreta");
    }

    const passwordIsCorrect: boolean = await compare(password, user.password);

    if (!passwordIsCorrect) {
      throw new Error("Usuário não encontrado ou senha incorreta");
    }

    const token: string = generateToken({
      iduser: user.iduser,
      role: user.role,
    });

    res.send({
      message: "Usuário logado!",
      token,
    });
  } catch (error) {
    res.status(400).json({ message: "Não foi possível realizar o login" });
  }
};
