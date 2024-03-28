import React from 'react';
import { StatusBar } from 'expo-status-bar';
import SearchBar from '../../components/SearchBar';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

const dummyImages = [
  { id: 1, uri: 'https://th.bing.com/th/id/OIP.EB2DF_Ax4Wdcz2NblmWJngAAAA?rs=1&pid=ImgDetMain' },
  { id: 2, uri: 'https://i.pinimg.com/originals/7c/c5/e5/7cc5e57502a3b09917ced848a688d4c1.jpg' },
  { id: 3, uri: 'https://cdn.shopify.com/s/files/1/0969/9128/products/Lionel_Messi_-_Barca_-_Legend_Of_Football_Poster_2fa9af72-ecdb-4502-a190-bd7e5d468ead.jpg?v=1580717328' },
  { id: 4, uri: 'https://ih1.redbubble.net/image.1858105442.7634/flat,750x,075,f-pad,750x1000,f8f8f8.jpg' },
  { id: 5, uri: 'https://i.etsystatic.com/30418678/r/il/710fdd/3280729111/il_1588xN.3280729111_4bkf.jpg' },
  { id: 6, uri: 'https://avatars.githubusercontent.com/u/77653984?v=4' },
  { id: 7, uri: 'https://th.bing.com/th/id/R.4f018837ae222a5a01b7e1f7d9b24470?rik=Nj3Hfcf6ZsSnig&pid=ImgRaw&r=0' },
];

export default function TrendingScreen() {
  const renderItem = ({ item }) => (
    <Image style={styles.postImage} source={{ uri: item.uri }} />
  );


  return (
    <View>
      <View style={styles.topbar}>
        <Text style={styles.title}>Snug</Text>
        <SearchBar />
      </View>
      <View style={styles.likedContainer}>
        <Text>Most Liked{'\n'}</Text>
        <FlatList
          data={dummyImages.slice(0, 3)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.imageList}
        />
      </View>
      <View style={styles.trendingContainer}>
        <Text>Most Liked{'\n'}</Text>
        <FlatList
          data={dummyImages.slice(3, -2)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.imageList}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topbar: {
    width: '100%',
    height: '15%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageList: {
    paddingHorizontal: 10,
    paddingTop: 10,
    flexDirection: 'row',
  },
  imageContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  postImage: {
    width: 200,
    height: 200,
  },
  likedContainer: {
    borderWidth: 5,
    marginLeft: 100,
    backgroundColor: '#CEFAD0',
  },
  trendingContainer: {
    borderWidth: 5,
    marginLeft: 100,
    backgroundColor: '#ADD8E6',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});