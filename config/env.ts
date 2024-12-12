type Env = "development" | "production" | "test";

export const NODE_ENV: Env = process.env.NODE_ENV as Env;