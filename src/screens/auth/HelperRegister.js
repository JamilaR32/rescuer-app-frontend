import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const HelperRegister = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);

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
    "Battery charger"
  ];

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(selectedSkill => selectedSkill !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const selectImage = () => {
    ImagePicker.showImagePicker({ title: 'Select Profile Picture' }, response => {
      if (!response.didCancel && !response.error) {
        setProfilePicture(response.uri);
      }
    });
  };

  const registerHelper = () => {
    // Registration logic, 
    // Send data to backend
    const userData = {
      fullName,
      phoneNumber,
      password,
      plateNumber,
      selectedSkills,
      profilePicture,
    };

    //i have to call the reg method in auth.js then pass user data

    // Thi is to reset the form after registration
    setFullName('');
    setPhoneNumber('');
    setPassword('');
    setPlateNumber('');
    setSelectedSkills([]);
    setProfilePicture(null); 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Helper Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={text => setFullName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Plate Number"
        value={plateNumber}
        onChangeText={text => setPlateNumber(text)}
      />
      <TouchableOpacity
        style={styles.profilePictureField}
        onPress={selectImage}
      >
        <Text style={styles.profilePictureText}>Select Profile Picture</Text>
      </TouchableOpacity>
      {profilePicture && <Image source={{ uri: profilePicture }} style={styles.profileImage} />}
      <Text style={styles.skillTitle}>Select Skills:</Text>
      <View style={styles.skillsContainer}>
        {skills.map(skill => (
          <TouchableOpacity
            key={skill}
            style={[styles.skillButton, selectedSkills.includes(skill) && styles.selectedSkillButton]}
            onPress={() => toggleSkill(skill)}
          >
            <Text>{skill}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button title="Register" onPress={registerHelper} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  profilePictureField: {
    backgroundColor: '#800080', 
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginBottom: 10,
    borderRadius: 5,
  },
  profilePictureText: {
    color: 'white',
  },
  profileImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 75,
  },
  skillTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  skillButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#eee',
    borderRadius: 20,
  },
  selectedSkillButton: {
    backgroundColor: '#007bff',
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
//         console.log("Helper register successfully");
//       }
//       // //check fix

//       // if (!response.ok) {
//       //     Error('Registration failed');
//       // }

//       // console.log('Helper register successfully');
//     } catch (error) {
//       console.log("Error registering helper", error.message);
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
//         <TouchableOpacity onPress={() => console.log("Open image picker")}>
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
