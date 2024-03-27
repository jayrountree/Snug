import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Perform search action here
    console.log('Searching for:', searchQuery);
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TextInput
        style={{
          height: 25,
          width: '50%',
          borderColor: 'gray',
          borderWidth: 1,
          paddingHorizontal: 10,
          marginRight: 10, // Add margin between TextInput and button
        }}
        placeholder="Search..."
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <TouchableOpacity onPress={handleSearch}>
        <Image source={require('../assets/search_icon.jpeg')} style={{ width: 24, height: 24 }} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
