import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@tanstack/react-query";
import { registerHelperAPI } from "../../api/auth";
import { jwtDecode } from "jwt-decode";
import UserContext from "../../context/UserContext";
import { MaterialIcons } from "@expo/vector-icons";

const HelperRegister = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [civilId, setCivilId] = useState("");
  const [user, setUser] = useContext(UserContext);
  const { mutate } = useMutation({
    mutationKey: ["registerHelper"],
    mutationFn: (info) => registerHelperAPI(info),
    onSuccess: (data) => {
      const token = data.token;
      const decode = jwtDecode(token);
      //console.log(decode);
      setUser(decode);
    },
  });

  // all the skills needed so far
  const skills = [
    "Kinetic and tow rope",
    "Spare tire and tools",
    "First aid kit",
    "Tire Inflator Gauge",
    "Navigation aids",
    "Shovel",
    "High lift jack",
    "Shackles",
    "A torch and flashlight",
    "Battery charger",
  ];

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(
        selectedSkills.filter((selectedSkill) => selectedSkill !== skill)
      );
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const selectImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const registerHelper = () => {
    // Registration logic,
    // Send data to backend
    const userData = {
      fullName,
      phoneNumber,
      civilId,
      password,
      plateNumber,
      skills: selectedSkills,
      image: profilePicture,
    };

    mutate(userData);
    //i have to call the reg method in auth.js then pass user data
  };

  return (
    <View style={styles.container}>
      {/* <Image
        style={{
          height: 150,
          width: 150,
          borderRadius: 150,
          marginBottom: 20,
        }}
        source={logo}
      /> */}

      {/* <Text style={styles.title}>Helper Registration</Text> */}
      <TouchableOpacity onPress={selectImage}>
        {/* {profilePicture && (
          )} */}
        <Image
          source={{ uri: profilePicture }}
          style={{
            height: 170,
            width: 170,
            borderRadius: 85,
            borderWidth: 0.5,
            borderColor: "#8c7851",
            marginTop: 30,
            marginBottom: 20,
          }}
        />
        <View
          style={{
            position: "absolute",
            bottom: 50,
            top: 80,
            right: 48,
            zIndex: 9999,
          }}
        >
          <MaterialIcons name="photo-camera" size={80} color="gray" />
        </View>
      </TouchableOpacity>

      <ScrollView>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Civil ID"
          value={civilId}
          onChangeText={(text) => setCivilId(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Plate Number"
          value={plateNumber}
          onChangeText={(text) => setPlateNumber(text)}
        />

        <Text style={styles.skillTitle}>Select Skills:</Text>
        <View style={styles.skillsContainer}>
          {skills.map((skill) => (
            <TouchableOpacity
              key={skill}
              style={[
                styles.skillButton,
                selectedSkills.includes(skill) && styles.selectedSkillButton,
              ]}
              onPress={() => toggleSkill(skill)}
            >
              <Text>{skill}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={registerHelper}
        >
          <Text style={styles.registerButtonText}>Register As Helper</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f9f4ef",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#eaddcf",
    width: "100%",
  },
  profilePictureField: {
    backgroundColor: "#f25042",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    marginBottom: 10,
    borderRadius: 5,
  },
  profilePictureText: {
    color: "white",
  },
  profileImage: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    marginBottom: 10,
    borderRadius: 75,
  },
  skillTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    justifyContent: "center",
  },
  skillButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#eaddcf",
    borderRadius: 20,
  },
  selectedSkillButton: {
    backgroundColor: "#8c7851",
  },
  registerButton: {
    backgroundColor: "#8c7851",
    padding: 10,
    borderRadius: 20,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -10,
    marginHorizontal: 12,
    marginBottom: 10,
    top: 10,
  },
  registerButtonText: {
    color: "#fffffe",
    fontSize: 16,
  },
});

export default HelperRegister;

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   CheckBox,
// } from "react-native";

// const HelperRegister = ({ authToken }) => {
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [plateNumber, setPlateNumber] = useState("");
//   const [selectedSkills, setSelectedSkills] = useState([]);

//   const toggleSkill = (skill) => {
//     if (selectedSkills.includes(skill)) {
//       setSelectedSkills(selectedSkills.filter((item) => item !== skill));
//     } else {
//       setSelectedSkills([...selectedSkills, skill]);
//     }
//   };

//   const handleRegister = async () => {
// try {
//   const registrationData = {
//     profilePicture,
//     plateNumber,
//     skill: selectedSkills,
//       };
//       // i need to set the token here
//       //i need to integrate it in api
//       const authToken = "";

//   const response = await fetch("https://", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${authToken}`,
//     },

//         body: JSON.stringify(registrationData),
//       });
//       //check fix
//       if (!response.ok) {
//         return Error("Registration failed");
//       } else {
//         //console.log("Helper register successfully");
//       }
//       // //check fix

//       // if (!response.ok) {
//       //     Error('Registration failed');
//       // }

//       // //console.log('Helper register successfully');
//     } catch (error) {
//       //console.log("Error registering helper", error.message);
//     }
//   };
// //image, phone number, password
//   return (
//     <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//       <View
//         style={{
//           flex: 1,
//           alignItems: "center",
//           justifyContent: "center",
//           padding: 20,
//         }}
//       >
//         <Text style={{ fontSize: 24, marginBottom: 20 }}>
//           Helper Registration
//         </Text>
//         <TouchableOpacity onPress={() => //console.log("Open image picker")}>
//           {profilePicture ? (
//             <Image
//               source={{ uri: profilePicture }}
//               style={{
//                 width: 200,
//                 height: 200,
//                 borderRadius: 100,
//                 marginBottom: 20,
//               }}
//             />
//           ) : (
//             <View
//               style={{
//                 width: 200,
//                 height: 200,
//                 backgroundColor: "lightGray",
//                 borderRadius: 100,
//                 marginBottom: 20,
//               }}
//             />
//           )}
//         </TouchableOpacity>
//         <TextInput
//           style={{
//             height: 40,
//             borderColor: "gray",
//             borderWidth: 1,
//             marginBottom: 20,
//             padding: 10,
//           }}
//           placeholder="Enter Plate Number"
//           value={plateNumber}
//           onChangeText={(text) => setPlateNumber(text)}
//         />
//         <Text style={{ fontSize: 18, marginBottom: 10 }}>Select Skills:</Text>
//         <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
//           {[
//             "Kinetic and tow rope",
//             "Spare tire and tools",
//             "First aid kit",
//             "Tire Inflator Gauge",
//             "Navigation aids",
//             "Shovel",
//             "High lift jack",
//             "Shackles",
//             "A torch and flashlight",
//             "Battery charger",
//           ].map((skill, index) => (
//             <View
//               key={index}
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 marginRight: 10,
//               }}
//             >
//               {/* <CheckBox
//                 value={selectedSkills.includes(skill)}
//                 onValueChange={() => toggleSkill(skill)}
//               /> */}
//               <Text>{skill}</Text>
//             </View>
//           ))}
//         </ScrollView>
//         <TouchableOpacity
//           onPress={handleRegister}
//           style={{ backgroundColor: "blue", padding: 10, marginTop: 20 }}
//         >
//           <Text style={{ color: "white", fontSize: 18 }}>Register</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// export default HelperRegister;

// //add icon swiss
