import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { auth } from '../../config/firebase';
import { useAppSelector } from '../../hooks/storeHooks';
import { selectToken } from '../../redux/slices/auth/authSlice';

import MainTabs from '../../navigation/MainTabs';
import Authentication from '../authentication/Authentication';

const Splash = () => {
  const token = useAppSelector(selectToken);

  return (
    <View style={styles.mainContainer}>
      <StatusBar />
      {token ? <MainTabs /> : <Authentication />}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flex: 1
  }
});

export default Splash;
