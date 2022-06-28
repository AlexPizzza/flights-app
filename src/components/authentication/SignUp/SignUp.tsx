import { StyleSheet, Text, View } from 'react-native';

function SignUp() {
  return (
    <View style={styles.signUpContainer}>
      <Text>Sign In</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  signUpContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  }
});

export default SignUp;
