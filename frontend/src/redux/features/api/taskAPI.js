import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const taskAPI = createApi({
  reducerPath: "taskAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://task-management-app-kappa.vercel.app",
  }),
  endpoints: (build) => ({
    getTasks: build.query({
      query: () => "/tasks",
    }),
    addTask: build.mutation({
      query: (body) => ({
        url: "/add-task",
        method: "POST",
        body: body,
      }),
    }),
    deleteTask: build.mutation({
      query: (id) => ({
        url: `/delete-task/${id}`,
        method: "DELETE",
      }),
    }),
    updateTaskStatus: build.mutation({
      query: ({ id, status }) => ({
        url: `/update-status/${id}`,
        method: "PATCH",
        body: { status: status },
      }),
    }),
  }),
});

export const { useGetTasksQuery , useAddTaskMutation, useDeleteTaskMutation, useUpdateTaskStatusMutation} = taskAPI;

export default taskAPI;
