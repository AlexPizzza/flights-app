import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet
} from 'react-native';

type Props = {
  image: ImageSourcePropType;
};

function CustomImage({ image }: Props) {
  return (
    <Image
      style={[
        {
          ...StyleSheet.absoluteFillObject,
          transform: [{ rotateX: '180deg' }]
        },
        styles.imageStyle
      ]}
      source={image}
    />
  );
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  imageStyle: {
    flex: 1,
    width,
    height: height * 0.2
  }
});

export default CustomImage;
