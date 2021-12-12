// React imports
import { useState } from 'react';
// Components inports
import { MainView } from './components/featured/MainView/MainView';
import { LogAndRegView } from './components/featured/LogAndRegView/LogAndRegView';
import { Header } from './components/layout/Header/Header';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Header />
      {isLoggedIn ? <MainView /> : <LogAndRegView />}
    </div>
  )
}

export default App;