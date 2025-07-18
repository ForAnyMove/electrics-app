import { useComponentContext } from '@/context/globalAppContext';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import 'expo-router/entry'; // если expo-router
import { Platform } from 'react-native';
import 'react-native-gesture-handler'; // ← обязательно первой строкой
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Header from '../../components/Header';

export default function TabsLayout() {
  const { activeThemeStyles } = useComponentContext();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons = {
            store: 'storefront-outline',
            providers: 'people-outline',
            jobs: 'briefcase-outline',
            home: 'home-outline',
          };
          return (
            <Ionicons
              name={icons[route.name]}
              size={RFValue(16)}
              color={color}
            />
          );
        },
        tabBarLabel: {
          // 'my-references': 'References',
          store: 'Store',
          providers: 'Providers',
          jobs: 'Jobs',
          // home: 'Home',
        }[route.name],
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
        // Кастомный хэдер
        header: () => <Header />,
        // route.name !== 'store'
        //   ? () => <Header title={route.name.replace(/-/g, ' ')} />
        //   : undefined, // store будет рисовать свой хэдер внутри компонента
      })}
    >
      <Tabs.Screen name='store' />
      <Tabs.Screen name='providers' />
      <Tabs.Screen name='jobs' />
      {/* <Tabs.Screen name='home' /> */}
    </Tabs>
  );
}
