import { useNavigate } from "react-router-dom";
import { userLogin } from "../../api/auth";
import { uselogin } from "../../context/login-context";

export const Login = () => {

    const{ loginDispatch, email, password } = uselogin();
    const navigate = useNavigate();

    const onFormSubmit = async(e) => {
        e.preventDefault();
        const data = await userLogin(email, password)
        loginDispatch({
            type: "TOKEN",
            payload: {
                token: data
            }
        })
        if(data.access_token){
            navigate("/");
        }
    }

    const onEmailChange =(e) => {
        loginDispatch({
            type: 'EMAIL',
            payload:{
                value: e.target.value
            }
        })
    }
    const onPasswordChange =(e) => {
        loginDispatch({
            type: 'PASSWORD',
            payload:{
                value: e.target.value
            }
        })
    }

    return (
        <form onSubmit={onFormSubmit} className="bg-white shadow-md w-[400px] ">
            <h2 className="flex justify-center text-5xl">Login</h2>
            <div className="flex flex-col gap-2">
                <span >Email *</span>
                <input className="border-b-2" onChange={onEmailChange} type="email" required placeholder="abc@gmail.com" />
            </div>
            <div className="flex flex-col gap-2">
                <span>Password *</span>
                <input className="border-b-2" onChange={onPasswordChange} type="password" required placeholder="heyooooo" />
            </div>
            <div className="mx-4">
                <button
                    className="button btn-primary btn-icon cart-btn d-flex align-center justify-center gap cursor btn-margin">
                    Login
                </button>
            </div>
            
            {/* Signup Link */}
            <div className="text-center mt-6 pb-6">
                <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button
                        type="button"
                        onClick={() => navigate('/auth/signup')}
                        className="text-green-600 hover:text-green-500 font-medium"
                    >
                        Sign up here
                    </button>
                </p>
            </div>
        </form>
    )
}