import { MaterialIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useComponentContext } from '../../context/globalAppContext';

export default function ProfileScreen() {
  const { myProfile, setMyProfile, activeThemeStyles } = useComponentContext();

  return (
    <ScrollView
      style={[
        styles.userProfile,
        { backgroundColor: activeThemeStyles?.backgroundColor },
      ]}
    >
      <View style={{ paddingHorizontal: RFValue(5) }}>
        <ImageBackground
          source={myProfile?.profileBack}
          resizeMode='cover'
          style={[
            styles.profileBack,
            {
              backgroundColor: activeThemeStyles?.profileDefaultBackground,
            },
          ]}
        >
          {myProfile?.avatar && (
            <Image
              source={{ uri: myProfile.avatar }}
              style={{
                width: RFValue(100),
                height: RFValue(100),
                borderRadius: RFValue(100),
                backgroundColor: '#ccc',
              }}
            />
          )}
        </ImageBackground>

        <InfoField
          label='First Name'
          value={myProfile?.name}
          changeInfo={(newText) =>
            setMyProfile((prev) => ({ ...prev, name: newText }))
          }
        />
        <InfoField
          label='Surname'
          value={myProfile?.surname}
          changeInfo={(newText) =>
            setMyProfile((prev) => ({ ...prev, surname: newText }))
          }
        />
        <InfoField
          label='About'
          value={myProfile?.about}
          changeInfo={(newText) =>
            setMyProfile((prev) => ({ ...prev, about: newText }))
          }
          multiline
        />
        <InfoField
          label='Location'
          value={myProfile?.location || 'Not set'}
          changeInfo={(newText) =>
            setMyProfile((prev) => ({ ...prev, location: newText }))
          }
        />
        <InfoField
          label='Email'
          value={myProfile?.email}
          changeInfo={(newText) =>
            setMyProfile((prev) => ({ ...prev, email: newText }))
          }
        />
        <InfoField
          label='Phone Number'
          value={myProfile?.phoneNumber}
          changeInfo={(newText) =>
            setMyProfile((prev) => ({ ...prev, phoneNumber: newText }))
          }
        />
        <View
          style={[
            styles.breakLine,
            { backgroundColor: activeThemeStyles?.breakLineColor },
          ]}
        />
        <TouchableOpacity
          style={[
            styles.primaryBtn,
            { backgroundColor: activeThemeStyles?.buttonColorPrimaryDefault },
          ]}
        >
          <Text
            style={[
              styles.primaryText,
              { color: activeThemeStyles?.buttonTextColorPrimary },
            ]}
          >
            Cupones
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.primaryBtn,
            { backgroundColor: activeThemeStyles?.buttonColorPrimaryDefault },
          ]}
        >
          <Text
            style={[
              styles.primaryText,
              { color: activeThemeStyles?.buttonTextColorPrimary },
            ]}
          >
            Subscription
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.primaryBtn,
            { backgroundColor: activeThemeStyles?.buttonColorPrimaryDefault },
          ]}
        >
          <Text
            style={[
              styles.primaryText,
              { color: activeThemeStyles?.buttonTextColorPrimary },
            ]}
          >
            Payment method
          </Text>
        </TouchableOpacity>
        <View
          style={[
            styles.breakLine,
            { backgroundColor: activeThemeStyles?.breakLineColor },
          ]}
        />
        <TouchableOpacity
          style={[
            styles.primaryReverseBtn,
            {
              backgroundColor: activeThemeStyles?.buttonTextColorPrimary,
              borderColor: activeThemeStyles?.buttonColorPrimaryDefault,
            },
          ]}
        >
          <Text
            style={[
              styles.primaryText,
              { color: activeThemeStyles?.buttonColorPrimaryDefault },
            ]}
          >
            Cupones
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.secondaryReverseBtn,
            {
              backgroundColor: activeThemeStyles?.buttonTextColorSecondary,
              borderColor: activeThemeStyles?.buttonColorSecondaryDefault,
            },
          ]}
        >
          <Text
            style={[
              styles.secondaryText,
              { color: activeThemeStyles?.buttonColorSecondaryDefault },
            ]}
          >
            Subscription
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.secondaryReverseBtn,
            {
              backgroundColor: activeThemeStyles?.buttonTextColorSecondary,
              borderColor: activeThemeStyles?.buttonColorSecondaryDefault,
            },
          ]}
        >
          <Text
            style={[
              styles.secondaryText,
              { color: activeThemeStyles?.buttonColorSecondaryDefault },
            ]}
          >
            Payment method
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.secondaryBtn,
            { backgroundColor: activeThemeStyles?.buttonColorSecondaryDefault },
          ]}
        >
          <Text
            style={[
              styles.secondaryText,
              { color: activeThemeStyles?.buttonTextColorSecondary },
            ]}
          >
            Cupones
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function InfoField({ label, value, changeInfo, multiline = false }) {
  const { activeThemeStyles } = useComponentContext();
  const [editMode, setEditMode] = useState(false);
  const [textValue, setTextValue] = useState(value);
  return (
    <View
      style={[
        styles.profileInfoString,
        {
          backgroundColor: editMode
            ? activeThemeStyles?.formInputBackgroundEditMode
            : activeThemeStyles?.formInputBackground,
        },
      ]}
    >
      <View style={{ width: '80%' }}>
        <Text
          style={[
            styles.profileInfoLabel,
            { color: activeThemeStyles?.formInputLabelColor },
          ]}
        >
          {label}
        </Text>
        {editMode ? (
          <TextInput
            style={[
              styles.profileInfoText,
              { color: activeThemeStyles?.formInputTextColor },
            ]}
            value={textValue}
            onChangeText={setTextValue}
            multiline
          />
        ) : (
          <Text
            style={[
              styles.profileInfoText,
              { color: activeThemeStyles?.formInputTextColor },
            ]}
          >
            {textValue}
          </Text>
        )}
      </View>
      {editMode ? (
        <View style={styles.editPanel}>
          <TouchableOpacity
            onPress={() => {
              setEditMode(false);
              setTextValue(value);
            }}
          >
            <MaterialIcons name='cancel' size={RFValue(18)} color='#00000080' />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setEditMode(false);
              changeInfo(textValue);
            }}
          >
            <MaterialIcons
              name='check-circle'
              size={RFValue(18)}
              color='#00000080'
            />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={() => setEditMode(true)}>
          <MaterialCommunityIcons
            name='pencil'
            size={RFValue(18)}
            color='#00000080'
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  userProfile: {
    flex: 1,
    paddingVertical: RFPercentage(2),
  },
  profileBack: {
    width: '100%',
    height: RFPercentage(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFValue(10),
    overflow: 'hidden',
    marginBottom: RFValue(12),
  },
  profileInfoString: {
    marginBottom: RFValue(12),
    borderRadius: 8,
    paddingHorizontal: RFValue(14),
    paddingVertical: RFValue(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakLine: {
    width: '100%',
    height: 1,
    marginBottom: RFValue(16),
  },
  primaryBtn: {
    padding: RFValue(10),
    borderRadius: RFValue(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: RFValue(12),
  },
  primaryText: {
    fontWeight: 'bold',
    fontSize: RFValue(12),
  },
  primaryReverseBtn: {
    padding: RFValue(10),
    borderRadius: RFValue(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: RFValue(12),
    borderWidth: 1,
  },
  primaryReverseText: {
    fontWeight: 'bold',
    fontSize: RFValue(12),
  },
  secondaryBtn: {
    padding: RFValue(10),
    borderRadius: RFValue(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: RFValue(12),
  },
  secondaryText: {
    fontWeight: 'bold',
    fontSize: RFValue(12),
  },
  secondaryReverseBtn: {
    padding: RFValue(10),
    borderRadius: RFValue(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: RFValue(12),
    borderWidth: 1,
  },
  secondaryReverseText: {
    fontWeight: 'bold',
    fontSize: RFValue(12),
  },
  profileInfoLabel: {
    fontWeight: 'bold',
    marginBottom: RFValue(4),
    fontSize: RFValue(10),
  },
  profileInfoText: {
    fontSize: RFValue(10),
    width: '100%',
  },
  editPanel: {
    flexDirection: 'row',
    gap: RFValue(5),
  },
});
