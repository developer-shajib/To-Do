import apiSlice from '../apiSlice.js';

// Create inject endpoint api
const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body: data
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/api/v1/auth/logout',
        method: 'POST'
      })
    }),
    register: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/register',
        method: 'POST',
        body: data
      })
    }),
    // me: builder.query({
    //   query: () => '/api/v1/auth/me',
    //   providesTags: ['Me']
    // }),
    getAllProjects: builder.query({
      query: () => '/api/v1/project',
      providesTags: ['Project']
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: '/api/v1/project',
        method: 'POST',
        body: data
      })
    }),
    getAllTask: builder.query({
      query: () => '/api/v1/task',
      providesTags: ['Task']
    }),
    createTask: builder.mutation({
      query: (data) => ({
        url: '/api/v1/task/${id}',
        method: 'POST',
        body: data
      })
    }),
    updateTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/task/${id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['Task']
    }),
    searchTask: builder.mutation({
      query: (data) => ({
        url: `/api/v1/task/search?keyword=${data}`,
        method: 'POST',
        body: data
      })
    })
  })
});

// export endpoints
export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useGetAllProjectsQuery, useCreateProjectMutation, useCreateTaskMutation, useGetAllTaskQuery, useUpdateTaskMutation, useSearchTaskMutation } = authApiSlice;
