import { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import firstImage from '../../../assets/onboard/1.png';
import secondImage from '../../../assets/onboard/2.png';
import thirdImage from '../../../assets/onboard/3.png';
import fourthImage from '../../../assets/onboard/4.png';

import { useAppDispatch } from '../../hooks/storeHooks';
import { setIsUserFirstTimeToFalse } from '../../redux/slices/user/user.actions';

import { SlideData } from './onboard.interfaces';
import Button from '../../components/onboard/button/Button';
import Slide from '../../components/onboard/slide/Slide';
import colors from '../../global/colors';

const slides: SlideData[] = [
  {
    key: 'slide_1',
    title: 'Welcome to Fly!',
    description: null,
    image: firstImage
  },
  {
    key: 'slide_2',
    title: 'Time to travel!',
    description: 'View the cheapest flights through our app.',
    image: secondImage
  },
  {
    key: 'slide_3',
    title: 'Book a flight!',
    description: 'Find the best flight for your next travel.',
    image: thirdImage
  },
  {
    key: 'slide_4',
    title: 'Getting started is easy!',
    description: 'Create an account and enjoy your next vacation!',
    image: fourthImage
  }
];

const dots = Array.from(Array(4).keys());

function Onboard() {
  const [index, setIndex] = useState(0);
  const dispatch = useAppDispatch();
  const myFlatList = useRef<FlatList>(null);

  useEffect(() => {
    if (myFlatList.current) {
      myFlatList.current.scrollToIndex({ animated: true, index });
    }
  }, [index]);

  const setNextIndex = () => {
    setIndex((prev) => (prev < 3 ? prev + 1 : 3));
  };

  const setPrevIndex = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <View style={styles.onboardContainer}>
      <FlatList
        ref={myFlatList}
        data={slides}
        renderItem={(slide) => (
          <Slide key={slide.item.key} slide={slide.item} />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
      />
      <View style={styles.buttonsContainer}>
        {index === 0 ? (
          <Button title='Skip' onPress={() => setIndex(3)} />
        ) : (
          <Button title='Previous' onPress={setPrevIndex} />
        )}
        <View style={styles.dotsContainer}>
          {dots.map((value, idx) => (
            <View
              key={value}
              style={[
                styles.dotStyle,
                idx === index && { backgroundColor: colors.SECONDARY }
              ]}
            />
          ))}
        </View>
        {index === 3 ? (
          <Button
            title='Done'
            onPress={() => dispatch(setIsUserFirstTimeToFalse())}
          />
        ) : (
          <Button title='Next' onPress={setNextIndex} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  onboardContainer: {
    flex: 1
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  dotsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: colors.BLACK
  }
});

export default Onboard;
