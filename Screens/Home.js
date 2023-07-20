import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PostsScreen } from './main/PostsScreen';

export const Home = ({}) => {

    return (
        <View style={styles.container}>
          <PostsScreen />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});