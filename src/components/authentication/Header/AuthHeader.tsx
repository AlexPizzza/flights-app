import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  View
} from 'react-native';
import colors from '../../../global/colors';

type Props = {
  image: ImageSourcePropType;
};

function AuthHeader({ image }: Props) {
  return (
    <View style={styles.authHeaderContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.imageStyle} source={image} />
      </View>
    </View>
  );
}

export default AuthHeader;

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  authHeaderContainer: {
    backgroundColor: colors.MAIN
  },
  imageContainer: {
    width,
    borderBottomLeftRadius: 60,
    overflow: 'hidden'
  },
  imageStyle: {
    width,
    height: height * 0.2
  }
});
