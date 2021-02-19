import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, ScrollView, FlatList, Dimensions } from 'react-native'

import { FontAwesome5 } from '@expo/vector-icons'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import MainButton from '../components/MainButton'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'



const generateRandomBetween = (min, max, exclude) =>{
    min = Math.ceil(min)
    max = Math.floor(max)
    const rndNum =Math.floor(Math.random() * (max-min)) + min
    if(rndNum === exclude){
        return generateRandomBetween(min, max, exclude)
    }else{
        return rndNum
    }
}

const renderListItem = (listLength, itemData) =>(
    
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>    
)

const GameScreen = props => {
    const initialGuess  = generateRandomBetween(1, 100, props.userChoice)   
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()])

    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const {userChoice, onGameOver} = props

    useEffect(() => {
        if(currentGuess === userChoice){
            onGameOver(pastGuesses.length)
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = direction => {
        if(direction === 'lower' && currentGuess < props.userChoice || direction === 'greater' && currentGuess > props.userChoice){
            Alert.alert('Don\'t lie', 'You know that this is wrong..', [{text: 'Sorry', style: 'cancel'}])
            return
        }
        if(direction === 'lower'){
            currentHigh.current = currentGuess
        }else{
            currentLow.current = currentGuess + 1
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        
        setCurrentGuess(nextNumber)
        //setRounds(curRounds => curRounds + 1)
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
    }   

    return (        
        <View style={styles.container}>
            <TitleText style={styles.opp}>Opponent's guess</TitleText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                <FontAwesome5 name='minus' size={24} color='white'/>
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <FontAwesome5 name='plus' size={24} color='white'/>
                </MainButton>
            </Card>
            <View style={styles.containerList}>
                {/*<ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) =>renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>*/}
                <FlatList contentContainerStyle={styles.list} keyExtractor={item => item} data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
        alignItems: 'center' 
    },
    opp:{
        color: 'black'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10 ,
        width: '90%'
    },
    containerList:{
        flex: 1,
        width: Dimensions.get('window').width > 500 ? '60%': '80%',
    },
    list:{
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    listItem: {
        width: '90%',
        margin: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 3,
        shadowOpacity: 0.26,
        elevation: 5,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowRadius: 3
    }
})

export default GameScreen