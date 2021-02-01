import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'

const GameOverScreen = props =>{
    return(
        <View style={styles.container}>
            <TitleText style={styles.title}>The game is over!</TitleText>
            
            <BodyText style={styles.text}>Number of rounds: {props.roundsNumber}</BodyText>
            <BodyText style={styles.text}>Number was: {props. userNumber}</BodyText>
            <MainButton onPress={props.onRestart}>New game</MainButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: 'black'
    }, 
    text: {
        marginVertical: 5
    }
})

export default GameOverScreen