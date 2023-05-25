import { apiSlice } from "../api/apiSlice";

export const todolistsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodolistsDone: builder.query({
      query: () => ({
        url: `/api/todolists/done/`,
        method: "GET",
      }),
      providesTags: ["Todolists", "Auth"],
    }),
    getTodolistsNotDone: builder.query({
      query: () => ({
        url: `/api/todolists/notDone/`,
        method: "GET",
      }),
      providesTags: ["Todolists", "Auth"],
    }),
    createTodolist: builder.mutation({
      query: ({ data }) => ({
        url: `/api/todolists/create/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Todolists"],
    }),
    doneTodolist: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/todolists/done/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Todolists"],
    }),
  }),
});

export const {
  useGetTodolistsDoneQuery,
  useGetTodolistsNotDoneQuery,
  useCreateTodolistMutation,
  useDoneTodolistMutation,
} = todolistsApiSlice;
