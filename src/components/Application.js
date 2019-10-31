
import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/DayListItem";
import "components/Application.scss";
import "components/DayList";
import "components/InterviewerList";
import "components/InterviewerListItem";
import "components/InterviewerListItem.scss";
import Appointment from "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "12:30pm",
    interview: {
      student: "Luke Skywalker",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png"
      }
    }
  }
];



const appointmentsList = appointments.map(appointment => {
  return (<Appointment key={appointment.id}{...appointment} />)
})


export default function Application(props) {
  const [days, setDays] = useState([]);
  axios.get("/api/days").then((response) => {
    setDays(response.data);
  });
  const [day, setDay] = useState("Monday");
  console.log("Application")
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

