import { DateTime } from 'luxon';
import moment from 'moment';
import 'moment/locale/be';
import 'moment/locale/zh-cn';
import 'moment/locale/en-in';
import 'moment/locale/fr';
import 'moment/locale/de';
import 'moment/locale/id';
import 'moment/locale/it';
import 'moment/locale/ja';
import 'moment/locale/ko';
import 'moment/locale/pl';
import 'moment/locale/pt';
import 'moment/locale/ru';
import 'moment/locale/es';
import 'moment/locale/tr';
import 'moment/locale/uk';

export const createFormattedDateHelper = () => {
  return moment().format('YYYY-MM-DD|HH-mm-ss-ms');
};

export const formatDateHelper = (inputDate: string, language: string) => {
  const [datePart, timePart] = inputDate.split('|');

  let redeclaredLanguage = language;

  switch (language) {
    case 'en': {
      redeclaredLanguage = 'en-in';

      break;
    }

    case 'ua': {
      redeclaredLanguage = 'uk';

      break;
    }

    case 'by': {
      redeclaredLanguage = 'be';

      break;
    }

    case 'cn': {
      redeclaredLanguage = 'zh-cn';

      break;
    }

    case 'kr': {
      redeclaredLanguage = 'ko';

      break;
    }

    case 'jp': {
      redeclaredLanguage = 'ja';

      break;
    }

    default:
      break;
  }

  if (!datePart || !timePart) {
    return null;
  }

  let formattedDate = '';
  let formattedTime = '';

  const dateFormats = ['YYYY-MM-DD', 'DD-MM-YYYY'];
  let date = null;

  for (const format of dateFormats) {
    date = moment(datePart, format, true);
    if (date.isValid()) {
      break;
    }
  }

  if (date && date.isValid()) {
    formattedDate = date.locale(redeclaredLanguage).format('D MMMM YYYY');
  }

  const timeFormats = ['HH-mm-ss-SSSS', 'HH-mm-ss', 'HH-mm-ms'];
  const time = moment(timePart, timeFormats, true);

  if (time.isValid()) {
    formattedTime = time.format('HH:mm:ss');
  }

  if (formattedDate && formattedTime) {
    return `${formattedDate} | ${formattedTime}`;
  } else if (formattedDate) {
    return formattedDate;
  } else if (formattedTime) {
    return formattedTime;
  } else {
    return null;
  }
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
