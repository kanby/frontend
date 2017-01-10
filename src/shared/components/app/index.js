import Inferno from 'inferno';
import Navbar from 'compositions/navbar';
import 'shared/styles/global.css';

const App = ({ children }) => (
  <div>
    <Navbar />
    <main role="main">
      {children}
    </main>
  </div>
);

export default App;
