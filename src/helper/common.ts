import { cryptoRandomStringAsync } from "crypto-random-string";
export class CommonUtility {
  public async genrateRandomStr(length = 10, type) {
    return await cryptoRandomStringAsync({
      length: length,
      type: type,
    });
  }

  public genrateMysqlDate = (date) => {
    return new Date(date).toISOString().slice(0, 19).replace("T", " ");
  };
}
