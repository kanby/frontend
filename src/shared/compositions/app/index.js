import Inferno from 'inferno';
import Navbar from 'compositions/navbar';
import 'shared/styles/global.css';

type AppProps = {
  children: any,
};

const App = ({ children }: AppProps) => (
  <div>
    <Navbar />
    <main role="main">
      {children}
    </main>
  </div>
);

export default App;
