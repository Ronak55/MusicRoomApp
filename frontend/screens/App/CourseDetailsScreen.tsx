import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import {
  AppView,
  AppText,
  AppButton,
  SafeAreaView,
   Image, StyleSheet, ScrollView, ActivityIndicator
} from '@/components/ui';
import { getCourseById } from '@/services/authService';
import { useAuth } from '@/context/AuthContext';
import { Course } from '@/services/types';

type CourseDetailsRouteProp = RouteProp<{ CourseDetails: { courseId: string } }, 'CourseDetails'>;

export default function CourseDetailsScreen() {
  const { params } = useRoute<CourseDetailsRouteProp>();
  const navigation = useNavigation<any>();
  const { token } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!token) return;
      try {
        const data = await getCourseById(params.courseId, token);
        setCourse(data);
      } catch (err) {
        setError('Failed to load course');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [params.courseId, token]);

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  if (error || !course) {
    return (
      <SafeAreaView style={styles.centered}>
        <AppText>{error || 'Course not found'}</AppText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {course.image && (
          <Image source={{ uri: course.image }} style={styles.image} />
        )}

        <AppView style={styles.content}>
          <AppText style={styles.title}>{course.title}</AppText>
          <AppText style={styles.instructor}>By {course.instructor}</AppText>

          <AppView style={styles.detailsRow}>
            <AppText style={styles.detail}>🕒 {course.duration} hrs</AppText>
            <AppText style={styles.detail}>💰 ₹{course.price}</AppText>
          </AppView>

          <AppText style={styles.sectionHeader}>About this course</AppText>
          <AppText style={styles.description}>{course.description}</AppText>
        </AppView>
      </ScrollView>

      <AppView style={styles.footer}>
        <AppButton
          title="Book Now"
          onPress={() => navigation.navigate('Booking', { course })}
        />
      </AppView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea:{
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
    },
  container: {
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 220,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
    color: '#1a1a1a',
  },
  instructor: {
    fontSize: 16,
    color: '#888',
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detail: {
    fontSize: 16,
    color: '#333',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: '#000',
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
