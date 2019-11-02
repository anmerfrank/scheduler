

function getAppointmentsForDay(state, day) {
  const appointments=[];
  const filteredDays = state.days.find(dayCheck => dayCheck.name === day)
  if(!filteredDays) return appointments;
  for (let id of filteredDays.appointments) {
    appointments.push(state.appointments[id-1])
  }
    return appointments;
}

// NEED A MENTOR TO HELP WITH DATA re ID -1

function getInterviewersForDay(state, interviewer) {
  let interviewers = [];
  for (let selectedInterviewer of state.interviewers) {
    if (selectedInterviewer.name === interviewer) {
      for (let id of selectedInterviewer.appointments) {
        interviewers.push(state.interviewer[id])
      }
    }
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