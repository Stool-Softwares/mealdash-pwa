export const __prod__ = process.env.NODE_ENV === "production";
export const API = __prod__ ? "" : "http://localhost:5001";
