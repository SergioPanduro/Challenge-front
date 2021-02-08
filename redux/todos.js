import axios from 'axios'
import Swal from 'sweetalert2'

const dataInicial = {
    arrayTodos: [],
    arrayTodo:[]
}

// types
const GET_TODO_SUCCESS = 'GET_TODO_SUCCESS'
const GET_FILTRO_SUCCESS = 'GET_FILTRO_SUCCESS'
const GET_CREAR_SUCCESS = 'GET_CREAR_SUCCESS'
const GET_TODO_INFO = 'GET_TODO_INFO'
const GET_DELETE_TODO = 'GET_DELETE_TODO'
const GET_EDIT_TODO = 'GET_EDIT_TODO'
const GET_EDIT_COMPLET = 'GET_EDIT_COMPLET'


// reducer
export default function todosReducer(state = dataInicial, action){
    switch(action.type){
        case GET_TODO_SUCCESS:
            return {...state, arrayTodos: action.payload}
        case GET_FILTRO_SUCCESS:
            return {...state, arrayTodos: action.payload} 
        case GET_CREAR_SUCCESS:
            return {...state, arrayTodos: action.payload} 
        case GET_TODO_INFO:
            return {...state, arrayTodo: action.payload} 
        case GET_DELETE_TODO:
            return {...state, arrayTodos: action.payload} 
        case GET_EDIT_TODO:
            return {...state, arrayTodos: action.payload[0],arrayTodo:action.payload[1]} 
        case GET_EDIT_COMPLET:
            return {...state, arrayTodos: action.payload[0],arrayTodo:action.payload[1]} 
        default:
            return state
    }
}

// actions
export const obtenerTodoAction = () => async (dispatch, getState) => {
    try {
        const res = await axios.get('http://localhost:8080/todos')
        dispatch({
            type: GET_TODO_SUCCESS,
            payload: res.data.resp
        })
    } catch (error) {
        console.log(error)
    }
}

export const obtenerTodoInfo = (id) => async (dispatch, getState) => {

    try {
        const res = await axios.get(`http://localhost:8080/todos/${id}`)
        dispatch({
            type: GET_TODO_INFO,
            payload: res.data.resp
        })
    } catch (error) {
        console.log(error)
    }
}

export const borrarUnTodo = (id) => async (dispatch, getState) => {
    try {
        const res = await axios.delete(`http://localhost:8080/todos/${id}`)

        if(res.status == 200){
            Swal.fire(
                'Successfully deleted!',
            )
            const res = await axios.get('http://localhost:8080/todos')
            dispatch({
                type: GET_DELETE_TODO,
                payload: res.data.resp
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }

    } catch (error) {
        console.log(error)
    }
}

export const obtenerTodoFiltro = (date) => async (dispatch, getState) => {

    try {
        const res = await axios.get('http://localhost:8080/todos')

        let arrayNew = []

        res.data.resp.forEach(element => {
            if(element.date == date){
                arrayNew.push(element)
            }
        });
        dispatch({
            type: GET_FILTRO_SUCCESS,
            payload: arrayNew
        })

    } catch (error) {
        console.log(error)
    }

}


export const editarCompletedTodo = (id,completed) => async (dispatch, getState) => {

    try {

        var currentDate = new Date(); //use your date here
        let localDate= currentDate.toLocaleDateString('es-MX',{ // you can skip the first argument
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }); 

        let data = {
            completed,
            edit:localDate
        }

        const res = await axios.patch(`http://localhost:8080/todos/${id}`,data)

        if(res.status == 200){
            Swal.fire({
                icon: 'success',
                title:'Successfully updated!',
              })
            const res = await axios.get('http://localhost:8080/todos')
            const resUnico = await axios.get(`http://localhost:8080/todos/${id}`)
            dispatch({
                type: GET_EDIT_COMPLET,
                payload: [res.data.resp,resUnico.data.resp]
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal!',
              })
        }

    } catch (error) {
        console.log(error)
    }

}

export const editarTodo = (id,title,description,completed,date) => async (dispatch, getState) => {

    try {

        var currentDate = new Date(); //use your date here
        let localDate= currentDate.toLocaleDateString('es-MX',{ // you can skip the first argument
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }); 

        let data = {
            name:"Sergio Panduro",
            title,
            description,
            completed,
            date,
            edit:localDate
        }

        const res = await axios.put(`http://localhost:8080/todos/${id}`,data)

        if(res.status == 200){
            Swal.fire(
                'Successfully updated!',
              )
            const res = await axios.get('http://localhost:8080/todos')
            const resUnico = await axios.get(`http://localhost:8080/todos/${id}`)

            dispatch({
                type: GET_EDIT_TODO,
                payload: [res.data.resp,resUnico.data.resp]
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              })
        }

    } catch (error) {
        console.log(error)
    }

}

export const crearTodo = (title,description) => async (dispatch, getState) => {

    try {

        var currentDate = new Date(); //use your date here
        let localDate= currentDate.toLocaleDateString('es-MX',{ // you can skip the first argument
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }); 

        let data = {
            name:"Sergio Panduro",
            title,
            description,
            completed:0,
            date:localDate
        }

        const crear = await axios.post('http://localhost:8080/todos',data)
        console.log(crear.status);
        if(crear.status == 200){
            Swal.fire(
                'Successfully created!',
              )
            const res = await axios.get('http://localhost:8080/todos')
            dispatch({
                type: GET_CREAR_SUCCESS,
                payload: res.data.resp
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              })
        }

        


    } catch (error) {
        console.log(error)
    }

}


