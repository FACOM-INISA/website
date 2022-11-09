import MyApp from '../pages/_app';
import Style from '../styles/components/Footer.module.css';

interface NavItem {
  title: string;
  Icon: string;
  url: string;
  id: number;
}

const navItems: NavItem[] = [
  { title: 'Telefones', Icon: '', url: 'https://materialdesignicons.com/icon/cellphone', id: 0 },
  { title: 'Localização', Icon: '', url: 'https://materialdesignicons.com/icon/map-marker', id: 1 },
  { title: 'Edital', Icon: '', url: 'https://materialdesignicons.com/icon/file', id: 2},
];
const Footer = ({children}) => {
  return (
    <footer className="Style.footer">
      <nav>
        {navItems.map((item, index) => <a><span className="material-icons"></span></a>}
        <a>Informaçõesr</a>
      </nav>
      <p>(067) 3345-7774 / (67) 3345-7826</p>
    </footer>
  );
};

export default Footer;
