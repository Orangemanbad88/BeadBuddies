import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/home";
import BrowseTutorialsPage from "@/pages/browse-tutorials";
import TutorialDetailPage from "@/pages/tutorial-detail";
import GalleryPage from "@/pages/gallery";
import MyBraceletsPage from "@/pages/my-bracelets";
import NotFoundPage from "@/pages/not-found";

const Router = () => {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/tutorials" component={BrowseTutorialsPage} />
      <Route path="/tutorials/:id" component={TutorialDetailPage} />
      <Route path="/gallery" component={GalleryPage} />
      <Route path="/my-bracelets" component={MyBraceletsPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
