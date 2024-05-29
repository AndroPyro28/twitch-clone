"use client";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import qs from "query-string";

const controller = new AbortController();

export const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SITE_URL}/api`,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
});

type queryFnProps = {
  url: string;
  queryParams?: Record<string, any> | null;
  headers?: any | {};
};

export const queryFn = async <T>({
  url,
  queryParams = {},
  headers = {},
}: queryFnProps) => {
  const newUrl = qs.stringifyUrl({
    url,
    query: {
      ...queryParams,
    },
  });

  const { data } = await apiClient.get<T>(newUrl, {
    headers: {
      ...headers,
    },
    signal: controller.signal,
  });
  return data;
};

type useQueryProcessorProps = {
  url: string;
  queryParams?: Record<string, any>;
  key: any[];
  options?: Record<string, any>;
  headers?: Record<string, any>;
};

export const useQueryProcessor = <T>({
  url,
  queryParams = {},
  key = [],
  options = {},
  headers = {},
}: useQueryProcessorProps) => {
  return useQuery<T>({
    queryKey: key,
    queryFn: () => queryFn({ url, queryParams, headers }),
    ...options,
  });
};

export type HttpMutationMethod = "DELETE" | "POST" | "PUT" | "PATCH";

type mutationFnProps<T> = {
  url: string;
  queryParams?: Record<string, any> | null;
  headers?: any | {};
  method: HttpMutationMethod;
  value: T;
};
export const mutationFn = async <T>({
  url,
  queryParams = {},
  method,
  value,
  headers = {},
}: mutationFnProps<T>) => {
  const newUrl = qs.stringifyUrl({
    url,
    query: { ...queryParams },
  });

  switch (method) {
    case "DELETE": {
      const { data } = await apiClient.delete<T>(newUrl, {
        headers: {
          ...headers,
        },
        signal: controller.signal,
      });
      return data;
    }

    case "PATCH": {
      const { data } = await apiClient.patch<T>(newUrl, value, {
        headers: {
          ...headers,
        },
        signal: controller.signal,
      });
      return data;
    }
    case "POST": {
      const { data } = await apiClient.post<T>(newUrl, value, {
        headers: {
          ...headers,
        },
        signal: controller.signal,
      });
      return data;
    }
    case "PUT": {
      const { data } = await apiClient.put<T>(newUrl, value, {
        headers: {
          ...headers,
        },
        signal: controller.signal,
      });
      return data;
    }
    default:
      throw new Error("Invalid mutation method");
  }
};

type useMutationProcessorProps = {
  url: string;
  queryParams?: Record<string, any>;
  method: HttpMutationMethod;
  key: any[];
  options?: Record<string, any>;
  headers?: Record<string, any>;
};

export const useMutateProcessor = <T, K>({
  url,
  queryParams = {},
  method,
  key = [],
  options = {},
  headers = {},
}: useMutationProcessorProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: async (value: T) =>
      mutationFn<T>({ url, queryParams, method, value, headers }) as K,
    onMutate: (data: T) => {
      const previousData = queryClient.getQueryData<T>(key);
      const isArray = Array.isArray(previousData);
      //checking if the previous data is an array type if yes then update the array data
      if (isArray) {
        queryClient.setQueryData(key, (old: (T | any)[]) => {
          if (method === "DELETE") {
            // if delete method we assume it's an id to delete
            return old.filter((value) => value?.id != data);
          }
          if (method === "POST") {
            // else its an object of new data
            if (Array.isArray(data)) {
              return [...old, ...data];
            } else {
              return [...old, data];
            }
          }
        });
      }
      return { previousData };
    },
    onError: (err, newTodo, context) => {
      if (axios.isAxiosError(err)) {
        // err.response?.data.message if nestjs backend
        // err.response?.data if nextjs backend
        console.error(err.response?.data);
        // toast.error(err.response?.data)
      } else {
        console.error(err);
      }
      queryClient.setQueryData(key, context?.previousData);
      console.log(" 🚀 error mutate processor 🚀");
    },
    onSuccess(data, variables, context) {
      console.log(" 🚀 success mutate processor 🚀");
    },
    onSettled: async (data) => {
      console.log(" 🚀 settled mutate processor 🚀");
      return await queryClient.invalidateQueries({
        queryKey: key,
      });
    },
  });
};