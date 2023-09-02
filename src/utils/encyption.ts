import bcrypt from "bcrypt";

export async function encryptPassword(password: string) : Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function verifyPassword(
  enteredPassword: string,
  storedPassword: string
) {
  const result = await bcrypt.compare(enteredPassword, storedPassword);
  console.log(result);
  return result;
}

//-------test------
// encryptPassword("hello").then((res) => {
//   console.log(res);
// });

// verifyPassword(
//   "hello",
//   "$2b$10$wmevzt0DS9Wo9ija/gjsHuRRZ.5rZU50HMlqXzjwu0AryIkzJ4H8G"
// ).then((res) => {
//   console.log(res);
// });
