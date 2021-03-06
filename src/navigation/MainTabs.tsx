import { Button, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch } from '../hooks/storeHooks';
import { userSignOut } from '../redux/slices/auth/auth.actions';

function MainTabs() {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.mainContainer}>
      <Text>MainTabs</Text>
      <Button title='Sign out' onPress={(_event) => dispatch(userSignOut())} />
    </View>
  );
}

export default MainTabs;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  }
});
