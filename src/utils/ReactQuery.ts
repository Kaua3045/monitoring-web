import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  logger: {
    log: console.log,
    warn: console.warn,
    error: import.meta.env.VITE_NODE_ENV === "prod" ? () => {} : console.error,
  },
});
