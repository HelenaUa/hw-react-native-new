import 'react-native-gesture-handler';
import React from "react";

import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { authStateChangeUser } from "../redux/auth/operations";
import { authSingOutUser } from '../redux/auth/operations';

import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SimpleLineIcons } from '@expo/vector-icons';

import RegistrationScreen from "../Screens/auth/RegistrationScreen";
import LoginScreen from "../Screens/auth/LoginScreen";
import { Home } from '../Screens/main/Home';
import { CreatePostsScreen } from '../Screens/main/CreatePostsScreen';
import { ProfileScreen } from '../Screens/main/ProfileScreen';


const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const Main = () => {
  const { isRefreshing: isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);


  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="LoginScreen">{/* Аналог Routes */}
        <AuthStack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ headerShown: false }} />{/* Аналог Route */}
        <AuthStack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator initialRouteName="Home" screenOptions={{tabBarShowLabel: false}}>
      <MainTab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({focused, size, color}) => (
            <View style={styles.activeScreen} backgroundColor={focused ? '#FF6C00' : '#fff'} >
              <SimpleLineIcons name='grid' size={24} color={focused ? '#fff' : '#212121'}/>
            </View>
          ),
          headerShown: true,
          headerTitle: 'Публікації',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 17,
            alignItems: 'center',
          },
          headerRight: () => (
            <SimpleLineIcons
              name='logout'
              size={24}
              color='#BDBDBD'
              style={{ marginRight: 10 }}
              onPress={() => { dispatch(authSingOutUser()) }}
            />
          ),
      }}/>
      <MainTab.Screen
        name='CreatePostsScreen'
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color, backgroundColor }) => (
            <View style={styles.activeScreen} backgroundColor={focused ? '#FF6C00' : '#fff'} >
              <SimpleLineIcons name='plus' size={24} color={focused ? '#fff' : '#212121'} />
            </View>
          ),
          headerShown: true,
          headerTitle: 'Створити публікацію',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 17,
            alignItems: 'center',
          },
      }} />
      <MainTab.Screen
        name='ProfileScreen'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, size, color, backgroundColor }) => (
            <View style={styles.activeScreen} backgroundColor={focused ? '#FF6C00' : '#fff'} >
              <SimpleLineIcons name='user' size={24} color={focused ? '#fff' : '#212121'} />
            </View>
          ),
          headerShown: true,
          headerTitle: 'Профіль',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 17,
            alignItems: 'center',
          },
      }} />
    </MainTab.Navigator> 
  );
};

const styles = StyleSheet.create({
  activeScreen: {
    width: 70,
    height: 40,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


