import { FontAwesome6 } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const filtersData = [
  {
    title: 'Electrical licenses required',
    checkAll: false,
    options: [
      'Certified electrician',
      'Practical electrician',
      'Assistant electrician',
      'Electrician engineer',
      'Electrician technician',
      'Chief electrician',
    ],
  },
  {
    title: 'Areas of specialization needed',
    checkAll: false,
    options: [
      'Installation of charging stations for electric vehicles',
      'Installation of decorative lighting fixtures',
      'Controllers are programmed',
      'Commands',
    ],
  },
];

export default function FilterScreen({ route }) {
  const router = useRouter();
  const [filters, setFilters] = useState(() => {
    return filtersData.map((block) => ({
      title: block.title,
      checkAll: block.checkAll,
      selected: block.checkAll ? [...block.options] : [],
    }));
  });

  const toggleOption = (blockIndex, option) => {
    setFilters((prev) => {
      const updated = [...prev];
      const index = updated[blockIndex].selected.indexOf(option);
      if (index > -1) {
        updated[blockIndex].selected.splice(index, 1);
      } else {
        updated[blockIndex].selected.push(option);
      }
      updated[blockIndex].checkAll =
        updated[blockIndex].selected.length ===
        filtersData[blockIndex].options.length;
      return updated;
    });
  };

  const toggleCheckAll = (blockIndex) => {
    setFilters((prev) => {
      const updated = [...prev];
      const all = filtersData[blockIndex].options;
      if (updated[blockIndex].checkAll) {
        updated[blockIndex].selected = [];
        updated[blockIndex].checkAll = false;
      } else {
        updated[blockIndex].selected = [...all];
        updated[blockIndex].checkAll = true;
      }
      return updated;
    });
  };

  const resetFilter = () => {
    setFilters(
      filters.map((f, i) => ({
        ...f,
        selected: [],
        checkAll: false,
      }))
    );
  };

  const hasSelectedFilters = filters.some((f) => f.selected.length > 0);

  const keepFilters = () => {
    router.replace({
      pathname: '/(tabs)/jobs',
      params: { filters: hasSelectedFilters ? JSON.stringify(filters) : [] },
    });
  };

  const goBack = () => {
    router.replace({
      pathname: '/(tabs)/jobs',
      params: null,
    });
  };

  return (
    <View style={styles.fullscreenContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Filtering</Text>
        <TouchableOpacity onPress={goBack}>
          <MaterialIcons name='keyboard-arrow-right' size={28} color='black' />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {filtersData.map((block, index) => (
          <View key={index} style={styles.filterBlock}>
            <View style={styles.checkAllRow}>
              <TouchableOpacity
                style={styles.checkAllRowLeft}
                onPress={() => toggleCheckAll(index)}
              >
                <FontAwesome6
                  name={filters[index].checkAll ? 'square-check' : 'square'}
                  size={20}
                  color='#72B68E'
                />
                <Text style={styles.checkAllText}>Check all</Text>
              </TouchableOpacity>
              <Text style={styles.blockTitle}>{block.title}</Text>
            </View>
            <View style={styles.tagsContainer}>
              {block.options.map((option, i) => {
                const selected = filters[index].selected.includes(option);
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() => toggleOption(index, option)}
                    style={[styles.tag, selected && styles.selectedTag]}
                  >
                    <Text
                      style={[
                        styles.tagText,
                        selected && styles.selectedTagText,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.confirmButton} onPress={keepFilters}>
          <Text style={styles.confirmText}>Keeping</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.resetButton,
            !hasSelectedFilters && styles.resetButtonDisabled,
          ]}
          onPress={resetFilter}
          disabled={!hasSelectedFilters}
        >
          <Text
            style={[
              styles.resetText,
              !hasSelectedFilters && styles.resetTextDisabled,
            ]}
          >
            Reset filter
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 35,
    marginBottom: 40,
  },
  backButton: {
    fontSize: 24,
    marginLeft: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 25,
  },
  scrollContainer: {
    paddingHorizontal: 22,
    paddingBottom: 80,
  },
  filterBlock: {
    marginBottom: 30,
  },
  checkAllRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  checkAllRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkAllText: {
    marginLeft: 15,
    fontSize: 16,
  },
  blockTitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'right',
    flexShrink: 1,
  },
  tagsContainer: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    rowGap: 4,
    columnGap: 5,
  },
  tag: {
    borderColor: '#999',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 0,
    marginBottom: 2,
  },
  tagText: {
    color: '#999',
    fontSize: 12,
  },
  selectedTag: {
    backgroundColor: '#72B68E',
    borderColor: '#72B68E',
  },
  selectedTagText: {
    color: '#fff',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  confirmButton: {
    backgroundColor: '#72B68E',
    flex: 1,
    marginRight: 28,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
    marginVertical: 8,
  },
  resetButton: {
    backgroundColor: '#72B68E',
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  resetButtonDisabled: {
    backgroundColor: '#f5f5f5',
  },
  resetText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#fff',
    marginVertical: 8,
  },
  resetTextDisabled: {
    color: '#ccc',
  },
});
