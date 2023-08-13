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
  Dimensions,
} from "react-native";

const backgroundImage = require("../assets/images/bgimage.png");

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const hideKeyboard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setstate(initialState);
  };

  const handleMail = (value) =>
    setstate((prevState) => ({ ...prevState, email: value }));

  const handlePassword = (value) =>
    setstate((prevState) => ({ ...prevState, password: value }));

  const [dimensions] = useState(Dimensions.get("window").width - 0 * 2);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.background}>
        <TouchableWithoutFeedback onPress={hideKeyboard}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
          >
            <View
              style={{
                marginBottom: isShowKeyboard ? -170 : 0,
                width: dimensions,
              }}
            >
              <View style={styles.formContainer}>
                <Text style={styles.title}>Увійти</Text>

                <TextInput
                  style={styles.inputField}
                  placeholder="Адреса електронної пошти"
                  inputMode="email"
                  value={state.email}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={handleMail}
                  autoCapitalize="none"
                />

                <TextInput
                  style={styles.inputField}
                  placeholder="Пароль"
                  placeholderTextColor="#BDBDBD"
                  secureTextEntry={!passwordVisible}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.password}
                  onChangeText={handlePassword}
                />

                <TouchableOpacity
                  style={styles.showHidePasswordButton}
                  onPress={togglePasswordVisibility}
                >
                  <Text style={styles.showHidePasswordButtonText}>
                    {passwordVisible ? "Сховати" : "Показати"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.loginButton}
                  activeOpacity={0.5}
                >
                  <Text style={styles.loginButtonText}>Увійти</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.signupLink} activeOpacity={0.5}>
                  <Text style={styles.signupLinkText}>
                    Немає акаунту? Зареєструватися
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
