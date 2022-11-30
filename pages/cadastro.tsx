import { NextPage } from 'next';

const Cadastro: NextPage = () => {
  return (
    <div>
      <form action="api/cadastro" method="post">
        <input type="email" name="email" />
        <input type="password" name="senha" />
        <input type="text" name="nome" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Cadastro;
