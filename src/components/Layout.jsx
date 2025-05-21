import Header from './Header';
import Footer from './Footer';
import SearchPopup from "./SearchPopup";
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
export default function Layout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);
  return (
    <div>
      <Header onSearchClick={openSearch} />
      <SearchPopup isOpen={isSearchOpen} onClose={closeSearch} />
      <main> <Outlet /> </main>
      <Footer />
    </div>
  );
} 