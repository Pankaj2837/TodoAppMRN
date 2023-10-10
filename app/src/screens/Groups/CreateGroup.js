import React, { useState } from 'react'
import { TextInput, Button, Image, StyleSheet, View } from 'react-native'
import { defaultColors } from '../../styles/defaultStyles'
import { ErrorMessage } from '../../components/ErrorMessage'
import { useAccount } from '../../hooks/useAccount'
import { UserlistCollection } from '../../Userlist/UserlistCollection'
import Meteor, { useTracker } from '@meteorrn/core'
import MultiSelect from 'react-native-multiple-select';
export const CreateGroup = ({ navigation}) => {
  const { user } = useAccount()
  const [groupTitle, setGroupTitle] = useState()
//  const [groupMembers, setGroupMembers] = useState([])
  const [selectedItems, setSelectedItems] = useState([]);
  const [error, setError] = useState()

  
  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };
  const items = [
    // name key is must. It is to show the text in front
    {id: 1, name: 'angellist'},
    {id: 2, name: 'codepen'},
    {id: 3, name: 'envelope'},
    {id: 4, name: 'etsy'},
    {id: 5, name: 'facebook'},
    {id: 6, name: 'foursquare'},
    {id: 7, name: 'github-alt'},
    {id: 8, name: 'github'},
    {id: 9, name: 'gitlab'},
    {id: 10, name: 'instagram'},
  ];
  const finalUsersList = [];
  const usersEmail =[];
  const { userList, isLoading } = useTracker(() => {
    let userListData = { userList: [] }
    if (!user) {
      return userListData
    }

    const handlerUserList = Meteor.subscribe('userlist.myusers')

    if (!handlerUserList.ready()) {
      return { ...userListData, isLoading: true }
    }
    const userList = UserlistCollection.find({}, { fields: { 'firstName': 1, 'lastName': 1,'_id':1 } }).fetch()

    return { userList }
  }, []);

  userList.forEach((h) => {
   let obj ={
    id:h._id,
    name : h.firstName + " " + h.lastName,
   }
    finalUsersList.push(obj);
  })
  console.log(finalUsersList);
  const handleSubmit = e => {
    // if (!title && !assignTo && !discription) return
    Meteor.call('groups.insert', { groupTitle,groupMembers }, (err) => {
      if (err) {
        return setError(err)
      }
      setError(null)
    })
    setGroupTitle("");
    setGroupTitle("");
    navigation.navigate('Home');
  }
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../../addtask.png")} />
      <View style={styles.inputView}>
        <TextInput
          placeholder='Group title'
          placeholderTextColor={defaultColors.placeholder}
          style={styles.TextInput}
          value={groupTitle}
          onChangeText={setGroupTitle}
        />
      </View>
      <View style={styles.inputView}>
        <MultiSelect
        hideTags
        items={items}
        uniqueKey="id"
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItems}
        selectText="Pick Items"
        searchInputPlaceholderText="Search Items..."
        onChangeInput={(text) => console.log(text)}
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{color: '#CCC'}}
        submitButtonColor="#48d22b"
        submitButtonText="Submit"
      />
    </View>
      <ErrorMessage error={error} />
      <Button style={styles.forgot_button} title='Create Group' onPress={handleSubmit} />
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
