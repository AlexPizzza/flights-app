import { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import firstImage from '../../../assets/onboard/1.png';
import secondImage from '../../../assets/onboard/2.png';
import thirdImage from '../../../assets/onboard/3.png';
import fourthImage from '../../../assets/onboard/4.png';
import Button, { ButtonProps } from '../../components/onboard/button/Button';
import Slide from '../../components/onboard/slide/Slide';
import colors from '../../global/colors';
import { useAppDispatch } from '../../hooks/storeHooks';
import { setIsUserFirstTimeToFalse } from '../../redux/slices/user/user.actions';
import { SlideData } from './onboard.interaces';

const slides: SlideData[] = [
  {
    key: '1',
    title: 'Welcome to Fly!',
    description: null,
    image: firstImage
  },
  {
    key: '2',
    title: 'Time to travel!',
    description: 'View the cheapest flights through our app.',
    image: secondImage
  },
  {
    key: '3',
    title: 'Book a flight!',
    description: 'Find the best flight for your next travel.',
    image: thirdImage
  },
  {
    key: '4',
    title: 'Getting started is easy!',
    description: 'Create an account and enjoy your next vacation!',
    image: fourthImage
  }
];

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

  const buttonProps: ButtonProps = {
    title: '',
    borderColor: colors.BLACK,
    borderWidth: 4,
    borderRadius: 0
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
          <Button
            {...buttonProps}
            title='Skip'
            onPress={() => setIndex(3)}
            left
          />
        ) : (
          <Button
            {...buttonProps}
            title='Previous'
            onPress={setPrevIndex}
            left
          />
        )}
        {index === 3 ? (
          <Button
            {...buttonProps}
            title='Done'
            onPress={() => dispatch(setIsUserFirstTimeToFalse())}
            right
          />
        ) : (
          <Button {...buttonProps} title='Next' onPress={setNextIndex} right />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  onboardContainer: {
    display: 'flex',
    flex: 1
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row'
  }
});

export default Onboard;
