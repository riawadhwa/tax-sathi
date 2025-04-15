import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Calculator from "./pages/Calculator";
import FilingChecklist from "./pages/FilingChecklist";
import FormChecklist from "./pages/FormChecklist";
import InvestmentBudget from "./pages/InvestmentBudget";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import FloatingChatButton from "./components/FloatingChatButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/filing-checklist" element={<FilingChecklist />} />
            <Route path="/form-checklist" element={<FormChecklist />} />
            <Route path="/investment-budget" element={<InvestmentBudget />} />
            <Route path="/auth" element={<Auth />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingChatButton />
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
