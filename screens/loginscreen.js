import React from 'react';
import * as firebase from 'firebase';
import { render } from 'react-dom';
import { Text, View, KeyboardAvoidingView, TouchableOpacity, TextInput, Image, StyleSheet, Alert, ToastAndroid} from 'react-native';
export default class Loginscreen extends React.Component {
    constructor(){
        super();
        this.state = {
            Email:'',
            password:''
        }
    }
login = async(email,password)=>{
    if(email && password){
        try{
            const response = await firebase.auth().signInWithEmailAndPassword(email, password)
            if(response){
                this.props.navigation.navigate('TransactionScreen')
    
            }
        }
        catch(error){
            switch(error.code){
                case  'auth/user-not-found' : Alert.alert("user-doesnt-exist")
                console.log("user-doesnt-exist");
                break;
                case 'auth/invalid-email' : Alert.alert("incorrect-email")
                console.log("incorrect-email");
                break;
            }
        }
    }
    else{
        Alert.alert("Enter email and password")
    }
}

render(){
    return(
        <KeyboardAvoidingView style={{alignItems:"center",marginTop:20}}>
            <View>
                <Image source={require("../booklogo.jpg")} style={{width:200, height:200}}/>
                <Text style={{textAlign:"center", fontSize:30}}>Wily</Text>
            </View>
            <View>
                <TextInput style={styles.loginBox} placeholder="Enter email address" keyboardType="email-address" onChangeText={(text)=>{this.setState({email:text})}}/>
                <TextInput style={styles.loginBox} placeholder="Enter password" secureTextEntry={true} onChangeText={(text)=>{this.setState({password:text})}}/>
            </View>
            <View>
                <TouchableOpacity style={{height:30,width:90,borderWidth:1,marginTop:20,paddingTop:5,borderRadius:7}} onPress={()=>{this.login(this.state.email,this.state.password)}}>
                    <Text style={{textAlign:"center"}}>login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        
    )
}        
    
}
const styles = StyleSheet.create({
    loginBox:
    {
      width: 300,
    height: 40,
    borderWidth: 1.5,
    fontSize: 20,
    margin:10,
    paddingLeft:10
    }
  })

