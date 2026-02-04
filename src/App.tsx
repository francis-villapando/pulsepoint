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
import AdminEvents from "./pages/admin/AdminEvents";
import AdminPolls from "./pages/admin/AdminPolls";
import AdminFeedbacks from "./pages/admin/AdminFeedbacks";
import AdminCarousel from "./pages/admin/AdminCarousel";
import AdminArchives from "./pages/admin/AdminArchives";
import MobileLayout from "./pages/mobile/MobileLayout";
import MobileHome from "./pages/mobile/MobileHome";
import MobileEvents from "./pages/mobile/MobileEvents";
import MobilePolls from "./pages/mobile/MobilePolls";
import MobileFeedbacks from "./pages/mobile/MobileFeedbacks";
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
            <Route path="events" element={<AdminEvents />} />
            <Route path="polls" element={<AdminPolls />} />
            <Route path="feedbacks" element={<AdminFeedbacks />} />
            <Route path="carousel" element={<AdminCarousel />} />
            <Route path="archives" element={<AdminArchives />} />
          </Route>
          
          {/* Mobile Routes */}
          <Route path="/mobile" element={<MobileLayout />}>
            <Route index element={<MobileHome />} />
            <Route path="events" element={<MobileEvents />} />
            <Route path="polls" element={<MobilePolls />} />
            <Route path="feedbacks" element={<MobileFeedbacks />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
