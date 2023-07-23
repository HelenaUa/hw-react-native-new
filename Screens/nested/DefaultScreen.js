import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

export const DefaultScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  console.log('route.params', route.params);
  
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    } 
  }, [route.params]);
  console.log('posts', posts);
    
  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <FlatList
          data={posts}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <View style={{marginTop: 8, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={{uri: item.photo}} style={{width: 343, height: 240}} />
            </View>
          )}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  photoPost: {

  },
});