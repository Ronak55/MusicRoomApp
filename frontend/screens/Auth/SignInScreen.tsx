import {
  AppButton,
  AppText,
  AppTextInput,
  AppView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "@/components/ui";
import { theme } from "@/constants/theme";
import { useSignIn } from "@/hooks/useSignin";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";

type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const SignInScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const {
    email,
    password,
    setEmail,
    setPassword,
    handleSignIn,
    loading,
  } = useSignIn(navigation);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <AppView>
        <AppText style={styles.title}>Welcome Back 👋</AppText>

        <AppTextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <AppTextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <AppButton
          title={loading ? "Signing In..." : "Sign In"}
          onPress={handleSignIn}
        />

        <AppText style={styles.switchText}>
          Don’t have an account?{" "}
          <AppText
            style={styles.link}
            onPress={() => navigation.navigate("SignUp")}
          >
            Sign Up
          </AppText>
        </AppText>
      </AppView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: "bold",
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
