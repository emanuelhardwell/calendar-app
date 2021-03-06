/*  */

import { fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startLogin = (email, password) => {
  return async (dispath) => {
    const res = await fetchSinToken("auth", { email, password }, "POST");
    const body = await res.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispath(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    }
  };
};

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});
