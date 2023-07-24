import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Feather } from "@expo/vector-icons";

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

      <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', marginBottom: 20}} onPress={() => {navigation.navigate("MapScreen")}}>
        <Feather name='map-pin' size={24} color={'#BDBDBD'}/>
      </TouchableOpacity>
      <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}} onPress={() => {navigation.navigate("CommentsScreen")}} >
        <Feather name='message-circle' size={24} color={'#BDBDBD'} />
        <Text>Comment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
});