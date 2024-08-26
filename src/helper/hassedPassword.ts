import { createHmac, randomBytes } from "crypto";

export class GenerateHasPassword {
  public create = (password: string) => {
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    return {
      salt,
      hashedPassword,
    };
  };

  public match = (oldHassedPassword, oldsalt, currPassword) => {
    const currentHassedPassword = createHmac("sha256", oldsalt)
      .update(currPassword)
      .digest("hex");

    return oldHassedPassword === currentHassedPassword;
  };
}
