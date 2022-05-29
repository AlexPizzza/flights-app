import { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useAppDispatch } from '../../hooks/storeHooks';

import { userSignIn } from '../../redux/slices/auth/authSlice';

function Authentication() {
  const [isSignIn, setIsSignIn] = useState(true);
  const email = 'pizzaalex99@gmail.com';
  const password = 'parola123';

  const dispatch = useAppDispatch();

  return (
    <View style={styles.authContainer}>
      {isSignIn ? (
        <>
          <Button
            title='Sign In'
            onPress={(_event) => dispatch(userSignIn({ email, password }))}
          />
        </>
      ) : (
        <Button
          title='Sign Up'
          onPress={(_event) => console.log('You signed up')}
        />
      )}
      <Button
        title={isSignIn ? 'Go to Sign Up' : 'Go to Sign In'}
        onPress={(_event) => setIsSignIn((prev) => !prev)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  authContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  }
});

export default Authentication;
