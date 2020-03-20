import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {Avatar, Button} from 'react-native-elements'
import Input from '../../../../components/Input';
import {Agenda} from 'react-native-calendars';
import moment from 'moment';


const Itinerary =()=> {
return(
  <SafeAreaView style={{flex: 1}}>
    <Agenda

    firstDay={parseInt(
      moment(new Date())
        .day()
        .toString(),
      10
    )}
    ///// DATA GOES HERE 
    items={{
      '2020-05-27': [
        {
          key: 1,
          year: '2020',
          month: '5',
          day: '27',
          time: '09:00 PM',
          title: 'Shave (Customer1)', 
          description: "Description goes here"
        }
      ]
        }}
        renderItem={item => (
          <View style={[styles.item]}>
            <Text
              style={{ color: '#6a6a6a'}}
            >
              {item.time} 
            </Text>
            <Text style={{fontWeight: "bold", marginTop: 5, fontSize: 15}}
            >
                {item.title}
            </Text>
            <Avatar
  size="medium"
  rounded
  title="MT"
  onPress={() => console.log("Works!")}
  activeOpacity={0.7}
  containerStyle={{flex: 2, marginLeft: 260, marginBottom: 20}}
/>
          </View>
        )}
        renderEmptyData={() => <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}><Text>No appointments</Text></View>}
    markedDates={{
      '2020-05-16': {selected: true, marked: true},
      '2020-05-17': {marked: true},
      '2020-05-18': {disabled: true}
    }}
    renderEmptyData={() => <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}><Text>No appointments</Text></View>}
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
      
        />
        <View>
          <Button
           type="outline"
           title="add event"
          />
        </View>
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
 
});

export default Itinerary;