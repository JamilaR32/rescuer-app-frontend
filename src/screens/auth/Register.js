import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../../navigations";
const logo = require("../../../assets/logo/rescLogo.png");
import { useMutation } from "@tanstack/react-query";
import { register } from "../../api/auth";
import UserContext from "../../context/UserContext";
import { jwtDecode } from "jwt-decode";
import { TextInput } from "react-native";

const Register = () => {
  //validatePasswordStrength
  const [userInfo, setUserInfo] = useState({});
  const [user, setUser] = useContext(UserContext);

  const navigation = useNavigation();
  const { mutate } = useMutation({
    mutationFn: () => register(userInfo),
    onSuccess: (data) => {
      const decode = jwtDecode(data.token);
      setUser(decode);
    },
  });
  const [strength, setStrength] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const validatePassword = (input) => {
    let newSuggestions = [];
    if (input.length < 8) {
      newSuggestions.push("Password should be at least 8 characters long");
    }
    if (!/\d/.test(input)) {
      newSuggestions.push("Add at least one number");
    }

    if (!/[A-Z]/.test(input) || !/[a-z]/.test(input)) {
      newSuggestions.push("Include both upper and lower case letters");
    }

    if (!/[^A-Za-z0-9]/.test(input)) {
      newSuggestions.push("Include at least one special character");
    }

    setSuggestions(newSuggestions);

    // Determine password strength based on suggestions
    if (newSuggestions.length === 0) {
      setStrength("Very Strong");
    } else if (newSuggestions.length <= 1) {
      setStrength("Strong");
    } else if (newSuggestions.length <= 2) {
      setStrength("Moderate");
    } else if (newSuggestions.length <= 3) {
      setStrength("Weak");
    } else {
      setStrength("Too Weak");
    }
  };
  return (
    <View style={styles.container}>
      <Image
        style={{
          height: 200,
          width: 200,
          borderRadius: 200,
          marginBottom: 20,
        }}
        source={logo}
      />

      <Text style={styles.label}>Civil ID</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Civil ID"
        onChangeText={(text) => {
          setUserInfo({ ...userInfo, civilId: text });
        }}
      />
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Full Name"
        onChangeText={(text) => {
          setUserInfo({ ...userInfo, fullName: text });
        }}
      />
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Phone number"
        onChangeText={(text) => {
          setUserInfo({ ...userInfo, phoneNumber: text });
        }}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        secureTextEntry
        textContentType="password"
        style={styles.input}
        placeholder="Enter your password"
        onChangeText={(text) => {
          setUserInfo({ ...userInfo, password: text });
          validatePassword(text);
        }}
      />
      <Text style={styles2.strengthText}> {strength}</Text>

      <Text style={styles2.suggestionsText}>
        {suggestions.map((suggestion, index) => (
          <Text key={index}>
            {suggestion}
            {"\n"}
          </Text>
        ))}
      </Text>
      <View style={styles2.strengthMeter}>
        <View
          style={{
            width: `${
              strength === "Very Strong"
                ? 100
                : strength === "Strong"
                ? 75
                : strength === "Moderate"
                ? 50
                : strength === "Weak"
                ? 25
                : 0
            }%`,
            height: 20,
            backgroundColor:
              strength === "Too Weak"
                ? "red"
                : strength === "Weak"
                ? "orange"
                : strength === "Moderate"
                ? "yellow"
                : strength === "Strong"
                ? "green"
                : "limegreen",
          }}
        ></View>
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={mutate}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          gap: 5,
        }}
      >
        <Text style={styles.footer}>Already a user?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.AUTH.AUTH_NAVIGATION.LOGIN)}
        >
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f4ef",
    flexDirection: "column",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#eaddcf",
    width: "90%",
  },
  buttonContainer: {
    marginTop: 20,
    width: "80%",
    borderRadius: 20,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 16, // Adjust based on your layout preference
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
  },
  footer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
    fontStyle: "italic",
  },
  link: {
    color: "#f25042",
    marginTop: 10,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  helperLink: {
    color: "#f25042",
    marginLeft: 5,
  },
  registerButton: {
    backgroundColor: "#8c7851",
    padding: 10,
    borderRadius: 20,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginHorizontal: 12,
    marginBottom: 10,
    top: 10,
  },
  edutButton: {
    backgroundColor: "#f25042",
    padding: 10,
    borderRadius: 20,
    width: "98%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -10,
  },
  registerButtonText: {
    color: "#fffffe",
    fontSize: 16,
  },
});
const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  Heading: {
    marginTop: 40,
    padding: 40,
  },
  HeadingText: {
    fontSize: 25,
    alignItems: "center",
    fontWeight: "bold",
  },
  textInput: {
    borderWidth: 1,
    width: 300,
    padding: 10,
    marginBottom: 10,
  },
  strengthText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#007700",
  },
  suggestionsText: {
    color: "red",
  },
  strengthMeter: {
    width: "80%",
    height: 20,
    backgroundColor: "#ccc",
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
});
