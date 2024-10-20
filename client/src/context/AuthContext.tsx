import {
  createUserWithEmailAndPassword,
  User as FirebaseUser,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import app from "../firebase/firebaseConfig";

// Export Firebase Auth and Google Auth Provider
const auth = getAuth(app); // Get Firebase Auth instance

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
