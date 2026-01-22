import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DisplayDashboard from "./pages/DisplayDashboard";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";
import MobileLayout from "./pages/mobile/MobileLayout";
import MobileHome from "./pages/mobile/MobileHome";
import MobileEvents from "./pages/mobile/MobileEvents";
import MobilePolls from "./pages/mobile/MobilePolls";
import MobileFeedback from "./pages/mobile/MobileFeedback";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/display" element={<DisplayDashboard />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
          </Route>
          
          {/* Mobile Routes */}
          <Route path="/mobile" element={<MobileLayout />}>
            <Route index element={<MobileHome />} />
            <Route path="events" element={<MobileEvents />} />
            <Route path="polls" element={<MobilePolls />} />
            <Route path="feedback" element={<MobileFeedback />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
