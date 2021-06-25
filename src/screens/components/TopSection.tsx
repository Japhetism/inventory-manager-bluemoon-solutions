import React, {FC} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Platform, Pressable, ViewStyle} from 'react-native';
import styled from 'styled-components/native';
import Typography from './Typography';
import {FONTS_MONTSERRAT_300} from '../constants';
import {arrowLeft} from '../constants';

interface TopSectionProps {
  navTitle: string;
  withGoBackBtn: boolean;
  rightNavComponent?: () => JSX.Element;
  onBackPress?: () => void;
  style?: ViewStyle;
}

const TopSection: FC<TopSectionProps> =({
  navTitle,
  withGoBackBtn,
  rightNavComponent: RightNavComponent,
  onBackPress,
  style,
}) => {
  const navigation = useNavigation();
  const onPress = () => {
    if (onBackPress) onBackPress();
    else navigation.goBack();
  };
  const hitSlop = {
    top: 15,
    bottom: 15,
    left: 15,
    right: 15,
  };
  return (
    <TitleContainer {...(style && {style})}>
      {!!withGoBackBtn && (
        <Pressable
          {...{
            hitSlop,
            onPress,
          }}>
          <ArrowLeft source={arrowLeft} />
        </Pressable>
      )}
      <Typography
        {...{
          fontFamily: FONTS_MONTSERRAT_300,
          fontWeight: 400,
          fontSize: 16,
          fontStyle: 'normal',
          lineHeight: 19.5,
          color: '#222222',
          style: {flex: 1, alignSelf: 'center', textAlign: 'center'},
        }}>
        {navTitle}
      </Typography>
      {!!RightNavComponent && <RightNavComponent />}
    </TitleContainer>
  );
};

export default TopSection;

const TitleContainer = styled.View`
${() => Platform.OS === 'android' && 'padding-top: 22px;'}
  padding-bottom: 11px;
  padding-horizontal: 15px;
  justify-content: space-between
  align-items: center;
  background-color: #3358FF;
  flex-direction: row;  
  height: 100px;
  color: #FFFFFF;
  fontSize: 60px;
`;

const ArrowLeft = styled.Image`
  width: 9.26px;
  height: 16px;
`;
