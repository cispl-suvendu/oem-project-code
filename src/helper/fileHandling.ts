import { writeFile, readFile, mkdir } from "node:fs/promises";
import path from "path";
import fs from "fs";

const extArr = ["csv"];

export const checkFileAndReturnData = async (file) => {
  let tempExt = file.name.split(".");
  let fileExtension = tempExt[tempExt.length - 1];
 
  if (fileExtension.includes(extArr)) {
    return addFile(file);
  } else {
    return {
      err: "Please upload only CSV files",
      success: false,
      fileContent:''
    };
  }
};



export const addFile = async (file) => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + file.name.replaceAll(" ", "_");
  const filePath = process.cwd() + "/public/questionFIles/";

  try {
    const fileData = file;

    await writeFile(path.join(filePath + filename), buffer);

    const fileContent = buffer.toString("utf8");

    return {
      fileContent: fileContent,
      success: true,
    };
    
  } catch (err) {
    return {
      err: err.message,
      success: false,
      fileContent:''
    };
  }
};
