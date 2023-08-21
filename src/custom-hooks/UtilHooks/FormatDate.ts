import { useEffect, useState } from "react";

interface FormattedDateTime {
  formattedDate: string;
  formattedTime: string;
}

export const useFormattedDateTime = (dateTime: string): FormattedDateTime | null => {
  const [formattedDateTime, setFormattedDateTime] = useState<FormattedDateTime | null>(null);

  useEffect(() => {
    if (dateTime) {
      const parsedDateTime = new Date(dateTime);
      const options : any = { year: "numeric", month: "short", day: "numeric" };

      const formattedDate = parsedDateTime.toLocaleDateString("en-US", options);

      const hours = parsedDateTime.getHours();
      const minutes = parsedDateTime.getMinutes();
      const amPm = hours >= 12 ? "pm" : "am";
      const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, "0")} ${amPm}`;

      setFormattedDateTime({
        formattedDate: formattedDate,
        formattedTime: formattedTime,
      });
    }
  }, [dateTime]);

  return formattedDateTime;
};