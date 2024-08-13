import { api } from "./index";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: (params) => ({
        url: "/products",
        params,
      }),
      providesTags: ["Products"],
    }),
    getProductsById: build.query({
      query: (id) => ({
        url: `/products/${id}`,
      }),
      providesTags: ["Products"],
    }),
    createProducts: build.mutation({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProducts: build.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    updateProducts: build.mutation({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: "PATCH", //
        body,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductsMutation,
  useDeleteProductsMutation,
  useUpdateProductsMutation,
} = productApi;
