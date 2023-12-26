'use client'

import React, { useEffect, useRef, useState } from "react";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { useField, useFormikContext } from "formik";

interface Props {
  handleDetail: (type: string) => void
}


const DateActivity = ({handleDetail}: Props) => {
  const currentDate: Date = new Date();
  currentDate.setSeconds(0); // Set seconds to 0 to initialize with the current time

  const {setFieldValue} = useFormikContext();
  const [field] = useField("date");

  const handleUpdate = (date: any) => {
    setFieldValue("date", date);
  }

  return (
    <>
      <p className="my-2 font-medium tracking-wider text-gray-400">Select the activity date and time :</p>
      <DateTimePicker value={field.value} onChange={handleUpdate} />

      <div className="flex justify-center">
        <button onClick={() => handleDetail("photoUpload")} className="create mt-3">Save</button>
      </div>
    </>
  )
}

export default DateActivity