import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import { useCountdown } from '../hooks/useCountDown';

const ShowCounter = ({ minutes, seconds }) => {
    return (
      <div className="show-counter d-flex">
          <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
          <span>:</span>
          <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={seconds <= 10} />
      </div>
    );
  };

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    //console.log('tiempo terminado');
    return <>0 : 00</>;
  } else {
    return (
      <ShowCounter
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;