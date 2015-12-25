import moment from 'moment';

// All dates are ISO 8601

const GAP_PROBABILITY = 5;
const RESERVATIONS_PER_DAY = 10;
const NOW = moment().toISOString();
const CURRENT_YEAR = moment().year();
const CURRENT_MONTH = moment().month();
const TODAY = moment().day();
const START_TIME = "09:00am";
const START_OF_DAY = moment([CURRENT_YEAR, CURRENT_MONTH, TODAY, START_TIME]);

const minutesFromNow = (minutes) => START_OF_DAY.add(minutes, 'minutes').toISOString();

const minutesFromStartOfDay = (minutes) => moment().add(minutes, 'minutes').toISOString();

const randomMeetingDuration = () => {
  const durations = [30, 60, 90];

  return durations[Math.floor(Math.random() * (durations.length - 0)) + 0];
};

const randomReservationGap = () => {
  const introduceGap = 3 >= Math.floor(Math.random() * (GAP_PROBABILITY - 0)) + 0;

  return introduceGap ? randomMeetingDuration() : 0;
};

const mockData = {};

const mockRooms = [
  'chibronzeville@slalom.com',
  'chiwrigleyville@slalom.com',
  'chisouthatrium@slalom.com',
  'chitheloop@slalom.com'
];

const mockEmail = () => {
  const mockEmails = [
    'BlakeHenderson@slalom.com',
    'AliceMurphy@slalom.com',
    'AdamDeMamp@slalom.com',
    'JillianBelk@slalom.com',
    'AndersHolmvik@slalom.com'
  ];

  return mockEmails[() => Math.floor(Math.random() * (mockEmails.length - 0)) + 0];
};

const generateReservation = (room, beginTime, endTime) => ({
  'email': mockEmail(),
  'startDate': minutesFromStartOfDay(beginTime),
  'endDate': minutesFromStartOfDay(endTime)
});

const generateMockData = () => {
  mockRooms.forEach((room, index) => {
    let nextBeginTime = START_OF_DAY;
    let nextEndTime = randomMeetingDuration();
    mockData[room] = [];

    for (let i = 0; i < RESERVATIONS_PER_DAY; i++) {
      mockData[room].push(generateReservation(room, nextBeginTime, nextEndTime));

      nextBeginTime = nextEndTime + randomReservationGap();
      nextEndTime = nextBeginTime + randomMeetingDuration();
    }
  });

  return mockData;
};

export default generateMockData();
