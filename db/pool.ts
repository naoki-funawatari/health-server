import { Pool } from "pg";

export const createPool = () => {
  return new Pool({
    host: "health-db",
    port: 5432,
    user: "health",
    password: "health",
    database: "healthes",
  });
};
