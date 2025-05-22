import { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ApprovedScreen from './approved';
import CarriedOutScreen from './carried-out';
import PendingScreen from './pending';

const TAB_TITLES = ['Were carried out', '(3) Approved', 'Pending'];
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ReferenceScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const activeTabRef = useRef(0);
  const scrollX = useRef(
    new Animated.Value(-activeTabRef.current * SCREEN_WIDTH)
  ).current;

  const tabWidth = SCREEN_WIDTH / TAB_TITLES.length;
  const positiveScrollX = Animated.multiply(scrollX, -1);

  const underlineAnimatedWidth = positiveScrollX.interpolate({
    inputRange: TAB_TITLES.flatMap((_, i) => [
      (i - 0.5) * SCREEN_WIDTH,
      i * SCREEN_WIDTH,
      (i + 0.5) * SCREEN_WIDTH,
    ]),
    outputRange: TAB_TITLES.flatMap(() => [
      tabWidth * 1,
      tabWidth * 0.7,
      tabWidth * 1,
    ]),
    extrapolate: 'clamp',
  });

  const underlineTranslateX = positiveScrollX.interpolate({
    inputRange: TAB_TITLES.map((_, i) => i * SCREEN_WIDTH),
    outputRange: TAB_TITLES.map(
      (_, i) => i * tabWidth + (tabWidth - tabWidth * 0.7) / 2
    ),
    extrapolate: 'clamp',
  });

  const isSwipeRight = useRef(null);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 10 &&
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy),

      onPanResponderGrant: () => {
        scrollX.setOffset(scrollX.__getValue());
        scrollX.setValue(0);
        isSwipeRight.current = null;
      },
      
      onPanResponderMove: (_, gestureState) => {
        if (isSwipeRight.current === null) {
          isSwipeRight.current = gestureState.dx > 0; // свайп вправо — true, влево — false
        }
        if (
          (activeTabRef.current === 0 && isSwipeRight.current) ||
          (activeTabRef.current === TAB_TITLES.length - 1 &&
            !isSwipeRight.current)
        )
          return;
        scrollX.setValue(gestureState.dx);
      },

      onPanResponderRelease: (_, gestureState) => {
        scrollX.flattenOffset();
        const dx = gestureState.dx;
        const swipeThreshold = SCREEN_WIDTH * 0.25;

        let newTab = activeTabRef.current;

        if (
          dx < swipeThreshold * -1 &&
          activeTabRef.current < TAB_TITLES.length - 1
        ) {
          newTab = activeTabRef.current + 1;
        } else if (dx > swipeThreshold && activeTabRef.current > 0) {
          newTab = activeTabRef.current - 1;
        }

        Animated.timing(scrollX, {
          toValue: -newTab * SCREEN_WIDTH,
          duration: 250,
          useNativeDriver: false,
        }).start(() => {
          activeTabRef.current = newTab;
          setActiveTab(newTab);
        });
      },
    })
  ).current;

  const handleTabPress = (index) => {
    Animated.timing(scrollX, {
      toValue: -index * SCREEN_WIDTH,
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      activeTabRef.current = index;
      setActiveTab(index);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Заголовки вкладок */}
      <View
        style={{
          flexDirection: 'row',
          height: 44,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#000',
          overflow: 'hidden',
        }}
      >
        {TAB_TITLES.map((title, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => handleTabPress(idx)}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: 6,
              backgroundColor: '#fff',
            }}
          >
            <View
              style={{
                height: 40, // Высота для 2 строк
                justifyContent: 'center', // Центровка по вертикали
                paddingHorizontal: 4, // Чуть больше пространства по бокам
              }}
            >
              <Text
                style={{
                  color: activeTab === idx ? '#000' : '#222',
                  fontWeight: 'bold',
                  textAlign: 'center', // Центровка по горизонтали
                }}
                numberOfLines={2}
                ellipsizeMode='tail'
              >
                {title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Анимированное подчёркивание */}
        <Animated.View
          style={{
            position: 'absolute',
            bottom: -2,
            left: underlineTranslateX,
            width: underlineAnimatedWidth,
            height: 4,
            backgroundColor: '#000',
            borderRadius: 10,
          }}
        />
      </View>

      {/* Контент с анимацией и свайпом */}
      <View style={{ flex: 1 }} {...panResponder.panHandlers}>
        <Animated.View
          style={{
            flexDirection: 'row',
            width: SCREEN_WIDTH * TAB_TITLES.length,
            flex: 1,
            transform: [{ translateX: scrollX }],
          }}
        >
          {[CarriedOutScreen, ApprovedScreen, PendingScreen].map(
            (Component, index) => (
              <View
                key={index}
                style={{
                  width: SCREEN_WIDTH,
                  flex: 1,
                }}
              >
                <Component />
              </View>
            )
          )}
        </Animated.View>
      </View>
    </View>
  );
}
