import React,{Component} from 'react';
import{createStackNavigator} from 'react-navigation-stack'
import Bookdonate from '../screens/bookdonate'
import Recieverdetailsscreen from '../screens/recieverdetails'

export const AppStackNav = createStackNavigator({
    Bookdonate:{screen:Bookdonate},
    Recieverdetails:{screen:Recieverdetailsscreen}
},
{initialRouteName:'Bookdonate'})