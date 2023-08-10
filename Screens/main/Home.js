import React from 'react';
// import { moduleName } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
// import { View, Text, StyleSheet } from 'react-native';
import { CommentsScreen } from '../nested/CommentsScreen';
import { MapScreen } from '../nested/MapScreen';
import { PostsScreen } from '../nested/PostsScreen';

const NestedScreen = createStackNavigator();


export const  Home = () => {
    return (
            <NestedScreen.Navigator initialRouteName='PostsScreen' >
              <NestedScreen.Screen name="PostsScreen" component={PostsScreen} options={{ headerShown: false }}/>
              <NestedScreen.Screen name="Коментарі" component={CommentsScreen} />
              <NestedScreen.Screen name="MapScreen" component={MapScreen} />
            </NestedScreen.Navigator>
    )
};