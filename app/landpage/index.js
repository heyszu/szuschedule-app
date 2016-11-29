import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'

import importStyle from './style'
const style = StyleSheet.create(importStyle)

// test Data
import schedule from '../test/schedule'


const numberToChinese = ['一', '二', '三', '四', '五']

export default class landpage extends Component {
  render() {
    return (
      <View style={ style.mainView }>
        <View style={ style.header }>
          <Text style={ style.textStyle }>单周（第13周）</Text>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={ style.schedule }>
            <View style={ style.firstCol }>
              <View style={[ style.class, style.title, style.head ]}>
                <Text>　</Text>
              </View>
              {
                // left column
                Array(12).fill(0).map((v, i) => (
                  <View style={[ style.class, style.title ]}>
                    <Text>{ i + 1 }</Text>
                  </View>
                ))
              }
            </View>
            {
              // map five days
              schedule.map((v, i) => (
                <View style={ style.weekDay }>
                  <View style={[ style.class, style.head ]}>
                    <Text>{ numberToChinese[i] }</Text>
                  </View>
                  {
                    v.map(val => {
                      if (val.visible) {
                        if (!val.empty) {
                          return (
                            <View style={[ style.class, style.normalClass, style['type' + val.classInfo.section_order] ] }>
                              <Text style={ style.classText }>
                                { val.classInfo.course_name + '\n@' + val.classInfo.class_location }
                              </Text>
                            </View>
                          )
                        } else {
                          return (
                            <View style={[ style.class, style.empty ]}>
                              <Text>　</Text>
                            </View>
                          )
                        }
                      } else {
                        return
                      }
                    })
                  }
                </View>
              ))
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}
