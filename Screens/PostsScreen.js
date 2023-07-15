import React from 'react';
import { moduleName } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';

const NestedScreen = createStackNavigator();

const CommentsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>CommentsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const PostsScreen = () => {
    return (
        <NavigationContainer>
            <NestedScreen.Navigator>
               <NestedScreen.Screen name="CommentsScreen" component={CommentsScreen} />
            </NestedScreen.Navigator>
        </NavigationContainer>  
    )
};