import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes/routes';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
};

export default App;
