import {Alert} from 'react-native';

export const displayAlert = (title: string, subTitle: string, onPress: any) => {
  Alert.alert(
    title,
    subTitle,
    [
      onPress && {
        text: 'Yes',
        onPress: () => {
          onPress();
        },
      },
      {
        text: onPress ? 'No' : 'Ok',
        onPress: () => {
          cancelable: true;
        },
      },
    ],
    {cancelable: true},
  );
};
