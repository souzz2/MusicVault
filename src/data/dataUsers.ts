import connection from "../connection";
import { user } from "../types/typeUsers";

export class userData {
  insertUserData = async (user: user) => {
    await connection.insert(user).into("users");
  };

  getUserByEmailData = async (email: string): Promise<user> => {
    try {
      const result = await connection("users").select("*").where({ email });

      return {
        iduser: result[0].iduser,
        nickname: result[0].nickname,
        emailuser: result[0].emailuser,
        password: result[0].password,
        role: result[0].role,
      };
    } catch (error) {
      throw new Error("Não foi possivel realizar o login");
    }
  };
}
