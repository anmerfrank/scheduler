
import React, { useReducer, useEffect } from "react";
import axios from "axios";
import "components/DayListItem";
import "components/Application.scss";
import DayList from "components/DayList";
import "components/InterviewerList";
import "components/InterviewerListItem";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerListItem.scss";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterviewersForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";
import { getAllInterviewers } from "helpers/selectors";
import transition from "hooks/useVisualMode";

/////// 

/// CODE GIVEN to refactor using Reducer: -- NOTE that this is out of scope for the main function! Will have to be moved in at some point. 


const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { 
        ...state, 
        day: action.day 
      }
    case SET_APPLICATION_DATA:
      return { 
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
       }
       case SET_INTERVIEW: {
        const appointment = {
         ...state.appointments[action.id],
         interview: { ...action.interview }
       };
 
       const appointments = {
         ...state.appointments,
         [action.id]: appointment
       };
       return {...state, appointments}
     }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}


export default function useApplicationData() {

  // const [days, setDays] = useState([]);
  const [state, dispatch] = useReducer( reducer, {
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: []
  });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(`http://localhost:8001/api/days`)),
      Promise.resolve(axios.get(`http://localhost:8001/api/appointments`)),
      Promise.resolve(axios.get(`http://localhost:8001/api/interviewers`)),
    ]).then((all) => {
      dispatch({type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
    });
  }, [])

  const setDay = day => dispatch({ type: SET_DAY, day});


  // BOOK INTERVIEW 

  function bookInterview(id, interview) {

    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
    .then(() => {

 
    dispatch({type: SET_INTERVIEW, id, interview });
    })
  }

    

  function cancelInterview(id, interview) {


    dispatch({type: SET_INTERVIEW, id });

    return axios.delete(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(res => {
      });

  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}