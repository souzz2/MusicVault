/*export enum userRole {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN",
  ARTISTA = "ARTISTA",
}*/

export type authenticationData = {
  iduser: string;
};

export type user = {
  iduser?: string;
  nickname: string;
  emailuser: string;
  password: string;
};
