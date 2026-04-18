import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { OnboardingIntro } from "@/components/onboarding-intro";
import { useProgressState } from "@/lib/use-progress";
import HomePage from "@/pages/home";
import BrowseTutorialsPage from "@/pages/browse-tutorials";
import TutorialDetailPage from "@/pages/tutorial-detail";
import GalleryPage from "@/pages/gallery";
import MyBraceletsPage from "@/pages/my-bracelets";
import BeadLabPage from "@/pages/bead-lab";
import NotFoundPage from "@/pages/not-found";

const Router = () => {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/tutorials" component={BrowseTutorialsPage} />
      <Route path="/tutorials/:id" component={TutorialDetailPage} />
      <Route path="/gallery" component={GalleryPage} />
      <Route path="/bead-lab" component={BeadLabPage} />
      <Route path="/my-bracelets" component={MyBraceletsPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

const IntroGate = () => {
  const state = useProgressState();
  if (state.character.introSeen) return null;
  return <OnboardingIntro />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <IntroGate />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
