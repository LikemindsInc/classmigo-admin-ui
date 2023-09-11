import { useState } from "react";
import { LessonCriteriaContext } from "../Contexts";

interface LessonCriteriaProviderProps {
  children: React.ReactNode;
}

export const LessonCriteriaProvider = ({
  children,
}: LessonCriteriaProviderProps) => {
  const storedClassName: any = JSON.parse(
    localStorage.getItem("className") || "null"
  );
  const storedSubject: any = JSON.parse(
    localStorage.getItem("subject") || "null"
  );

  const storedTopic: any = JSON.parse(localStorage.getItem("topic") || "null");

  const [className, setClassName] = useState<{ label: string; value: string }>({
    value: storedClassName?.value || "",
    label: storedClassName?.label || "",
  });
  const [subject, setSubject] = useState<{ label: string; value: string }>({
    value: storedSubject?.value || "",
    label: storedSubject?.label || "",
  });

  const [topic, setTopic] = useState<string | null>("");

  return (
    <LessonCriteriaContext.Provider
      value={{
        className,
        subject,
        topic,
        setClassName,
        setSubject,
        setTopic,
      }}
    >
      {children}
    </LessonCriteriaContext.Provider>
  );
};
