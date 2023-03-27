import { User } from '../pages/api/user/user';
import prisma from '../prisma';

export default async function authenticate(cookie: User, admin?: boolean): Promise<boolean> {
  const user = await prisma.usuario.findUnique({ where: { email: cookie.email } });
  if (user) {
    if (admin && user.admin) return true;
    if (user.authorized) return true;
  }
  return false;
}
