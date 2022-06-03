import * as bcrypt from 'bcryptjs';

export async function generateHashPassword(password: string): Promise<any> {
  const saltOrRounds = 10;
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
}
