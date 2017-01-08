import Inferno from 'inferno';
import Navbar from 'compositions/navbar';

const App = ({ children }) => (
  <div>
    <Navbar />
    <main role="main">
      {children}
    </main>
  </div>
);

export default App;
