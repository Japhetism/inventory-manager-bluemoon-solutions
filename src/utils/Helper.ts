import {Alert} from 'react-native';

export const displayAlert = (title: string, subTitle: string, onPress: any) => {
  Alert.alert(
    title,
    subTitle,
    onPress && [
      {
        text: 'Yes',
        onPress: () => {
          onPress();
        },
      },
      {
        text: 'No',
        onPress: () => {
          cancelable: true;
        },
      },
    ],
    {cancelable: true},
  );
};

export const recordExist = (records: any, name: string) => {
  return records.reverse().filter((record: any) => {
    return record.name === name;
  });
};
