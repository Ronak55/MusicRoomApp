import { useAuth } from "@/context/AuthContext";
import { signIn } from "@/services";
import { NavigationProp } from "@react-navigation/native";
import { useState } from "react";

export const useSignIn = (navigation: NavigationProp<any>) => {
  const { signIn: setAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      return alert("Please fill in both fields");
    }

    try {
      setLoading(true);
      const response = await signIn(email, password);
      console.log("Sign In Successful:", response);

      await setAuth(response.user, response.token);
      alert("Logged in successfully!");
      navigation.navigate("Home");
    } catch (error: any) {
      console.error("Sign In Error:", error);
      alert(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleSignIn,
    loading,
  };
};
