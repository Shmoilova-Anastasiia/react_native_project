import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";

const backgroundImage = require("../assets/images/bgimage.png");

export default function LoginScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [currentFocused, setCurrentFocused] = useState("");

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
    setCurrentFocused("");
  };

  const handleFocus = (currentInput = "") => {
    setCurrentFocused(currentInput);
  };

  const onSubmitUserRegister = () => {
    if (!email || !password) return console.warn("Будь ласка заповніть поля");
    console.log({ email, password });
    hideKeyboard();
    clearForm();
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };
  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.container}>
          <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Увійти</Text>

              <TextInput
                style={[
                  styles.inputField,
                  currentFocused === "email" && styles.inputCurrent,
                ]}
                placeholder="Адреса електронної пошти"
                inputMode="email"
                value={email}
                onFocus={() => handleFocus("email")}
                onChangeText={setEmail}
                autoCapitalize="none"
              />

              <TextInput
                style={[
                  styles.inputField,
                  currentFocused === "password" && styles.inputCurrent,
                  // styles.passwordInput,
                ]}
                placeholder="Пароль"
                placeholderTextColor="#BDBDBD"
                secureTextEntry={!passwordVisible}
                onFocus={() => handleFocus("password")}
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity
                style={styles.showHidePasswordButton}
                onPress={togglePasswordVisibility}
              >
                <Text style={styles.showHidePasswordButtonText}>Показати</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.loginButton}
                activeOpacity={0.5}
                onPress={onSubmitUserRegister}
              >
                <Text style={styles.loginButtonText}>Увійти</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.signupLink} activeOpacity={0.5}>
                <Text style={styles.signupLinkText}>
                  Немає акаунту? Зареєструватися
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    width: "100%",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    fontWeight: "500",
    fontSize: 30,
    marginTop: 32,
    lineHeight: 35,
  },
  inputField: {
    backgroundColor: "#F6F6F6",
    width: 343,
    height: 50,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    position: "relative",
  },
  inputCurrent: {
    backgroundColor: "#ffffff",
    borderColor: "#FF6C00",
    borderWidth: 1,
  },
  loginButton: {
    backgroundColor: "#FF6C00",
    height: 50,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 16,
  },
  signupLink: {
    marginTop: 16,
    marginBottom: 66,
  },
  signupLinkText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  showHidePasswordButtonText: {
    position: "absolute",
    right: -170,
    top: -35,
    paddingRight: 10,
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
