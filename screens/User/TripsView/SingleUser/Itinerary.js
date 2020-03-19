import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View, 
         SafeAreaView, TouchableWithoutFeedback,Keyboard, 
          KeyboardAvoidingView, Switch} from 'react-native';
import {Icon, Overlay, Button } from 'react-native-elements'
import Input from '../../../../components/Input';
import {Agenda} from 'react-native-calendars';
import moment from 'moment';
import { useFirestoreConnect, useFirestore, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'




const Itinerary =()=> {

  

  const firestore = useFirestore();
  const selectedTrip = useSelector(state=> state.tripID.id)

  const ItineraryData = `ItineraryData${selectedTrip}`

  useFirestoreConnect([
    { collection: 'Trips', doc: `${selectedTrip}`},
    { collection: 'Trips', 
      doc: `${selectedTrip}`, 
      subcollections: [{ collection: "Itinerary" }],
      storeAs: ItineraryData
   }
  ])
  
  const ItineraryArr = useSelector(state=> state.firestore.ordered[ItineraryData])

console.group("Itinerary DATA")
console.log(ItineraryArr)
console.groupEnd('END of ITINERARY DATA')

const [isOpen, setIsOpen] = useState(false)
const [chosenDay, setChosenDay] = useState(new Date())
const [titleText, setTitleText] = useState()
const [descriptionText, setDescriptionText] = useState()
const [hoursText, setHoursText] = useState();
const [minText, setMinText] = useState();
const [isAM, setIsAM] = useState(false)
const [isPM, setIsPM]= useState(false)

const ToggleAM = isAM =>{
 if (isPM){
    setIsPM(false)
 }
  setIsAM(isAM)
}


const TogglePM = isPM =>{
  if (isAM){
    setIsAM(false)  
 }
  setIsPM(isPM)
}


return(

      <SafeAreaView style={{flex: 1}}>
            <Overlay 
            isVisible={isOpen}
            onBackdropPress={() => setIsOpen(false)}
            borderRadius={20}
          >
              <View style={styles.overlayView}>
                <View style={styles.overlayHeader}>
                    <Text style={styles.overlayHeaderText}>New Event</Text>
                </View>
                <View style={styles.overlayHeader}>
                  <Text>
                  {chosenDay.month} / {chosenDay.day} / {chosenDay.year} 
                  </Text>
                </View>
                <View style={styles.overlayBody}>
                    <View style={styles.timeInputContainer}>
                        <Input 
                          label='Hours :'
                          placeholder='ex. 08'
                          blurOnSubmit
                          autoCorrect={true}
                          keyboardType="number-pad"
                          maxLength={2}
                          onChangeText={(text)=> setHoursText(text)}
                          value={hoursText}  
                          returnKeyType='next'   
                        
                        />
                        <Input 
                          label='Min :'
                          placeholder='ex.15'
                          blurOnSubmit
                          autoCorrect={true}
                          keyboardType="number-pad"
                          maxLength={2}
                          onChangeText={(text)=> setMinText(text)}
                          value={minText}  
                          returnKeyType='next'   
                        
                        />
                        <View style={styles.switchContainer}>
                          <View style={styles.AMcontainer}>
                                <Text> AM </Text>
                                <Switch 
                                  value={isAM}
                                  onValueChange={ToggleAM}
                                />
                            </View>
                            <View style={styles.PMcontainer}>
                                <Text>PM</Text>
                                <Switch 
                                value={isPM}
                                onValueChange={TogglePM}
                              />
                            </View>
                      </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                        label='Title :'
                        placeholder='ex. Museum Visit'
                        blurOnSubmit
                        autoCorrect={true}
                        keyboardType="default"
                        maxLength={30}
                        onChangeText={(text)=> setTitleText(text)}
                        value={titleText}  
                        returnKeyType='next' 
                        />
                      </View>
                    <View style={styles.inputContainer}>
                        <Input
                          label='Description :'
                          placeholder='ex. Tickets at will-call'
                          blurOnSubmit
                          autoCorrect={true}
                          keyboardType="default"
                          maxLength={50}
                          onChangeText={(text)=> setDescriptionText(text)}
                          value={descriptionText}  
                          returnKeyType='done' 
                          />
                    </View>
                </View>
                

                <View style={styles.buttonContainer}>
                <View style={styles.overlayButton}>
                    <Button 
                        type="outline"
                        title="Cancel"
                        onPress={()=>setIsOpen(false)}
                    />
                    </View>
                    <View style={styles.overlayButton}>
                    <Button 
                        type="outline"
                        title="Submit"
                        onPress={()=>console.log('pressed submit event')}
                    />
                    </View>
                </View>
              </View>
          </Overlay>
      
          <Agenda

            firstDay={parseInt(moment(new Date()).day().toString(), 1)}
            ///// DATA GOES HERE 
            items={{
              '2020-05-27': [
                {
                  key: 2,
                  year: '2020',
                  month: '5',
                  day: '27',
                  time: '10:00 AM',
                  title: 'Shave (Customer3)', 
                  description: "Description goes here"
                }
              ],


              '2020-05-27': [
                {
                  key: 1,
                  year: '2020',
                  month: '5',
                  day: '27',
                  time: '09:00 PM',
                  title: 'Shave (Customer1)', 
                  description: "Description goes here"
                },
                {
                  key: 2,
                  year: '2020',
                  month: '5',
                  day: '27',
                  time: '10:00 AM',
                  title: 'Shave (Customer3)'
                }
              ],
              '2020-05-28': []

                }}
                renderItem={item => (
                  <View style={styles.item}>
                    <Text
                      style={{ color: '#6a6a6a' }}
                    >
                      {item.time} &mdash; {item.title}
                    </Text>
                  </View>
                )
              }
                // renderEmptyData={() => <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}><Text>No appointments</Text></View>}
            markedDates={{
              '2020-05-16': {selected: true, marked: true},
              '2020-05-17': {marked: true},
              '2020-05-18': {disabled: true}
            }}
            renderEmptyData={() => 
                <View style={styles.noItem}>
                  <Icon
                    name='playlist-add'
                    type='material'
                    color='#cd7ff5'
                    reverse
                    onPress={()=>setIsOpen(true)}
                  />
                </View>}
            rowHasChanged={(r1, r2) => r1.title !== r2.title}
                theme={{
                  agendaDayNumColor: 'rgba(190,82,2, 0.75)',
                  agendaDayTextColor: 'rgba(190,82,2, 0.75)',
                  agendaKnobColor: '#efefef',
                  agendaTodayColor: 'rgba(190,82,2, 0.75)',
                  dotColor: 'rgba(190,82,2, 0.75)',
                  todayTextColor: 'rgba(190,82,2, 0.75)',
                  selectedDayBackgroundColor: 'rgba(190,82,2, 0.75)',
                  'stylesheet.calendar.header': {
                    week: { marginTop: 0, flexDirection: 'row', justifyContent: 'space-between' }
                  }
                }}
                onDayPress={(day) => {setChosenDay(day)}}
        />
            
        </SafeAreaView>
  
  )
}


const styles = StyleSheet.create({
  
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  noItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 10,
    marginRight: 10    
  },
  overlayView: {
    padding: 10
},
overlayHeader: {
  alignItems: 'center',
    marginTop: 10,
    fontSize: 18
},
overlayBody: {  
    marginTop: 20,
    marginBottom: 20
},
overlayText: {
    marginBottom: 15,
    lineHeight: 25
},
overlayHeaderText: {
   fontSize: 20
},
overlayButton:{
    marginHorizontal: 10
},
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
},
inputContainer: {
  paddingHorizontal: 10,
  marginTop: 5,
  marginBottom: 5,
  width: '100%',
  textAlign: 'center',   
},
timeInputContainer: {
  flexDirection: "row",
  justifyContent: 'space-around'
},
switchContainer: {
  flexDirection: 'column',
},
AMcontainer: {
  marginTop: 0
},
PMcontainer: {
  marginTop: 10
}
});

export default Itinerary;