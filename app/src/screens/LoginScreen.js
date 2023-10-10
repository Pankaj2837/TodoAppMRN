import React, { useState, useContext } from 'react'
import { View, Text, TextInput, Button , StyleSheet,Image,TouchableOpacity} from 'react-native'
import { AuthContext } from '../contexts/AuthContext'
import { defaultColors, defaultStyles } from '../styles/defaultStyles'
import { ErrorMessage } from '../components/ErrorMessage'

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { signIn } = useContext(AuthContext)

  // handlers
  const onError = err => setError(err)
  const onSignIn = () => signIn({ email, password, onError })
  const onSignUp = () => navigation.navigate('SignUp')

  // render login form
  return (
    
    <View style={styles.container}>
    <Image style={styles.image} source={require("../../loginImg.png")} />
      <View style={styles.inputView}>
      <TextInput
        style={styles.TextInput}
        placeholder='Your Email'
        placeholderTextColor={defaultColors.placeholder}
        value={email}
        onChangeText={(email) => setEmail(email)}
      /> 
    </View> 
    <View style={styles.inputView}>
      <TextInput
        style={styles.TextInput}
        placeholder='Your Password'
        placeholderTextColor={defaultColors.placeholder}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      /> 
    </View>
    <TouchableOpacity>
      <Text style={styles.forgot_button} onPress={onSignUp}>Don't have an account? Click here to Sign In </Text> 
    </TouchableOpacity>
    <Button title='Sign In' onPress={onSignIn} />
      <ErrorMessage error={error} />
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
    marginTop: 20,
  },
  highlight: {
    fontWeight: '700',
  },
  inputView: {
    backgroundColor: "#e6eff0",
    borderRadius: 20,
    width: "80%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 40,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 10,
  },
  loginBtn: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFC0CB",
  },
});
