import { FontAwesome } from '@expo/vector-icons'; // или FontAwesome6, если используешь
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
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
import { JOB_SUB_TYPES } from '../constants/jobSubTypes';
import { JOB_TYPES } from '../constants/jobTypes';
import { LICENSES } from '../constants/licenses';
import { useComponentContext } from '../context/globalAppContext';
import CustomFlatList from './ui/CustomFlatList';
import DateTimeInput from './ui/DateTimeInput';
import DateTimeInputDouble from './ui/DateTimeInputDouble';
import ImagePickerModal from './ui/ImagePickerModal';

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

const renderAutocomplete = ({
  label,
  value,
  setValue,
  filtered,
  setFiltered,
  options,
  placeholder,
  stateFocusIndex,
  setFocusStates,
  filterOptions,
  focusStates,
  error,
  backgroundColor = '#DFDFFF',
}) => (
  <View style={[styles.inputBlock, { backgroundColor }]}>
    <Text style={styles.label}>{label}</Text>
    <View
      style={[
        styles.autocompleteContainer,
        error && styles.errorOutline,
        Platform.OS === 'web' && {
          display: 'block',
          position: 'relative',
          zIndex: 1,
        },
      ]}
      onFocus={() =>
        setFocusStates((prev) => {
          const newFocusStates = Array(3).fill(false);
          newFocusStates[stateFocusIndex] = true;
          return newFocusStates;
        })
      }
      // onBlur={() =>
      //   setFocusStates((prev) => {
      //     const newFocusStates = Array(3).fill(false);
      //     newFocusStates[stateFocusIndex] = false;
      //     return newFocusStates;
      //   })
      // }
    >
      {/* <-- Web-specific override */}
      <TextInput
        value={options[value]}
        onChangeText={(text) =>
          filterOptions(text, options, setFiltered, setValue)
        }
        placeholder={placeholder}
        placeholderTextColor={error ? '#FF0000' : '#999'}
        style={styles.input}
      />
      {Object.keys(filtered).length > 0 && focusStates[stateFocusIndex] && (
        <WebAbsoluteWrapper style={styles.suggestionBox}>
          {Object.keys(filtered).map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{ zIndex: 999 }}
              onPress={() => {
                setValue(item);
                setFiltered([]);
                setFocusStates((prev) => {
                  const newFocusStates = Array(3).fill(false);
                  newFocusStates[stateFocusIndex] = false;
                  return newFocusStates;
                });
              }}
            >
              <Text style={styles.suggestionItem}>{options[item]}</Text>
            </TouchableOpacity>
          ))}
        </WebAbsoluteWrapper>
      )}
    </View>
  </View>
);

export default function NewJobModal({
  activeKey,
  closeModal,
  editMode = false,
}) {
  const router = useRouter();
  // const { key } = useLocalSearchParams();
  const {
    createdJobs,
    setCreatedJobs,
    activeThemeStyles,
    currentJobId,
    editJobById,
  } = useComponentContext();

  const currentJobInfo = useMemo(
    () => createdJobs.find((job) => job.id === currentJobId),
    [createdJobs, currentJobId]
  );

  const [type, setType] = useState(editMode ? currentJobInfo?.type : '');
  const [filteredTypes, setFilteredTypes] = useState(JOB_TYPES);
  const [subType, setSubType] = useState(
    editMode ? currentJobInfo?.subType : ''
  );
  const [filteredSubTypes, setFilteredSubTypes] = useState(JOB_SUB_TYPES);
  const [profession, setProfession] = useState(
    editMode ? currentJobInfo?.profession : ''
  );
  const [filteredProfessions, setFilteredProfessions] = useState(LICENSES);
  const [description, setDescription] = useState(
    editMode ? currentJobInfo?.description : ''
  );
  const [price, setPrice] = useState(editMode ? currentJobInfo?.price : '');

  const [images, setImages] = useState(editMode ? currentJobInfo?.images : []);
  const [modalVisible, setModalVisible] = useState(false);

  const [location, setLocation] = useState(
    editMode ? currentJobInfo?.location : ''
  );

  const [startDateTime, setStartDateTime] = useState(
    editMode ? currentJobInfo?.startDateTime : null
  );
  const [endDateTime, setEndDateTime] = useState(
    editMode ? currentJobInfo?.endDateTime : null
  );

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // Состояния для управления фокусом на полях ввода
  const [focusStates, setFocusStates] = useState([false, false, false]);

  const [fieldErrors, setFieldErrors] = useState({
    type: false,
    subType: false,
    profession: false,
  });

  const handleCreate = () => {
    const newErrors = {
      type: !type,
      subType: !subType,
      profession: !profession,
    };

    setFieldErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((e) => e);

    if (hasErrors) return;

    if (editMode && currentJobId) {
      const jobChanges = {};

      if (type !== currentJobInfo.type) jobChanges.type = type;
      if (subType !== currentJobInfo.subType) jobChanges.subType = subType;
      if (profession !== currentJobInfo.profession)
        jobChanges.profession = profession;
      if (description !== currentJobInfo.description)
        jobChanges.description = description;
      if (price !== currentJobInfo.price) jobChanges.price = price;
      if (location !== currentJobInfo.location) jobChanges.location = location;
      // сравнение дат (если обе существуют и разные)
      if (
        startDateTime &&
        new Date(startDateTime).toISOString() !== currentJobInfo.startDateTime
      ) {
        jobChanges.startDateTime = new Date(startDateTime).toISOString();
      }
      if (
        endDateTime &&
        new Date(endDateTime).toISOString() !== currentJobInfo.endDateTime
      ) {
        jobChanges.endDateTime = new Date(endDateTime).toISOString();
      }
      if (Object.keys(jobChanges).length > 0) {
        editJobById(currentJobId, jobChanges);
      }
    } else {
      const newJob = {
        type,
        subType,
        profession,
        description,
        price,
        images,
        location,
        // Преобразуем даты в ISO формат
        startDateTime: startDateTime
          ? new Date(startDateTime).toISOString()
          : null,
        endDateTime: endDateTime ? new Date(endDateTime).toISOString() : null,
        createdAt: new Date().toISOString(),
        id: Date.now().toString(), // уникальный ID для нового задания
        status: 'waiting', // статус задания
        creator: 'currentUserId', // здесь можно указать ID текущего пользователя
        providers: [],
        history: [],
      };
      newJob.history = [
        {
          type: 'Created',
          date: newJob.createdAt,
          changes: {
            type,
            subType,
            profession,
            description,
            price,
            images: images.length,
            location,
            startDateTime: startDateTime
              ? new Date(startDateTime).toISOString()
              : null,
            endDateTime: endDateTime
              ? new Date(endDateTime).toISOString()
              : null,
          },
        },
      ];
      setCreatedJobs((prev) => [...prev, newJob]);
    }

    // if (router.canGoBack?.()) {
    //   router.back();
    // } else {
    //   router.replace(`/store`);
    // }
    closeModal();
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
      const filtered = Object.fromEntries(
        Object.keys(options)
          .filter((key) =>
            options[key].toLowerCase().includes(text.toLowerCase())
          )
          .map((key) => [key, options[key]])
      );
      setter(filtered);
    }
  };

  const formContent = [
    renderAutocomplete({
      label: 'Type',
      value: type,
      setValue: (text) => {
        setType(text);
        if (fieldErrors.type && text) {
          setFieldErrors((prev) => ({ ...prev, type: false }));
        }
      },
      filtered: filteredTypes,
      setFiltered: setFilteredTypes,
      options: JOB_TYPES,
      placeholder: 'Select or type...',
      stateFocusIndex: 0,
      setFocusStates: setFocusStates,
      filterOptions: filterOptions,
      focusStates: focusStates,
      error: fieldErrors.type,
      backgroundColor: activeThemeStyles?.formInputBackground,
    }),
    renderAutocomplete({
      label: 'Sub type',
      value: subType,
      setValue: (text) => {
        setSubType(text);
        if (fieldErrors.subType && text) {
          setFieldErrors((prev) => ({ ...prev, subType: false }));
        }
      },
      filtered: filteredSubTypes,
      setFiltered: setFilteredSubTypes,
      options: JOB_SUB_TYPES,
      placeholder: 'Select or type...',
      stateFocusIndex: 1,
      setFocusStates: setFocusStates,
      filterOptions: filterOptions,
      focusStates: focusStates,
      error: fieldErrors.subType,
      backgroundColor: activeThemeStyles?.formInputBackground,
    }),
    renderAutocomplete({
      label: 'Profession (optional)',
      value: profession,
      setValue: (text) => {
        setProfession(text);
        if (fieldErrors.profession && text) {
          setFieldErrors((prev) => ({ ...prev, profession: false }));
        }
      },
      filtered: filteredProfessions,
      setFiltered: setFilteredProfessions,
      options: LICENSES,
      placeholder: 'Select...',
      stateFocusIndex: 2,
      setFocusStates: setFocusStates,
      filterOptions: filterOptions,
      focusStates: focusStates,
      error: fieldErrors.profession,
      backgroundColor: activeThemeStyles?.formInputBackground,
    }),
    <View
      style={[
        styles.inputBlock,
        { backgroundColor: activeThemeStyles?.formInputBackground },
      ]}
      key='description'
    >
      <Text style={styles.label}>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder='Type...'
        placeholderTextColor={'#999'}
        style={[styles.input, { height: 100 }]}
        multiline
      />
    </View>,
    <View
      style={[
        styles.inputBlock,
        { backgroundColor: activeThemeStyles?.formInputBackground },
      ]}
      key='price'
    >
      <Text style={styles.label}>Price</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder='Type...'
        placeholderTextColor={'#999'}
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
    <View
      style={[
        styles.inputBlock,
        { backgroundColor: activeThemeStyles?.formInputBackground },
      ]}
      key='location'
    >
      <Text style={styles.label}>Location</Text>
      <TextInput
        value={location}
        onChangeText={setLocation}
        placeholder='Type...'
        placeholderTextColor={'#999'}
        style={styles.input}
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
      <View
        style={{ flex: 1, backgroundColor: activeThemeStyles?.backgroundColor }}
      >
        <View style={styles.header}>
          <TouchableOpacity
            // onPress={() =>
            //   router.canGoBack?.() ? router.back() : router.replace('/store')
            // }
            onPress={() => closeModal()}
          >
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
          <Text
            style={[styles.logo, { color: activeThemeStyles?.primaryColor }]}
          >
            FLALX
          </Text>
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
          <TouchableOpacity
            style={[
              styles.createButton,
              { backgroundColor: activeThemeStyles?.buttonColorPrimaryDefault },
            ]}
            onPress={handleCreate}
          >
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              {editMode ? 'Save' : 'Create'}
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 24,
  },
  inputBlock: {
    marginBottom: 16,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createButton: {
    paddingVertical: 14,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorOutline: {
    shadowColor: 'red',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
});
