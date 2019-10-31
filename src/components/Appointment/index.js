import "./styles.scss";
import React, { useState } from "react";
import DayListItem from "components/DayListItem";
import classnames from "classnames";
import InterviewerList from "components/InterviewerList";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";

export default function Appointment(props) {


  return (
    <article className="appointment">
      <Header /> 

       { (props.interview)  ? 
         <Show 
         student={props.interview.student}
         interviewer={props.interview.interviewer}
         onEdit={props.onEdit}
         onDelete={props.onDelete}/> 
         :  <Empty 
         onAdd={props.onAdd}/>  }

    </article>
  )
    
  
}