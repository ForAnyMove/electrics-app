import { useComponentContext } from '@/context/globalAppContext';
import { FontAwesome6 } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import JobTypeSelector from '../../../components/JobTypeSelector';
import SearchPanel from '../../../components/SearchPanel';
import ShowJobModal from '../../../components/ShowJobModal';
import { JOB_TYPES } from '../../../constants/jobTypes';

export default function NewScreen() {
  const { jobsList, setCurrentJobId, activeThemeStyles } =
    useComponentContext();
  const [showJobModalVisible, setShowJobModalVisible] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <View
        style={[
          styles.container,
          { backgroundColor: activeThemeStyles?.backgroundColor },
        ]}
      >
        <View>
          <SearchPanel
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </View>
        <View>
          <JobTypeSelector
            selectedTypes={filteredJobs}
            setSelectedTypes={setFilteredJobs}
          />
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {jobsList
            .filter(
              (value) =>
                (filteredJobs.length === 0 ||
                  filteredJobs.includes(value?.type)) &&
                value.type.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((job, index) => {
              const hasImage = job.images && job.images.length > 0;
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.cardContainer}
                  onPress={() => {
                    setCurrentJobId(job.id);
                    setShowJobModalVisible(true);
                  }}
                >
                  <View
                    style={[
                      styles.cardContent,
                      {
                        backgroundColor:
                          activeThemeStyles?.defaultBlocksBackground,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.imageContainer,
                        {
                          backgroundColor:
                            activeThemeStyles?.defaultBlocksMockBackground,
                        },
                      ]}
                    >
                      {hasImage ? (
                        <Image
                          source={{ uri: job.images[0] }}
                          style={styles.image}
                          resizeMode='cover'
                        />
                      ) : (
                        <View style={styles.placeholderImage}>
                          <FontAwesome6
                            name='image'
                            size={20}
                            color={activeThemeStyles?.defaultBlocksMockColor}
                          />
                        </View>
                      )}
                    </View>
                    <View style={styles.textContent}>
                      <Text
                        style={[
                          styles.title,
                          { color: activeThemeStyles?.textColor },
                        ]}
                      >
                        {JOB_TYPES[job.type]}
                      </Text>
                      {job.description ? (
                        <Text
                          style={[
                            styles.description,
                            { color: activeThemeStyles?.textColor },
                          ]}
                        >
                          {job.description}
                        </Text>
                      ) : null}
                    </View>
                    {/* {job.providers?.length > 0 && (
                      <View
                        style={[
                          styles.badge,
                          {
                            backgroundColor:
                              activeThemeStyles?.secondaryBadgeBackground,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.badgeText,
                            { color: activeThemeStyles?.badgeTextColor },
                          ]}
                        >
                          {job.providers.length}
                        </Text>
                      </View>
                    )} */}
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
        <Modal visible={showJobModalVisible} animationType='slide'>
          <ShowJobModal
            closeModal={() => setShowJobModalVisible(false)}
            status='jobs-new'
          />
        </Modal>
      </View>
    </>
  );
}

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 0,
  },
  scrollContainer: {
    paddingBottom: 0,
  },
  cardContainer: {
    marginBottom: 10,
  },
  cardContent: {
    flexDirection: 'row',
    borderRadius: 12,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  imageContainer: {
    width: 68,
    height: 68,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    flex: 1,
    height: '80%',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    marginTop: 2,
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
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
};
