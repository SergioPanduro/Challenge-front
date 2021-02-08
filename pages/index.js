import React from 'react'
import Table from '../components/table'
import store from '../redux/store'
import {obtenerTodoAction} from '../redux/todos'
import {useDispatch} from 'react-redux'

import {Provider} from 'react-redux'

function App() {
 

    return (
      <Provider store={store()}>
        <Table />
      </Provider>
    )
}

export default App