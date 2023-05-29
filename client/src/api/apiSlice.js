import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.authData?.auth_token;
    if (token) {
      headers.set("authorization", `Token  ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ["Auth", "Todolists"],
  endpoints: (builder) => ({}),
});
