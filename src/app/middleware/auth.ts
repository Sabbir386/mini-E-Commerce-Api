import jwt from "jsonwebtoken";
import config from "../config";

export const auth =
  (...roles: string[]) =>
    (req: any, res: any, next: any) => {
      const token = req.headers.authorization;

      if (!token) {
        throw new Error("Unauthorized");
      }

      const decoded: any = jwt.verify(
        token,
        config.jwt_access_secret as string
      );

      if (roles.length && !roles.includes(decoded.role)) {
        throw new Error("Forbidden");
      }

      req.user = decoded;
      next();
    };
