import {
  ColorValue,
  Dimensions,
  Pressable,
  PressableAndroidRippleConfig,
  StyleSheet,
  Text,
  View
} from 'react-native';
import colors from '../../../global/colors';

export type ButtonProps = {
  title: string;
  onPress?: VoidFunction;
  backgroundColor?: ColorValue;
  textColor?: string;
  borderWidth?: number;
  borderColor?: ColorValue;
  borderRadius?: number;
  left?: boolean;
  right?: boolean;
};

const android_ripple: PressableAndroidRippleConfig = {
  borderless: true,
  color: colors.SECONDARY
};

function Button(props: ButtonProps) {
  const {
    title,
    onPress,
    backgroundColor,
    textColor,
    borderWidth,
    borderColor,
    borderRadius,
    left,
    right
  } = props;

  return (
    <View
      style={[
        { ...styles.buttonContainer },
        {
          borderRadius: borderRadius ? borderRadius : 0,
          borderWidth: borderWidth ? borderWidth : 0,
          backgroundColor: backgroundColor ? backgroundColor : 'white'
        },
        borderColor !== undefined && { borderColor: borderColor },
        (left || right) && { borderBottomWidth: 0 },
        left && {
          borderLeftWidth: 0,
          borderRightWidth: borderWidth ? Math.floor(borderWidth / 2) : 0
        },
        right && {
          borderRightWidth: 0,
          borderLeftWidth: borderWidth ? Math.floor(borderWidth / 2) : 0
        }
      ]}
    >
      <Pressable
        style={styles.buttonStyle}
        onPress={onPress}
        android_ripple={android_ripple}
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
