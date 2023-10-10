import React, { useContext, useState } from 'react'
import { TextInput, Button,Image,StyleSheet,Text,View} from 'react-native'
import { defaultColors, defaultStyles } from '../styles/defaultStyles'
import { AuthContext } from '../contexts/AuthContext'
import { ErrorMessage } from '../components/ErrorMessage'
import Meteor from '@meteorrn/core'
export const RegistrationScreen = () => {
  const [email, setEmail] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()
  const { signUp } = useContext(AuthContext)
  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const onError = err => setError(err)
  const onSignUp = () =>{
    if(!email || !password || !firstName || !lastName){
      alert("Please fill all details!!")
    }else if(emailRegex.test(email)==false){
      alert("Enter valid email-id !!")
    }else if(passwordRegex.test(password) == false){
      alert("Password must be 8 charecter long. \n It contain atleast one uppercase latter. \n It contain atleast one lowercase latter.\n It contain atleast one special charecter. \n It contain atleast one number.")
    }else{
      signUp({ email, password, firstName, lastName, onError });
      Meteor.call('userlist.insert', {firstName,lastName, email, password}, (err) => {
        if (err) {
          console.log(err);
          return setError(err);
        }
        setError(null)
      })
    }
    }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../loginImg.png")} />
      <View style={styles.inputView}>
      <TextInput
        placeholder='Your Email'
        placeholderTextColor={defaultColors.placeholder}
        style={styles.TextInput}
        value={email}
        onChangeText={setEmail}
      />
      </View>
      <View style={styles.inputView}>
      <TextInput
        placeholder='Your password'
        placeholderTextColor={defaultColors.placeholder}
        style={styles.TextInput}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      </View>
      <View style={styles.inputView}>
      <TextInput
        placeholder='Your first name'
        placeholderTextColor={defaultColors.placeholder}
        style={styles.TextInput}
        value={firstName}
        onChangeText={setFirstName}
      />
      </View>
      <View style={styles.inputView}>
      <TextInput
        placeholder='Your last name'
        placeholderTextColor={defaultColors.placeholder}
        style={styles.TextInput}
        value={lastName}
        onChangeText={setLastName}
      />
      </View>
      <ErrorMessage error={error} />
      <Button style={styles.forgot_button} title='Create new account' onPress={onSignUp} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#3fccd1",
      alignItems: "center",
      justifyContent: "center",
  },
  image: {
      marginBottom: 10,
      marginTop: 50,
  },
  highlight: {
      fontWeight: '700',
  },
  inputView: {
      backgroundColor: "#e6eff0",
      borderRadius: 20,
      width: "80%",
      height: 45,
      marginBottom: 10,
      alignItems: "center",
  },
  TextInput: {
      height: 40,
      flex: 1,
      padding: 10,
      marginLeft: 20,
  },
  forgot_button: {
      marginBottom: 30,
  },
  loginBtn: {
      width: "100%",
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFC0CB",
  },
});