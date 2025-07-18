import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import NewJobModal from '../../components/NewJobModal';
import ProvidersSection from '../../components/ProvidersSection';
import CustomFlatList from '../../components/ui/CustomFlatList';
import DateTimeInput from '../../components/ui/DateTimeInput';
import DateTimeInputDouble from '../../components/ui/DateTimeInputDouble';
import { JOB_SUB_TYPES } from '../../constants/jobSubTypes';
import { JOB_TYPES } from '../../constants/jobTypes';
import { LICENSES } from '../../constants/licenses';
import { useComponentContext } from '../../context/globalAppContext';

export default function ShowJobModal() {
  const router = useRouter();
  const { key } = useLocalSearchParams();
  const {
    createdJobs,
    activeThemeStyles,
    currentJobId,
    getUserById,
    removeJobById,
  } = useComponentContext();
  const [newJobModalVisible, setNewJobModalVisible] = useState(false);

  const currentJobInfo = useMemo(
    () => createdJobs.find((job) => job.id === currentJobId),
    [createdJobs, currentJobId]
  );

  const formContent = [
    <View
      style={[
        styles.inputBlock,
        { backgroundColor: activeThemeStyles?.formInputBackground },
      ]}
      key='type'
    >
      <Text style={styles.label}>Type</Text>
      <TextInput
        value={JOB_TYPES[currentJobInfo?.type] || '-'}
        style={styles.input}
        readOnly
      />
    </View>,
    <View
      style={[
        styles.inputBlock,
        { backgroundColor: activeThemeStyles?.formInputBackground },
      ]}
      key='subType'
    >
      <Text style={styles.label}>Sub type</Text>
      <TextInput
        value={JOB_SUB_TYPES[currentJobInfo?.subType] || '-'}
        style={styles.input}
        readOnly
      />
    </View>,
    <View
      style={[
        styles.inputBlock,
        { backgroundColor: activeThemeStyles?.formInputBackground },
      ]}
      key='subType'
    >
      <Text style={styles.label}>Profession</Text>
      <TextInput
        value={LICENSES[currentJobInfo?.profession] || '-'}
        style={styles.input}
        readOnly
      />
    </View>,
    <View
      style={[
        styles.inputBlock,
        { backgroundColor: activeThemeStyles?.formInputBackground },
      ]}
      key='description'
    >
      <Text style={styles.label}>Description</Text>
      <TextInput
        value={currentJobInfo?.description || ''}
        style={[styles.input, { height: 100 }]}
        multiline
        readOnly
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
        value={currentJobInfo?.price || '-'}
        style={styles.input}
        keyboardType='numeric'
        readOnly
      />
    </View>,
    <View style={styles.imageInputBlock} key='images'>
      <View style={styles.imageRow}>
        {/* Скролл с картинками */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imageScrollContainer}
        >
          {currentJobInfo?.images.map((uri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri }} style={styles.imageThumbnail} />
            </View>
          ))}
        </ScrollView>
      </View>
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
        value={currentJobInfo?.location || '-'}
        style={styles.input}
        readOnly
      />
    </View>,
    <View style={styles.row} key='dateTimeRange'>
      {Platform.OS !== 'android' ? (
        <DateTimeInput
          key='startDateTime'
          label='Start'
          value={currentJobInfo?.startDateTime}
          readOnly={true}
        />
      ) : (
        <DateTimeInputDouble
          label='Start'
          value={currentJobInfo?.startDateTime}
          readOnly={true}
        />
      )}
      {Platform.OS !== 'android' ? (
        <DateTimeInput
          key='endDateTime'
          label='End'
          value={currentJobInfo?.endDateTime}
          readOnly={true}
        />
      ) : (
        <DateTimeInputDouble
          label='End'
          value={currentJobInfo?.endDateTime}
          readOnly={true}
        />
      )}
    </View>,
    <ProvidersSection
      key='providers'
      styles={styles}
      currentJobInfo={currentJobInfo}
    />,
    <TouchableOpacity
      key='updateButton'
      style={[
        styles.createButton,
        { backgroundColor: activeThemeStyles?.buttonColorPrimaryDefault },
      ]}
      onPress={() => setNewJobModalVisible(true)}
    >
      <Text
        style={{
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        Update
      </Text>
    </TouchableOpacity>,
    <TouchableOpacity
      key='closeButton'
      style={[
        styles.createButton,
        { backgroundColor: activeThemeStyles?.buttonColorSecondaryDefault },
      ]}
      onPress={() => {
        removeJobById(currentJobId);
        if (router.canGoBack?.()) {
          router.back();
        } else {
          router.replace('/store');
        }
      }}
    >
      <Text
        style={{
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        Close
      </Text>
    </TouchableOpacity>,
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
            onPress={() =>
              router.canGoBack?.() ? router.back() : router.replace('/store')
            }
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
      </View>
        <Modal visible={newJobModalVisible} animationType="slide">
          <NewJobModal closeModal={() => setNewJobModalVisible(false)} editMode={true} />
        </Modal>
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
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  errorOutline: {
    shadowColor: 'red',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 2,
    paddingVertical: 2,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
});
