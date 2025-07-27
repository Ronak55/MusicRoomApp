import { theme } from '@/constants/theme';
import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

type AppViewProps = ViewProps & {
  padding?: keyof typeof theme.spacing;
  backgroundColor?: keyof typeof theme.colors;
};

export const AppView: React.FC<AppViewProps> = ({
  children,
  padding = 'md',
  backgroundColor = 'background',
  style,
  ...props
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          padding: theme.spacing[padding],
          backgroundColor: theme.colors[backgroundColor],
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
});
