export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://todo.be"
    : "http://localhost:30004";

export const wpEndpoint = `${baseUrl}/wp-json`;
