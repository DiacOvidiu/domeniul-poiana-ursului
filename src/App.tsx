import { Switch, Route, Router as WouterRouter } from "wouter";
import { lazy, Suspense } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Home from "@/pages/Home";

const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route>
        <Suspense fallback={null}>
          <NotFound />
        </Suspense>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <LanguageProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </LanguageProvider>
  );
}

export default App;
