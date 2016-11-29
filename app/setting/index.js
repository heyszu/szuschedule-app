import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'

export default class landpage extends Component {
  render() {
    return (
        <View style={{ margin: style.topMargin, backgroundColor: '#ffffff' }}>
            <Text onPress={Actions.landpage}>This is PageOne!</Text>
        </View>
    )
  }
}

const style = StyleSheet.create({
    topMargin: 0,
})
