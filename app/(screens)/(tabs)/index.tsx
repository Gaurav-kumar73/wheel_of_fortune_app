import Colors from "@/constants/Colors";
import { useUserDetails } from "@/helper/useUserDetails";
import React from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function index() {
  const { user, wallet, loading } = useUserDetails();
  if (loading) return <Text>Loading...</Text>;
  if (!user) return <Text>No user data</Text>;
  if (!wallet) return <Text>No wallet data</Text>;

  return (
    <ScrollView style={styles.container}>
      
      {/* Top */}
      <ImageBackground source={require('@/assets/images/homepage/background.png')} style={styles.backgroundImage}>

        {/* title & balance */}
        <View style={styles.titleContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center',}}>
            <Text style={styles.title}>Welcome,{" "}{user?.name}</Text>
            {/* <Text style={styles.title}>Roahan !</Text> */}
          </View>
          <Text style={{color: Colors.text2}}>Get Ready To Spin</Text>
          <Text style={styles.balance}>$ {wallet?.balance} Balance</Text>
        </View>

        {/* girl image */}
        <Image source={require('@/assets/images/homepage/girl.png')} style={styles.girl}/>

        {/* big buttons */}
        <Image source={require('@/assets/images/homepage/deposit.png')} style={[styles.bigButton, {left: -150, bottom: -15} ]}/>
        <Image source={require('@/assets/images/homepage/withdraw.png')} style={[styles.bigButton, {bottom: 15} ]}/>
        <Image source={require('@/assets/images/homepage/spin-now.png')} style={[styles.bigButton, {right: -150, bottom: -15} ]}/>

      </ImageBackground>
        
      {/* Middle */}
      

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    // width: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  girl: {
    position: 'absolute',
    bottom: 20,
    right: -88,
    width: '100%',
    height: 240,
    zIndex: 1,
    resizeMode: 'contain',
  },
  titleContainer: {
    height: 210,
    width: '63%',
    // backgroundColor: "blue",  // to test the container width
    justifyContent: 'center',
    margin: 15,
    zIndex: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text2,
  },
  balance:{
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Colors.text2,
    marginTop: 30,
    backgroundColor: 'rgba(85, 84, 84, 0.5)',
    borderRadius: 4,
  },
  bigButton:{
    // backgroundColor: 'rgba(41, 52, 126, 0.5)',
    position: 'absolute',
    width: '100%',
    height: 70,
    resizeMode: 'contain',
    zIndex: 2,
  }
})