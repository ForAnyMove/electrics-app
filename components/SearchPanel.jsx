import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function SearchPanel({ searchValue, setSearchValue }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        isFocused && styles.containerFocused,
      ]}
    >
      <TextInput
        placeholder="Search"
        value={searchValue}
        onChangeText={setSearchValue}
        style={styles.searchInput}
        placeholderTextColor="#888"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Ionicons name="search" size={20} color="#888" style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    backgroundColor: '#DFDFFF',
    borderRadius: 8,
    marginBottom: 16,
  },
  containerFocused: {
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4, // Для Android (имитация аутлайна через тень)
  },
  searchInput: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
    color: '#333',
    outlineStyle: 'none',
  },
  icon: {
    marginLeft: 8,
  },
});
