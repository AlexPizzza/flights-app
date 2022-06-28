import { StyleSheet, Text, View } from 'react-native';

type Props = {
  headerText: string;
  descriptionText: string;
};

const WelcomeText = ({ headerText, descriptionText }: Props) => {
  return (
    <View style={styles.welcomeTextContainer}>
      <Text style={styles.headerText}>{headerText}</Text>
      <Text style={styles.descriptionText}>{descriptionText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeTextContainer: {
    flex: 1,
    alignItems: 'center'
  },
  headerText: {
    fontWeight: 'bold'
  },
  descriptionText: {
    textAlign: 'center'
  }
});

export default WelcomeText;
