import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';

import { store } from './src/redux/store';
import Splash from './src/screens/splash/Splash';

LogBox.ignoreLogs([/AsyncStorage/]);

function App() {
  return (
    <NavigationContainer>
      <Splash />
    </NavigationContainer>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
