function isMeetingWithinWorkday(startWork, endWork, startMeeting, duration) {
  const toMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const startWorkMinutes = toMinutes(startWork);
  const endWorkMinutes = toMinutes(endWork);
  const startMeetingMinutes = toMinutes(startMeeting);
  const endMeetingMinutes = startMeetingMinutes + duration;

  return (
    startMeetingMinutes >= startWorkMinutes &&
    endMeetingMinutes <= endWorkMinutes
  );
}

console.log(isMeetingWithinWorkday('08:00', '17:30', '14:00', 90));
console.log(isMeetingWithinWorkday('8:0', '10:0', '8:0', 120));
console.log(isMeetingWithinWorkday('08:00', '14:30', '14:00', 90));
console.log(isMeetingWithinWorkday('14:00', '17:30', '08:0', 90));
console.log(isMeetingWithinWorkday('8:00', '17:30', '08:00', 900));
