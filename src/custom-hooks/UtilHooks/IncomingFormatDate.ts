import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const useFormattedDateTime = (incomingDateTime: string): string => {
  const [formattedDateTime, setFormattedDateTime] = useState('');

  useEffect(() => {
    const newDateTime = dayjs(incomingDateTime);
    const formattedDateTime = newDateTime.format('YYYY-MM-DDTHH:mm');
    setFormattedDateTime(formattedDateTime);
  }, [incomingDateTime]);

  return formattedDateTime;
};

export default useFormattedDateTime;