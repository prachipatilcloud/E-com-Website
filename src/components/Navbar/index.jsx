export const Navbar = () => {
  return (
    <header className="flex items-center justify-between bg-green-900 px-8 py-3 text-slate-50">
      {/* Left side - Logo */}
      <h1 className="text-3xl font-bold">Shop It</h1>

      {/* Right side - Icons */}
      <nav className="flex items-center gap-8">
        <span className="material-symbols-outlined text-3xl cursor-pointer hover:text-slate-200">
          favorite
        </span>
        <span className="material-symbols-outlined text-3xl cursor-pointer hover:text-slate-200">
          shopping_cart
        </span>
        <span className="material-symbols-outlined text-3xl cursor-pointer hover:text-slate-200">
          account_circle
        </span>
      </nav>
    </header>
  )
}
