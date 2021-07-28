/* eslint-disable import/prefer-default-export */

export const getTimeByMinute = (minute) => {
  const hour = Math.floor(minute / 60);
  const minuteRemain = minute % 60;
  const result = `${hour}h${minuteRemain}m`;
  return result;
};

export const formatDate = (date, withDay = false) => {
  let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  options = withDay ? { ...options, weekday: 'long' } : options;
  const d = new Date(date);
  return d.toLocaleDateString('en-US', options);
};
