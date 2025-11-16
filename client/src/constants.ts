export const URL = import.meta.env.DEV
  ? "http://localhost:8000/api"
  : "https://plastic-trace-final.vercel.app/api";

export const CHAIN_ID = 1287;

export const ROLES = {
  ADMIN: "ADMIN_ROLE",
  MANUFACTURER: "MANUFACTURER_ROLE",
  RECYCLER: "RECYCLER_ROLE",
  RAG_PICKER: "RAGPICKER_ROLE",
  CITIZEN: "CITIZEN_ROLE",
};
