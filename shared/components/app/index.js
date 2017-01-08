import Inferno from 'inferno';
import Navbar from 'compositions/navbar';

const App = () => (
  <div>
    <Navbar />
    <main role="main">
      hello, world!
    </main>
  </div>
);

export default App;
