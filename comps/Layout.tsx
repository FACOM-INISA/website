import { ChildProcess } from 'child_process';
import MyApp from '../pages/_app';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="contents">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MyApp;
