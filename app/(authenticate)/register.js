import { StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  Alert } from 'react-native';
  import Ionicons from '@expo/vector-icons/Ionicons';
  import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
  import React,{useState} from 'react';
  import AntDesign from '@expo/vector-icons/AntDesign';
  import { useRouter } from "expo-router";
  import axios from 'axios';
  import Fontisto from '@expo/vector-icons/Fontisto';
const register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  const handleRegister = () => {
    console.log("hello")
    const user = {
        name:name,
        email:email,
        password:password,
        profileImage:image
    }

    axios.post("http://localhost:3000/register",user).then((response) => {
        console.log(response);
        alert("Check your mail for verification");
        setName("");
        setEmail("");
        setPassword("");
        setImage("");
    }).catch((error) => {
        alert("Registration failed","An error occurred while registering");
        console.log("registration failed",error)
    });
}
  return (
    <SafeAreaView>
      <View style={{flex: 1,alignItems:'center'}}>
        <img
          style={{ width: 400, height: 110, resizeMode: "contain",alignItems:'center' }}
           src= "https://www.freepnglogos.com/uploads/linkedin-logo-transparent-png-25.png"
         />
      </View>
      <KeyboardAvoidingView>
        <View style={{alignItems:"center"}}>
          <Text style={{fontSize: 17, fontWeight: "bold", marginTop: 12, color: "#041E42"}}>
            Register your Account</Text>
        </View>
        
        <View style={{marginTop:50}}>
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
          
          <FontAwesome5 style={{marginLeft:8}}name="user-alt" size={24} color="gray" />
          <TextInput 
           value={name}
           onChangeText={(text)=>setName(text)}
           style={{color:'gray',marginVertical:10,width:300,fontSize:name ? 18 :18,
           }} placeholder='Enter your name'/>
          </View>
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
          <Ionicons style={{marginLeft:8}} name="image-outline" size={24} color="gray" />
          <TextInput 
          value={image}
          onChangeText={(text)=>setImage(text)}
           style={{color:'gray',marginVertical:10,width:300,fontSize:image? 18:18}} placeholder='Upload image'/>
          </View>
          <View style={{marginTop:12,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{fontSize:18}}>Keep me logged in</Text>
            <Text style={{color:'#007FFF',fontWeight:'500',fontSize:18}}>Forgot password</Text>
          </View>
          <View style={{marginTop:80}}>
          <Pressable onPress={handleRegister}
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
              Register
            </Text>
          </Pressable>
          <Pressable onPress={()=>router.replace('/login')}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 20 }}>
              Already have an account? Login
            </Text>
          </Pressable>
          </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default register

const styles = StyleSheet.create({})