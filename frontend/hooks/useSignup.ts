import { useAuth } from "@/context/AuthContext";
import { signUp } from "@/services";
import { NavigationProp } from "@react-navigation/native";
import { useState } from "react";

export const useSignUp = (navigation: NavigationProp<any>) => {
  const { signIn: setAuth } = useAuth();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      return alert("All fields are required!");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      setLoading(true);
      const response = await signUp(name, email, password);
      await setAuth(response.user, response.token);
      alert("Account created successfully!");
      navigation.navigate("Home");
    } catch (error: any) {
      console.error("Signup Error:", error);
      alert(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    email,
    password,
    confirmPassword,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSignUp,
    loading,
  };
};
