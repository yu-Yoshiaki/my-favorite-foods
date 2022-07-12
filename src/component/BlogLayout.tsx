import type { ReactNode } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { LayoutErrorBoundary } from "./LayoutErrorBoundary";

/**
 * @package
 */

export const BlogLayout = (props: { children: ReactNode }) => {
  return (
    <div className="grid grid-rows-[auto,1fr,auto] gap-5 min-h-screen">
      <Header />
      <main className="px-3 text-center md:px-32">
        <div>
          <LayoutErrorBoundary>{props.children}</LayoutErrorBoundary>
        </div>
      </main>
      <Footer />
    </div>
  );
};
