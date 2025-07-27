import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  AppView,
  AppText,
  AppButton,
  SafeAreaView,
  Image, StyleSheet
} from '@/components/ui';

export default function SuccessScreen() {
  const navigation = useNavigation<any>();

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppView style={styles.content}>
        <Image
          source={require('../../assets/images/success.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <AppText style={styles.title}>Booking Confirmed!</AppText>
        <AppText style={styles.message}>
          Thank you for booking the course. You'll receive details shortly.
        </AppText>

        <AppButton title="Go to Home" onPress={handleGoHome} style={styles.button} />
      </AppView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: 160,
    height: 160,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#28a745',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    width: '100%',
  },
});
