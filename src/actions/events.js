import Swal from "sweetalert2";
import { covertDates } from "../helpers/convertDates";
import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventStartAddNew = (event) => {
  return async (dispath, getState) => {
    const { uid, name } = getState().auth;

    try {
      const res = await fetchConToken("event", event, "POST");
      const body = await res.json();

      if (body.ok) {
        event.id = body.evento.id;
        event.user = {
          _id: uid,
          name: name,
        };
        console.log(event);
        dispath(eventAddNew(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent,
});

export const eventStartLoading = () => {
  return async (dispath) => {
    try {
      const res = await fetchConToken("event");
      const body = await res.json();

      const event = covertDates(body.events);
      dispath(eventLoaded(event));
    } catch (error) {
      console.log(error);
    }
  };
};

const eventLoaded = (event) => ({
  type: types.eventLoaded,
  payload: event,
});

export const eventStartUpdate = (event) => {
  return async (dispath) => {
    try {
      const res = await fetchConToken(`event/${event.id}`, event, "PUT");
      const body = await res.json();

      if (body.ok) {
        dispath(eventUpdated(event));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
});

export const eventStartDelete = () => {
  return async (dispath, getState) => {
    const { id } = getState().calendar.activeEvent;

    try {
      const res = await fetchConToken(`event/${id}`, {}, "DELETE");
      const body = await res.json();

      if (body.ok) {
        dispath(eventDeleted());
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventDeleted = () => ({
  type: types.eventDeleted,
});

export const eventLogout = () => ({
  type: types.eventLogout,
});
