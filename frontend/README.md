# 🎵 MusicRoom — Learn Music, Anytime, Anywhere

**MusicRoom** is a mobile-first application built using **React Native + Expo** and backed by a robust **Node.js + MongoDB** backend. It enables users to browse music courses, view course details, and book sessions with their preferred schedules — all through a clean and intuitive UI.

---

## 🚀 Tech Stack

| Layer       | Technology              |
|-------------|--------------------------|
| Frontend    | React Native + Expo (Prebuild) |
| Backend     | Node.js, Express.js     |
| Database    | MongoDB Atlas           |
| Auth        | JWT + Secure Token Storage |
| API Layer   | Axios                   |
| Navigation  | React Navigation        |
| State Mgmt  | React Context API       |

---

## 📱 Features

- 🔐 **Authentication**: Sign Up and Sign In using email/password with JWT-based auth
- 🏠 **Home Screen**: View a list of music courses with images and descriptions
- 🔎 **Search & Filter**: Search bar and optional category filters
- 📘 **Course Details**: Full description, duration, pricing, and instructor info
- 📅 **Booking Screen**: Book a course with pre-filled details and schedule picker
- ✅ **Booking Confirmation**: Success message after booking a course

---

## 🧠 Project Structure

```bash
frontend/
├── assets/               # Fonts, images, logos
├── components/           # Reusable UI components (e.g., CourseCard, Button)
├── constants/            # Colors, typography, spacing
├── context/              # AuthContext and other providers
├── navigation/           # App navigation config
├── screens/              # All screens: Auth, Home, Details, Booking
├── services/             # API layer (axios instance, auth & booking APIs)
├── utils/                # Helper functions (e.g., formatDate)
├── App.js                # Root app with providers and navigation
└── app.config.js         # Expo config
