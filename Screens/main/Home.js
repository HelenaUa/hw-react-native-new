import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CommentsScreen } from '../nested/CommentsScreen';
import { MapScreen } from '../nested/MapScreen';
import { PostsScreen } from '../nested/PostsScreen';

const NestedScreen = createStackNavigator();


export const  Home = () => {
    return (
            <NestedScreen.Navigator initialRouteName='PostsScreen' >
              <NestedScreen.Screen name="PostsScreen" component={PostsScreen} options={{ headerShown: false }}/>
              <NestedScreen.Screen name="Коментарі" component={CommentsScreen} options={{ headerBackTitleVisible: false }}/>
              <NestedScreen.Screen name="MapScreen" component={MapScreen} options={{ headerBackTitleVisible: false }} />
            </NestedScreen.Navigator>
    )
};