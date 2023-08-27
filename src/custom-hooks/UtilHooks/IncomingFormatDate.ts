import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const useFormattedDate = (incomingDate: string): string => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const newDateTime = dayjs(incomingDate);
    const formattedDateTime = newDateTime.format('MM/DD/YYYY hh:mm');
    setFormattedDate(formattedDateTime);
  }, [incomingDate]);

  return formattedDate;
};

export default useFormattedDate;