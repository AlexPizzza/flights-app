import { Button, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch } from '../../hooks/storeHooks';
import { setIsUserFirstTimeToFalse } from '../../redux/slices/user/user.actions';

function Onboard() {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.onboardContainer}>
      <Text>Onboard</Text>
      <Button
        title='Not first time'
        onPress={() => dispatch(setIsUserFirstTimeToFalse())}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  onboardContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Onboard;
