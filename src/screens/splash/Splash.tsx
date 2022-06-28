import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import MainTabs from '../../navigation/MainTabs';
import Authentication from '../../navigation/stacks/AuthenticationStack';
import { selectToken } from '../../redux/slices/auth/authSlice';
import { checkIsUserFirstTime } from '../../redux/slices/user/user.actions';
import { selectIsUserFirstTime } from '../../redux/slices/user/userSlice';
import Onboard from '../onboard/Onboard';

function Splash() {
  const isUserFirstTime = useAppSelector(selectIsUserFirstTime);
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkIsUserFirstTime());
  }, []);

  return (
    <View style={styles.mainContainer}>
      {isUserFirstTime ? (
        <Onboard />
      ) : token ? (
        <MainTabs />
      ) : (
        <Authentication />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  }
});

export default Splash;
