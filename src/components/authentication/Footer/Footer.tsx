import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../../../global/colors';

type Props = {
  authText: string;
  basicText: string;
  screenName: string;
};

function Footer(props: Props) {
  const { authText, basicText, screenName } = props;

  const navigation = useNavigation<NavigationProp<any, any>>();

  return (
    <View style={styles.footerContainer}>
      <Text style={styles.basicTextStyle}>{basicText}</Text>
      <Pressable
        style={({ pressed }) => [{ opacity: pressed ? 0.3 : 1.0 }]}
        onPress={() => navigation.navigate(screenName)}
      >
        <Text style={styles.blueText}> {authText}</Text>
      </Pressable>
    </View>
  );
}

export default Footer;

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    backgroundColor: colors.FOOTER,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  basicTextStyle: {
    color: colors.MAIN
  },
  blueText: {
    color: colors.BLUE
  }
});
