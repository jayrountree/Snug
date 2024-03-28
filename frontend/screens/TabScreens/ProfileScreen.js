import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

const profileData =
{
    name: 'Michael Jordan',
    picture_uri: 'https://th.bing.com/th/id/OIP.EB2DF_Ax4Wdcz2NblmWJngAAAA?rs=1&pid=ImgDetMain',
    bio: '📚 Studying CS | 🏀 Basketball enthusiast | 🎸 Guitar player | 🎮 Gamer | Always up for new adventures! 🌟',
    my_posts: [
        { id: 1, uri: 'https://th.bing.com/th/id/R.4f018837ae222a5a01b7e1f7d9b24470?rik=Nj3Hfcf6ZsSnig&pid=ImgRaw&r=0' },
        { id: 2, uri: 'https://i.pinimg.com/originals/7c/c5/e5/7cc5e57502a3b09917ced848a688d4c1.jpg' }
    ],
    liked_posts: [
        { id: 3, uri: 'https://cdn.shopify.com/s/files/1/0969/9128/products/Lionel_Messi_-_Barca_-_Legend_Of_Football_Poster_2fa9af72-ecdb-4502-a190-bd7e5d468ead.jpg?v=1580717328' },
        { id: 4, uri: 'https://ih1.redbubble.net/image.1858105442.7634/flat,750x,075,f-pad,750x1000,f8f8f8.jpg' }
    ]
};

export default function ProfileScreen() {
    const renderItem = ({ item }) => (
        <Image style={styles.postImage} source={{ uri: item.uri }} />
    );

    return (
        <View style={styles.container}>
            <Text>Profile</Text>
            <Text style={styles.name}>{profileData.name}</Text>
            <Image style={styles.profilePicture} source={{ uri: profileData.picture_uri }}></Image>
            <Text>{profileData.bio}</Text>
            <View style={styles.postContainer}>
                <Text>My Posts</Text>
                <FlatList
                    data={profileData.my_posts}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.imageList}
                />
            </View>
            <View style={styles.postContainer}>
                <Text>Liked Posts</Text>
                <FlatList
                    data={profileData.liked_posts}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.imageList}
                />
            </View>        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    profilePicture: {
        width: 200,
        height: 200,
    },
    postContainer: {
        borderWidth: 5,
        flexDirection: 'row',
    },
    imageContainer: {
        margin: 10,
        borderWidth: 5,
    },
    postImage: {
        width: 200,
        height: 200,
    },
    imageList: {
        paddingHorizontal: 10,
        paddingTop: 10,
        flexDirection: 'row',
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
    }
})