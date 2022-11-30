import { NextPage } from 'next';
import { FormEvent } from 'react';
import fetchJson from '../lib/fetchJson';
import useUser from '../lib/useUser';

const Login: NextPage = () => {
  const { mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: true,
  });

  const test = async (event: any) => {
    event.preventDefault();
    let body = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };

    try {
      mutateUser(
        await fetchJson('api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }),
        false
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={test} method="post">
        <input type="email" name="email" />
        <input type="password" name="password" />
        <input type="submit" value="Submit" />
      </form>

      <form action="api/logout" method="post">
        <input type="submit" value="LOGOUT" />
      </form>
    </div>
  );
};

export default Login;
