import React,{Component} from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Bookdonate from '../screens/bookdonate';
import Bookrequest from '../screens/bookrequest';


export const Apptabnav = createBottomTabNavigator({
    Donatebook:{screen:Bookdonate, 
    navigationOptions:{tabBarIcon:<Image source={require("../assets/request-list.png")} style={{width:20, height:20}}/>, tabBarLabel:"donate books"}},
    Requestbook:{screen:Bookrequest, 
        navigationOptions:{tabBarIcon:<Image source={require("../assets/request-book.png")} style={{width:20, height:20}}/>, tabBarLabel:"request books"}},
    
})