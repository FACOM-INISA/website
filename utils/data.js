import { useRouter } from "next/router";

const NavItem = ({ item }) => {
    const router = useRouter();
    return<>{router.pathname === "/" ? item : ""}</>;
};

export default NavItem;

NavItem.propTypes = {
    item: propTypes.string,
};

export const navLinks = [
    {
        id: 1,
        name: "A PLATAFORMA",
        path: "/" 
    },
    {
        id: 2,
        name: "SOBRE NÓS",
        path: "/sobrenos",
    },
    {
        id: 3,
        name: "MAIS INFORMAÇÕES",
        path: "/maisinformacoes",
    },
    {
        id: 4,
        name: "Sistema de Dados",
        path: "/blog",
    },
    {
        id: 5,
        name: "Mais informações",
        path: "/maisinformacoes",
    },
    {
        id: 6,
        name: "Área Administrativa",
        path: "/adm",
    },
    {
        id: 7,
        name: "Voltar à plataforma",
        path: "/",
    },
    {
        id: 8,
        name: "Sair",
        path: "/sair",
    },
    {
        id: 9,
        name: "Contact Us",
        path: "#contact",
    },
  ];