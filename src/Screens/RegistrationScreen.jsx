import React, { useState } from "react";
import { useFonts } from "expo-font";
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
import { AntDesign } from "@expo/vector-icons";

const backgroundImage = require("../assets/images/bgimage.png");
{
  /* <AntDesign name="closecircleo" size={24} color="black" />; */
}

export default function RegistrationScreen() {
  const [fontsLoaded] = useFonts({
    Roboto: require("../assets/fonts/Roboto.ttf"),
  });
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [currentFocused, setCurrentFocused] = useState("");

  const clearForm = () => {
    setLogin("");
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
    if (!login || !email || !password)
      return console.warn("Будь ласка заповніть поля");

    console.log({ login, email, password });
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
        keyboardVerticalOffset={-160}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.container}>
          <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.formContainer}>
              <View style={styles.photoContainer}></View>
              <TouchableOpacity style={styles.addButton} activeOpacity={0.5}>
                <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
              </TouchableOpacity>

              <Text style={styles.title}>Реєстрація</Text>

              <TextInput
                style={[
                  styles.inputField,
                  currentFocused === "login" && styles.inputCurrent,
                ]}
                placeholder="Логін"
                inputMode="text"
                onFocus={() => handleFocus("login")}
                value={login}
                onChangeText={setLogin}
              />

              <TextInput
                style={[
                  styles.inputField,
                  currentFocused === "email" && styles.inputCurrent,
                ]}
                placeholder="Адреса електронної пошти"
                inputMode="email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                onFocus={() => handleFocus("email")}
              />
              <View
                style={{
                  width: "100%",
                }}
              >
                <TextInput
                  style={[
                    styles.inputField,
                    currentFocused === "password" && styles.inputCurrent,
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
                  <Text style={styles.showHidePasswordButtonText}>
                    {passwordVisible ? "Сховати" : "Показати"}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.registerButton}
                activeOpacity={0.5}
                onPress={onSubmitUserRegister}
              >
                <Text style={styles.registerButtonText}>Зареєстpуватися</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginLink} activeOpacity={0.5}>
                <Text style={styles.loginLinkText}>Вже є акаунт? Увійти</Text>
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
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    width: "100%",

    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  keyboardAvoidingView: {
    justifyContent: "flex-end",
    flex: 1,
  },
  photoContainer: {
    position: "relative",
    marginTop: -60,
    height: 120,
    width: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    overflow: "hidden",
  },
  addButton: {
    position: "absolute",
    left: "67%",
    top: 10,
    pointerEvents: "auto",
  },
  title: {
    fontWeight: "500",
    fontSize: 30,
    marginTop: 32,
    lineHeight: 35,
  },
  inputField: {
    backgroundColor: "#F6F6F6",
    width: "100%",
    height: 50,
    borderRadius: 8,
    borderColor: "#e8e8e8",
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

  registerButton: {
    backgroundColor: "#FF6C00",
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 16,
  },
  loginLink: {
    marginTop: 16,
    marginBottom: 66,
  },
  loginLinkText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },

  showHidePasswordButton: {
    position: "absolute",
    right: 0,
    top: 13,
    alignSelf: "center",

    padding: 16,

    backgroundColor: "transparent",
  },
  showHidePasswordButtonText: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
