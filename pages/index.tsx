import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    fetch('api/logout')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        alert(data.isLoggedIn);
      });
  };

  const handleFile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (event.currentTarget.file.files[0] != undefined) {
      console.log(event.currentTarget.file.files[0]);
      const file = new File(
        [event.currentTarget.file.files[0]],
        event.currentTarget.idmunicipio.value + '.csv',
        { type: 'text/csv' }
      );
      let formData = new FormData();
      formData.append('csv', file);
      formData.append('idmunicipio', event.currentTarget.idmunicipio.value);
      fetch('api/update', {
        method: 'POST',
        body: formData,
      });
    } else {
      alert('Insira um arquivo');
    }
    // console.log(file);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Projeto Inisa</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to 
          <Link href="institucional">PPSUS</Link>
          <Link href="sistemadedados">Dados</Link>
          <Link href="maisinfos">Mais Infos</Link>

          Página Index do Projeto, acesse o cadastro &rarr;{' '}
          <Link href="./signIn">Página de cadastro</Link>
        </h1>

        <p className={styles.description}>
          Página da Index &rarr; <code className={styles.code}>pages/index.tsx</code>
          <button onClick={handleSubmit}>LOGOUT</button>
        </p>

        <form onSubmit={handleFile}>
          <input type="file" name="file" id="file" />
          <input type="number" name="idmunicipio" id="idmunicipio" />
          <input type="submit" value="Submit" />
        </form>

        <div className={styles.grid}>
          <a href="./signIn" className={styles.card}>
            <h2>Página de cadastro &rarr;</h2>
            <p>Clique aqui para acessar a página de cadastro</p>
          </a>

          <a href="./logIn" className={styles.card}>
            <h2>Página de login &rarr;</h2>
            <p>Clique aqui para acessar a página de login</p>
          </a>

          <a href="https://github.com/vercel/next.js/tree/canary/examples" className={styles.card}>
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
