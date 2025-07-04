import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ScheduledJobCard({ job }) {
  const renderAvatar = (uri) => {
    return uri ? (
      <Image source={{ uri }} style={styles.avatar} />
    ) : (
      <Ionicons name="person-circle-outline" size={40} color="#888" />
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.address}>
        {job.address} <FontAwesome name="map-marker" size={14} />
      </Text>
      <Text style={styles.datetime}>
        {job.time} <FontAwesome name="clock-o" size={14} />
      </Text>

      <Text style={styles.label}>The type of work</Text>
      <View style={styles.badgesRow}>
        {job.types.map((type, i) => (
          <View key={i} style={styles.badge}>
            <Text style={styles.badgeText}>{type}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.contactLabel}>The creator of the reading</Text>
      <View style={styles.contactRow}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="call" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.contactName}>{job.creator.name}</Text>
        {renderAvatar(job.creator.avatar)}
      </View>

      <Text style={styles.contactLabel}>On-site contact details</Text>
      <View style={styles.contactRow}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="call" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.contactName}>{job.contact.name}</Text>
        {renderAvatar(job.contact.avatar)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  address: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    textAlign: 'right',
  },
  datetime: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
    textAlign: 'right',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 2,
    marginBottom: 6,
    textAlign: 'right',
  },
  contactLabel: {
    fontSize: 12,
    marginTop: 2,
    marginBottom: 6,
    textAlign: 'right',
    color: '#333',
  },
  badgesRow: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
    marginTop: 4,
  },
  badge: {
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 2,
  },
  badgeText: {
    fontSize: 13,
    color: '#999',
    textAlign: 'right',
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  iconButton: {
    backgroundColor: '#72B68E',
    borderRadius: 20,
    padding: 8,
  },
  contactName: {
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
});
