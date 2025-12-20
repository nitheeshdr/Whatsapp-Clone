import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import {  useRouter } from 'expo-router'

const LoginScreen = () => {

    const [phone,setPhone] = useState("+91")

    const router = useRouter();

    const isValidNumber = /^\+\d{1,3}\s?\d{10}$/.test(phone)

    const handleNext = () => {
        if (!isValidNumber) {
            Alert.alert("Invalid number","Enter a vaild phone number.")
            return;
        }
        router.push({pathname: "/otp" , params: {phone}})
    }

  return (
    <View className='flex-1 bg-white items-center justify-center px-5  '>
      <Text className='text-3xl font-bold text-gray-900 mb-4 '>Enter Your Phone Number</Text>
      <Text className='text-gray-500 text-lg text-center mb-6'>Whatapp will send SMS to verify your Number</Text>

      <TextInput 
      className='border border-gray-300 p-4  text-lg rounded-lg w-full text-center mb-4'
      placeholder='Enter your Phone Number'
      keyboardType='phone-pad'
      value={phone}
      onChangeText={setPhone}
      />

      <TouchableOpacity className={`p-4 w-full rounded-full ${isValidNumber ? "bg-green-500 mt-6" : "bg-gray-300"}`} 
      disabled={!isValidNumber}
      onPress={handleNext}>
        <Text className='text-white text-center font-bold text-lg '>Next</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen