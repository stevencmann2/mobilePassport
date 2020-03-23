import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View, 
         SafeAreaView, ActivityIndicator, Keyboard, Switch, ImageBackground} from 'react-native';
import {Icon, Overlay, Button, Header } from 'react-native-elements'
import Input from '../../../../components/Input';
import {Agenda} from 'react-native-calendars';
import moment from 'moment';
import { useFirestoreConnect, useFirestore, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'




const Itinerary =()=> {

  const firestore = useFirestore();
  const selectedTrip = useSelector(state=> state.tripID.id)
  const BudgetBreakdownData = `BudgetBreakdownData${selectedTrip}`
  const ItineraryLocation = firestore.collection('Trips').doc(selectedTrip)

  const ItineraryData = `ItineraryData${selectedTrip}`

  useFirestoreConnect([
    { collection: 'Trips', doc: `${selectedTrip}`},
    { collection: 'Trips', 
      doc: `${selectedTrip}`, 
      subcollections: [{ collection: "BudgetBreakdown" }],
      storeAs: BudgetBreakdownData
    },
    { collection: 'Trips', 
      doc: `${selectedTrip}`, 
      subcollections: [{ collection: "Itinerary" }],
      storeAs: ItineraryData
   }
  ])

  const BudgetData = useSelector(state =>state.firestore.ordered[BudgetBreakdownData])
  const ItineraryArr = useSelector(state=> state.firestore.ordered[ItineraryData])
  const scheduledData = useSelector(state=> state.firestore.data[ItineraryData])


const [isOpen, setIsOpen] = useState(false)
const [chosenDay, setChosenDay] = useState(new Date())
const [titleText, setTitleText] = useState("")
const [descriptionText, setDescriptionText] = useState("")
const [hoursText, setHoursText] = useState();
const [minText, setMinText] = useState();
const [isAM, setIsAM] = useState(false)
const [isPM, setIsPM]= useState(false)
const [AMPMText, setAMPMText] = useState()

 

const ToggleAM = isAM =>{
 if (isPM){
    setIsPM(false)
    setAMPMText('AM')
 }
  setIsAM(isAM)
  setAMPMText('AM')
}

const TogglePM = isPM =>{
  if (isAM){
    setIsAM(false) 
    setAMPMText('PM') 
 }
  setIsPM(isPM)
  setAMPMText('PM')
}

const eventSubmit = async() => {
  
   if(!isPM && !isAM){
     return toggleAlert()
   }
  const HoursTest =  /^0[1-9]|1[0-2]$/.test(hoursText)
  const MinTest = /^0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]$/.test(minText)
  
  
if(HoursTest && MinTest && titleText.length > 0 && descriptionText.length > 0 
    && chosenDay.day && chosenDay.month && chosenDay.day){
        
      
      if(chosenDay.month.toString().length === 1){
        chosenDay.month= `0${chosenDay.month}`
      }
      if(chosenDay.day.toString().length === 1){
         chosenDay.day= `0${chosenDay.day}`
      }
      
  
      const dateString = `${chosenDay.year}-${chosenDay.month}-${chosenDay.day}`

  const EventObj = {
        [dateString]:  [{
                    key: dateString,
                    year: chosenDay.year,
                    month: chosenDay.month,
                    day: chosenDay.day,
                    time: `${hoursText}:${minText} ${AMPMText}`,
                    title: titleText, 
                    description: descriptionText,
                    date: dateString
         }]
        }
   
      try{    
        await ItineraryLocation.collection("Itinerary").add(EventObj)
        console.log(`posting Event to Firestore ${EventObj}`)
        setIsOpen(false)
        clearValues();

      } catch (err) {
          console.log(err)
          errorAlert();
          setIsOpen(false)
          clearValues()
      }
  }else{
   incompleteAlert();
  console.log('failed test')
 
  }
}


const incompleteAlert = () => {
    Alert.alert(
        'Cannot Add Event',
        'Please verify all fields are filled out completely and correctly',
        [
            {text: 'Ok',
            onPress: ()=>console.log('Ok Pressed, Alert Closed')
            }
        ]
  )
}
const errorAlert = () => {
    Alert.alert(
        'Internal Catch Error',
        'Something went wrong, please let us know an issue occured while scheduling an event',
        [
            {text: 'Ok',
            onPress: ()=>console.log('Ok Pressed, Alert Closed')
            }
        ]
  )
}
const toggleAlert = () => {
  Alert.alert(
      'Please Select a Time',
      'toggle AM or PM to add event',
      [
          {text: 'Ok',
          onPress: ()=>console.log('Ok Pressed, Alert Closed')
          }
      ]
)
}
const clearValues = ()=> {
  setTitleText("");
  setDescriptionText("")
  setIsAM(false)
  setIsPM(false)
  setHoursText()
  setMinText()
}

const cancelHandler = () => {
  setIsOpen(false)
  clearValues()
}

if(!isLoaded(ItineraryArr&& BudgetData)){
  return (<View style={styles.screen}>
              <ActivityIndicator  size="large"/> 
           </View>)

}

if(isEmpty(BudgetData) && isLoaded(<ImageBackground/>)){

  return(
    <ImageBackground 
      source={require('../../../../assets/images/defaultBackground.jpg')}
      style={styles.backgroundImage}>
    <View style={styles.noBudget}>
        <Text style={styles.noBudgetText}>Can not use this feature yet</Text>
        <Text style={styles.noBudgetText}>Complete budget form to use</Text>
    </View>
    </ImageBackground>
  )
}

if(isLoaded(BudgetData && ItineraryArr && <Agenda />)){

  let calendarData = {}
  let dates = [];

 
    ItineraryArr.forEach((obj, idx) => {
      dates.push(Object.keys(obj));
    });
  dates = dates.flat().filter(el => el !== 'id');
ItineraryArr.forEach((obj, idx) => {
    calendarData[dates[idx]] = obj[dates[idx]];
  });

  console.log('CALENDAR DATAAAAAA')
  console.log(calendarData)

return(

      <View style={{flex:1}}>
          <Header
          backgroundColor="white"
  centerComponent={{ text: 'Itinerary', style: { color: 'black', fontFamily: 'comfortaa-bold' } }}
  // containerStyle={{ marginTop: -45}}
/>
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
                        <View style={styles.subheadingOverlay}>
                       <Text style={{fontSize: 18}}>Start Time</Text>
                       </View>
                    <View style={styles.timeInputContainer}>
                        <Input 
                          label='Hours (HH) :'
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
                          label='Min (MM) :'
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
                                <Switch style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                                  value={isAM}
                                  onValueChange={ToggleAM}
                                />
                            </View>
                            <View style={styles.PMcontainer}>
                                <Text>PM</Text>
                                <Switch style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
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
                        maxLength={20}
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
                          maxLength={35}
                          onChangeText={(text)=> setDescriptionText(text)}
                          value={descriptionText}  
                          returnKeyType='done' 
                          />
                    </View>
                </View>
                

                <View style={styles.buttonContainer}>
                <View style={styles.overlayButton}>
                    <Button 
                        type="solid"
                        raised
                        linearGradientProps={{
                          colors: ['purple', 'black']}}
                        title="Cancel"
                        onPress={cancelHandler}
                    />
                    </View>
                    <View style={styles.overlayButton}>
                    <Button 
                        type="solid"
                        raised
                        linearGradientProps={{
                            colors: ['purple', 'black']}}
                        title="Submit"
                        onPress={eventSubmit}
                    />
                    </View>
                </View>
              </View>
          </Overlay>
      
          <Agenda

            firstDay={parseInt(moment(new Date()).day().toString(), 1)}
            ///// DATA GOES HERE
            items={calendarData}
                renderItem={item => (

                <View style={styles.item}>
                    <Text
                      style={{ color: '#6a6a6a' }}
                    >
                      {item.time} 
            </Text>
            <Text style={{fontWeight: "bold", marginTop: 5, fontSize: 15}}
            >
                {item.title}
            </Text>
            <Text style={{ marginTop: 5, fontSize: 15}}
            >
                {item.description}
            </Text>
<Icon
  reverse
  name='ios-book'
  type='ionicon'
  color='#09cdf6'
  containerStyle={{flex: 2, marginLeft: 250, marginBottom: 0}}
/>
</View>
                )
              }
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
                    color='#09cdf6'
                    reverse
                    onPress={()=>setIsOpen(true)}
                  />
                </View>}
            rowHasChanged={(r1, r2) => r1.title !== r2.title}
                theme={{
                  agendaDayNumColor: '#09cdf6',
                  agendaDayTextColor: '#09cdf6',
                  agendaKnobColor: '#efefef',
                  agendaTodayColor: '#09cdf6',
                  dotColor: '#09cdf6',
                  todayTextColor: '#09cdf6',
                  selectedDayBackgroundColor: '#09cdf6',
                  'stylesheet.calendar.header': {
                    week: { marginTop: 0, flexDirection: 'row', justifyContent: 'space-between' }
                  }
                }}
                onDayPress={(day) => {setChosenDay(day)}}
                
                
        />
            
        </View>
     
  )
   }
}



const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    
 },
  noBudget: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 40, 
  },
  noBudgetText:{
    lineHeight: 25,
  },
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
subheadingOverlay:{
  alignItems: 'center',
  marginBottom: 15,
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
  marginTop: 0,
  alignItems: 'center'
},
PMcontainer: {
  alignItems: 'center',
  marginTop: 10
}
});

export default Itinerary;