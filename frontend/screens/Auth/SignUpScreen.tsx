import {
  AppButton,
  AppText,
  AppTextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "@/components/ui";
import { theme } from "@/constants/theme";
import { useSignUp } from "@/hooks/useSignup";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";

type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const SignUpScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const {
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
  } = useSignUp(navigation);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <AppText style={styles.title}>Create Account</AppText>
        <AppTextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
        keyboardType="default"
      />

      <AppTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <AppTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <AppTextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <AppButton title={loading ? "Signing Up..." : "Sign Up"} onPress={handleSignUp} />

      <AppText style={styles.switchText}>
        Already have an account?{" "}
        <AppText style={styles.link} onPress={() => navigation.navigate("SignIn")}>
          Sign In
        </AppText>
      </AppText>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    justifyContent: "center",
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  switchText: {
    marginTop: theme.spacing.lg,
    textAlign: "center",
    color: theme.colors.gray,
  },
  link: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
});
