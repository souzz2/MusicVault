import { userData } from "../data/dataUsers";
import { generateToken, payload } from "../services/authenticator";
import { hash, compare } from "../services/hashManager";
import { generatedId } from "../services/idGenerator";
import { user } from "../types/typeUsers";

export class UserBusiness {
  userData = new userData();
  signupUser = async ({ nickname, emailuser, password }: user) => {
    if (!nickname || !emailuser || !password) {
      throw new Error(
        'Preencha os campos "nickname", "emailuser" e "password"'
      );
    }

    const existingUser = await this.userData.getUserByEmailData(emailuser);
    if (existingUser) {
      throw new Error("Usuário já existe com este e-mail.");
    }

    const iduser = generatedId();
    const cypherPassword = await hash(password);

    await this.userData.insertUserData({
      iduser,
      nickname,
      emailuser,
      password: cypherPassword
    });

    const token = generateToken({ iduser });
    return { message: "Usuário criado!", token };
  };

  loginUser = async ({
    emailuser,
    password,
  }: {
    emailuser: string;
    password: string;
  }) => {
    try {
      if (!emailuser || !password) {
        throw new Error("'emailuser' e 'password' são obrigatórios");
      }

      const userFromDb = await this.userData.getUserByEmailData(emailuser);
      if (!userFromDb) {
        throw new Error("Usuário não encontrado ou senha incorreta");
      }

      const passwordIsCorrect = await compare(password, userFromDb.password);
      if (!passwordIsCorrect) {
        throw new Error("Usuário não encontrado ou senha incorreta");
      }

      const payload: payload = {
        iduser: userFromDb.iduser as string
      };
      const token = await generateToken(payload);
      return token;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  getUsers = async () => {
    try {
      const users = await this.userData.getUsers();
      if (users.length === 0) {
        throw new Error("Não há usuários disponíveis no momento.");
      }
      return users;
    } catch (error: any) {
      throw new Error(error.message || "Erro ao buscar usuários.");
    }
  };
}
