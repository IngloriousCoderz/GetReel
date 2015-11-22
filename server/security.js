Applications.permit(['insert']).apply();
Applications.permit(['remove']).apply(); // if role in [admin] ?
Activities.permit(['insert', 'update', 'remove']).apply(); // if role in [admin, recruiter]
Events.permit(['insert', 'update', 'remove']).apply(); // if role in [admin, recruiter]
