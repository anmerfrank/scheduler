
import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/DayListItem";
import "components/Application.scss";
import DayList from "components/DayList";
import "components/InterviewerList";
import "components/InterviewerListItem";
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
  // const setDays = days => setState(prev => ({ ...prev, days }));
  const setDay = day => setState(prev => ({ ...prev, day }));
  const interviewers = getInterviewersForDay(state, state.day)

  const appointments = getAppointmentsForDay(state, state.day);

  // const schedule = state.days.map((day) => {
  //   const interview = getInterview(state, day.interview);

  //   return (
  //     <DayList
  //       key={day.id}
  //       id={day.id}
  //       time={day.time}
  //       interview={interview}
  //     />
  //   );
  // });

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointments.interview);
    console.log(appointments)
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

  const appointmentsList = appointments.map(appointment => {
    return (<Appointment key={appointment.id}{...appointment} />)
  })

  const interviewList = interviewers.map(interview => {
    return (<Appointment key={interview.id}{...interview} />)
  })

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

