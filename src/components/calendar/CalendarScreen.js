import React from "react";
import { Navbar } from "../ui/Navbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
import { messages } from "../../helpers/calendar-messages-es";

const localizer = momentLocalizer(moment); // or globalizeLocalizer
moment.locale("es");

const events = [
  {
    title: "Cumple de Hardwell",
    start: moment().subtract(4, "hours").toDate(),
    end: moment().subtract(2, "hours").toDate(),
    bgcolor: "#fafafa",
    notes: "Llevar pastel por favor",
  },
];

export const CalendarScreen = () => {
  /*  */
  const eventStyleGetter = (event, start, end, isSelected) => {
    /* console.log(event, start, end, isSelected); */
    const style = {
      backgroundColor: "#367CF7",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };

    return {
      style,
    };
  };

  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};
