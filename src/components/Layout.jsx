import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SearchPopup from "./SearchPopup";
import { useState } from "react";

export default function Layout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  return (
    <>
      <Header onSearchClick={openSearch} />

      {/*вікно пошуку */}
      <SearchPopup isOpen={isSearchOpen} onClose={closeSearch} />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
