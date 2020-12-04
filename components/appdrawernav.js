import React from 'react'
import {Apptabnav} from '../components/apptabnav'
import {Sidebar} from '../components/customsidebar'
import {createDrawerNavigator} from 'react-navigation-drawer'
import Settingscreen from '../screens/settingscreen'


export const Appdrawernav = createDrawerNavigator({
    home:{
        screen:Apptabnav
    },
    setting:{
        screen:Settingscreen
    }
},{initialRouteName:'home'},{contentComponent:Sidebar}
)