import moment from 'moment';

export const createDate = () => {
  return moment().format('YYYY-MM-DD|HH-mm-ss-ms');
};
