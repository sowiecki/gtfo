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
          startDate: '2016-05-04T14:30:00.000Z',
          endDate: '2016-05-04T15:00:00.000Z'
        },
        {
          subject: 'AndersHolmvik@example.domain',
          startDate: '2016-05-04T15:00:00.000Z',
          endDate: '2016-05-04T15:30:00.000Z'
        }
      ]
    },
    {
      id: 'bronzeville',
      schedule: [
        {
          subject: 'BlakeHenderson@example.domain',
          startDate: '2016-05-04T14:00:00.000Z',
          endDate: '2016-05-04T14:30:00.000Z'
        },
        {
          subject: 'AdamDeMamp@example.domain',
          startDate: '2016-05-04T14:30:00.000Z',
          endDate: '2016-05-04T15:30:00.000Z'
        }
      ]
    }
  ];

  const mockFormattedReservations = {
    'the loop': [
      {
        subject: 'AliceMurphy@example.domain',
        startDate: '2016-05-04T14:30:00.000Z',
        endDate: '2016-05-04T15:00:00.000Z'
      },
      {
        subject: 'AndersHolmvik@example.domain',
        startDate: '2016-05-04T15:00:00.000Z',
        endDate: '2016-05-04T15:30:00.000Z'
      }
    ],
    bronzeville: [
      {
        subject: 'BlakeHenderson@example.domain',
        startDate: '2016-05-04T14:00:00.000Z',
        endDate: '2016-05-04T14:30:00.000Z'
      },
      {
        subject: 'AdamDeMamp@example.domain',
        startDate: '2016-05-04T14:30:00.000Z',
        endDate: '2016-05-04T15:30:00.000Z'
      }
    ]
  };

  test('formatReservations', () => {
    expect(formatReservations(mockRawReservations)).toEqual(mockFormattedReservations);
  });
});
