# DearMind-FE

NestJS Frontend Server for **DearMind**, a digital art therapy service built for the **Google Solution Challenge 2025**.

---

## 🧠 What is DearMind?

**DearMind** is a mobile-based digital art therapy service that helps users express emotions through drawings and short journals.  
The app provides AI-powered emotion analysis, self-care activity recommendations, and personalized visual rewards based on consistent emotional journaling.

This repository contains the **React-Native frontend server**, which supports:

- Drawing Screen
- MyPage Screen
- Chat Screen
---

## 🛠️ Tech Stack

| Layer          | Technology |
|----------------|------------|
| Frontend       | React-Native |
| Authentication | Firebase Authentication |
| Database       | Firestore (Firebase) |
| File Storage   | Firebase Storage |
| AI Integration | Vertex AI (Gemini + Imagen) |
| 3rd Party API  | Google Maps / Places API |
| Deployment     | Render + GitHub Actions |
| Docs           | Swagger |

---

## 🚀 Android Setting

Pixel 7, Android (Android Studio)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/DearMind-Google-SC/DearMind-FE.git
```

### 2: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

### 3: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```
-------

## 👥 Contributors

- Frontend: HyeYoung-You (dbgPdud

---

## 📄 License

This project is licensed under the MIT License.
