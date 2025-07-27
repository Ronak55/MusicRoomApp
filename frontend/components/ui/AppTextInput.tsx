import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { theme } from '../../constants/theme';

export const AppTextInput = (props: TextInputProps) => {
  return (
    <TextInput
      placeholderTextColor={theme.colors.gray}
      style={styles.input}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.inputBackground,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
  },
});
