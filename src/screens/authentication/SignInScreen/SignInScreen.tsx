import { StyleSheet, View } from 'react-native';
import AuthHeader from '../../../components/authentication/Header/AuthHeader';
import colors from '../../../global/colors';
import authImage from '../../../../assets/auth.png';
import CustomImage from '../../../components/authentication/CustomImage/CustomImage';
import SignIn from '../../../components/authentication/SignIn/SignIn';
import Footer from '../../../components/authentication/Footer/Footer';

function SignInScreen() {
  return (
    <View style={styles.signInScreenContainer}>
      <AuthHeader image={authImage} />
      <View style={styles.imageAndFormContainer}>
        <CustomImage image={authImage} />
        <SignIn />
        <Footer
          authText='Sign Up Here'
          basicText="Don't have an account?"
          screenName='SignUp'
        />
      </View>
    </View>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  signInScreenContainer: {
    flex: 1,
    backgroundColor: colors.MAIN
  },
  imageAndFormContainer: {
    flex: 1,
    borderTopLeftRadius: 80
  }
});
