import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { SlideData } from '../../../screens/onboard/onboard.interfaces';

type SlideProps = {
  key: string;
  slide: SlideData;
};

function Slide(props: SlideProps) {
  const { title, description, image } = props.slide;

  return (
    <View style={styles.slideContainer}>
      <Text>{title}</Text>
      <Image style={styles.image} source={image} />
      {description ? <Text>{description}</Text> : null}
    </View>
  );
}

const { width: windowWidth } = Dimensions.get('window');
const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: windowWidth,
    height: undefined,
    aspectRatio: 1
  }
});

export default Slide;
