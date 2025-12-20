import {  useRouter } from "expo-router";
import "../global.css"
import { Text,Image,View, TouchableOpacity } from "react-native";




  const router = useRouter();

export default function WelcomeScreen(){
  return <View className="flex-1 items-center bg-white justify-center px-5">
    <Image className="w-28 h-28 mb-10 " source={require("../assets/images/WhatsApp.svg")}/>
    <Text className="text-3xl font-bold text-gray-900 text-center mb-4">Welcome to ChatApp!</Text>
    
    <Text className="text-center mb-8">Read Our <Text className="text-green-500">Privacy Policy.</Text> Tap "Agree" & Continue to accept the <Text className="text-green-500">Term and Conditions</Text></Text>


    <TouchableOpacity className="bg-green-500 px-6 py-4 rounded-full w-full" onPress={()=>{ router.push("/login") }}>
      <Text className="text-white text-center font-bold text-lg">Agree</Text>
      </TouchableOpacity>    
  </View>
}