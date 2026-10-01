import CartDrawer from "@/components/CartDrawer";
import WhatsAppFloat from "@/components/Whatsapp";
import { Outlet } from "react-router-dom";
import useScrollToTop from "@/hooks/useScrollToTop";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import { useState } from "react";
import SplashPage from "@/pages/splash";

const GlobalLayout = () => {
  useScrollToTop();
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashPage onComplete={() => setShowSplash(false)} />}
      <main>
        <Outlet />
      </main>
      <CartDrawer />
      <ScrollToTopButton />
      <WhatsAppFloat />
    </>
  );
};
export default GlobalLayout;
