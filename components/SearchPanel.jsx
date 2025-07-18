import { useComponentContext } from '@/context/globalAppContext';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function SearchPanel({ searchValue, setSearchValue }) {
  const { activeThemeStyles } = useComponentContext();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        isFocused && styles.containerFocused,
        { backgroundColor: activeThemeStyles?.formInputBackground },
        isFocused && { shadowColor: activeThemeStyles?.formInputBorderColor},
      ]}
    >
      <TextInput
        placeholder="Search"
        value={searchValue}
        onChangeText={setSearchValue}
        style={[styles.searchInput, { color: activeThemeStyles?.textColor }]}
        placeholderTextColor={activeThemeStyles?.formInputPlaceholderColor}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Ionicons name="search" size={20} color={activeThemeStyles?.formInputPlaceholderColor} style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  containerFocused: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4, // Для Android (имитация аутлайна через тень)
  },
  searchInput: {
    height: 50,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    outlineStyle: 'none',
  },
  icon: {
    marginLeft: 8,
  },
});
