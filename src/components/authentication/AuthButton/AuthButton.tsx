import { ColorValue, Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../../../global/colors';

type ButtonProps = {
  title: string;
  onPress?: VoidFunction;
  textColor?: ColorValue | undefined;
  backgroundColor?: ColorValue | undefined;
  disabledColor?: ColorValue | undefined;
  disabled?: boolean;
};

function AuthButton(props: ButtonProps) {
  const {
    title,
    onPress,
    textColor,
    backgroundColor,
    disabledColor,
    disabled
  } = props;

  return (
    <View
      style={[
        styles.buttonContainer,
        {
          backgroundColor: backgroundColor
            ? disabled
              ? 'gray'
              : backgroundColor
            : colors.MAIN
        }
      ]}
    >
      <Pressable
        style={({ pressed }) => [
          styles.buttonStyle,
          { opacity: pressed ? 0.3 : 1.0 }
        ]}
        disabled={disabled}
        onPress={onPress}
      >
        <Text style={{ color: textColor ? textColor : 'black' }}>{title}</Text>
      </Pressable>
    </View>
  );
}

// const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
const styles = StyleSheet.create({
  buttonContainer: {
    width: 200,
    height: 50,
    borderRadius: 50
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AuthButton;
