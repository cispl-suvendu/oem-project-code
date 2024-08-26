import * as jose from "jose";

export class jwtToken {
  private jwtSecret = new TextEncoder().encode(
    process.env.NEXT_PUBLIC_JWTSERCRET
  );

  public create = async (user) => {
    const payload = {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
    };

    const token = await new jose.SignJWT(payload)
      .setProtectedHeader({
        alg: "HS256",
        typ: "JWT",
      })
      .setExpirationTime("60 day")
      .sign(this.jwtSecret);


    return token;
  };

  public valid = async (token) => {
    if (!token) return false;
    try {
      const user = await jose.jwtVerify(token, this.jwtSecret);
      return user.payload;
    } catch (err) {
      console.log("errr", err);
      return err.message;
    }
  };
}
