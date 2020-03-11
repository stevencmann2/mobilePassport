
import React, { useEffect, Component } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars'

const CalendarComponent =()=>{
    return(
        <View>
<CalendarList
  // Callback which gets executed when visible months change in scroll view. Default = undefined
  onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
  // Max amount of months allowed to scroll to the past. Default = 50
  pastScrollRange={50}
  // Max amount of months allowed to scroll to the future. Default = 50
  futureScrollRange={50}
  // Enable or disable scrolling of calendar list
  scrollEnabled={true}
  // Enable or disable vertical scroll indicator. Default = false
  showScrollIndicator={true}
// Handler which gets executed on day press. Default = undefined
  onDayPress={(day) => {console.log('selected day', day)}}
/>


</View>
    )
}

export default CalendarComponent;