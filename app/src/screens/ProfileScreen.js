import { AuthContext } from '../contexts/AuthContext'
import { defaultColors, defaultStyles } from '../styles/defaultStyles'
import { Button, Text, TextInput, View, StyleSheet, Image } from 'react-native'
import { useContext, useState } from 'react'
import { ErrorMessage } from '../components/ErrorMessage'
import { useAccount } from '../hooks/useAccount'

export const ProfileScreen = () => {
  const [editMode, setEditMode] = useState('')
  const [editValue, setEditValue] = useState('')
  const [error, setError] = useState(null)
  const { signOut, deleteAccount } = useContext(AuthContext)
  const { user, updateProfile } = useAccount()
  const onError = err => setError(err)

  if (!user) {
    return null 
  }
  const updateField = ({ fieldName }) => {
    const options = {}
    options[fieldName] = editValue
    const onSuccess = () => {
      setError(null)
      setEditValue('')
      setEditMode('')
    }
    updateProfile({ options, onError, onSuccess })
  }

  const renderField = ({ title, fieldName }) => {
    const value = user[fieldName] || ''

    if (editMode === fieldName) {
      return (
        <>
          <Text style={styles.headline}>{title}</Text>
          <View style={defaultStyles.row}>
            <TextInput
              placeholder={title}
              autoFocus
              placeholderTextColor={defaultColors.placeholder}
              style={{ ...defaultStyles.text, ...defaultStyles.flex1 }}
              value={editValue}
              onChangeText={setEditValue}
            />
            <ErrorMessage error={error} />
            <View style={styles.btn}>
            <Button title='Update'  onPress={() => updateField({ fieldName })} />
            </View>
            <View>
            <Button title='Cancel' onPress={() => setEditMode('')} />
            </View>
          </View>
        </>
      )
    }

    return (
      <>
        <Text style={styles.headline}>{title}</Text>
        <View style={{ ...defaultStyles.row, alignSelf: 'stretch' }}>
          <Text style={{ ...defaultStyles.text, flexGrow: 1 }}>{user[fieldName] || 'Not yet defined'}</Text>
          <Button
            title='Edit' onPress={() => {
              setEditValue(value)
              setEditMode(fieldName)
            }}
          />
        </View>
      </>
    )
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../loginImg.png")} />
      <Text style={styles.headline}>Email</Text>
      <Text style={{ ...defaultStyles.text}}>{user.emails[0].address}</Text>

      {renderField({ title: 'First Name', fieldName: 'firstName' })}
      {renderField({ title: 'Last Name', fieldName: 'lastName' })}

      <Text style={styles.headline}>Danger Zone</Text>
      <View style={{ ...defaultStyles.dangerBorder, padding: 10, marginTop: 10, alignSelf: 'stretch' }}>
        <Button title='Sign out' color={defaultColors.danger} onPress={() => signOut({ onError })} />
        {/* <Button title='Delete account' color={defaultColors.danger} onPress={() => deleteAccount({ onError })} /> */}
        <ErrorMessage error={error} />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  headline: {
    ...defaultStyles.bold,
    alignSelf: 'flex-start',
    marginLeft:13
  },
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
  btn:{
    margin: 10,
  }
});
