import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import JobCard from '../../components/JobCard';
import { JOB_DATA } from './jobs';

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  greeting: {
    color: '#333',
    fontSize: 21,
    textAlign: 'right',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  sliderWrapper: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
  },
  sliderContainer: {
    width: '100%',
  },
  slide: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: 12,
  },
  slideText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  slideComponent: {
    color: '#fff',
    fontSize: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#75b28e',
  },
  arrow: {
    position: 'absolute',
    top: '40%',
    padding: 8,
    zIndex: 1,
  },
  arrowLeft: {
    left: 0,
  },
  arrowRight: {
    right: 0,
  },
  arrowText: {
    fontSize: 24,
    color: '#000',
  },
  block: {
    marginTop: 24,
  },
  blockHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  blockTitle: {
    color: '#333',
    fontSize: 21,
    textAlign: 'right',
    marginVertical: 8,
    fontWeight: 'bold',
  },
  showAll: {
    color: '#75b28e',
    fontSize: 14,
    textAlign: 'right',
  },
  tileGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 5,
    rowGap: 20,
    marginBottom: 8,
  },
  tile: {
    width: '47%',
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: '#f5f5f5',
  },
  tileDisabled: {
    backgroundColor: '#e0e0e0',
  },
  tileText: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tileTextDisabled: {
    color: '#b9b9b9',
  },
});

const SLIDES = [
  {
    image: require('../../assets/images/slider/slide1.jpg'),
    text: 'Welcome to your dashboard',
    component: null,
  },
  {
    image: require('../../assets/images/slider/slide2.jpg'),
    text: 'Don’t forget today’s briefing',
    component: null,
  },
  {
    image: require('../../assets/images/slider/slide3.jpg'),
    text: null,
    component: <Text style={styles.slideComponent}>Custom Component Here</Text>,
  },
  {
    image: require('../../assets/images/slider/slide4.jpg'),
    text: 'Keep up the good work!',
    component: null,
  },
];

export default function HomeScreen() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideWidth, setSlideWidth] = useState(Dimensions.get('window').width * 0.9);
  const [containerPadding, setContainerPadding] = useState((Dimensions.get('window').width - slideWidth) / 2);
  const sliderRef = useRef(null);
  const router = useRouter();

  const scrollToSlide = (index) => {
    sliderRef.current?.scrollTo({ x: index * slideWidth + containerPadding * index, animated: true });
    setActiveSlide(index);
  };

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / slideWidth);
    setActiveSlide(index);
  };

  useEffect(() => {
    const updateLayout = () => {
      const { width, height } = Dimensions.get('window');
      const isLandscape = width > height;
      const newSlideWidth = isLandscape ? width * 0.45 : width * 0.9;
      const newContainerPadding = isLandscape ? (width * 0.5 - newSlideWidth) / 2 : (width - newSlideWidth) / 2;
      setSlideWidth(newSlideWidth);
      setContainerPadding(newContainerPadding);
      scrollToSlide(0);
    };

    const subscription = Dimensions.addEventListener('change', updateLayout);
    updateLayout();

    return () => subscription?.remove();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Приветствие */}
        <Text style={styles.greeting}>Hi John, good morning</Text>

        {/* Слайдер */}
        <View style={styles.sliderWrapper}>
          {Platform.OS === 'web' && (
            <TouchableOpacity
              onPress={() => scrollToSlide(Math.max(activeSlide - 1, 0))}
              style={[styles.arrow, styles.arrowLeft]}
            >
              <Text style={styles.arrowText}>{'<'}</Text>
            </TouchableOpacity>
          )}

          <View style={{width: slideWidth}}>
            <ScrollView
              ref={sliderRef}
              horizontal
              pagingEnabled={false}
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              snapToInterval={slideWidth+containerPadding}
              decelerationRate="fast"
              contentContainerStyle={{ gap: containerPadding }}
            >
              {SLIDES.map((slide, index) => (
                <ImageBackground
                  key={index}
                  source={slide.image}
                  style={[styles.slide, { width: slideWidth }]}
                  imageStyle={styles.imageStyle}
                >
                  {slide.component || (
                    <Text style={styles.slideText}>{slide.text}</Text>
                  )}
                </ImageBackground>
              ))}
            </ScrollView>
          </View>

          {Platform.OS === 'web' && (
            <TouchableOpacity
              onPress={() => scrollToSlide(Math.min(activeSlide + 1, SLIDES.length - 1))}
              style={[styles.arrow, styles.arrowRight]}
            >
              <Text style={styles.arrowText}>{'>'}</Text>
            </TouchableOpacity>
          )}

          {/* Точки */}
          <View style={styles.dotsContainer}>
            {SLIDES.map((_, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => scrollToSlide(i)}
                style={[styles.dot, activeSlide === i && styles.activeDot]}
              />
            ))}
          </View>
        </View>

        {/* Job calls - часть 1 */}
        <View style={styles.block}>
          <View style={styles.blockHeader}>
            <Text style={styles.blockTitle}>Job calls</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/jobs')}>
              <Text style={styles.showAll}>Show all &lt;</Text>
            </TouchableOpacity>
          </View>
          <JobCard key={JOB_DATA[0].id} job={JOB_DATA[0]} />
        </View>

        {/* Job calls - часть 2 */}
        <Text style={styles.blockTitle}>Job calls</Text>
        <View style={styles.tileGrid}>
          {[...Array(8)].map((_, idx) => {
            const disabled = idx === 2 || idx === 5;
            return (
              <TouchableOpacity
                key={idx}
                disabled={disabled}
                style={[styles.tile, disabled && styles.tileDisabled]}
              >
                <Text style={[styles.tileText, disabled && styles.tileTextDisabled]}>
                  Tile {idx + 1}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
