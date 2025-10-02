import { Login } from "../../components/Login"
import { Navbar } from "../../components/Navbar"

export const AuthLogin = () => {
    return (
        <>
            <Navbar />
            <main className="flex justify-center items-center min-h-screen bg-gray-100 mt-22">
                <Login />

            </main>
        </>
    )
}