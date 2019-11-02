
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
      setState(prev => ({ ...state, days: all[0].data, appointments: Object.values(all[1].data), interviewers: Object.values(all[2].data) }));
    });
  }, [])

  const setDay = day => setState(prev => ({ ...prev, day }));
  const interviewers = getInterviewersForDay(state, state.day)

  const appointments = getAppointmentsForDay(state, state.day);

 // KEY, ID, TIME, INTERVIEW
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointments.interview);
    console.log(appointments)
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        bookInterview={bookInterview}
      />
    );
  });

  const appointmentsList = appointments.map(appointment => {
    return (<Appointment 
      key={appointment.id}
      // {...appointment}
      time={appointment.time}
      interview={getInterview(state, appointments.interview)}
      interviewers={interviewers}
      bookInterview={bookInterview}
      />)
  })

  const interviewList = interviewers.map(interviewer => {
    return (<InterviewerListItem
       key={interviewer.id}
       {...interviewer}
       />)
  })

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    console.log(id, interview);
  
    setState({
      ...state,
      appointments
    });

    // axios.put(`http://localhost:8001/api/appointments/:id` [, data[, config]])
  }
  
  

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

