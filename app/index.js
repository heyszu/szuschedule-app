import React, { Component } from 'react'
import { Router, Scene } from 'react-native-router-flux'

// Scenes
import landpage from './landpage'
import setting from './setting'

// Navigation Bar Style
import style from './styles/navigation'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" navigationBarStyle={ style } >
          <Scene key="landpage" component={ landpage } hideNavBar={ true } initial={ true }/>
          <Scene key="setting" component={ setting } title="setting" hideNavBar={ false } />
        </Scene>
      </Router>
    )
  }
}
