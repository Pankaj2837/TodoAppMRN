import React, { useState } from 'react'
import { TextInput, Button, Image, StyleSheet, View } from 'react-native'
import { defaultColors } from '../styles/defaultStyles'
import { ErrorMessage } from '../components/ErrorMessage'
import { useAccount } from '../hooks/useAccount'
import { UserlistCollection } from '../Userlist/UserlistCollection'
import Meteor, { useTracker } from '@meteorrn/core'
import SelectDropdown from 'react-native-select-dropdown'
export const CreateTask = ({ navigation, route}) => {
  const { user } = useAccount()
  const [title, setTitle] = useState()
  const [assignTo, setAssignTo] = useState()
  const [discription, setDiscription] = useState()
  const [taskStatus, setTaskStatus] = useState()
  const [error, setError] = useState()
  // const onError = err => setError(err)
  const status = ["InProgress", "OnHold", "Pendding", "Completed"];
  const finalUsersList = [];
  const { userList, isLoading } = useTracker(() => {
    let userListData = { userList: [] }
    if (!user) {
      return userListData
    }

    const handlerUserList = Meteor.subscribe('userlist.myusers')

    if (!handlerUserList.ready()) {
      return { ...userListData, isLoading: true }
    }
    const userList = UserlistCollection.find({}, { fields: { 'firstName': 1, 'lastName': 1, 'email': 1 } }).fetch()

    return { userList }
  }, []);

  userList.forEach((h) => {
    finalUsersList.push(h.firstName + " " + h.lastName);
  })
  const handleSubmit = e => {
    // if (!title && !assignTo && !discription) return
    Meteor.call('tasks.insert', { title, assignTo, discription, taskStatus }, (err) => {
      if (err) {
        return setError(err)
      }
      setError(null)
    })
    setTitle("");
    setAssignTo("");
    setDiscription("");
    setTaskStatus("");
    navigation.navigate('Home');
  }
  let _id="";
  if(route.params !== undefined && route.params !== " "){
   _id = route.params.paramKey.id;
  }
  const handleUpdate = e =>{
    e.preventDefault();
    Meteor.call('tasks.updateTask', {_id ,title, assignTo, discription, taskStatus }, (err) => {
      if (err) {
        return setError(err)
      }
      setError(null)
    })
    setTitle("");
    setAssignTo("");
    setDiscription("");
    setTaskStatus("");
    navigation.navigate('Home');
  }

  if(route.params !== undefined && route.params !== ""){
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require("../../addtask.png")} />
        <View style={styles.inputView}>
          <TextInput
            placeholder='Task title'
            placeholderTextColor={defaultColors.placeholder}
            style={styles.TextInput}
            defaultValue={route.params.paramKey.title}
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            placeholder='Assigned user'
            placeholderTextColor={defaultColors.placeholder}
            style={styles.TextInput}
            defaultValue={route.params.paramKey.assignTo}
            value={assignTo}
            onChangeText={setAssignTo}
            readOnly
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            placeholder='Task discription'
            placeholderTextColor={defaultColors.placeholder}
            style={styles.TextInput}
            defaultValue={route.params.paramKey.discription}
            value={discription}
            onChangeText={setDiscription}
          />
        </View>
        <View style={styles.inputView}>
        <SelectDropdown
          defaultButtonText="task status"
          buttonTextStyle={(setTaskStatus=='' || setTaskStatus==undefined)? btndrop : btndrop1}
          buttonStyle={btnScrdrop}
          data={status}
          defaultValue={route.params.paramKey.taskStatus}
          value ={taskStatus}
          onChangeText={setTaskStatus}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            setTaskStatus(selectedItem)
            return taskStatus
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />
      </View>
        <ErrorMessage error={error} />
        <Button style={styles.forgot_button} title='Update This Task' onPress={handleUpdate} />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../addtask.png")} />
      <View style={styles.inputView}>
        <TextInput
          placeholder='Task title'
          placeholderTextColor={defaultColors.placeholder}
          style={styles.TextInput}
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View style={styles.inputView}>
        <SelectDropdown
          defaultButtonText="Assign to user"
          buttonTextStyle={btndrop}
          buttonStyle={btnScrdrop}
          data={finalUsersList}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            setAssignTo(selectedItem)
            return assignTo
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />
      </View>
      <View style={styles.inputView}>
        <SelectDropdown
          defaultButtonText="Select status of task"
          buttonTextStyle={btndrop}
          buttonStyle={btnScrdrop}
          data={status}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            setTaskStatus(selectedItem)
            return taskStatus
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder='Task discription'
          placeholderTextColor={defaultColors.placeholder}
          style={styles.TextInput}
          value={discription}
          onChangeText={setDiscription}
        />
      </View>
      <ErrorMessage error={error} />
      <Button style={styles.forgot_button} title='Create new Task' onPress={handleSubmit} />
    </View>
  )
}
const btndrop = {
  color: '#8a8a8a',
  fontWeight: 'light',
  fontSize: 15,
  paddingLeft: 45
}
const btndrop1 = {
  color: '#030303',
  fontSize: 14,
  paddingLeft: 45,
}
const btnScrdrop = {
  height: 40,
  flex: 1,
  padding: 10,
  marginLeft: 20,
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