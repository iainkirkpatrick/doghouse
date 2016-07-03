import stack from 'dogstack'

import rootReducer from './reducer'
import rootRoute from './routes'

stack(document.querySelector('main'), rootReducer, rootRoute)
