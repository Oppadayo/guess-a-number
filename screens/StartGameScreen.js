import React, { useState } from 'react'
import { View, Text, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert, StyleSheet, Dimensions } from 'react-native'

import Colors from '../constants/colors'
import Card from '../components/Card'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }

    const resetInputHandler = () => {        
        setEnteredValue('')
        setConfirmed(false)
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
           Alert.alert('Invalid number!', 'Between 1 and 99',[{text: 'Ok', style: 'destructive', onPress: resetInputHandler}])
            return  
        }
        setConfirmed(true)
        setSelectedNumber(chosenNumber)
        setEnteredValue('')
        Keyboard.dismiss()
    }

    let confirmedOutput

    if(confirmed){
        confirmedOutput = 
            <Card style={styles.summaryContainer}>
                <BodyText>You selected</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton  onPress={() => props.onStartGame(selectedNumber)}>Start game</MainButton>
            </Card>
    }

    return(
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={styles.container}>
            <TitleText style={styles.title}>Start new game</TitleText>
            <Card style={styles.inputContainer}>
                <BodyText style={styles.text}>Select a number</BodyText>
                <Input 
                    style={styles.input} 
                    blurOnSubmit autoCapitalize='none' 
                    autoCorrect={false} 
                    keyboardType='number-pad' 
                    maxLength={2} 
                    onChangeText={numberInputHandler}
                    value={enteredValue}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title='Reset' onPress={resetInputHandler}  color={Colors.accent}/>
                    </View>   
                    <View style={styles.button}> 
                        <Button title='Confirm' onPress={confirmInputHandler}  color={Colors.primary}/>
                    </View>
                </View>
            </Card>
            {confirmedOutput}
        </View>
    </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center'    
    },
    title: {
        color: 'black',
        marginVertical: 10,
    },
    inputContainer: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center',
        
    },
    text:{
        fontFamily: 'open-sans'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: Dimensions.get('window').width / 4
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        width: '80%',
        marginVertical: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowRadius: 6,
        alignItems: 'center'
    }

})

export default StartGameScreen
