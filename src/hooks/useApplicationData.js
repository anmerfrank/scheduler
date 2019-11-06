
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
const INCREMENT_SPOTS = "INCREMENT_SPOTS";
const DECREMENT_SPOTS = "DECREMENT_SPOTS";

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
      // need to fix this
    break;
    }
    
    case DECREMENT_SPOTS: {
      console.log("DECREMENT SPOTS: Action:", action);
      let days = state.days.map((day) => {
        if (day.name === action.payload.day){
          console.log("Spots Remaining:", day.spots);
          return { 
            ...day, 
            // spots: day.spots
          }
        } 
        return day;
      }) 
      return {...state, days }
    }
   

    // case INCREMENT_SPOTS: {

  
    //   let days = state.days.map((day) => {
    //     if (day.name === action.payload.day){
    //       return { 
    //         ...day, 
    //         spots: day.spots + 1
    //       }
    //     } 
    //     return day;
    //   }) 
    //   return {...state, days }
    // }

  default:
    throw new Error(
      `Tried to reduce with unsupported action type: ${action.type}`
    );
}



  
const appointment = {
  ...state.appointments[action.id],
  interview: { ...action.interview },
};
//const days = getSpotsLeft() //

const appointments = {
  ...state.appointments,
  [action.id]: appointment
};
return { ...state, appointments }
}

// Get spots left: 

// function getSpotsLeft(state) {

//   let appointments;
//   for (let day of state.days) {
//     if (state.day.name === day.name) {
//       appointments = day.appointments;
//       break;
//     }
//   }
//   spotsLeft = state.day.spots;

//   for (let appt of state.appointments) {
//     if (appointments.includes(appt.id)) {
//       if (appt.interview !== null) {
//         spotsLeft -= 1;
//       }
//     }
//   }
//   return spotsLeft;
// }






export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
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
      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
    });
  }, [])

  const setDay = day => dispatch({ type: SET_DAY, day });


  // BOOK INTERVIEW 

  function bookInterview(id, interview) {
    console.log("BookInterview: STATE:", state, "DAY:". day)
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview });
        dispatch({ type: DECREMENT_SPOTS, payload: { day: state.day }})
      })
      // .then(() => {getSpotsLeft(state)});
  }



  function cancelInterview(id, interview) {


    dispatch({ type: SET_INTERVIEW, id });

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