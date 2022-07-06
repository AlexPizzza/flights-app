import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Input } from '@rneui/themed';
import { Formik } from 'formik';
import { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import colors from '../../../global/colors';
import { useAppDispatch } from '../../../hooks/storeHooks';
import { userSignIn } from '../../../redux/slices/auth/auth.actions';
import AuthButton from '../AuthButton/AuthButton';
import WelcomeText from '../WelcomeText/WelcomeText';

type Errors = {
  email?: string;
  password?: string;
};

function SignIn() {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
  const dispatch = useAppDispatch();

  const onEyeButtonPress = () => {
    setIsSecureTextEntry((prevValue) => !prevValue);
  };

  return (
    <View style={styles.signInContainer}>
      <WelcomeText
        headerText='Welcome back'
        descriptionText='Use your credentials below and login to your account'
      />

      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors: Errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          return errors;
        }}
        onSubmit={(values) => {
          dispatch(
            userSignIn({ email: values.email, password: values.password })
          );
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid
        }) => (
          <View style={styles.inputsContainer}>
            <Input
              placeholder='Enter your email'
              autoCapitalize='none'
              value={values.email}
              onChangeText={(text: string) => {
                handleChange('email')(text);
              }}
              onBlur={handleBlur('email')}
              keyboardType='email-address'
              leftIcon={
                <MaterialIcons
                  name='email'
                  size={20}
                  color={colors.FOOTER}
                  style={styles.iconStyle}
                />
              }
              errorMessage={
                touched.email && errors.email ? errors.email : undefined
              }
              errorStyle={styles.errorMessageStyle}
              style={styles.inputStyle}
            />
            <Input
              placeholder='Enter your password'
              autoCapitalize='none'
              secureTextEntry={isSecureTextEntry}
              value={values.password}
              onChangeText={(text: string) => {
                handleChange('password')(text);
              }}
              onBlur={handleBlur('password')}
              leftIcon={
                <MaterialCommunityIcons
                  name='lock'
                  size={20}
                  color={colors.FOOTER}
                  style={styles.iconStyle}
                />
              }
              rightIcon={
                <Pressable
                  style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
                  onPress={onEyeButtonPress}
                >
                  <MaterialCommunityIcons
                    name='eye'
                    size={20}
                    color={colors.FOOTER}
                    style={styles.iconStyle}
                  />
                </Pressable>
              }
              errorMessage={
                touched.password && errors.password
                  ? errors.password
                  : undefined
              }
              errorStyle={styles.errorMessageStyle}
              style={styles.inputStyle}
            />

            <AuthButton
              title='Sign in'
              backgroundColor={colors.FOOTER}
              textColor={colors.MAIN}
              disabled={
                !values.email.length || !values.password.length || !isValid
              }
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

const { width } = Dimensions.get('screen');
const styles = StyleSheet.create({
  signInContainer: {
    flex: 3,
    borderRadius: 80,
    borderTopLeftRadius: 0,
    backgroundColor: colors.MAIN,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20
  },
  inputsContainer: {
    flex: 2,
    alignItems: 'center',
    width: width * 0.9
  },
  iconStyle: {
    marginRight: 4
  },
  errorMessageStyle: {
    color: 'red',
    fontSize: 16
  },
  inputStyle: {
    fontSize: 20
  }
});

export default SignIn;
