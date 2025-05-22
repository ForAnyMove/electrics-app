import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function StoreScreen() {
  return (
    <View style={{ flex: 1 }}>
      {/* Поисковая панель */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search products..."
          style={styles.searchInput}
        />
      </View>

      {/* Горизонтальный список категорий */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {Array.from({ length: 15 }).map((_, idx) => (
          <View key={idx} style={styles.categoryItem}>
            <Text>Category {idx + 1}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Основное содержимое */}
      <View style={{ padding: 16 }}>
        <Text>Store content here...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  categoryScroll: {
    backgroundColor: '#f8f8f8',
    paddingVertical: 10,
    paddingLeft: 10,
  },
  categoryItem: {
    marginRight: 12,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
