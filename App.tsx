import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigation';
// import {ScreenLoader} from './components';

const App = () => {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
};

export default App;
