import { useState } from 'react';
import { View } from 'react-native';
import JobTypeSelector from '../../../components/JobTypeSelector';
import SearchPanel from '../../../components/SearchPanel';

const testJobs = [
  {
    address: 'Hasmonaim 9, Ramat Gan',
    time: '08:30-09:30 22/05/2022',
    types: ['Installation of accessories', 'service call'],
    creator: {
      name: 'Yossi',
      avatar: 'https://randomuser.me/api/portraits/men/31.jpg',
    },
    contact: {
      name: 'Tamar',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
  },
  {
    address: 'Hertzel 12, Tel Aviv',
    time: '10:00-11:00 23/05/2022',
    types: ['service call'],
    creator: {
      name: 'Ariel',
      avatar: null,
    },
    contact: {
      name: 'Dana',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    },
  },
  {
    address: 'HaNeviim 5, Jerusalem',
    time: '14:00-15:00 24/05/2022',
    types: ['Installation of accessories'],
    creator: {
      name: 'Eli',
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    },
    contact: {
      name: 'Noa',
      avatar: null,
    },
  },
  {
    address: 'Ben Yehuda 6, Haifa',
    time: '16:30-17:30 25/05/2022',
    types: ['Lighting setup'],
    creator: {
      name: 'Maya',
      avatar: null,
    },
    contact: {
      name: 'Ron',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
  },
  {
    address: 'Kaplan 4, Beersheba',
    time: '18:00-19:00 26/05/2022',
    types: ['Controller installation', 'service call'],
    creator: {
      name: 'Tom',
      avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
    },
    contact: {
      name: 'Lea',
      avatar: 'https://randomuser.me/api/portraits/women/18.jpg',
    },
  },
];

export default function DoneScreen() {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  return (
    <View style={styles.container}>
      <View>
        <SearchPanel searchValue={searchValue} setSearchValue={setSearchValue} />
      </View>
      <View>
        <JobTypeSelector selectedTypes={filteredJobs} setSelectedTypes={setFilteredJobs} />
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 25,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    color: '#555',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
};
