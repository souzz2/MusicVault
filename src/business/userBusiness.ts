import { userData } from "../data/dataUsers";
import { generateToken } from "../services/authenticator";
import { hash, compare } from "../services/hashManager";
import { generatedId } from "../services/idGenerator";
import { userRole, user } from "../types/typeUsers";

export class UserBusinnes {
  userData = new userData();
  signupUser = async ({ nickname, emailuser, password, role }: user) => {
    if (!nickname || !emailuser || !password || !role) {
      throw new Error(
        'Preencha os campos "nickname", "emailuser", "password" e "role"'
      );
    }

    if (!Object.values(userRole).includes(role)) {
      throw new Error(
        "O 'role' deve ser um dos valores: NORMAL, ADMIN, ARTISTA."
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
      password: cypherPassword,
      role,
    });

    const token = generateToken({ iduser, role });
    return { message: "Usuário criado!", token };
  };

  loginUser = async ({
    emailuser,
    password,
  }: {
    emailuser: string;
    password: string;
  }) => {
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

    const token = generateToken({
      iduser: userFromDb.iduser,
      role: userFromDb.role,
    });
    return { message: "Usuário logado!", token };
  };
}
