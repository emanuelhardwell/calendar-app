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
        event.id = body.event.id;
        event.user = {
          _id: uid,
          name: name,
        };
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

export const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
});

export const eventDeleted = () => ({
  type: types.eventDeleted,
});
