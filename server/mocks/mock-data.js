import moment from 'moment';

// All dates as ISO 8601

const now = moment().toISOString();
const minutesFromNow = (minutes) => moment().add(minutes, 'minutes').toISOString();

const mockRoomData = {
  'chibronzeville@slalom.com': [
    {
      'email': 'Blake Henderson ',
      'startDate': now,
      'endDate': minutesFromNow(30)
    },
    {
      'email': 'Alice Murphy ',
      'startDate': minutesFromNow(30),
      'endDate': minutesFromNow(60)
    }
  ],
  'chisouthatrium@slalom.com': [
    {
      'email': 'Adam DeMamp ',
      'startDate': minutesFromNow(30),
      'endDate': minutesFromNow(120)
    },
    {
      'email': 'Jillian Belk ',
      'startDate': minutesFromNow(120),
      'endDate': minutesFromNow(150)
    }
  ],
  'chiwrigleyville@slalom.com': [
    {
      'email': 'Adam DeMamp ',
      'startDate': minutesFromNow(-26),
      'endDate': minutesFromNow(4)
    },
    {
      'email': 'Jillian Belk ',
      'startDate': minutesFromNow(4),
      'endDate': minutesFromNow(64)
    }
  ],
  'chitheloop@slalom.com': [
    {
      'email': 'Anders Holmvik ',
      'startDate': now,
      'endDate': minutesFromNow(4)
    },
    {
      'email': 'Blake Henderson ',
      'startDate': minutesFromNow(4),
      'endDate': minutesFromNow(64)
    }
  ]
};

export default mockRoomData;
