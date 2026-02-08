import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { use, useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

const OTPScreen = () => {
    const {phone} = useLocalSearchParams()
    const [generatedOTP,setGeneratedOTP] = useState("")
    const [otp,setOtp] = useState("")
    const [timer,setTimer] = useState(30)
    const [error,setError] = useState("")

    const router = useRouter();


    const generatedRandomOTP =() => {
        const randomOTP = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOTP(randomOTP)
        console.log("GEnerated OTP", randomOTP);
    }

    const resendOtp = () =>{
         generatedRandomOTP()
         setTimer(30);
    }

    const handleVerify = () => {

    setError("")

    if (otp.length !== 6) {
        setError("OTP must be 6 digits.")
        return
    }

    if (otp !== generatedOTP) {
        setError("Incorrect OTP. Please try again")
        return
    }

    // success
    router.push({
        pathname: "/account-setup",
        params: { phone }
    })
}

    useEffect(()=>{
        generatedRandomOTP()
        const interval = setInterval(() => setTimer((prev) => prev > 0 ? prev - 1: 0),1000)
        return()=> clearInterval(interval)
    },[])

  return (
  <View className='flex-1 bg-white items-center justify-center px-5'>
    <Text className='text-3xl font-bold text-gray-900 mb-4'>
        Enter The OTP
    </Text>

    <Text className='text-gray-500 text-lg text-center mb-6'>
        A 6-digit code has sent to {phone} ({generatedOTP})
    </Text>

    <TextInput 
        keyboardType='number-pad'
        value={otp}
        placeholder='Enter Otp'
        onChangeText={setOtp}
        maxLength={6}
        className='border border-gray-300 p-4 text-lg rounded-lg text-center w-3/4 '
    />

    {error? <Text className='text-red-500 mt-3'>{error}</Text>: null}


    <TouchableOpacity onPress={handleVerify} className='p-4 w-full rounded-full mt-6 bg-green-500'>
        <Text className='text-center text-white font-bold text-lg'>
            Verify
        </Text>
    </TouchableOpacity>

    <TouchableOpacity className='mt-4' onPress={()=> router.push("/login")}>
        <Text className='text-blue-500 text-lg' >Change Number</Text>
    </TouchableOpacity>

    <TouchableOpacity 
        className='mt-3' 
        onPress={resendOtp}
        disabled= {timer > 0} >
        <Text className={`${timer ? "text-gray-400": "text-blue-400"}`}>
            {timer > 0 ? `Resend OTP in ${timer} seconds` : "Resend"}
        </Text>
    </TouchableOpacity>

  </View>
)}

export default OTPScreen