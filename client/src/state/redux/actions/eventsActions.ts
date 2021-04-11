import { GET_EVENTS, EVENTS_ERROR, EVENTS_LOADING } from '../types'
import axios from 'axios'

export const getEvents = () => async dispatch => {
  dispatch({ type: EVENTS_LOADING })
  try {
    const res = await axios.get(`http://localhost:3001/events`)
    dispatch({
      type: GET_EVENTS,
      payload: res.data.data,
    })
  } catch (e) {
    dispatch({
      type: EVENTS_ERROR,
      payload: console.log(e),
    })
  }
}
