import React,{Component} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import db from '../config.js'
import firebase from 'firebase'
import MyHeader from '../components/header'


export default class Settingscreen extends Component{
    constructor(){
        super();
        this.state={
            emailID:'',
            Firstname:'',
            Lastname:'',
            Address:'',
            Contact:'',
            docID:''
        }
    }

    

    // getuserdetails=()=>{
    //     var email = firebase.auth().currentUser.email
    //     db.collection('Users').where('emailID', '==', email).get().then(snapshot=>{snapshot.forEach(doc=>{var data = doc.data()
    //         this.setState({
                // emailID:data.emailID,
                // Firstname:data.Firstname,
                // Lastname:data.Lastname,
                // Address:data.Address,
                // Contact:data.Contact,
                // docID:doc.id
    //         })
        
    //     })})
    // }

    getuserdetails=()=>{
        var email = firebase.auth().currentUser.email;
        console.log("email" + email)
        db.collection('Users').where('emailID','==',email).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
          var data = doc.data()
          console.log(data.emailID)
          console.log(data.Firstname)
            this.setState({
                emailID:data.emailID,
                Firstname:data.Firstname,
                Lastname:data.Lastname,
                Address:data.Address,
                Contact:data.Contact,
                docID:doc.id
            })
          });
        })
      }

    componentDidMount(){
        this.getuserdetails()
    }

    updateuser=()=>{
        db.collection('Users').doc(this.state.docID).update({
            Firstname:this.state.Firstname,
            Lastname:this.state.Lastname,
            Contact:this.state.Contact,
            emailID:this.state.emailID,
            Address:this.state.Address,
        })
        Alert.alert('profile updated successfully')
    }



    render(){
        return(
            <View style={styles.container}>
               <MyHeader title="settings"/> 
               <View style={styles.formcontainer}>
               <TextInput style={styles.formtextinput} placeholder={"Firstname"} maxLength={8} onChangeText={(text)=>{this.setState({Firstname:text})}} value={this.state.Firstname}/>
                <TextInput style={styles.formtextinput} placeholder={"Lastname"} maxLength={8} onChangeText={(text)=>{this.setState({Lastname:text})}} value={this.state.Lastname}/>
                <TextInput style={styles.formtextinput} placeholder={"Contact"} maxLength={10} onChangeText={(text)=>{this.setState({Contact:text})}} keyboardType={"numeric"} value={this.state.Contact}/>
                <TextInput style={styles.formtextinput} placeholder={"Address"} multiline={true} onChangeText={(text)=>{this.setState({Address:text})}} value={this.state.Address}/>
                <TouchableOpacity style={styles.button} onPress={()=>{this.updateuser()}}>
                    <Text style={styles.buttontext}>
                        save
                    </Text>
                </TouchableOpacity>
               </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container : {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    formcontainer:{
      flex:1,
      width:'100%',
      alignItems: 'center'
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
    buttontext:{
      fontSize:25,
      fontWeight:"bold",
      color:"#fff"
    }
  })