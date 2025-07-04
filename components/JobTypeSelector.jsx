import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { JOB_TYPES } from '../constants/jobTypes';

export default function JobTypeSelector({ selectedTypes, setSelectedTypes }) {
  const isSelected = (type) => selectedTypes.includes(type);

  const toggleType = (type) => {
    if (isSelected(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const clearAll = () => setSelectedTypes([]);

  return (
    <View style={styles.container}>
      {/* Иконка корзины */}
      <TouchableOpacity onPress={clearAll} style={styles.trashButton}>
        <Ionicons
          name="trash"
          size={24}
          color={selectedTypes.length > 0 ? 'red' : 'gray'}
        />
      </TouchableOpacity>

      {/* Список тегов */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.tagWrapper}>
          {Object.entries(JOB_TYPES).map(([key, label]) => (
            <TouchableOpacity
              key={key}
              onPress={() => toggleType(key)}
              style={[styles.tag, isSelected(key) && styles.tagSelected]}
            >
              <Text style={[styles.tagText, isSelected(key) && styles.tagTextSelected]}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 8,
  },
  trashButton: {
    marginRight: 8,
  },
  scrollContent: {
    flexGrow: 1,
  },
  tagWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 8,
    columnGap: 8,
    height: 70, // Высота для двух строк
  },
  tag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  tagSelected: {
    backgroundColor: '#007AFF',
  },
  tagText: {
    color: 'gray',
    fontSize: 12,
  },
  tagTextSelected: {
    color: 'white',
  },
});
