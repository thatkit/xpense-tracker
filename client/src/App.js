import './App.css';
import { useState } from 'react';
import { MainView } from './components/featured/MainView/MainView';
import { LogAndRegView } from './components/featured/LogAndRegView/LogAndRegView';
import { Header } from './components/layout/Header/Header';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Header />
      {isLoggedIn ? <MainView /> : <LogAndRegView />}
    </div>
  );
}

export default App;
