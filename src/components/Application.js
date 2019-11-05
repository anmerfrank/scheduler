
import React, { useState, useEffect } from "react";
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


export default function Application(props) {
  const [days, setDays] = useState([]);
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: []
  });

  useEffect(() => {
    // axios.get("http://localhost:8001/api/days").then((response) => {
    //   setDays(response.data);
    // });
    Promise.all([
      Promise.resolve(axios.get(`http://localhost:8001/api/days`)),
      Promise.resolve(axios.get(`http://localhost:8001/api/appointments`)),
      Promise.resolve(axios.get(`http://localhost:8001/api/interviewers`)),
    ]).then((all) => {
      setState(prev => ({ ...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, [])

  const setDay = day => setState(prev => ({ ...prev, day }));
  const interviewers = getInterviewersForDay(state, state.day)
  const appointments = getAppointmentsForDay(state, state.day);
  console.log("INTERVIEWERS:", interviewers, "APPOINTMENTS:", appointments)
  // const schedule = appointments.map((appointment) => {
  //   const interview = getInterview(state, appointment.interview);
  //   console.log(appointment)
  //   return (
  //     <Appointment
  //       key={appointment.id}
  //       id={appointment.id}
  //       time={appointment.time}
  //       interview={interview}
  //       bookInterview={bookInterview}
  //     />
  //   );
  // });
 console.log("Application.js - Appointment logging as follows:", appointments)
  // BOOK INTERVIEW 

  function bookInterview(id, interview) {


    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const newState = {
      ...state,
      appointments
    };
    console.log("bookInterview returned id:", id, " and interview: ", interview)


    setState(newState);

    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(res => {

        setState({  
          ...state, 
          appointments: {
            ...state.appointments, 
            [id]: {
            ...state.appointments[id],
            interview
          }}
        })
      });
  };

  // CANCEL INTERVIEW

  function cancelInterview(id, interview) {
    
    const newState = {
      ...state,
      appointments
    };
    
    setState(newState);

    return axios.delete(`http://localhost:8001/api/appointments/${id}`, { interview })
    .then(res => {
      console.log("Logging for CANCEL INTERVIEW: Res:", res);
      console.log(res.data);
    });
  }
 
 
 const appointmentsList = appointments.map(appointment => {

    
    console.log("Application.js - Appointment logging as follows:", appointment)
    return (<Appointment
      id={appointment.id}
      key={appointment.id}
      // {...appointment}
      time={appointment.time}
      interview={getInterview(state, appointment.interview)}
      interviewers={interviewers}
      bookInterview={bookInterview}
    />)
  })

  // const interviewList = interviewers.map(interviewer => {
  //   return (<InterviewerListItem
  //     id={interviewer.id}
  //     {...interviewer}
  //   />)
  // })



 
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        <nav className="sidebar__menu">
        </nav>

        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {appointmentsList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>

  );
}

