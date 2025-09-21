import { HorizontalProductCard } from "../../components/HorizontalProductCart";
import { Navbar } from "../../components/Navbar"
import { PriceDetails } from "../../components/PriceDetails";
import { useCart } from "../../context/cart-context"

export const Cart = () => {

    const { cart } = useCart();

    return (
        <>
            <Navbar />
            <main className="flex flex-col gap-4 items-center pt-6">
                <h2 className="text-3xl">My Cart</h2>
                <div className="flex gap-8">
                    <div className="pt-4 flex flex-col gap-4">
                        {
                            cart?.length > 0 && cart.map(product => <HorizontalProductCard product={product} key={product.id} />)

                        }
                    </div>
                    <div>
                    <PriceDetails />

                    </div>

                </div>
            </main>
        </>
    )
}