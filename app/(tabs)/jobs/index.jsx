import { FontAwesome6 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import JobCard from '../../../components/JobCard';


export const JOB_DATA = [
  {
    id: 1,
    title: 'Assistant electrician needed',
    type: ['Service calls', 'Electrical'],
    description: 'Build custom wooden furniture for a client.',
    location: 'Chicago',
    date: '22/05/2025',
    time: '6:40 PM-6:40 PM',
    posted: 'Posted 9 days ago',
  },
  // Add 6 more similar job objects with different values
  {
    id: 2,
    title: 'Plumber required',
    type: ['Maintenance', 'Urgent'],
    description: 'Fix leaking pipes in kitchen.',
    location: 'New York',
    date: '23/05/2025',
    time: '10:00 AM-11:00 AM',
    posted: 'Posted 7 days ago',
  },
  {
    id: 3,
    title: 'Painter for a small room',
    type: ['Renovation'],
    description: 'Paint a 12x12 ft room.',
    location: 'Los Angeles',
    date: '24/05/2025',
    time: '9:00 AM-12:00 PM',
    posted: 'Posted 6 days ago',
  },
  {
    id: 4,
    title: 'Window installer',
    type: ['Installation'],
    description: 'Install 4 new windows.',
    location: 'Houston',
    date: '25/05/2025',
    time: '1:00 PM-4:00 PM',
    posted: 'Posted 5 days ago',
  },
  {
    id: 5,
    title: 'AC repair technician',
    type: ['Service calls', 'HVAC'],
    description: 'Repair malfunctioning air conditioning.',
    location: 'Phoenix',
    date: '26/05/2025',
    time: '2:00 PM-3:00 PM',
    posted: 'Posted 4 days ago',
  },
  {
    id: 6,
    title: 'General labor',
    type: ['Help needed'],
    description: 'Assist in moving furniture.',
    location: 'Philadelphia',
    date: '27/05/2025',
    time: '11:00 AM-2:00 PM',
    posted: 'Posted 3 days ago',
  },
  {
    id: 7,
    title: 'Light fixture replacement',
    type: ['Electrical', 'Quick job'],
    description: 'Replace ceiling lights.',
    location: 'San Diego',
    date: '28/05/2025',
    time: '3:00 PM-4:00 PM',
    posted: 'Posted 2 days ago',
  },
];

export default function JobCallsScreen() {
  const router = useRouter();
  const { filters } = useLocalSearchParams();
  const appliedFilters = filters ? JSON.parse(filters) : [];

const filteredJobs = useMemo(() => {
  if (!appliedFilters || appliedFilters.length === 0) return JOB_DATA;

  return JOB_DATA.filter((job) => {
    return appliedFilters.every((filterBlock) => {
      // Пример: фильтрация по license или type
      if (filterBlock.title === 'Electrical licenses required') {
        return filterBlock.selected.some((selectedLicense) =>
          job.licenses?.includes(selectedLicense)
        );
      }
      if (filterBlock.title === 'Areas of specialization needed') {
        return filterBlock.selected.some((selectedType) =>
          job.type?.includes(selectedType)
        );
      }
      return true;
    });
  });
}, [appliedFilters]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.filterRow}
        onPress={() => router.push('/filter')}
      >
        <Text style={styles.filterText}>Filter by license level</Text>
        <FontAwesome6 name='arrow-down-wide-short' size={18} color='#72B68E' />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
    paddingRight: 25,
  },
  filterText: {
    marginRight: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#72B68E',
  },
  scrollContent: {
    paddingBottom: 20,
  },
});
