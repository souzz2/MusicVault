import * as jwt from "jsonwebtoken";
import { authenticationData } from "../data/dataUsers";

export const generateToken = (payload: authenticationData): string => {
  return jwt.sign(payload, process.env.JWT_KEY as string, {
    expiresIn: "24hrs",
  });
};

export const getTokenData = (token: string): authenticationData => {
  return jwt.verify(token, process.env.JWT_KEY as string) as authenticationData;
};
