import React, { useEffect, Component } from "react";
import { View, Text, Button, Platform } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

const CalendarComponent = () => {
  return (
    <View>
      <CalendarList
        onVisibleMonthsChange={months => {
          console.log("now these months are visible", months);
        }}
        pastScrollRange={50}
        futureScrollRange={50}
        scrollEnabled={true}
        showScrollIndicator={true}
        onDayPress={day => {
          console.log("selected day", day);
        }}
      />
    </View>
  );
};

export default CalendarComponent;
