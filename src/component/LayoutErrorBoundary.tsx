import type { ReactNode } from "react";
import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";

const ErrorFallback = (props: FallbackProps) => {
  return (
    <div>
      <p>Something went wrong:</p>
      <pre>{props.error.message}</pre>
    </div>
  );
};

/**
 * @package
 */
export const LayoutErrorBoundary = (props: { children: ReactNode }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {props.children}
    </ErrorBoundary>
  );
};
