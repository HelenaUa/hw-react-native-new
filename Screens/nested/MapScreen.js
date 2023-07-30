import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  return (
    <View style={styles.container}>
      <MapView
        onPress={() => {navigation.navigate("PostsScreen")}}
        style={styles.map}
        region={{
          ...params,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {params && (
          <Marker title="Я тут" coordinate={params} description="Cords" />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});