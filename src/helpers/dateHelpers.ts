import { DateTime } from 'luxon';
import moment from 'moment';

export const createFormattedDateHelper = () => {
  return moment().format('YYYY-MM-DD|HH-mm-ms');
};

export const mathFloorDateFromMinuteHelper = (date: Date): Date => {
  const luxonCurrentDate = DateTime.fromJSDate(date);

  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  return new Date(luxonCurrentDate.minus({ milliseconds, seconds }).toISO());
};

type IncreaseDateYearsHelperParamsType = {
  addedYears: number;
  date: Date;
};

export const increaseDateYearsHelper = (
  params: IncreaseDateYearsHelperParamsType,
): Date => {
  const { date, addedYears } = params;

  const luxonCurrentDate = DateTime.fromJSDate(date);

  return new Date(luxonCurrentDate.plus({ years: addedYears }).toISO());
};
