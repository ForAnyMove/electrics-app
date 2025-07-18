import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useComponentContext } from '../../context/globalAppContext';

export default function ProfileLayout() {
  const { activeThemeStyles } = useComponentContext();
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={[
          styles.profileHeader,
          {
            backgroundColor: activeThemeStyles?.backgroundColor,
            borderBottomColor: activeThemeStyles?.formInputBackground,
          },
        ]}
      >
        {/* Back button to /store */}
        <Pressable onPress={() => router.push('/store')} style={styles.backBtn}>
          <Ionicons name='arrow-back' size={28} color='black' />
        </Pressable>
        <Text style={styles.logoText}>Flalx</Text>
      </View>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'profile-info') iconName = 'person';
            else if (route.name === 'professions') iconName = 'briefcase';
            else if (route.name === 'settings') iconName = 'settings';

            return (
              <Ionicons name={iconName} size={RFValue(16)} color={color} />
            );
          },
          tabBarActiveTintColor: activeThemeStyles.tabBarTextColorActive, // белый цвет для активной вкладки
          tabBarInactiveTintColor: activeThemeStyles.tabBarTextColorInactive, // светло-серый цвет для неактивных вкладок
          tabBarStyle:
            Platform.OS === 'web'
              ? {
                  backgroundColor: activeThemeStyles.tabBarBackground, // основной цвет
                  borderTopColor: 'transparent', // убираем верхнюю границу
                  height: RFPercentage(6),
                }
              : {
                  backgroundColor: activeThemeStyles.tabBarBackground, // основной цвет
                  borderTopColor: 'transparent', // убираем верхнюю границу
                },
          headerShown: false,
        })}
      >
        <Tabs.Screen name='profile-info' options={{ title: 'Profile' }} />
        <Tabs.Screen name='professions' options={{ title: 'Professions' }} />
        <Tabs.Screen name='settings' options={{ title: 'Settings' }} />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    width: '100%',
    height: '8%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: RFValue(5),
    borderBottomWidth: 1,
  },
  logoText: {
    fontSize: RFValue(22),
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#0A62EA',
  },
  backBtn: {
    paddingHorizontal: RFValue(5),
  },
});
