import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { uselogin } from "../../context/login-context";



export const Navbar = () => {

  const navigate = useNavigate();
  const [isAccountDropDownOpen, setIsAccountDropDownOpen] = useState(false);
  const {token, loginDispatch} = uselogin();

  const onLoginClick = () => {
    if(token?.access_token){
      navigate("/auth/login") 
    }
    else{
      loginDispatch({
        type: 'LOGOUT'
      })
      navigate("/auth/login");
    }
  }

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
        <div className="relative">
          <span onClick={() => setIsAccountDropDownOpen(!isAccountDropDownOpen)} className="material-symbols-outlined text-3xl cursor-pointer hover:text-slate-200">
            account_circle
          </span>
          {
            isAccountDropDownOpen && <div className="absolute bg-green-400">
              <button onClick={onLoginClick}>
                {
                  token?.access_token ? 'Logout' : 'Login'
                }
                Login</button>
            
          </div>
          }
        </div>
      </nav>
    </header>
  )
}
