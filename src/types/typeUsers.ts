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