import { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { useAppDispatch } from '../../hooks/storeHooks';
import { userSignIn } from '../../redux/slices/auth/auth.actions';
import { deleteIsUserFirstTime } from '../../redux/slices/user/user.actions';

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
      <Button
        title='Delete isUserFirstTime'
        onPress={() => dispatch(deleteIsUserFirstTime())}
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
