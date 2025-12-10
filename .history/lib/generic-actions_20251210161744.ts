"use server";

import { headers } from "next/headers";

/**
 * Retrieves additional header metadata, such as the user agent and X-Forwarded-For headers,
 * from the Next.js request context so we can pass additional data to the backend.
 */
const getAdditionalHeaderMetaData = async () => {
  const headersList = await headers();

  return {
    "User-Agent": headersList.get("user-agent") || "",
    "X-Forwarded-For": headersList.get("x-forwarded-for") || "",
  };
};

type GenericRequestProps = {
  path: string; // full URL or relative path
  overridePath?: boolean; // true if path is full external URL
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headerOptions?: Record<string, string>;
  options?: RequestInit;
  removeHeaderKey?: "Content-Type";
  replaceContentType?: string;
};

/**
 * Sends a generic HTTP request to the specified path with the given method, headers, and options.
 */
export const genericRequest = async ({
  path,
  overridePath = false,
  method = "GET",
  headerOptions = {},
  options = {},
  removeHeaderKey,
  replaceContentType,
}: GenericRequestProps) => {
  const endpointFullPath = overridePath
    ? path
    : `http://localhost:5205/api/${path}`;
  // : `${process.env.API_BASE_PATH}/${path}`;

  const additionalHeaders = await getAdditionalHeaderMetaData();

  const fetchOptions: RequestInit = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headerOptions,
      ...additionalHeaders,
    },
    ...options,
  };

  if (
    removeHeaderKey &&
    fetchOptions.headers &&
    typeof fetchOptions.headers === "object"
  ) {
    delete (fetchOptions.headers as Record<string, string>)[removeHeaderKey];
  }

  if (replaceContentType) {
    fetchOptions.headers = {
      ...fetchOptions.headers,
      "Content-Type": replaceContentType,
    };
  }

  const response = await fetch(endpointFullPath, fetchOptions);
  console.log("response", response);
  return response;
};
