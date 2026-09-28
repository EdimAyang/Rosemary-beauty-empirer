import CartDrawer from "@/components/CartDrawer";
import WhatsAppFloat from "@/components/Whatsapp";
import { Outlet } from "react-router-dom";
import useScrollToTop from "@/hooks/useScrollToTop";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";

const GlobalLayout = () => {
  useScrollToTop();
  return (
    <>
      <main>
        <Outlet />
      </main>
      <CartDrawer />
      <ScrollToTopButton/>
      <WhatsAppFloat />
    </>
  );
};
export default GlobalLayout;
