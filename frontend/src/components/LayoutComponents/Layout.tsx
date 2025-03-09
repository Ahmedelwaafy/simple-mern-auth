import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer.tsx";
import Navbar from "./Navbar.tsx";
import ErrorBoundaryFallback from "../MainComponents/ErrorBoundaryFallback.tsx";

function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <>
      <Navbar />
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <main className="w-full min-h-[calc(100vh-180px)]">
          <Outlet />
        </main>
      </ErrorBoundary>
      <Footer />
    </>
  );
}

export default Layout;
