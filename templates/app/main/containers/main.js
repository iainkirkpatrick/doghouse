import React from 'react'
import { connect } from 'react-redux'

class MainContainer extends React.Component {
  render () {
    return <div>
      <span>Welcome to the dogstack - have a dig around!</span>
    </div>
  }
}

export default connect(

)(MainContainer)
