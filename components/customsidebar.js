import React,{Component} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import firebase from 'firebase'
import {DrawerItems} from 'react-navigation-drawer'


export default class Sidebar extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.DrawerItemscontainer}>
                    <DrawerItems {...this.props}/>
                </View>
                <View style={styles.logoutcontainer}>
                    <TouchableOpacity style={styles.logoutbutton} onPress={()=>{this.props.navigation.navigate('Welcomescreen')
                    firebase.auth().signOut()}}>
                        <Text style={styles.logouttext}>
                            log out
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


var styles = StyleSheet.create({
    container:{
        flex:1,
    },
    DrawerItemscontainer:{
        flex:0.8
    },
        logoutcontainer : {
          flex:0.2,
          justifyContent:'flex-end',
          paddingBottom:30
        },
        logoutbutton : {
          height:30,
          width:'100%',
          justifyContent:'center',
          padding:10
        },
        logouttext:{
          fontSize: 30,
          fontWeight:'bold'
        }
      })

