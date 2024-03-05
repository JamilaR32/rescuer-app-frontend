import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

const PasswordValidator = () => {
  const [password, setPassword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [strength, setStrength] = useState("");

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
      <View style={styles.Heading}>
        <Text style={styles.HeadingText}>Password Validator</Text>
      </View>
      <TextInput
        placeholder="Enter your password"
        onChangeText={(text) => {
          setPassword(text);
          validatePassword(text);
        }}
        style={styles.textInput}
      />
      <Text style={styles.strengthText}>Password Strength: {strength}</Text>
      <Text style={styles.suggestionsText}>
        {suggestions.map((suggestion, index) => (
          <Text key={index}>
            {suggestion}
            {"\n"}
          </Text>
        ))}
      </Text>
      <View style={styles.strengthMeter}>
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
    </View>
  );
};
const styles = StyleSheet.create({
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
export default PasswordValidator;
