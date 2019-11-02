import "./styles.scss";
import React, { useState } from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import { getInterview } from "helpers/selectors";

export default function Appointment(props) {


// NOT SURE IF THIS IS CORRECT ^ 

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const {mode, transition, back} = useVisualMode(EMPTY)

  // const interviewers=[];


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.key, interview)
    // transition(SHOW);
  }



  return (
    <article className="appointment">
      <Header
        time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
       
        <Show
          
          student={props.interview.student}
          interviewers={props.interviewers}
          interviewer={getInterview(props, props.interview).interviewer}
          onEdit={props.onEdit}
          onDelete={props.onDelete} />
      )}

  {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save} />
      )}


    </article>
  )




}