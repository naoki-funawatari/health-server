import { Pool } from "pg";

export const pool = new Pool({
  host: "health-db",
  port: 5432,
  user: "health",
  password: "health",
  database: "healthes",
});
