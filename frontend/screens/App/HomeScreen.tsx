// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  AppText,
  FlatList,
  StyleSheet,
  AppTextInput,
  SafeAreaView,
  ActivityIndicator,
} from '@/components/ui';
import CourseCard from '@/components/CourseCard';
import { useNavigation } from '@react-navigation/native';
import { Course } from '@/services/types';
import { getCourses } from '@/services/authService';
import { useAuth } from '@/context/AuthContext';

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const navigation = useNavigation<any>();

  useEffect(() => {
    const fetchCourses = async () => {
          if (!token) return;

      try {
        const data = await getCourses(token);
        setCourses(data);
      } catch (err) {
        console.error('Failed to load courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppText style={styles.header}>Available Courses</AppText>

      <AppTextInput
        style={styles.searchInput}
        placeholder="Search courses..."
        value={searchText}
        onChangeText={setSearchText}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={filteredCourses}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <CourseCard
              title={item.title}
              description={item.description}
              image={item.image}
              onPress={() =>
                navigation.navigate('CourseDetails', { courseId: item._id })
              }
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    paddingHorizontal: 16,
    paddingVertical: 50,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
});
