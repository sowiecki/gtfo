import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';
import moment from 'moment';
import { isEmpty } from 'lodash';

import Icon from '@material-ui/core/Icon';

import {
  TIME_FORMAT,
  BOOKED,
  ABANDONED,
  VACANT,
  SQUATTED,
  ONE_MINUTE_WARNING,
  FIVE_MINUTE_WARNING,
  OFFLINE
} from 'client/constants';
import { formatForDisplay } from 'utils';
import CurrentTime from './current-time';
import StatusIconMap from './status-icon-map';
import FutureReservations from './future-reservations';
import stylesGenerator from './styles';

const RESERVED_STATUSES = [BOOKED, ABANDONED, ONE_MINUTE_WARNING, FIVE_MINUTE_WARNING];

class RoomModal extends PureComponent {
  static propTypes = {
    timezone: PropTypes.number.isRequired,
    closeModal: PropTypes.func.isRequired,
    computedStyles: PropTypes.shape({
      base: PropTypes.object.isRequired,
      status: PropTypes.func.isRequired,
      currentReservation: PropTypes.object.isRequired,
      footer: PropTypes.object.isRequired
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    meetingRoom: PropTypes.shape({
      id: PropTypes.string.isRequired,
      alert: PropTypes.string.isRequired,
      coordinates: PropTypes.shape({
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
      }).isRequired,
      location: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      currenReservation: PropTypes.shape({
        email: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired
      }),
      thermo: PropTypes.shape({
        f: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        c: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      })
    }).isRequired
  };

  hasCurrentReservation = ({ currentReservation, alert }) =>
    !isEmpty(currentReservation) && RESERVED_STATUSES.includes(alert);

  renderCurrentReservation = () => {
    const { timezone, meetingRoom } = this.props;

    if (!this.hasCurrentReservation(meetingRoom)) return;

    return (
      <div className='reservation-details'>
        <div>
          Reserved by {meetingRoom.currentReservation.email}
          <div>
            {moment(meetingRoom.currentReservation.startDate)
              .utcOffset(timezone)
              .format(TIME_FORMAT)}{' '}
            to{' '}
            {moment(meetingRoom.currentReservation.endDate)
              .utcOffset(timezone)
              .format(TIME_FORMAT)}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { computedStyles, closeModal, timezone, meetingRoom } = this.props;

    const ALERT_MESSAGE_MAP = {
      [BOOKED]: 'Booked',
      [ABANDONED]: 'Booked, but no occupants detected',
      [VACANT]: 'Vacant',
      [SQUATTED]: 'Not booked, but occupants detected',
      [ONE_MINUTE_WARNING]: 'Booked, less than one minute remaining',
      [FIVE_MINUTE_WARNING]: 'Booked, less than five minutes remaining',
      [OFFLINE]: 'Error fetching room data'
    };

    return meetingRoom ? (
      <Fragment>
        <div className={computedStyles.base}>
          <div className={computedStyles.status(meetingRoom.alert)}>
            <div>
              {meetingRoom.name}
              <div className='left'>
                <StatusIconMap alert={meetingRoom.alert} /> {ALERT_MESSAGE_MAP[meetingRoom.alert]}
                {this.renderCurrentReservation()}
              </div>
              <div className='right'>
                <CurrentTime timezone={timezone} />
              </div>
            </div>
          </div>
          <FutureReservations
            timezone={timezone}
            isOnline={meetingRoom.alert !== OFFLINE}
            reservations={meetingRoom.reservations}/>
        </div>
        <div className={computedStyles.footer}>
          <button type='button' onClick={closeModal}>
            <Icon>subdirectory_arrow_left</Icon> Return to {formatForDisplay(meetingRoom.location)}
          </button>
        </div>
      </Fragment>
    ) : null;
  }
}

export default withStyles(stylesGenerator)(RoomModal);
