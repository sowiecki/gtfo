/* eslint-env node, jest */
/* eslint no-magic-numbers:0 max-nested-callbacks:0 */
import expect from 'expect';

import { formatReservations } from 'server/utils';

describe('Reservation utilities (server)', () => {
  const mockRawReservations = [
    {
      name: 'the loop',
      schedule: [
        {
          email: 'AliceMurphy@example.domain',
          startDate: '2016-05-04T14:30:00.000Z',
          endDate: '2016-05-04T15:00:00.000Z'
        },
        {
          email: 'AndersHolmvik@example.domain',
          startDate: '2016-05-04T15:00:00.000Z',
          endDate: '2016-05-04T15:30:00.000Z'
        }
      ]
    },
    {
      name: 'bronzeville',
      schedule: [
        {
          email: 'BlakeHenderson@example.domain',
          startDate: '2016-05-04T14:00:00.000Z',
          endDate: '2016-05-04T14:30:00.000Z'
        },
        {
          email: 'AdamDeMamp@example.domain',
          startDate: '2016-05-04T14:30:00.000Z',
          endDate: '2016-05-04T15:30:00.000Z'
        }
      ]
    }
  ];

  const mockFormattedReservations = {
    'the loop': [
      {
        email: 'AliceMurphy@example.domain',
        startDate: '2016-05-04T14:30:00.000Z',
        endDate: '2016-05-04T15:00:00.000Z'
      },
      {
        email: 'AndersHolmvik@example.domain',
        startDate: '2016-05-04T15:00:00.000Z',
        endDate: '2016-05-04T15:30:00.000Z'
      }
    ],
    bronzeville: [
      {
        email: 'BlakeHenderson@example.domain',
        startDate: '2016-05-04T14:00:00.000Z',
        endDate: '2016-05-04T14:30:00.000Z'
      },
      {
        email: 'AdamDeMamp@example.domain',
        startDate: '2016-05-04T14:30:00.000Z',
        endDate: '2016-05-04T15:30:00.000Z'
      }
    ]
  };

  test('formatReservations', () => {
    expect(formatReservations(mockRawReservations)).toEqual(mockFormattedReservations);
  });
});
