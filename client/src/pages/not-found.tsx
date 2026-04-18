import { Link } from "wouter";
import { AppShell } from "@/components/app-shell";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-4 py-20">
        <EmptyState
          title="This page wandered off"
          description="Let's get you back to something fun."
          action={
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/">
                <a>
                  <Button className="rounded-full h-12 px-6 bg-coral hover:bg-coral-deep font-bold">
                    Go home
                  </Button>
                </a>
              </Link>
              <Link href="/tutorials">
                <a>
                  <Button
                    variant="outline"
                    className="rounded-full h-12 px-6 border-2 font-bold"
                  >
                    Browse tutorials
                  </Button>
                </a>
              </Link>
            </div>
          }
        />
      </div>
    </AppShell>
  );
};

export default NotFoundPage;
