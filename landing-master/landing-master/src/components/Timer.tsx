'use client';

import { memo, useEffect, useState } from 'react';

import dayjs from 'dayjs';

const format = 'HH:mm:ss A MMM DD, YYYY Z';

const Timer = () => {
  const [date, setDate] = useState(dayjs().format(format));

  useEffect(() => {
    setInterval(() => {
      setDate(dayjs().format(format));
    }, 1000);
  }, []);

  return <div className="text-white text-xs">{date}</div>;
};

export default memo(Timer);
