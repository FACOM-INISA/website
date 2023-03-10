/*
Script para guardar a sessão do usuário
*/

import type { IronSessionOptions } from 'iron-session';
import type { User } from '../pages/api/user/user';

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_PASSWORD as string,
  cookieName: 'iron session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

declare module 'iron-session' {
  interface IronSessionData {
    user?: User;
  }
}
