import { Request, Response } from "express";
import { UserBusinnes } from "../business/userBusiness";

export class UserController {
  UserBusinnes = new UserBusinnes();
  signup = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nickname, emailuser, password, role } = req.body;
      const result = await this.UserBusinnes.signupUser({
        nickname,
        emailuser,
        password,
        role,
      });
      res.status(201).send(result);
    } catch (error) {
      res.status(400).json({ message: "Erro ao se registrar" });
    }

    login = async (req: Request, res: Response): Promise<void> => {
      try {
        const { emailuser, password } = req.body;
        const result = await this.UserBusinnes.loginUser({
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
  };
}
