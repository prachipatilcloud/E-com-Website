import { useWishlist } from "../../context/wishlist-context";
import { useCart } from "../../context/cart-context";
import { findProductInCart } from "../../utils/findProductInCart";
import { Navbar } from "../../components/Navbar";

export const Wishlist = () => {
    const { wishlist, wishlistDispatch } = useWishlist();
    const { cart, cartDispatch } = useCart();

    const removeFromWishlist = (productId) => {
        wishlistDispatch({
            type: "REMOVE_FROM_WISHLIST",
            payload: { productId }
        });
    };

    const addToCart = (product) => {
        const isProductInCart = findProductInCart(cart, product.id);
        
        if (!isProductInCart) {
            cartDispatch({
                type: "ADD_TO_CART",
                payload: { product }
            });
        }
    };

    const isProductInCart = (productId) => findProductInCart(cart, productId);

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-center">My Wishlist</h1>
                
                {wishlist.length === 0 ? (
                    <div className="text-center py-16">
                        <span className="material-symbols-outlined text-6xl text-gray-400 mb-4 block">
                            favorite_border
                        </span>
                        <h2 className="text-xl text-gray-600 mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-500">Add some products to your wishlist to see them here!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlist.map(product => (
                            <div key={product.id} className="card card-vertical d-flex direction-column relative shadow">
                                <div className="card-image-container">
                                    <img className="card-image" src={product.images[0]} alt={product.title} />
                                    <button 
                                        onClick={() => removeFromWishlist(product.id)}
                                        className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-red-50"
                                        title="Remove from wishlist"
                                    >
                                        <span className="material-symbols-outlined text-red-500">
                                            close
                                        </span>
                                    </button>
                                </div>
                                <div className="card-details">
                                    <div className="card-desc">{product.title}</div>
                                    <div className="card-description">
                                        <p className="card-price">Rs. {product.price}</p>
                                    </div>
                                    <div className="cta-btn">
                                        <button
                                            onClick={() => removeFromWishlist(product.id)}
                                            className="button btn-outline btn-icon cart-btn d-flex align-center justify-center gap cursor btn-margin"
                                        >
                                            <span className="material-symbols-outlined">
                                                heart_broken
                                            </span>
                                            Remove from Wishlist
                                        </button>
                                        <button
                                            onClick={() => addToCart(product)}
                                            disabled={isProductInCart(product.id)}
                                            className={`button btn-icon cart-btn d-flex align-center justify-center gap cursor btn-margin ${
                                                isProductInCart(product.id) 
                                                    ? 'btn-disable cursor-not-allowed' 
                                                    : 'btn-primary'
                                            }`}
                                        >
                                            <span className="material-symbols-outlined">
                                                {isProductInCart(product.id) ? "shopping_cart_checkout" : "shopping_cart"}
                                            </span>
                                            {isProductInCart(product.id) ? "Already in Cart" : "Add to Cart"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};