import { Navbar } from "../../components/Navbar"
import { useEffect, useState } from "react"
import { getAllProducts } from "../../api/getAllProducts"
import { ProductCard } from "../../components/ProductCard";
import { useCart } from "../../context/cart-context";
import { getAllCategories } from "../../api/getAllCategories";
import { getProductsByCategory } from "../../utils/getProductsByCategory";
import { FilterSidebar } from "../../components/FilterSidebar";

export const Home = () => {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState("All");
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [sortBy, setSortBy] = useState('');
    const [showFilters, setShowFilters] = useState(true);

    const {cart} = useCart();

    useEffect(() => {

        (async () => {
            const products = await getAllProducts();
            const categories = await getAllCategories();
            const updatedCategories = [...categories,{id:'1a', name: 'All'}]
            setProducts(products);
            setCategories(updatedCategories);
            setFilteredProducts(products);
        })()

    }, []);

    // Apply filters and sorting
    const applyFilters = () => {
        let filtered = [...products];

        // Filter by category
        filtered = getProductsByCategory(filtered, selectedCategories);

        // Filter by price range
        filtered = filtered.filter(product => 
            product.price >= priceRange.min && product.price <= priceRange.max
        );

        // Sort by price
        if (sortBy === 'lowToHigh') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'highToLow') {
            filtered.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(filtered);
    };

    // Apply filters whenever dependencies change
    useEffect(() => {
        applyFilters();
    }, [products, selectedCategories, priceRange, sortBy]);

    const onCategoryClick = (category) => {
        setSelectedCategories(category);
    }

    const handleFiltersChange = () => {
        // This function is called from FilterSidebar to trigger re-filtering
        // The actual filtering happens in the useEffect above
    };

    return (
        <>
            <Navbar />
            
            {/* Category Filter Pills - Top Section */}
            <div className="bg-white border-b border-gray-200 py-4">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap gap-3">
                        {categories.length > 0 && categories.map(category => (
                            <button
                                key={category.id}
                                className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                                    selectedCategories === category.name 
                                        ? 'bg-green-500 text-white shadow-md' 
                                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                                }`}
                                onClick={() => onCategoryClick(category.name)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <main className="flex bg-gray-50 min-h-screen">
                {/* Filter Sidebar */}
                <FilterSidebar 
                    products={products}
                    onFiltersChange={handleFiltersChange}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />
                
                {/* Main Content */}
                <div className="flex-1 p-6">
                    {/* Results Header */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-medium text-gray-700">
                                Showing {filteredProducts.length} results
                            </h2>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg">
                                <div className="text-6xl text-gray-300 mb-4">🔍</div>
                                <h2 className="text-xl font-semibold text-gray-600 mb-2">No Products Found</h2>
                                <p className="text-gray-500 text-center max-w-md">
                                    Try adjusting your filters or search criteria to find what you're looking for.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}