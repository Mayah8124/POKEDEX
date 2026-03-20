import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./page/Home";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}