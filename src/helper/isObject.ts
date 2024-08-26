
export const isObject = (data) =>{
if(JSON.stringify(data)?.[0] === '{') {
   return true;
  };
  return false;
}