import { useNavigate } from "react-router-dom"



export const Navbar = () => {

  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between bg-green-900 px-8 py-3 text-slate-50">
      <div>
        <h1 onClick={() => navigate("/")} className="text-5xl font-bold hover:cursor-pointer">Shop It</h1>
      </div>
      <nav className="flex items-center gap-8">
        <span 
          onClick={() => navigate("/wishlist")}
          className="material-symbols-outlined text-3xl cursor-pointer hover:text-slate-200"
        >
          favorite
        </span>
        <span 
          onClick={() => navigate("/cart")}
          className="material-symbols-outlined text-3xl cursor-pointer hover:text-slate-200"
        >
          shopping_cart
        </span>
        <span className="material-symbols-outlined text-3xl cursor-pointer hover:text-slate-200">
          account_circle
        </span>
      </nav>
    </header>
  )
}
