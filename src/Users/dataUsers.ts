import connection from "../connection";

enum USER_ROLES {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN",
  ARTISTA = "ARTISTA",
}

export type authenticationData = {
  iduser: string;
  role: USER_ROLES;
};

export type user = {
  iduser: string;
  nickname: string;
  emailuser: string;
  password: string;
  role: USER_ROLES;
};

export const insertUserData = async (user: user) => {
  await connection
    .insert(user)
    .into("users");
};

export const getUserByEmailData = async (email: string): Promise<user> => {
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
