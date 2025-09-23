import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart-context"
import { useWishlist } from "../../context/wishlist-context"
import { findProductInCart } from "../../utils/findProductInCart";
import { findProductInWishlist } from "../../utils/findProductInWishlist";

export const ProductCard = ({ product }) => {
    const { cart, cartDispatch } = useCart();
    const { wishlist, wishlistDispatch } = useWishlist();

    const navigate = useNavigate();

    const isProductInCart = findProductInCart(cart, product.id);
    const isProductInWishlist = findProductInWishlist(wishlist, product.id);

    const onCartClick = (product) => {
        !isProductInCart
            ? cartDispatch({
                type: "ADD_TO_CART",
                payload: { product }
            })
            : navigate("/cart");
    }

    const onWishlistClick = (product) => {
        !isProductInWishlist
            ? wishlistDispatch({
                type: "ADD_TO_WISHLIST",
                payload: { product }
            })
            : navigate("/wishlist");
    }

    return (
        <div className="card card-vertical d-flex direction-column relative shadow">
            <div className="card-image-container">
                <img className="card-image" src={product.images[0]} alt={product.title} />
            </div>
            <div className="card-details">
                <div className="card-desc">{product.title}</div>
                <div className="card-description">
                    <p className="card-price">Rs. {product.price}</p>
                </div>
                <div className="cta-btn">
                    <button
                        onClick={() => onWishlistClick(product)}
                        className="button btn-primary btn-icon cart-btn d-flex align-center justify-center gap cursor btn-margin"
                    >
                        <span className="material-symbols-outlined">
                            {isProductInWishlist ? "favorite" : "favorite_border"}
                        </span>
                        {isProductInWishlist ? "Go to Wishlist" : "Add To Wishlist"}
                    </button>
                    <button
                        onClick={() => onCartClick(product)}
                        className="button btn-primary btn-icon cart-btn d-flex align-center justify-center gap cursor btn-margin"
                    >
                        <span className="material-symbols-outlined">
                            {isProductInCart ? "shopping_cart_checkout" : "shopping_cart"}
                        </span>
                        {isProductInCart ? "Go to cart" : "Add To Cart"}
                    </button>
                </div>
            </div>
        </div>
    )
}
