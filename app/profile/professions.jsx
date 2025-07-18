import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import SearchPanel from '../../components/SearchPanel';
import { LICENSES } from '../../constants/licenses';
import { useComponentContext } from '../../context/globalAppContext';

export default function ProfessionsScreen() {
  const { myProfile, activeThemeStyles } = useComponentContext();
    const [searchValue, setSearchValue] = useState('');

  return (
    <View
      style={[
        styles.professionScreen,
        { backgroundColor: activeThemeStyles?.backgroundColor },
      ]}
    >
      <SearchPanel searchValue={searchValue} setSearchValue={setSearchValue} />
      <ScrollView>
      {myProfile?.professions?.filter(val => LICENSES[val].toLowerCase().includes(searchValue.toLowerCase())).map((prof, index) => (
        <View
          key={index}
          style={[
            styles.professionContainer,
            { backgroundColor: activeThemeStyles?.formInputBackground },
          ]}
        >
          <FontAwesome6 name="check" size={RFValue(14)} color={activeThemeStyles?.textColor} />
          <Text style={[styles.professionTitle, {color: activeThemeStyles?.textColor}]}>{LICENSES[prof]}</Text>
          {true && <Text style={[styles.verifiedMarker, {color: activeThemeStyles?.unactiveTextColor}]}>verified</Text>}
        </View>
      ))}
      </ScrollView>
      <TouchableOpacity
        style={{
          backgroundColor: activeThemeStyles?.mainBadgeBackground,
          width: 45,
          height: 45,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          right: 20,
          bottom: 20,
          ...Platform.select({
            web: {
              right: 40,
            },
          }),
        }}
        // onPress={() => router.push('/new-job-modal')}
      >
        <FontAwesome6 name='plus' size={14} color={activeThemeStyles?.badgeTextColor} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  professionScreen: {
    flex: 1,
    padding: RFValue(10),
  },
  professionContainer: {
    borderRadius: RFValue(5),
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(14),
    flexDirection: 'row',
    gap: RFValue(8),
    marginBottom: RFValue(8)
  },
  professionTitle: {
    fontSize: RFValue(10),
    fontWeight: '500',
  },
  verifiedMarker: {
    fontSize: RFValue(10),
    textAlign: 'right', flex: 1,
  },
});
