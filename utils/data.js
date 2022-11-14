import { NavLink } from './NavLink';

export const navLinks = [
    { name: "Home", 
     path: "/" 
    },
    {
      name: "O Projeto",
      path: "/projeto",
    },
    {
      name: "Sobre nós",
      path: "/sobrenos",
    },
    {
      name: "Mais informações",
      path: "/maisinformacoes",
    },
    {
        name: "Sistema de Dados",
        path: "/sistemadedados",
    },
    {
        name: "Área Administrativa",
        path: "/administrativa",
    },
    {
        name: "Voltar à Plataforma",
        path: "/",
    },
    {
        name: <NavLink item="Contact Us" />,
        path: "#contact",
    },
  ];