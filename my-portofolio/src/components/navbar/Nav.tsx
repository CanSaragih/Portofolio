import NavHome from "./NavHome";
import NavMenu from "./NavMenu";

export default function Nav() {
  return (
    <nav className="pointer-events-none fixed top-0 left-0 z-[99999] h-screen w-full">
      <NavHome />
      <NavMenu />
    </nav>
  );
}
