import { FontAwesome } from '@expo/vector-icons'; // или FontAwesome6, если используешь
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomFlatList from '../../components/ui/CustomFlatList';
import DateTimeInput from '../../components/ui/DateTimeInput';
import DateTimeInputDouble from '../../components/ui/DateTimeInputDouble';
import ImagePickerModal from '../../components/ui/ImagePickerModal';
import { JOB_SUB_TYPES } from '../../constants/jobSubTypes';
import { JOB_TYPES } from '../../constants/jobTypes';
import { LICENSES } from '../../constants/licenses';
import { useComponentContext } from '../../context/globalAppContext';

const WebAbsoluteWrapper = ({ children, style }) => {
  if (Platform.OS === 'web') {
    return (
      <div
        style={{
          position: 'absolute',
          top: style?.top ?? 0,
          left: style?.left ?? 0,
          right: style?.right ?? 0,
          backgroundColor: style?.backgroundColor ?? 'white',
          border: style?.borderWidth
            ? `${style.borderWidth}px solid ${style.borderColor}`
            : undefined,
          borderRadius: style?.borderRadius ?? 0,
          maxHeight: style?.maxHeight ?? undefined,
          overflow: style?.overflow ?? 'hidden',
          zIndex: 999,
        }}
      >
        {children}
      </div>
    );
  }
  return <ScrollView style={style}>{children}</ScrollView>;
};

export default function NewJobModal() {
  const router = useRouter();
  const { key } = useLocalSearchParams();
  const { createdJobs, setCreatedJobs } = useComponentContext();

  const [type, setType] = useState(JOB_TYPES[key] || '');
  const [filteredTypes, setFilteredTypes] = useState(Object.values(JOB_TYPES));
  const [subType, setSubType] = useState('');
  const [filteredSubTypes, setFilteredSubTypes] = useState(
    Object.values(JOB_SUB_TYPES)
  );
  const [profession, setProfession] = useState('');
  const [filteredProfessions, setFilteredProfessions] = useState(
    Object.values(LICENSES)
  );
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const [images, setImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // Состояния для управления фокусом на полях ввода
  const [focusStates, setFocusStates] = useState([false, false, false]);

  const handleCreate = () => {
    if (!type || !description || !price) {
      Alert.alert(
        'Error',
        'Please fill all required fields (Type, Description, Price)'
      );
      return;
    }

    const newJob = {
      type,
      subType,
      profession,
      description,
      price,
      images,
    };

    setCreatedJobs((prev) => [...prev, newJob]);
    router.back();
  };

  const handleImageAdd = (imagesList) => {
    setImages((prev) => [...prev, ...imagesList]);
  };

  // Функция удаления картинки по индексу
  const removeImage = (indexToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const filterOptions = (text, options, setter, targetSetter) => {
    targetSetter(text);
    if (text.length === 0) {
      setter([]);
    } else {
      const filtered = options.filter((o) =>
        o.toLowerCase().includes(text.toLowerCase())
      );
      setter(filtered);
    }
  };

  const renderAutocomplete = (
    label,
    value,
    setValue,
    filtered,
    setFiltered,
    options,
    placeholder,
    stateFocusIndex
  ) => (
    <View style={styles.inputBlock}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.autocompleteContainer,
          Platform.OS === 'web' && {
            display: 'block',
            position: 'relative',
            zIndex: 1,
          },
        ]}
      >
        {/* <-- Web-specific override */}
        <TextInput
          value={value}
          onChangeText={(text) =>
            filterOptions(text, options, setFiltered, setValue)
          }
          placeholder={placeholder}
          style={styles.input}
          onFocus={() =>
            setFocusStates((prev) => {
              const newFocusStates = Array(3).fill(false);
              newFocusStates[stateFocusIndex] = true;
              return newFocusStates;
            })
          }
          onBlur={() =>
            setFocusStates((prev) => {
              const newFocusStates = Array(3).fill(false);
              newFocusStates[stateFocusIndex] = false;
              return newFocusStates;
            })
          }
        />
        {filtered.length > 0 && focusStates[stateFocusIndex] && (
          <WebAbsoluteWrapper style={styles.suggestionBox}>
            {filtered.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{ zIndex: 999 }}
                onPress={() => {
                  setValue(item);
                  setFiltered([]);
                }}
              >
                <Text style={styles.suggestionItem}>{item}</Text>
              </TouchableOpacity>
            ))}
          </WebAbsoluteWrapper>
        )}
      </View>
    </View>
  );

  const formContent = [
    renderAutocomplete(
      'Type',
      type,
      setType,
      filteredTypes,
      setFilteredTypes,
      Object.values(JOB_TYPES),
      'Select or type...',
      0
    ),
    renderAutocomplete(
      'Sub type',
      subType,
      setSubType,
      filteredSubTypes,
      setFilteredSubTypes,
      Object.values(JOB_SUB_TYPES),
      'Select or type...',
      1
    ),
    renderAutocomplete(
      'Profession (optional)',
      profession,
      setProfession,
      filteredProfessions,
      setFilteredProfessions,
      Object.values(LICENSES),
      'Select or type...',
      2
    ),
    <View style={styles.inputBlock} key='description'>
      <Text style={styles.label}>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder='Type...'
        style={[styles.input, { height: 100 }]}
        multiline
      />
    </View>,
    <View style={styles.inputBlock} key='price'>
      <Text style={styles.label}>Price</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder='Type...'
        style={styles.input}
        keyboardType='numeric'
      />
    </View>,
    <View style={styles.imageInputBlock} key='images'>
      <View style={styles.imageRow}>
        {/* Кнопка добавления */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.addImageButton}
        >
          <FontAwesome6 name='plus' size={18} color='#FFFFFF' />
        </TouchableOpacity>

        {/* Скролл с картинками */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imageScrollContainer}
        >
          {images.map((uri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri }} style={styles.imageThumbnail} />
              <TouchableOpacity
                style={styles.removeIcon}
                onPress={() => removeImage(index)}
              >
                <FontAwesome name='times' size={16} color='#444' />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      <ImagePickerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleImageAdd}
      />
    </View>,
    <View style={styles.row} key='dateTimeRange'>
      {Platform.OS !== 'android' ? (
        <DateTimeInput
          key='startDateTime'
          label='Start Date & Time'
          value={startDateTime}
          onChange={setStartDateTime}
        />
      ) : (
        <DateTimeInputDouble
          label='Start Date & Time'
          value={startDateTime}
          onChange={setStartDateTime}
        />
      )}
      {Platform.OS !== 'android' ? (
        <DateTimeInput
          key='endDateTime'
          label='End Date & Time'
          value={endDateTime}
          onChange={setEndDateTime}
        />
      ) : (
        <DateTimeInputDouble
          label='End Date & Time'
          value={endDateTime}
          onChange={setEndDateTime}
        />
      )}
    </View>,
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.logo}>FLALX</Text>
        </View>

        {Platform.OS === 'web' ? (
          <CustomFlatList
            data={formContent}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => item}
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps='handled'
          />
        ) : (
          <FlatList
            data={formContent}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => item}
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps='handled'
          />
        )}

        <View style={styles.bottomButtonWrapper}>
          <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              Create
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    color: '#0A62EA',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 24,
  },
  inputBlock: {
    marginBottom: 16,
    backgroundColor: '#F1F4F9',
    borderRadius: 8,
    padding: 10,
    ...Platform.select({
      web: {
        zIndex: 1,
      },
    }),
  },
  imageInputBlock: {
    marginBottom: 16,
    ...Platform.select({
      web: {
        zIndex: 1,
      },
    }),
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  input: {
    padding: 10,
  },
  autocompleteContainer: {
    position: 'relative',
  },
  suggestionBox: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 999,
    maxHeight: 150,
    borderRadius: 6,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        zIndex: 9999,
        position: 'absolute', // На всякий случай переопредели
        overflow: 'auto',
      },
    }),
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  addImageButton: {
    width: 100,
    height: 100,
    backgroundColor: '#84B0F4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 8,
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageScrollContainer: {
    flexDirection: 'row',
  },
  imageThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 8, // отступ между картинками
  },
  removeIcon: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(255,255,255,0.7)', // чуть прозрачный белый фон, чтобы крестик был читаемым
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  bottomButtonWrapper: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: 'white',
  },
  createButton: {
    backgroundColor: '#0A62EA',
    paddingVertical: 14,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTimeBlock: {
    flex: 1,
    backgroundColor: '#F1F4F9',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  dateTimeText: {
    fontSize: 16,
    color: '#000',
  },
  dateTimePlaceholder: {
    fontSize: 16,
    color: '#666',
  },
});
