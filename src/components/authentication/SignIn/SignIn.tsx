import { StyleSheet, Text, View } from 'react-native';
import colors from '../../../global/colors';
import WelcomeText from '../WelcomeText/WelcomeText';

function SignIn() {
  return (
    <View style={styles.signInContainer}>
      <WelcomeText
        headerText='Welcome back'
        descriptionText='Use your credentials below and login to your account'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  signInContainer: {
    flex: 1,
    borderRadius: 80,
    borderTopLeftRadius: 0,
    backgroundColor: colors.MAIN,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: 'red'
  }
});

export default SignIn;
