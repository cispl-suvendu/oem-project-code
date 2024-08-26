/**
 * Class created for validation of parmeters
 *
 */
export class ValidParms {
  /**
   * Checking validation of parmeters
   * @param validationSchema ZOD schema is defined by user for validation
   * @param validationObj Parmater object given by user
   * @returns object with success true or false and if false then returing with error
   */
  public valid = (validationSchema, validationObj) => {
    let res = validationSchema.safeParse(validationObj);
    if (res.success) {
      return {
        success: true,
      };
    } else {
      let formatted = res.error.issues;
      //console.log(formatted);
      let custErr = Array();

      formatted.forEach((ele) => {
        custErr.push({ message: ele.message });
      });

      return {
        err: custErr,
        success: false,
      };
    }
  };
}
