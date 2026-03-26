import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Experience from "./pages/Experience";
import Partners from "./pages/Partners";

import FAQ from "./pages/FAQ";
import About from "./pages/About";
import Contact from "./pages/Contact";
import JoinTheTeam from "./pages/JoinTheTeam";
import ExpPage1 from "./pages/ExpPage1";
import ExpPage2 from "./pages/ExpPage2";
import ExpPage3 from "./pages/ExpPage3";
import ExpPage4 from "./pages/ExpPage4";
import ExpPage5 from "./pages/ExpPage5";
import ExpPage6 from "./pages/ExpPage6";
import ExpPage7 from "./pages/ExpPage7";
import ExpPage8 from "./pages/ExpPage8";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/partners" element={<Partners />} />
          
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/join-the-team" element={<JoinTheTeam />} />
          <Route path="/experience/live-music" element={<ExpPage1 />} />
          <Route path="/experience/cosplay-kpop-battle" element={<ExpPage2 />} />
          <Route path="/experience/entertainment-arena" element={<ExpPage3 />} />
          <Route path="/experience/live-experience" element={<ExpPage4 />} />
          <Route path="/experience/food-court" element={<ExpPage5 />} />
          <Route path="/experience/fan-meetup" element={<ExpPage6 />} />
          <Route path="/experience/merch-marketplace" element={<ExpPage7 />} />
          <Route path="/experience/live-bar" element={<ExpPage8 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
