import { Request, Response } from "express";
import { UserBusiness } from "../business/userBusiness";
import { generatedId } from "../services/idGenerator";

export class UserController {
  UserBusiness = new UserBusiness();
  signup = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nickname, emailuser, password } = req.body;

      if (!nickname || !emailuser || !password) {
        res.status(400).json({ message: "Todos os campos são obrigatórios" });
        return;
      }

      if (!emailuser.includes("@")) {
        res.status(400).json({ message: "Email inválido" });
        return;
      }

      if (password.length < 6) {
        res.status(400).json({ message: "A senha deve ter pelo menos 6 caracteres" });
        return;
      }

      const token = await this.UserBusiness.signupUser({ nickname, emailuser, password });
      res.status(201).send(token);
    } catch (error: any) {
      res.status(400).json({
        message: "Erro ao se registrar",
        error: error.message,
      });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { emailuser, password } = req.body;
      const result = await this.UserBusiness.loginUser({
        emailuser,
        password,
      });
      res.send(result);
    } catch (error) {
      res.status(400).json({
        message: "Não foi possível realizar o login",
      });
    }
  };

  getUsers = async (req: Request, res: Response) => {
    try {
      const user = await this.UserBusiness.getUsers();
      if (!user.length) {
        throw new Error("Não há usuários disponíveis no momento.");
      }

      res.status(200).json(user);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Erro ao buscar usuários.", error: error.message });
    }
  };
}



