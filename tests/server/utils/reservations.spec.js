/* eslint-env node, jest */
/* eslint no-magic-numbers:0 max-nested-callbacks:0 */
import expect from 'expect';

import { formatReservations } from 'server/utils';

describe('Reservation utilities (server)', () => {
  const mockRawReservations = [
    {
      id: 'the loop',
      schedule: [
        {
          subject: 'AliceMurphy@example.domain',
          start: {
            dateTime: '2016-05-04T14:30:00.000Z',
            timeZone: 'Central Standard Time'
          },
          end: {
            dateTime: '2016-05-04T15:00:00.000Z',
            timeZone: 'Central Standard Time'
          }
        },
        {
          subject: 'AndersHolmvik@example.domain',
          start: {
            dateTime: '2016-05-04T15:00:00.000Z',
            timeZone: 'Central Standard Time'
          },
          end: {
            dateTime: '2016-05-04T15:30:00.000Z',
            timeZone: 'Central Standard Time'
          }
        }
      ]
    },
    {
      id: 'bronzeville',
      schedule: [
        {
          subject: 'BlakeHenderson@example.domain',
          start: {
            dateTime: '2016-05-04T14:00:00.000Z',
            timeZone: 'Central Standard Time'
          },
          end: {
            dateTime: '2016-05-04T14:30:00.000Z',
            timeZone: 'Central Standard Time'
          }
        },
        {
          subject: 'AdamDeMamp@example.domain',
          start: {
            dateTime: '2016-05-04T14:30:00.000Z',
            timeZone: 'Central Standard Time'
          },
          end: {
            dateTime: '2016-05-04T15:30:00.000Z',
            timeZone: 'Central Standard Time'
          }
        }
      ]
    }
  ];

  const mockFormattedReservations = {
    'the loop': [
      {
        subject: 'AliceMurphy@example.domain',
        start: {
          dateTime: '2016-05-04T14:30:00.000Z',
          timeZone: 'Central Standard Time'
        },
        end: {
          dateTime: '2016-05-04T15:00:00.000Z',
          timeZone: 'Central Standard Time'
        }
      },
      {
        subject: 'AndersHolmvik@example.domain',
        start: {
          dateTime: '2016-05-04T15:00:00.000Z',
          timeZone: 'Central Standard Time'
        },
        end: {
          dateTime: '2016-05-04T15:30:00.000Z',
          timeZone: 'Central Standard Time'
        }
      }
    ],
    bronzeville: [
      {
        subject: 'BlakeHenderson@example.domain',
        start: {
          dateTime: '2016-05-04T14:00:00.000Z',
          timeZone: 'Central Standard Time'
        },
        end: {
          dateTime: '2016-05-04T14:30:00.000Z',
          timeZone: 'Central Standard Time'
        }
      },
      {
        subject: 'AdamDeMamp@example.domain',
        start: {
          dateTime: '2016-05-04T14:30:00.000Z',
          timeZone: 'Central Standard Time'
        },
        end: {
          dateTime: '2016-05-04T15:30:00.000Z',
          timeZone: 'Central Standard Time'
        }
      }
    ]
  };

  test('formatReservations', () => {
    expect(formatReservations(mockRawReservations)).toEqual(mockFormattedReservations);
  });
});
