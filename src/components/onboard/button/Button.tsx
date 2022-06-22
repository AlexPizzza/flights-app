import {
  ColorValue,
  Dimensions,
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
  Text,
  View
} from 'react-native';

export type ButtonProps = {
  title: string;
  onPress?: VoidFunction;
  textColor?: string;
};

function Button(props: ButtonProps) {
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
    display: 'flex',
    flex: 1,
    width: 0.3 * windowWidth,
    height: 0.1 * windowHeight,
    borderRadius: 10
  },
  buttonStyle: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Button;
