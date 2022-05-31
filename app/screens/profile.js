import {
    StyleSheet,
    Text,
    View,
    Platform,
    Image,
    ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS} from '../assets/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import GetSocial from 'getsocial-react-native-sdk/GetSocial';
import auth from '@react-native-firebase/auth';
import CustomButton from '../components/CustomButton';
import {CONFIG} from '../utility/config';
import {StreamChat} from 'stream-chat';
import AppSpinner from '../components/ActivityIndicator';

const client = StreamChat.getInstance(CONFIG.getStreamApiKey);

const ProfileScreen = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState('User');
    const [bio, setBio] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [userId, setUserId] = useState();
    const [number, setNumber] = useState();
    const [college, setCollege] = useState();
    const [uniqueID, setUniqueID] = useState();
    const [graduation, setGraduation] = useState();
    const [year, setYear] = useState();
    const [branch, setBranch] = useState();
    useEffect(() => {
        GetSocial.getCurrentUser().then((currentUser) => {
            setUserId(currentUser.id);
            setName(currentUser.displayName);
            setImageUrl(currentUser.avatarUrl);
            setNumber(currentUser.publicProperties['mobile number']);
            setCollege(currentUser.publicProperties['college']);
            setUniqueID(currentUser.privateProperties['Unique ID']);
            setGraduation(currentUser.publicProperties['graduation']);
            setYear(currentUser.publicProperties['year']);
            setBranch(currentUser.publicProperties['branch']);
            setBio(currentUser.publicProperties['bio']);
        },(error)=>{
            console.error(error);
        })
    }, [userId, name, imageUrl, number, college, uniqueID, graduation, year, branch, bio])


    const logout = () => {
        setIsLoading(true);
        auth().signOut().then(() => {
            GetSocial.resetUser().then(() => {
                client.disconnectUser().then(()=>{
                    setIsLoading(false);
                    navigation.replace('LoginScreen');
                }, (error)=>{
                    setIsLoading(false);
                    console.error(error);
                })
            }, (error) => {
                setIsLoading(false);
                console.error(error);
            })
        },(error)=>{
            setIsLoading(false);
            console.error(error);
        })
    }

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1
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
                            {imageUrl
                                ?
                                <Image
                                    style={styles.image}
                                    source={{uri: imageUrl}}
                                />
                                :
                                <View style={{
                                    backgroundColor: COLORS.black,
                                    borderRadius: 50,
                                    padding: 4,
                                }}>
                                    <FontAwesome
                                        name='user-circle'
                                        size={90}
                                        color={COLORS.cardBg}
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
                                    {name}
                            </Text>
                            <Text
                                style={styles.text}>
                                    +91{" "}{number}
                            </Text>
                            <Text
                                style={styles.text}>
                                    UID:{" "}{uniqueID}
                            </Text>
                        </View>
                    </View>
                </LinearGradient>
                <View
                    style={styles.mainDetailContainer}>
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: '500',
                            color: COLORS.text
                        }}>
                        {bio}
                    </Text>
                    <View
                        style={styles.bioContainer}>
                        <Text
                            style={[styles.text, {fontSize: 20}]}>
                            BIO
                        </Text>
                    </View>
                </View>
                <View
                    style={styles.detailContainer}>
                    <Text
                        style={[styles.text, {fontWeight: 'normal'}]}>
                        {"College: "}{college}
                    </Text>
                    <Text
                        style={[styles.text, {fontWeight: 'normal'}]}>
                        {"Graduation: "}{graduation}
                    </Text>
                    <Text
                        style={[styles.text, {fontWeight: 'normal'}]}>
                        {"Year: "}{year}
                    </Text>
                    <Text
                        style={[styles.text, {fontWeight: 'normal'}]}>
                        {"Branch: "}{branch}
                    </Text>
                </View>
                <View>
                <CustomButton
                    style={{
                        width: '100%',
                        alignSelf:'center',
                        marginTop:30,
                        marginBottom: 20,
                    }}
                    title={"Log out"}
                    fontsize={20}
                    onPress={()=>{logout()}}
                    />
                </View>
            </View>
        {isLoading && (
          <AppSpinner bgColor="transparent" color={COLORS.primary} />
        )}
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
        height: '40%',
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
        borderBottomRightRadius: 19,
        borderBottomLeftRadius: 19,
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
        top: '-22%'
    },
    image: {
        flex: 1,
        borderRadius: 50,
        width: 105,
        height: 105,
        borderWidth: 3,
        borderColor: COLORS.cardBg,
    },
    mainDetailContainer: {
        backgroundColor: COLORS.cardBg,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.primary,
        marginTop: '5%',
        padding: '5%',
    },
    bioContainer: {
        backgroundColor: COLORS.cardBg,
        position: 'absolute',
        top: '-70%',
        left: 25,
        paddingHorizontal: 5,
        borderRadius: 15,
    },
    detailContainer: {
        backgroundColor: COLORS.cardBg,
        marginTop: '5%',
        padding: '5%',
        borderRadius: 20,
    },
});

export default ProfileScreen;