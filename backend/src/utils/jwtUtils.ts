import jwt from 'jsonwebtoken';

export const generateToken = (id: string, email: string) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
}

export const verifyToken = (token: string): {id: string, email: string} | null => {
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string);

    return user as {id: string, email: string};
  } catch (error) {
    return null;
  }
}