import moment from 'moment';

// All dates in Unix

const now = Date.now();
const minutesFromNow = (minutes) => parseInt(moment().minutes(minutes).format('X'));

const mockRoomData = {
  'chibronzeville@slalom.com': [
    {
      "email": "Blake Henderson ",
      "startDate": now,
      "endDate": minutesFromNow(30)
    },
    {
      "email": "Alice Murphy ",
      "startDate": "Thu Dec 10 11:00:00 CST 2015",
      "endDate": "Thu Dec 10 11:30:00 CST 2015"
    }
  ],
  'chisouthatrium@slalom.com': [
    {
      "email": "Adam DeMamp ",
      "startDate": "Thu Dec 10 11:30:00 CST 2015",
      "endDate": "Thu Dec 10 12:00:00 CST 2015"
    },
    {
      "email": "Jillian Belk ",
      "startDate": "Thu Dec 10 12:00:00 CST 2015",
      "endDate": "Thu Dec 10 13:00:00 CST 2015"
    }
  ],
  'chiwrigleyville@slalom.com': [
    {
      "email": "Adam DeMamp ",
      "startDate": "Thu Dec 10 11:30:00 CST 2015",
      "endDate": "Thu Dec 10 12:00:00 CST 2015"
    },
    {
      "email": "Jillian Belk ",
      "startDate": "Thu Dec 10 12:00:00 CST 2015",
      "endDate": "Thu Dec 10 13:00:00 CST 2015"
    }
  ],
  'chitheloop@slalom.com': [
    {
      "email": "Anders Holmvik ",
      "startDate": "Thu Dec 10 13:00:00 CST 2015",
      "endDate": "Thu Dec 10 16:00:00 CST 2015"
    },
    {
      "email": "Blake Henderson ",
      "startDate": "Thu Dec 10 16:00:00 CST 2015",
      "endDate": "Thu Dec 10 17:00:00 CST 2015"
    }
  ]
};

export default mockRoomData;
