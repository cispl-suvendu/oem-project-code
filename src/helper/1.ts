import jwt from "jsonwebtoken";
import getConfig from "next/config";

export class Auth {
  private config = getConfig();
  private secret = process.env.JWTSERCRET;

  public createToken = (user) => {
    const token = jwt.sign({ user }, this.secret, { expiresIn: "60d" });
    return token;
  };

  public verifyToken(token) {
    try {
      const decoded = jwt.verify(token, this.secret);
      console.log("Decoded token",decoded.user);
      return decoded.user;
    } catch (error) {
      return null;
    }
  }
}
