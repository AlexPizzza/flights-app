import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

type ButtonProps = {
  title: string;
  onPress?: VoidFunction;
  textColor?: string;
};

function AuthButton(props: ButtonProps) {
  const { title, onPress, textColor } = props;

  return (
    <View style={[{ ...styles.buttonContainer }]}>
      <Pressable
        style={({ pressed }) => [
          styles.buttonStyle,
          { opacity: pressed ? 0.5 : 1.0 }
        ]}
        onPress={onPress}
      >
        <Text style={{ color: textColor ? textColor : 'black' }}>{title}</Text>
      </Pressable>
    </View>
  );
}

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    width: 0.3 * windowWidth,
    height: 0.1 * windowHeight,
    borderRadius: 10
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AuthButton;
