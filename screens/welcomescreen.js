import React,{Component} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import db from '../config.js'
import firebase from 'firebase'
//import SantaAnimation from '../components/santaclaus'



export default class Welcomescreen extends Component{
    constructor(){
        super();
        this.state={
            emailID:'',
            password:'',
            Firstname:'',
            Lastname:'',
            Address:'',
            Contact:'',
            Confirmpassword : '',
            Ismodalvisible : false
        }
    }



    showmodal = ()=>{
      return(
        <Modal animationType="fade" transparent={true} visible={this.state.Ismodalvisible}>
          <View style={styles.Modalcontainer}>
            <ScrollView style={{width:'100%'}}>
              <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                <Text style={styles.Modaltitle}>Registration</Text>
                <TextInput style={styles.formtextinput} placeholder={"Firstname"} maxLength={8} onChangeText={(text)=>{this.setState({Firstname:text})}}/>
                <TextInput style={styles.formtextinput} placeholder={"Lastname"} maxLength={8} onChangeText={(text)=>{this.setState({Lastname:text})}}/>
                <TextInput style={styles.formtextinput} placeholder={"Contact"} maxLength={10} onChangeText={(text)=>{this.setState({Contact:text})}} keyboardType={"numeric"}/>
                <TextInput style={styles.formtextinput} placeholder={"Address"} multiline={true} onChangeText={(text)=>{this.setState({Address:text})}}/>
                <TextInput style={styles.formtextinput} placeholder={"EmailID"} keyboardType={"email-address"} onChangeText={(text)=>{this.setState({emailID:text})}}/>
                <TextInput style={styles.formtextinput} placeholder={"Password"} onChangeText={(text)=>{this.setState({password:text})}} secureTextEntry={true}/>
                <TextInput style={styles.formtextinput} placeholder={"Confirm Password"} onChangeText={(text)=>{this.setState({Confirmpassword:text})}} secureTextEntry={true}/>
                <View style={styles.Modalbackbutton}>
                <TouchableOpacity style={styles.registerbutton}
                    onPress={()=>{this.usersignup(this.state.emailID,this.state.password, this.state.Confirmpassword)}}>
                        <Text style={styles.registerbuttonText}>sign up</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.Modalbackbutton}>
                  <TouchableOpacity style={styles.cancelbutton} onPress={()=>this.setState({Ismodalvisible:false})}>
                    <Text style={{color:'#ff5722'}}>cancel</Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </Modal>
      )
    }



    usersignup = (emailID, password, Confirmpassword) =>{
      if(password!==Confirmpassword){
        return Alert.alert("Password doesn't match")
      }
      else{
        firebase.auth().createUserWithEmailAndPassword(emailID, password)
        .then(()=>{
          db.collection('Users').add({
            Firstname:this.state.Firstname,
            Lastname:this.state.Lastname,
            Contact:this.state.Contact,
            emailID:this.state.emailID,
            Address:this.state.Address,
          })
          return  Alert.alert(
            'User Added Successfully',
            '',
            [
              {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
            ]
        );
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage)
        });
      }
    }



      userlogin = (emailID, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailID, password)
        .then(()=>{
          this.props.navigation.navigate('Donatebook')
        })
        .catch((error)=> {
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage)
        })
      }

    

    render(){
        return(
            <View style={styles.container}>
              <View style={{justifyContent:"center", alignItems:"center"}}></View>{this.showmodal()}
                <View>
                  {/* <SantaAnimation/> */}
                    <Text style={styles.title}>booksanta</Text>
                </View>
                <View>
                    <TextInput style={styles.loginbox} placeholder="abc@example.com" keyboardType='email-address'
                    onChangeText={(text)=>{this.setState({emailID:text})}}/>
                    <TextInput style={styles.loginbox} placeholder="password" secureTextEntry={true}
                    onChangeText={(text)=>{this.setState({password:text})}}/>
                    <TouchableOpacity style={styles.button} 
                    onPress={()=>this.setState({Ismodalvisible:true})}>
                        <Text style={styles.buttonText}>sign up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                    onPress={()=>{this.userlogin(this.state.emailID,this.state.password)}}>
                        <Text style={styles.buttonText}>login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
  container:{
   flex:1,
   backgroundColor:'#F8BE85',
   alignItems: 'center',
   justifyContent: 'center'
 },
 profileContainer:{
   flex:1,
   justifyContent:'center',
   alignItems:'center',
 },
 title :{
   fontSize:65,
   fontWeight:'300',
   paddingBottom:30,
   color : '#ff3d00'
 },
 Modalbackbutton:{
   justifyContent:"center"
 },
 loginbox:{
   width: 300,
   height: 40,
   borderBottomWidth: 1.5,
   borderColor : '#ff8a65',
   fontSize: 20,
   margin:10,
   paddingLeft:10
 },
 KeyboardAvoidingView:{
   flex:1,
   justifyContent:'center',
   alignItems:'center'
 },
 Modaltitle :{
   justifyContent:'center',
   alignSelf:'center',
   fontSize:30,
   color:'#ff5722',
   margin:50
 },
 Modalcontainer:{
   flex:1,
   borderRadius:20,
   justifyContent:'center',
   alignItems:'center',
   backgroundColor:"#ffff",
   marginRight:30,
   marginLeft : 30,
   marginTop:80,
   marginBottom:80,
 },
 formtextinput:{
   width:"75%",
   height:35,
   alignSelf:'center',
   borderColor:'#ffab91',
   borderRadius:10,
   borderWidth:1,
   marginTop:20,
   padding:10
 },
 registerbutton:{
   width:200,
   height:40,
   alignItems:'center',
   justifyContent:'center',
   borderWidth:1,
   borderRadius:10,
   marginTop:30
 },
 registerbuttontext:{
   color:'#ff5722',
   fontSize:15,
   fontWeight:'bold'
 },
 cancelbutton:{
   width:200,
   height:30,
   justifyContent:'center',
   alignItems:'center',
   marginTop:5,
 },

 button:{
   width:300,
   height:50,
   justifyContent:'center',
   alignItems:'center',
   borderRadius:25,
   backgroundColor:"#ff9800",
   shadowColor: "#000",
   shadowOffset: {
      width: 0,
      height: 8,
   },
   shadowOpacity: 0.30,
   shadowRadius: 10.32,
   elevation: 16,
   padding: 10
 },
 buttonText:{
   color:'#ffff',
   fontWeight:'200',
   fontSize:20
 }
})