import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

export default function JobCard({ job }) {
  const [interested, setInterested] = useState(false);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{job.title}</Text>
      <Text style={styles.label}>The type of work</Text>
      <View style={styles.badgeContainer}>
        {job.type.map((tag, index) => (
          <View key={index} style={styles.badge}><Text style={styles.badgeText}>{tag}</Text></View>
        ))}
      </View>
      <Text style={styles.label}>Job description:</Text>
      <Text style={styles.description}>{job.description}</Text>
      <View style={styles.row}><Text style={styles.location}>{job.location}</Text><FontAwesome6 name="location-dot" size={20} /></View>
      <View style={styles.row}><Text style={styles.date}>{`${job.time} ${job.date}`}</Text><MaterialCommunityIcons name="clock" size={20} color="black" /></View>
      <Text style={styles.posted}>{job.posted}</Text>
      <TouchableOpacity
        style={[styles.button, interested && styles.disabledButton]}
        onPress={() => setInterested(true)}
        disabled={interested}
      >
        <Text style={[styles.buttonText, interested && styles.disabledText]}>
          {interested ? 'Awaiting confirmation' : 'I am interested in doing the job'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 2,
    alignItems: 'flex-end',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'right'
  },
  label: {
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'right'
  },
  badgeContainer: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
    justifyContent: 'flex-end',
  },
  badge: {
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  badgeText: {
    color: '#999',
    fontSize: 13,
  },
  description: {
    marginTop: 4,
    color: '#444',
    textAlign: 'right'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 6,
    marginTop: 8,
  },
  location: {
    color: '#333',
  },
  date: {
    color: '#333',
  },
  posted: {
    color: '#888',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'right'
  },
  button: {
    backgroundColor: '#72B68E',
    paddingVertical: 18,
    borderRadius: 8,
    marginTop: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: 'transparent',
  },
  disabledText: {
    color: '#555',
  },
});
