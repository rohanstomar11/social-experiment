import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../assets/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const UserScreen = ({ navigation, route }) => {
  const { userId, data } = route.params;
  const id = data.userId;

  const userChat = () => {
    navigation.navigate('UserChatScreen', { userId: userId, id: id });
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1
      }}>
      <View
        style={styles.mainContainer}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.formBg]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.profileCard}>
          <View
            style={styles.profileCardBottom}>
            <View
              style={styles.profileImg}>
              {data.avatarUrl
                ?
                <Image
                  style={styles.image}
                  source={{uri: data.avatarUrl}}
                  />
                :
                <View
                  style={{
                    backgroundColor: COLORS.background,
                    borderRadius: 50,
                    padding: 4,
                  }}>
                  <FontAwesome
                    name='user-circle'
                    size={90}
                    color={COLORS.grey}
                    />
                </View>
              }
            </View>
            <View
              style={{
                alignItems: 'center',
                marginTop: '13%'
              }}>
              <Text
                style={styles.text}>
                {data.displayName}
              </Text>
              <Text
                style={styles.text}>
                +91{" "}{data.publicProperties['mobile number']}
              </Text>
              <TouchableOpacity
                style={styles.messageButton}
                onPress={() => userChat()}
                activeOpacity={1}>
                <Text
                  style={{
                    color: COLORS.green,
                    fontSize: 20,
                    fontWeight: '500',
                  }}>
                    Message
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
        <View
          style={styles.mainDetailsContainer}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
              color: COLORS.text,
            }}>
            {data.publicProperties['bio']}
          </Text>
          <View
            style={styles.bioContainer}>
            <Text
              style={[styles.text, { fontSize: 20 }]}>
              BIO
            </Text>
          </View>
        </View>
        <View
          style={styles.detailsContainer}>
          <Text
            style={[styles.text, { fontWeight: 'normal' }]}>
            {"College: "}{data.publicProperties['college']}
          </Text>
          <Text
            style={[styles.text, { fontWeight: 'normal' }]}>
            {"Graduation: "}{data.publicProperties['graduation']}
          </Text>
          <Text
            style={[styles.text, { fontWeight: 'normal' }]}>
            {"Year: "}{data.publicProperties['year']}
          </Text>
          <Text
            style={[styles.text, { fontWeight: 'normal' }]}>
            {"Branch: "}{data.publicProperties['branch']}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
  },
  profileCard: {
    height: '45%',
    marginTop: '10%',
    borderRadius: 20,
    justifyContent: 'flex-end',
    ...Platform.select({
      android: {
        elevation: 10,
        shadowColor: COLORS.shadowColor,
      },
      ios: {
        shadowColor: COLORS.shadowColor,
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
    }),
  },
  profileCardBottom: {
    height: '60%',
    backgroundColor: COLORS.cardBg,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
    color: COLORS.text,
    marginTop: '2%',
  },
  profileImg: {
    position: 'absolute',
    top: '-22%',
  },
  image:{
    flex: 1,
    borderRadius: 50,
    width: 105,
    height: 105,
    borderWidth: 3,
    borderColor: COLORS.background,
  },
  messageButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 15,
    borderColor: COLORS.green,
    borderWidth: 2,
    borderRadius: 20,
  },
  mainDetailsContainer: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginTop: '10%',
    padding: '5%',
  },
  bioContainer: {
    backgroundColor: COLORS.background,
    position: 'absolute',
    top: '-70%',
    left: 25,
    paddingHorizontal: 5,
    borderRadius: 15,
  },
  detailsContainer: {
    backgroundColor: COLORS.cardBg,
    marginTop: '10%',
    padding: '5%',
    borderRadius: 20,
  },
});

export default UserScreen;