import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MoodProvider } from "@/contexts/MoodContext";
import { GameProvider } from "@/contexts/GameContext";
import { Layout } from "@/components/Layout";
import { Home } from "./pages/Home";
import { Booking } from "./pages/Booking";
import { Resources } from "./pages/Resources";
import { Forum } from "./pages/Forum";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MoodProvider>
        <GameProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="booking" element={<Booking />} />
                <Route path="resources" element={<Resources />} />
                <Route path="forum" element={<Forum />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </GameProvider>
      </MoodProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
