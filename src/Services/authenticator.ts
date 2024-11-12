import * as jwt from "jsonwebtoken"
import { userRole } from "../types/typeUsers";

export const generateToken = (payload: payload): string => {
  return jwt.sign(payload, process.env.JWT_KEY as string, {
    expiresIn: "24hrs",
  });
};

export const getTokenData = (token: string): payload => {
  return jwt.verify(token, process.env.JWT_KEY as string) as payload;
};

export type payload = {
  id: string,
  role: userRole
}