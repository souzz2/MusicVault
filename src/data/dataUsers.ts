import connection from "../connection";
import { user } from "../types/typeUsers";

export class userData {
  insertUserData = async (user: user): Promise<user> => {
    try {
      return await connection("users").insert({
        iduser: user.iduser,
        nickname: user.nickname,
        password: user.password,
        emailuser: user.emailuser,
      });
    } catch (sql) {
      throw sql;
    }
  };

  getUserByEmailData = async (emailuser: string): Promise<user | null> => {
    try {
      const result = await connection("users")
        .select("*")
        .where({ emailuser: emailuser });

      if (result.length === 0) return null;

      return {
        iduser: result[0].iduser,
        nickname: result[0].nickname,
        emailuser: result[0].emailuser,
        password: result[0].password,
      };
    } catch (sql) {
      throw sql;
    }
  };

  getUsers = async (): Promise<user[]> => {
    try {
      return await connection("users").select("iduser","nickname","emailuser").orderBy("iduser", "asc").limit(10);
    } catch (sql) {
      throw sql;
    }
  };
}
