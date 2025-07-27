import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import {
  AppView,
  AppText,
  AppTextInput,
  AppButton,
  SafeAreaView,
Platform, StyleSheet
} from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import { Course } from '@/services/types';
import { bookCourse } from '@/services/authService';
import { theme } from '@/constants/theme';

type BookingRouteProp = RouteProp<{ Booking: { course: Course } }, 'Booking'>;

export default function BookingsScreen() {
  const { params } = useRoute<BookingRouteProp>();
  const navigation = useNavigation<any>();
  const { course } = params;
  const { user, token} = useAuth();

  const [preferredDate, setPreferredDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setPreferredDate(selectedDate);
  };

const handleBooking = async () => {
  if (!user || !token) return alert('User not authenticated');

  setSubmitting(true);
  try {
    await bookCourse(
      {
        userId: user.id,
        courseId: course._id || course.id,
        preferredSchedule: preferredDate.toISOString(),
      },
      token
    );

    alert('Booking Confirmed!');
    navigation.goBack();
  } catch (error) {
    alert(error.message || 'Something went wrong!');
  } finally {
    setSubmitting(false);
  }
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppView style={styles.container}>
        <AppText style={styles.label}>Name</AppText>
        <AppTextInput value={user?.name || ''} editable={false} />

        <AppText style={styles.label}>Course</AppText>
        <AppTextInput value={course.title} editable={false} />

        <AppText style={styles.label}>Preferred Schedule</AppText>
        <AppButton
          title={preferredDate.toDateString()}
          onPress={() => setShowDatePicker(true)}
          style={{backgroundColor: theme.colors.gray}}
        />

        {showDatePicker && (
          <DateTimePicker
            value={preferredDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <AppView style={styles.footer}>
          <AppButton
            title={submitting ? 'Booking...' : 'Confirm Booking'}
            onPress={handleBooking}
            disabled={submitting}
          />
        </AppView>
      </AppView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea:{
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'android' ? 25 : 0,
    },

  container: {
    flex:1,
    padding: 20,
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  footer: {
    marginTop: 24,
  },
});
