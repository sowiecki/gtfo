/* globals document */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';
import moment from 'moment';
import { get, isEmpty } from 'lodash';
import scrollIntoView from 'scroll-into-view';

import { TIME_FORMAT } from 'client/constants';
import stylesGenerator from './styles';

class FutureReservations extends PureComponent {
  static propTypes = {
    computedStyles: PropTypes.shape({
      base: PropTypes.object.isRequired,
      title: PropTypes.object.isRequired,
      status: PropTypes.func.isRequired
    }).isRequired,
    reservations: PropTypes.arrayOf(
      PropTypes.shape(
        PropTypes.shape({
          email: PropTypes.string.isRequired,
          startDate: PropTypes.string.isRequired,
          endDate: PropTypes.string.isRequired
        }).isRequired
      )
    ).isRequired
  };

  CURRENT_TIME_SELECTOR = 'current-time';

  SCROLL_DELAY = 750;

  componentDidMount() {
    this.scrollToCurrentTime();
  }

  componentDidUpdate() {
    this.scrollToCurrentTime();
  }

  scrollToCurrentTime = () => {
    setTimeout(
      () =>
        scrollIntoView(document.getElementById(this.CURRENT_TIME_SELECTOR), {
          align: {
            top: 0.02
          }
        }),
      this.SCROLL_DELAY
    );
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
    const matchingReservation = this.props.reservations
      .map((reservation) => {
        const isReserved = moment(time).isBetween(
          moment(reservation.startDate),
          moment(reservation.endDate)
        );

        return isReserved ? reservation : false;
      })
      .filter((e) => e)[0];
    const isCurrentTime = moment().isBetween(moment(time), moment(time).add(15, 'm'));

    return {
      reservation: matchingReservation,
      isCurrentTime,
      time
    };
  };

  renderEndTime = ({ endTime }) => (endTime ? ` to ${endTime.format(TIME_FORMAT)}` : '');

  renderTime = (value) => {
    const { reservation = {}, time, isCurrentTime } = value;
    const { computedStyles } = this.props;
    const formattedTime = time.format(TIME_FORMAT);

    return (
      <span
        key={formattedTime}
        id={isCurrentTime ? this.CURRENT_TIME_SELECTOR : formattedTime}
        className={computedStyles.status(value)}>
        {formattedTime} {this.renderEndTime(value)}
        <span className={computedStyles.right}>{reservation.email}</span>
      </span>
    );
  };

  render() {
    const { computedStyles } = this.props;
    // console.log(
    //   this.props.reservations.map((e) => ({
    //     ...e,
    //     startDate: moment(e.startDate).format(TIME_FORMAT),
    //     endDate: moment(e.endDate).format(TIME_FORMAT)
    //   }))
    // );

    return (
      <Fragment>
        <h2 className={computedStyles.title}>Reservations</h2>
        <div className={computedStyles.base} onTouchEnd={this.scrollToCurrentTime}>
          {this.genTimeBlocks()
            .map(this.mapReservations)
            .reduce(this.reduceTimeBlocks, [])
            .map(this.renderTime)}
        </div>
      </Fragment>
    );
  }
}

export default withStyles(stylesGenerator)(FutureReservations);
