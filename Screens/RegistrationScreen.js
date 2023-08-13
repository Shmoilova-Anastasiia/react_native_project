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
  Dimensions,
} from "react-native";

const backgroundImage = require("../assets/images/bgimage.png");
const buttonImg = require("../assets/images/addIcon.png");

const initialState = {
  email: "",
  password: "",
  name: "",
};

export default function RegistrationScreen() {
  const [fontsLoaded] = useFonts({
    Roboto: require("../assets/fonts/Roboto.ttf"),
  });
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const hideKeyboard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setstate(initialState);
  };

  const handleName = (value) =>
    setstate((prevState) => ({ ...prevState, name: value }));

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
                <View style={styles.photoContainer}>
                  <TouchableOpacity
                    style={styles.addButton}
                    activeOpacity={0.5}
                  >
                    <ImageBackground
                      source={buttonImg}
                      style={{ width: "100%", height: "100%" }}
                    ></ImageBackground>
                  </TouchableOpacity>
                </View>

                <Text style={styles.title}>Реєстрація</Text>

                <TextInput
                  style={styles.inputField}
                  placeholder="Логін"
                  inputMode="text"
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.name}
                  onChangeText={handleName}
                />
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
                  style={styles.registerButton}
                  activeOpacity={0.5}
                  onPress={hideKeyboard}
                >
                  <Text style={styles.registerButtonText}>Зареєстpуватися</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginLink} activeOpacity={0.5}>
                  <Text style={styles.loginLinkText}>Вже є акаунт? Увійти</Text>
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
  photoContainer: {
    marginTop: -60,
    height: 120,
    width: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addButton: {
    marginTop: "65%",
    left: "90%",
    height: 25,
    width: 25,
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
  registerButton: {
    backgroundColor: "#FF6C00",
    height: 50,
    width: 343,
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
