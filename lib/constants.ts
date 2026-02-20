const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;
const apiStorePrefix = process.env.NEXT_PUBLIC_API_STORE_PREFIX;
const apiUserPrefix = process.env.NEXT_PUBLIC_API_USER_PREFIX;

if (!baseUrl || !apiVersion || !apiStorePrefix || !apiUserPrefix) {
  throw new Error(
    `Missing env vars: NEXT_PUBLIC_BASE_URL = ${baseUrl}, NEXT_PUBLIC_API_VERSION = ${apiVersion}
    NEXT_PUBLIC_API_STORE_PREFIX = ${apiStorePrefix}`
  );
}

export const BASE_URL = baseUrl;
export const API_VERSION = apiVersion;
export const API_STORE_PREFIX = apiStorePrefix;
export const API_USER_PREFIX = apiUserPrefix;
export const API_ENDPOINT = `${baseUrl}${apiVersion}`;
