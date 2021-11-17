import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

class Header extends Component {

    constructor(props){
        super(props)
        this.state={

        }
    }
  render() {
    return (
        <View style={styles.headerContainer}>
            <Text>
                EVERALDO
            </Text>
        </View>
    )
  }
}
const styles = StyleSheet.create({
    headerContainer:{
        height:45,
        borderBottomColor:"black",
        borderBottomWidth:1
    }
})

export default Header