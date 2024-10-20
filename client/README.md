### **Install google fonts in Tailwind**
1. [fonts.google.com/specimen/Poppins](https://fonts.google.com/specimen/Poppins)
2. Get Font -> Embed Code -> @Import
  - Put that import link in the top of main.tsx
3. tailwind.config.js 

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: '"Poppins", sans-serif',
        Sixtyfour: '"Sixtyfour Convergence", sans-serif;',
      },
    },
  },
  plugins: [require("daisyui")],
};
```
```jsx
<h1 className="text-3xl bg-red-100 font-poppins font-bold">Hello world!</h1>
```

### **Understanding useContext Hook | Create - Wrap - Use**
*createContext() -> MyContext.Provider(value) -> Wrap -> useContext()*

### 1. Create a Context & use it inside a Provider Component | Passing Data
**Using single Component Version (Create + Wrap)**
```jsx
import { createContext } from 'react';
const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('light');
  // ...
  return (
    <ThemeContext.Provider value={theme}>
      <Page />
    </ThemeContext.Provider>
  );
}
```

**Separate component to wrap with | Two Components Step1: Create, Step2: Wrap**
*Notice: Component name is provider but return context. It's just convension*
```jsx
import React, { createContext, useState } from 'react';
// Create a Context object
const MyContext = createContext();

const MyProvider = ({ children }) => {
  const message = "Hello from Context!";

  return (
    <MyContext.Provider value={{ message }}>
      {children}
    </MyContext.Provider>
  );
};
```
### 2. Wrap your app or the part of the component tree | Wrap App

```jsx
import React from 'react';

const App = () => {
  return (
    <MyProvider>
      <DisplayMessage />
    </MyProvider>
  );
};
```

### 3. Access data | useContext(MyContext)

```jsx
import React, { useContext } from 'react';

const DisplayMessage = () => {
  const { message } = useContext(MyContext);  // Access the context data

  return <h1>{message}</h1>;
};
```

### **FireBase Authentication**
[console.firebase.google.com](https://console.firebase.google.com/) 
[firebase.google.com/docs](https://firebase.google.com/docs/auth/web/password-auth)
---
![https://prnt.sc/fsXVGe4dnPqR](https://i.ibb.co.com/QFgVDrK/Screenshot-1.png)
![https://prnt.sc/wtsmLCMtWBWx](https://i.ibb.co.com/mysgxS1/Screenshot-2.png)

Install FireBase
```bash
npm install firebase
```
**A simple firebase example which is responsible for createing new user using email and Password and Update profile with name and photo**
```jsx
// Import necessary modules
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8ehawlsWmF8r0kb4qWL7wSNsh6HVywVQ",
  authDomain: "breaking-news-cfbca.firebaseapp.com",
  projectId: "breaking-news-cfbca",
  storageBucket: "breaking-news-cfbca.appspot.com",
  messagingSenderId: "371790083227",
  appId: "1:371790083227:web:4da5c666899abe60a2c23e",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: name, photoURL: photo });

      console.log("User registered successfully:", user);
    } catch (err: any) {
      setError(err.message);
      console.error("Error registering user:", err);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-6xl mx-auto flex flex-col gap-4"
    >
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Photo:</label>
        <input type="text" onChange={(e) => setPhoto(e.target.value)} />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
```
**In Multiple file: Productoin gread**
- FireBase configuration
```javascript
// firebase/firebaseConfig.ts 
// Import the necessary functions from Firebase SDK (v9 Modular Syntax)
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8ehawlsWmF8r0kb4qWL7wSNsh6HVywVQ",
  authDomain: "breaking-news-cfbca.firebaseapp.com",
  projectId: "breaking-news-cfbca",
  storageBucket: "breaking-news-cfbca.appspot.com",
  messagingSenderId: "371790083227",
  appId: "1:371790083227:web:4da5c666899abe60a2c23e",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Export Firebase Auth and Google Auth Provider
export const authFirebase = getAuth(); // Get Firebase Auth instance

// Initialize Google and GitHub providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
```

**Export: Provider - return: Context**
```jsx
// context/AuthContext.tsx
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Export Firebase Auth and Google Auth Provider
const auth = getAuth(); // Get Firebase Auth instance

// Initialize Google and GitHub providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

interface ProfileInfo {
  displayName: string;
  photoURL: string;
}
// 1. Define AuthContext types
interface AuthContextType {
  user: FirebaseUser | null;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  updateProfileWithEmail: (
    user: FirebaseUser,
    profileInfo: ProfileInfo
  ) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<UserCredential>;
  loginWithGoogle: () => Promise<UserCredential>;
  loginWithGithub: () => Promise<UserCredential>;
  logout: () => Promise<void>;
}

// 2. Create the AuthContext with an undefined default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. AuthProvider component that wraps the entire app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Monitor the Firebase auth state and set the user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Email/Password Sign-up
  const signUpWithEmail = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  // Email/Password Sign-up
  const updateProfileWithEmail = async (
    user: FirebaseUser,
    profileInfo: ProfileInfo
  ) => {
    return await updateProfile(user, profileInfo);
  };

  // Email/Password Login
  const loginWithEmail = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  // Google Login
  const loginGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
  };

  // GitHub Login
  const loginGithub = async () => {
    return await signInWithPopup(auth, githubProvider);
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user: user, // user: user same
        signUp: signUpWithEmail,
        updateProfileWithEmail,
        loginWithEmail,
        loginWithGoogle: loginGoogle,
        loginWithGithub: loginGithub,
        logout,
      }}
    >
      {!loading && children}{" "}
      {/* Only render children when loading is complete */}
    </AuthContext.Provider>
  );
};

// 4. Custom hook to use the AuthContext | will use useAuth() instated of useContext(AuthContext)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
```


