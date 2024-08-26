// export default function GET(req: Request){

//     const methodType = req.method;

//     return Response.json({
//         "action":'Get categories'
//     })

// }

// export function POST(){
//     return Response.json({
//         "action":'Post categories'
//         })
// }

/***
 * 
 * 
 * const paramsData = await req.json();

  const validationResult = categoryValidSchema.safeParse(paramsData);

  try {
    if (validationResult.success) {
      let QUERY = `INSERT INTO categories(category_name, cat_description, cat_slug , created_by) 
      VALUES ('${paramsData.cat_name}','${paramsData.cat_description}','${paramsData.cat_slug}','${paramsData.user_id}') `;
      //  let PARAMS = [paramsData.cat_name,paramsData.cat_description,paramsData.cat_slug,paramsData.user_id];
      const mysql = new MySQL();

      const [insertedId] = await mysql.executeResult(QUERY);

      console.log(insertedId);
      return NextResponse.json(
        { message: "Category Created successfully" },
        { status: 200 }
      );
    } else {
      //console.log(result.error.format());
      const formatted = validationResult.error.issues;
      const custErr = Array();

      formatted.forEach((ele) => {
        //console.log(ele,ele.path[0]);
        custErr.push({ message: ele.message });
      });

      return NextResponse.json({ err: custErr }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ err: err }, { status: 500 });
  }
 */


  /**
   * const parmsData = await req.json();

  try {
    const result = userSchema.safeParse(parmsData);

    if (result.success) {
      const mysql = new MySQL();
     
      const user_id = await cryptoRandomStringAsync({
        length: 10,
        type: "base64",
      });

      console.log(user_id);
      const [inserted] =
        await mysql.executeResult(`INSERT INTO users (user_id, full_name, phone_number, email, password) VALUES 
                ('${user_id}', '${parmsData.full_name}', '${parmsData.phone_number}', '${parmsData.email}', '${parmsData.password}') `);

      await mysql.connection.end();
      return NextResponse.json(
        { message: "User Created successfully" },
        { status: 200 }
      );
    } else {
      //console.log(result.error.format());
      const formatted = result.error.issues;
      const custErr = Array();

      formatted.forEach((ele) => {
        //console.log(ele,ele.path[0]);
        custErr.push({ message: ele.message });
      });

      return NextResponse.json({ err: custErr }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ err: err }, { status: 500 });
  }
   */