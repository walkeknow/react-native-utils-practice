import React, { Fragment } from 'react'
import { StyleSheet, Text, View, Platform, Settings } from 'react-native'
import styled from 'styled-components'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

// Nesting order Top to Bottom:

// Drawer Navigator => Opens TabNavigator (Home) and System Settings

// Tab Navigator => Opens Homescreen (Home) and Dashboard

// Stack Navigator => Opens Home and App Settings

const CenterView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #333;
`

const WelcomeText = styled.Text`
  color: white;
  font-size: 20px;
`
const WelcomeBtn = styled.TouchableOpacity`
  width: 150px;
  height: 50px;
  background: red;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin: 20px;
`

function SystemSettings({ navigation }) {
  return (
    <CenterView>
      <WelcomeText>System Settings</WelcomeText>
      <WelcomeBtn onPress={() => navigation.openDrawer()}>
        <WelcomeText> Open Drawer Navigator </WelcomeText>
      </WelcomeBtn>
    </CenterView>
  )
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = null
          if (route.name === 'Home') {
            iconName = 'ios-home'
          } else if (route.name === 'Dashboard') {
            iconName = 'ios-speedometer'
          }
          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: 'red',
      }}
    >
      <Tab.Screen name='Home' component={StackNavigator} />
      <Tab.Screen name='Dashboard' component={Dashboard} />
    </Tab.Navigator>
  )
}

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => {
        if (route.name === 'AppSettings') {
          return {
            title: 'App Settings',
            headerTitleStyle: {
              color: 'black',
            },
            headerTintColor: 'red',
            headerStyle: {
              backgroundColor: 'yellow',
            },
          }
        }
      }}
    >
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='AppSettings' component={AppSettings} />
    </Stack.Navigator>
  )
}

function Home({ navigation }) {
  return (
    <CenterView>
      <WelcomeText>Hello, World!</WelcomeText>
      <WelcomeBtn onPress={() => navigation.navigate('AppSettings')}>
        <WelcomeText>App Settings</WelcomeText>
      </WelcomeBtn>
      <WelcomeBtn onPress={() => navigation.openDrawer()}>
        <WelcomeText>Drawer Navigator </WelcomeText>
      </WelcomeBtn>
    </CenterView>
  )
}

function Dashboard() {
  return (
    <CenterView>
      <WelcomeText>Dashboard</WelcomeText>
    </CenterView>
  )
}

function AppSettings() {
  return (
    <CenterView>
      <WelcomeText>Settings</WelcomeText>
    </CenterView>
  )
}

const Drawer = createDrawerNavigator()

const Stack = createStackNavigator()

const Tab =
  Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName='Home'
        screenOptions={({ route }) => {
          if (route.name === 'Home') {
            return {
              drawerIcon: () => (
                <Ionicons name='ios-home' size={20} color='red' />
              ),
            }
          } else if (route.name === 'System Settings') {
            return {
              drawerIcon: () => (
                <Ionicons name='ios-settings' size={20} color='red' />
              ),
            }
          }
        }}
      >
        <Drawer.Screen name='Home' component={TabNavigator} />
        <Drawer.Screen name='System Settings' component={SystemSettings} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
