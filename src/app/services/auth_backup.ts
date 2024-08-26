import jwt from "jsonwebtoken";
import getConfig from "next/config";

export class jwtToken {
  private jwtSecret = process.env.JWTSERCRET;

  public create = async (user) => {
    const payload = {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
    };

    const token = jwt.sign(payload, this.jwtSecret);

    return token;
  };

  public valid = async (token) => {
    if (!token) return false;

    const payload = await jwt.verify(token, this.jwtSecret);

    return payload;
  };
}
