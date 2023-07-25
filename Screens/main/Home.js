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
            <NestedScreen.Navigator>
              <NestedScreen.Screen name="PostsScreen" component={PostsScreen} />
              <NestedScreen.Screen name="CommentsScreen" component={CommentsScreen} />
              <NestedScreen.Screen name="MapScreen" component={MapScreen} />
            </NestedScreen.Navigator>
    )
};