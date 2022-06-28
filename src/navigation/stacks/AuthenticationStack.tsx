import {
  createNativeStackNavigator,
  NativeStackNavigationOptions
} from '@react-navigation/native-stack';
import SignInScreen from '../../screens/authentication/SignInScreen/SignInScreen';
import SignUpScreen from '../../screens/authentication/SignUpScreen/SignUpScreen';

const Stack = createNativeStackNavigator();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false
};

function AuthenticationStack() {
  return (
    <Stack.Navigator initialRouteName='SignIn' screenOptions={screenOptions}>
      <Stack.Screen name='SignIn' component={SignInScreen} />
      <Stack.Screen name='SignUn' component={SignUpScreen} />
    </Stack.Navigator>
  );
}

export default AuthenticationStack;
