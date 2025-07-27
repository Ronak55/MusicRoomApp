import React from 'react';
import { Text as RNText, StyleSheet, TextProps, TextStyle } from 'react-native';
import { theme } from '../../constants/theme';

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
  variant?: TextVariant;
}

export const AppText: React.FC<AppTextProps> = ({ children, style, ...rest }) => {
  return (
    <RNText style={[styles.text, style]} {...rest}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
  },
});

export default AppText;
