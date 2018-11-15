/* globals document */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';
import moment from 'moment';
import { get, isEmpty } from 'lodash';
import scrollIntoView from 'scroll-into-view';
import scroll from 'scroll';

import Icon from '@material-ui/core/Icon';

import { TIME_FORMAT } from 'client/constants';
import stylesGenerator from './styles';

let scrollTimeout;

/**
 * Displays meeting rooms for the day.
 * "Blocks" of 15-minutes are created for 7AM-7PM.
 * Meeting reservations are mapped to each 15-minute block they occupy.
 */
class FutureReservations extends PureComponent {
  static propTypes = {
    computedStyles: PropTypes.shape({
      base: PropTypes.object.isRequired,
      status: PropTypes.func.isRequired,
      scrollIcon: PropTypes.object.isRequired
    }).isRequired,
    reservations: PropTypes.arrayOf(
      PropTypes.shape(
        PropTypes.shape({
          email: PropTypes.string.isRequired,
          startDate: PropTypes.string.isRequired,
          endDate: PropTypes.string.isRequired
        }).isRequired
      )
    ).isRequired,
    timezone: PropTypes.number.isRequired,
    isOnline: PropTypes.bool.isRequired
  };

  CURRENT_TIME_SELECTOR = 'current-time';

  SCROLL_DELAY = 1500;

  componentDidMount() {
    this.scrollToCurrentTime();
  }

  componentDidUpdate() {
    this.scrollToCurrentTime();
  }

  scrollToCurrentTime = () => {
    scrollTimeout = setTimeout(
      () =>
        scrollIntoView(document.getElementById(this.CURRENT_TIME_SELECTOR), {
          align: {
            top: 0.02
          }
        }),
      this.SCROLL_DELAY
    );
  };

  scroll = (direction) => {
    this.clearScrollTimeout();

    const reservationsEl = document.getElementById('reservations');

    if (direction === 'up') {
      scroll.top(reservationsEl, reservationsEl.scrollTop - 300);
    } else if (direction === 'down') {
      scroll.top(reservationsEl, reservationsEl.scrollTop + 300);
    }

    this.scrollToCurrentTime();
  };

  clearScrollTimeout = () => {
    clearTimeout(scrollTimeout);
  };

  genTimeBlocks = () =>
    new Array(48).fill(1).map((e, i) => ({
      reserved: null,
      time: moment('12:00AM', TIME_FORMAT).add((i + 1) * 15 + 405, 'm')
    }));

  reduceTimeBlocks = (acc, value) => {
    const { reservation = {} } = value;
    const prevValue = acc[acc.length - 1] || {};
    const isSameReservation = reservation.startDate
      && moment(reservation.startDate).format(TIME_FORMAT)
        === moment(get(prevValue, 'time')).format(TIME_FORMAT);

    if (isSameReservation) {
      const mergedReservation = {
        ...acc.pop(),
        reservation,
        isCurrentTime: (value.isCurrentTime || prevValue.isCurrentTime) && isSameReservation,
        endTime: value.time.add(15, 'm'),
        increments: prevValue.increments ? prevValue.increments + 1 : 1
      };

      return acc.concat(mergedReservation);
    }

    return acc.concat({
      ...value,
      endTime: !isEmpty(reservation) ? moment(value.time).add(15, 'm') : null
    });
  };

  mapReservations = ({ time }) => {
    const { reservations, timezone } = this.props;

    if (!reservations) return { time };

    const matchingReservation = reservations
      .map((reservation) => {
        const isReserved = moment(time)
          .utcOffset(timezone)
          .isBetween(moment(reservation.startDate), moment(reservation.endDate));

        return isReserved ? reservation : false;
      })
      .filter((e) => e)[0];

    const isCurrentTime = moment()
      .utcOffset(timezone)
      .isBetween(
        moment(time).utcOffset(timezone),
        moment(time)
          .utcOffset(timezone)
          .add(15, 'm')
      );

    return {
      reservation: matchingReservation,
      isCurrentTime,
      time
    };
  };

  // Enzyme tests are weirdly picky about selectors
  safeSelector = (time) =>
    `_${time
      .utcOffset(this.props.timezone)
      .format(TIME_FORMAT)
      .replace(':', '-')}`;

  renderTime = (value) => {
    const { reservation = {}, time, isCurrentTime } = value;
    const { computedStyles, timezone } = this.props;
    const formattedTime = time.format(TIME_FORMAT);
    const startTime = reservation.startDate
      ? moment(reservation.startDate)
        .utcOffset(timezone)
        .format(TIME_FORMAT)
      : formattedTime;
    const endTime = reservation.endDate
      ? ` to ${moment(reservation.endDate)
        .utcOffset(timezone)
        .format(TIME_FORMAT)}`
      : '';

    return (
      <span
        key={formattedTime}
        id={isCurrentTime ? this.CURRENT_TIME_SELECTOR : this.safeSelector(time)}
        className={computedStyles.status(value)}>
        {startTime} {endTime}
        <span className={computedStyles.right}>{reservation.email}</span>
      </span>
    );
  };

  render() {
    const { computedStyles, isOnline } = this.props;

    return (
      <Fragment>
        <Icon className={computedStyles.scrollIcon} onClick={() => this.scroll('up')}>
          keyboard_arrow_up
        </Icon>
        <div
          id='reservations'
          className={computedStyles.base}
          onTouchEnd={this.scrollToCurrentTime}
          onTouchStart={this.clearScrollTimeout}>
          {isOnline
            ? this.genTimeBlocks()
              .map(this.mapReservations)
              .reduce(this.reduceTimeBlocks, [])
              .map(this.renderTime)
            : this.genTimeBlocks()
              .map(this.mapReservations)
              .map(this.renderTime)}
        </div>
        <Icon className={computedStyles.scrollIcon} onClick={() => this.scroll('down')}>
          keyboard_arrow_down
        </Icon>
      </Fragment>
    );
  }
}

export default withStyles(stylesGenerator)(FutureReservations);
