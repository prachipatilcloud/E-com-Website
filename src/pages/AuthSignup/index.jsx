import { Signup } from "../../components/Signup"
import { Navbar } from "../../components/Navbar"

export const AuthSignup = () => {
    return (
        <>
            <Navbar />
            <main className="flex justify-center items-center min-h-screen bg-gray-100 py-12">
                <Signup />
            </main>
        </>
    )
}