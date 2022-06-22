import { ImageSourcePropType } from 'react-native';

export interface SlideData {
  key: string;
  title: string;
  description: string | null;
  image: ImageSourcePropType;
}
