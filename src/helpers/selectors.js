

function getAppointmentsForDay(state, day) {
  const appointments = [];
  const filteredDays = state.days.find(dayCheck => dayCheck.name === day)
  if (!filteredDays) return appointments;
  for (let id of filteredDays.appointments) {
    appointments.push(state.appointments[id - 1])
  }
  return appointments;
}

// NEED A MENTOR TO HELP WITH DATA re ID -1 - will throw the rest of data off

function getInterviewersForDay(state, dayName) { // from day I need appointments - from appointments, interview - from interview, interviewers
  let interviews = [];
  let interviewers = [];
  let appointments = [];
  for (let myDay of state.days) {
    if (myDay.name === dayName) {
      appointments=(myDay.appointments)
    }
  }
  for (let apptNumber of appointments) {
    // first appointment = state.appointments[1]
    // interview = first appointment.interview
    if (state.appointments[apptNumber].interview !== null) {
      interviews.push(state.appointments[apptNumber].interview)
    }
  }
  for (let interviewObj of interviews) {
    let interviewerId = interviewObj.interviewer;
    interviewers.push(state.interviewers[interviewerId]);
  }
  return interviewers;
}


function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
    const student = interview.student;
    const interviewer = state.interviewers[interview.interviewer];
    const interviewObject = { student, interviewer };
    return interviewObject;
  }
}





export { getAppointmentsForDay, getInterviewersForDay, getInterview };
