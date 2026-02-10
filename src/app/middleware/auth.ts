import jwt from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import httpStatus from "http-status";

export const auth =
  (...roles: string[]) =>
  (req: any, res: any, next: any) => {
    try {
      const token = req.headers.authorization;

      // Check token
      if (!token || token === "null" || token === "undefined") {
        return next(
          new AppError(httpStatus.UNAUTHORIZED, "Unauthorized")
        );
      }

      // Verify token
      const decoded: any = jwt.verify(
        token,
        config.jwt_access_secret as string
      );

      // Role check
      if (roles.length && !roles.includes(decoded.role)) {
        return next(
          new AppError(httpStatus.FORBIDDEN, "Access denied")
        );
      }

      // Attach user
      req.user = decoded;

      next();
    } catch (error) {
      return next(
        new AppError(
          httpStatus.UNAUTHORIZED,
          "Invalid or expired token"
        )
      );
    }
  };
