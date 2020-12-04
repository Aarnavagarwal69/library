import { database } from 'firebase';
import React,{Component} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import db from '../config'
import firebase from 'firebase'
import MyHeader from '../components/header'



export default class Bookrequest extends Component{
    constructor(){
        super();
        this.state={
            userid:firebase.auth().currentUser.email,
            bookname:'',
            reason:''
        }
    }

createuniqueid(){
    return Math.random().toString(36).substring(7);
}


addrequest=(a,b)=>{
    var userid=this.state.userid
    var randomrequestid = this.createuniqueid()
    db.collection('requested books').add({
        "userid":userid,
        "reason":b,
        "bookname":a,
        "requestid":randomrequestid,
    })

this.setState({
    bookname:'',
    reason:''
})
return Alert.alert("book requested successfully")

}

    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader title="request"/>
                <KeyboardAvoidingView style={styles.keyboardstyle}>
                    <TextInput style={styles.formtextinput} placeholder="Enter your book name" onChangeText={(text)=>{this.setState({bookname:text})}} value={this.state.bookname}/>
                    <TextInput style={[styles.formtextinput, {height:300}]} multiline numberOfLines={8} placeholder="Enter your reason" onChangeText={(text)=>{this.setState({reason:text})}} value={this.state.reason}/>
                    <TouchableOpacity style={styles.button} onPress={()=>{this.addrequest(this.state.bookname,this.state.reason)}}>
                        <Text>
                            request
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>

        )
    }
}


const styles = StyleSheet.create({
    keyboardstyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    formtextinput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      
      },
    }
  )