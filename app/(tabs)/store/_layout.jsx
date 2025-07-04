import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import DoneScreen from './done';
import InProgressScreen from './inProgress';
import NewScreen from './new';
import WaitingScreen from './waiting';

// Иконки по ключу title
const icons = {
  New: 'new',
  Waiting: 'business-time',
  'In progress': 'person-running',
  Done: 'bed',
};

// Тестовые значения для badge
const badgeCounts = {
  New: 0,
  Waiting: 3,
  'In progress': 0,
  Done: 5,
};

const TAB_TITLES = ['New', 'Waiting', 'In progress', 'Done'];
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

  const interpolatedColorValues = TAB_TITLES.map((_, i) => {
    return positiveScrollX.interpolate({
      inputRange: [
        (i - 1) * SCREEN_WIDTH,
        i * SCREEN_WIDTH,
        (i + 1) * SCREEN_WIDTH,
      ],
      outputRange: ['#999', '#000', '#999'],
      extrapolate: 'clamp',
    });
  });

  const interpolatedOpacityValues = TAB_TITLES.map((_, i) => {
    return positiveScrollX.interpolate({
      inputRange: [
        (i - 1) * SCREEN_WIDTH,
        i * SCREEN_WIDTH,
        (i + 1) * SCREEN_WIDTH,
      ],
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });
  });

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

  const chooseIcon = (iconName) => {
    switch (iconName) {
      case 'Waiting':
        return <FontAwesome6 name={icons[iconName]} size={22} color={'#000'} />;
      case 'New':
        return <Entypo name={icons[iconName]} size={22} color={'#000'} />;
      case 'Done':
        return <FontAwesome6 name={icons[iconName]} size={22} color={'#000'} />;
      case 'In progress':
        return <FontAwesome6 name={icons[iconName]} size={22} color={'#000'} />;
      default:
        break;
    }
  };

  return (
    <View style={{ flex: 1, userSelect: 'none' }}>
      {/* Заголовки вкладок */}
      <View
        style={{
          flexDirection: 'row',
          height: 84,
          backgroundColor: '#fff',
          // borderBottomWidth: 2,
          // borderBottomColor: '#DFDFFF',
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
            {/* Иконка */}
            <View style={{ position: 'relative' }}>
              <Animated.View
                style={{ opacity: interpolatedOpacityValues[idx] }}
              >
                {chooseIcon(title)}
              </Animated.View>
              {/* Badge если count > 0 */}
              {badgeCounts[title] > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: -10,
                    minWidth: 16,
                    height: 16,
                    borderRadius: 8,
                    backgroundColor: 'orange',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 4,
                  }}
                >
                  <Text
                    style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}
                  >
                    {badgeCounts[title]}
                  </Text>
                </View>
              )}
            </View>
            {/* Заголовок */}
            <View
              style={{
                height: 40, // Высота для 2 строк
                justifyContent: 'center', // Центровка по вертикали
                paddingHorizontal: 4, // Чуть больше пространства по бокам
              }}
            >
              <Animated.Text
                style={{
                  color: interpolatedColorValues[idx],
                  fontWeight: 'bold',
                  textAlign: 'center', // Центровка по горизонтали
                }}
                numberOfLines={2}
                ellipsizeMode='tail'
              >
                {title}
              </Animated.Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Анимированное подчёркивание */}
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: underlineTranslateX,
            width: underlineAnimatedWidth,
            height: 3,
            backgroundColor: '#0A62EA',
            borderRadius: 3,
            zIndex: 2,
          }}
        />
        {/* Внутренняя псевдо-тень */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            backgroundColor: '#DFDFFF',
            zIndex: 1,
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
          {[NewScreen, WaitingScreen, InProgressScreen, DoneScreen].map(
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
