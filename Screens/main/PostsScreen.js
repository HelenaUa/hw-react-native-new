import React from 'react';
// import { moduleName } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { View, Text, StyleSheet } from 'react-native';
import { CommentsScreen } from '../nested/CommentsScreen';
import { MapScreen } from '../nested/MapScreen';

const NestedScreen = createStackNavigator();


export const PostsScreen = () => {
    return (
            <NestedScreen.Navigator>
              <NestedScreen.Screen name="CommentsScreen" component={CommentsScreen} />
              <NestedScreen.Screen name="MapScreen" component={MapScreen} />
            </NestedScreen.Navigator>
    )
};