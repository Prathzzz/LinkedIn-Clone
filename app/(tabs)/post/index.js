import {
  StyleSheet,
  Image,
  Pressable,
  Text,
  ScrollView,
  View,
  Platform
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "@expo/vector-icons/Entypo";
import { TextInput } from "react-native-gesture-handler";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from "axios";
import { useRouter } from "expo-router";
import { storage } from "../../../firebase";
const index = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const createPost = async () => {
    try {
      const uploadedUrl = await uploadFile();

      const postData = {
        description: description,
        imageUrl: uploadedUrl,
        userId: userId,
      };

      const response = await axios.post(
        "http://localhost:3000/create",
        postData
      );

      console.log("post created", response.data);
      if (response.status === 201) {
        router.replace("/(tabs)/home");
      }
    } catch (error) {
      console.log("error creating post", error);
    }
  };
  
  const uploadFile = async () => {
    if (!image) {
      throw new Error("No image selected");
    }
  
    const response = await fetch(image);
    const blob = await response.blob();
  
    const filename = image.substring(image.lastIndexOf("/") + 1);
    const storageRef = ref(storage, `images/${filename}`);
    
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
  
    return downloadURL;
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          marginVertical: 12,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Entypo name="circle-with-cross" size={24} color="black" />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{
                uri: "https://i.pinimg.com/736x/f3/78/4a/f3784adc704a1bc9bcb2e494cd39caee.jpg",
              }}
            />
            <Text style={{ fontWeight: "500" }}>Anyone</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
            marginRight: 8,
          }}
        >
          <Entypo name="back-in-time" size={24} color="black" />
          <Pressable
            onPress={createPost}
            style={{
              padding: 10,
              backgroundColor: "#0072b1",
              borderRadius: 20,
              width: 80,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Post
            </Text>
          </Pressable>
        </View>
      </View>
      <TextInput
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder="What do you want to talk about"
        placeholderTextColor={"grey"}
        style={{
          marginHorizontal: 10,
          fontSize: 15,
          fontWeight: "500",
          marginTop: 10,
        }}
        multiline={true}
        rows={4}
        textAlignVertical={"top"}
      
      />

      <Image
            source={{ uri: image }}
            style={{ width: "100%", height: 240, marginVertical: 20 }}
      />
      

      <Pressable
        style={{
          flexDirection: "coloumn",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <Pressable
          onPress={pickImage}
          style={{
            width: 40,
            height: 40,
            marginTop: 15,
            backgroundColor: "#E0E0E0",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Entypo name="images" size={24} color="black" />
        </Pressable>
        <Text>Media</Text>
      </Pressable>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
