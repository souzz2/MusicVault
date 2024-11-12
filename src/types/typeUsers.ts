export enum userRole {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN",
    ARTISTA = "ARTISTA",
  }
  
  export type authenticationData = {
    iduser: string;
    role: userRole;
  };
  
  export type user = {
    iduser: string;
    nickname: string;
    emailuser: string;
    password: string;
    role: userRole;
  };