import "./styles.scss";
import React, { useState } from "react";
import DayListItem from "components/DayListItem";
import classnames from "classnames";
import InterviewerList from "components/InterviewerList";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const {mode, transition, back} = useVisualMode(EMPTY)

  // const interviewers=[];


  return (
    <article className="appointment">
      <Header
        time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={props.onEdit}
          onDelete={props.onDelete} />
      )}
  {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={props.onCancel}
          onSave={props.onSave} />
      )}


    </article>
  )




}