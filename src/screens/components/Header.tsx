import React from 'react';
import {View, Text, StyleSheet, Pressable, TextInput, SafeAreaView,TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {arrowLeft} from '../constants';
import Colors from '../../utils/Colors';

export interface HeaderProps {
  title: string;
  canGoBack: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  canGoBack,
}) => {
    const navigation = useNavigation();
    const onPress = () => {
        navigation.goBack();
      };
      const hitSlop = {
        top: 15,
        bottom: 15,
        left: 15,
        right: 15,
      };
    return (
        <Text style={styles.headText}>
          {canGoBack && <Pressable
            {...{
              hitSlop,
              onPress,
              paddingRight: 10,
            }}>
            <ArrowLeft source={arrowLeft} />
          </Pressable>}
          {title}
        </Text>
    )
};

export default Header;

const styles = StyleSheet.create({
    headText: {
        color: Colors.AmberRed,
        fontSize: 27,
        fontWeight: '700',
        marginTop: 20,
        marginLeft: 20,
    },
});

const ArrowLeft = styled.Image`
  width: 9.2px;
  height: 20px;
  margin-left: 2px;
  margin-right: 5px;
`;