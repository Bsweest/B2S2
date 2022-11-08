import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';

import PressableOpacity from '../../PressableOpacity';

const RoundedButton = (props) => {
  const { iconName, iconColor, onClick } = props;
  return (
    <PressableOpacity onPress={onClick} style={styles.roundedButton}>
      <AntDesign name={iconName} size={24} color={iconColor} />
    </PressableOpacity>
  );
};

export default RoundedButton;

const styles = StyleSheet.create({
  roundedButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: 'pink',
    borderRadius: 50,
  },
});
