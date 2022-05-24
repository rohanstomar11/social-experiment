import { StyleSheet, Text, View, Platform, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS } from '../assets/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient';
import GetSocial from 'getsocial-react-native-sdk/GetSocial';
import auth from '@react-native-firebase/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GradientText from '../components/gradienttext';

const ProfileScreen = ({ navigation }) => {

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
        })
    }, [userId, name, imageUrl, number, college, uniqueID, graduation, year, branch, bio])


    const logout = () => {
        auth().signOut().then(() => {
            GetSocial.resetUser().then(() => {
                navigation.replace('LoginScreen');
            }, (error) => {
                console.error(error)
            })
        })
    }


    return (
        <ScrollView contentContainerStyle={{flex: 1}}>
            <View style={styles.mainContainer}>
                <LinearGradient
                    colors={[COLORS.link, COLORS.formBg]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.profileCard}
                >
                    <View style={styles.profileCardBottom}>
                        <View style={styles.profileImg}>
                            {imageUrl
                                ?
                                <Image
                                    style={{
                                        flex: 1,
                                        borderRadius: 50,
                                        width: 105,
                                        height: 105,
                                        borderWidth: 3,
                                        borderColor: COLORS.white,
                                    }}
                                    source={{
                                        uri: imageUrl
                                    }}
                                />
                                :
                                <View style={{
                                    backgroundColor: COLORS.background,
                                    borderRadius: 50,
                                    padding: 4,
                                }}>
                                    <FontAwesome
                                        name='user-circle'
                                        size={90}
                                        color={COLORS.lightgrey}
                                    />
                                </View>
                            }
                        </View>
                        <View style={{ alignItems: 'center', marginTop: '13%' }}>
                            <Text style={styles.text}>{name}</Text>
                            <Text style={styles.text}>+91{" "}{number}</Text>
                            <Text style={styles.text}>UID:{" "}{uniqueID}</Text>
                        </View>
                    </View>
                </LinearGradient>
                <View style={{
                    backgroundColor: COLORS.background,
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: COLORS.black,
                    marginTop: '10%',
                    padding: '5%',
                }}>
                    <Text style={{fontSize: 15, fontWeight: '500', color: COLORS.black}}>{bio}</Text>
                    <View style={{
                        backgroundColor: COLORS.background,
                        position: 'absolute',
                        top: '-50%',
                        left: 20,
                        paddingHorizontal: 5
                        }}><Text style={styles.text}>BIO</Text></View>
                </View>
                <View
                    style={{
                        backgroundColor: '#eeeeee',
                        marginTop: '10%',
                        padding: '5%',
                        borderRadius: 20,
                    }}
                >
                    <Text style={[styles.text, {fontWeight: 'normal'}]}>{"College: "}{college}</Text>
                    <Text style={[styles.text, {fontWeight: 'normal'}]}>{"Graduation: "}{graduation}</Text>
                    <Text style={[styles.text, {fontWeight: 'normal'}]}>{"Year: "}{year}</Text>
                    <Text style={[styles.text, {fontWeight: 'normal'}]}>{"Branch: "}{branch}</Text>
                </View>
                <View>
                    <LinearGradient
                        colors={[COLORS.link, COLORS.formBg]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.logOutBtn}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: COLORS.white,
                                height: '90%',
                                width: '98%',
                                borderRadius: 6,
                                justifyContent: 'center',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                            onPress={() => { logout() }}
                        >
                            <MaterialIcons name='logout' size={30} color={COLORS.red} />
                            <GradientText
                                style={styles.logOutBtnText}
                            >
                                Log Out
                            </GradientText>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </ScrollView>
    )
}

export default ProfileScreen;

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
                shadowColor: COLORS.shadowCards,
            },
            ios: {
                shadowColor: COLORS.shadowCards,
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
        backgroundColor: COLORS.white,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
        fontWeight: '500',
        color: COLORS.black,
        marginTop: '2%',
    },
    profileImg: {
        position: 'absolute',
        top: '-22%'
    },
    logOutBtn: {
        height: 58,
        borderRadius: 10,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            android: {
                elevation: 10,
                shadowColor: COLORS.shadowCards,
            },
            ios: {
                shadowColor: COLORS.shadowCards,
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.3,
                shadowRadius: 6,
            },
        }),
    },
    logOutBtnText: {
        fontSize: 30,
        paddingBottom: 3,
        paddingLeft: 9,
        fontWeight: '700',
        color: COLORS.link,
    }
})