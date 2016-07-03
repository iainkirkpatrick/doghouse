import React from 'react'
import { Route } from 'react-router'

import MainContainer from './main/containers/main'

export default function() {
  return <Route path='/' component={MainContainer}>
  </Route>
}
