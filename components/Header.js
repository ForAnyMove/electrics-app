import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Header({ title }) {
const router = useRouter();
  const userAvatar = null; // Здесь позже будет аватар

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={() => router.push('/notifications')}>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </TouchableOpacity> */}
      <Text style={styles.logoText}>Flalx</Text>
      {/* <Text style={styles.title}>{title}</Text> */}
      <TouchableOpacity onPress={() => router.push('/profile')}>
        {userAvatar ? (
          <Image source={{ uri: userAvatar }} style={styles.avatar} />
        ) : (
          <Ionicons name="person-circle-outline" size={40} color="#888" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    // borderBottomWidth: 1,
    // borderColor: '#eee',
  },
  logoText: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#0A62EA',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});
