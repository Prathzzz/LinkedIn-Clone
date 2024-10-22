import { StyleSheet, Text, View,SafeAreaView, KeyboardAvoidingView, TextInput, Pressable } from 'react-native'
import React,{useState,useEffect} from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';
const login = () => {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const router = useRouter();
  useEffect(() => {
    const checkLoginStatus = async () => {
        try{
            const token = await AsyncStorage.getItem("authToken");
            if(token){
                router.replace("/(tabs)/home")
            }
        } catch(error){
            console.log(error);
        }
    }

    checkLoginStatus();
  },[])
  const handleLogin = () => {
    const user = {
        email: email,
        password: password
    }

    axios.post("http://localhost:3000/login", user).then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken",token);
        router.replace("/(tabs)/home")
    })
}
  return (
    <SafeAreaView>
      <View style={{alignItems:'center'}}>
        <img
          style={{ width: 400, height: 110, resizeMode: "contain",alignItems:'center' }}
           src= "https://www.freepnglogos.com/uploads/linkedin-logo-transparent-png-25.png"
         />
      </View>
      <KeyboardAvoidingView>
        <View style={{alignItems:"center"}}>
          <Text style={{fontSize: 17, fontWeight: "bold", marginTop: 12, color: "#041E42"}}>
            Log in to your Account</Text>
        </View>

        
          <View
            style={{
              flexDirection:'row',
              alignItems:"center",
              gap:5,
              backgroundColor:'#E0E0E0',
              paddingVertical:5,
              borderRadius:5,
              marginTop:30,marginTop:70
            }}>
          <Fontisto style={{marginLeft:8}} name="email" size={24} color="gray" />
          <TextInput 
           value={email}
           onChangeText={(text)=>setEmail(text)}
           style={{color:'gray',marginVertical:10,width:300,fontSize:email ? 18 :18,
           }} placeholder='Enter your Email'/>
          </View>
        
        <View
            style={{
              flexDirection:'row',
              alignItems:"center",
              gap:5,
              backgroundColor:'#E0E0E0',
              paddingVertical:5,
              borderRadius:5,
              marginTop:30,
            }}>
          <AntDesign style={{marginLeft:8}} name="lock" size={24} color="gray" />
          <TextInput 
          value={password}
          onChangeText={(text)=>setPassword(text)}
           secureTextEntry={true} 
           style={{color:'gray',marginVertical:10,width:300,fontSize:password? 18:18}} placeholder='Enter your password'/>
          </View>
          <View style={{marginTop:12,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{fontSize:18}}>Keep me logged in</Text>
            <Text style={{color:'#007FFF',fontWeight:'500',fontSize:18}}>Forgot password</Text>
          </View>
          
          <Pressable
          onPress={handleLogin}
            style={{
              width: 200,
              backgroundColor: "#0072b1",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Login
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.replace("/register")}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
              Don't have an account? Sign Up
            </Text>
          </Pressable>
          
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login

const styles = StyleSheet.create({})