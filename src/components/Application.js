
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
import useApplicationData from "hooks/useApplicationData";

// 


  // const interviewList = interviewers.map(interviewer => {
  //   return (<InterviewerListItem
  //     id={interviewer.id}
  //     {...interviewer}
  //   />)
  // })



// ------------ DO NOT EDIT UNDER THIS LINE -- THIS WAS THE CODE GIVEN ------ 
// All state-based stuff has been removed, and is now under useApplicationData in /hooks. 

//  The only thing I've changed was "appointments" to appointmentsList on line 194.



export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);
  
  const appointments = getAppointmentsForDay(state, state.day).map(
    appointment => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          time={appointment.time}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  // MAPPING OVER A MAP in both functions above and below! Need to fix this. I can figure this out.

  // const appointmentsList = appointments.map(appointment => {

    
  //   console.log("Application.js - Appointment logging as follows:", appointment)
  //   return (<Appointment
  //     id={appointment.id}
  //     key={appointment.id}
  //     // {...appointment}
  //     time={appointment.time}
  //     interview={getInterview(state, appointment.interview)}
  //     interviewers={interviewers}
  //     bookInterview={bookInterview}
  //     cancelInterview={cancelInterview}
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
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <section className="schedule">
          {appointments} 
          <Appointment key="last" time="5pm" />
        </section>
      </section>
    </main>
  );
}

