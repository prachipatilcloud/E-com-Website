import { useState, useEffect } from "react";

export const FilterSidebar = ({ 
    products, 
    onFiltersChange, 
    priceRange, 
    setPriceRange, 
    sortBy, 
    setSortBy 
}) => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);

    // Calculate min and max prices from products
    useEffect(() => {
        if (products.length > 0) {
            const prices = products.map(product => product.price);
            const min = Math.floor(Math.min(...prices));
            const max = Math.ceil(Math.max(...prices));
            setMinPrice(min);
            setMaxPrice(max);
            
            // Set initial price range if not set
            if (priceRange.min === 0 && priceRange.max === 1000) {
                setPriceRange({ min, max });
            }
        }
    }, [products, priceRange.min, priceRange.max, setPriceRange]);

    const handlePriceRangeChange = (type, value) => {
        const newRange = {
            ...priceRange,
            [type]: parseInt(value)
        };
        setPriceRange(newRange);
        onFiltersChange();
    };

    const handleSortChange = (sortOption) => {
        setSortBy(sortOption);
        onFiltersChange();
    };

    const clearAllFilters = () => {
        setPriceRange({ min: minPrice, max: maxPrice });
        setSortBy('');
        onFiltersChange();
    };

    return (
        <div className="w-64 bg-white border-r border-gray-200 p-4 h-screen sticky top-0 overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-semibold text-gray-800">Filters</h2>
                <button 
                    onClick={clearAllFilters}
                    className="text-blue-600 text-xs hover:text-blue-800 font-medium"
                >
                    Clear
                </button>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-3 text-sm">
                    Price Range
                </h3>
                
                {/* Price Range Slider */}
                <div className="mb-3">
                    {/* Min Price Slider */}
                    <div className="mb-2">
                        <input
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            value={priceRange.min}
                            onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer price-slider"
                        />
                    </div>
                    
                    {/* Max Price Slider */}
                    <div className="mb-2">
                        <input
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            value={priceRange.max}
                            onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer price-slider"
                        />
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-600">
                        <span>Rs.{priceRange.min}</span>
                        <span>Rs.{priceRange.max}</span>
                    </div>
                </div>

                {/* Price Input Fields */}
                <div className="flex gap-1">
                    <input
                        type="number"
                        placeholder={minPrice.toString()}
                        value={priceRange.min}
                        onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500"
                    />
                    <span className="self-center text-gray-500 text-xs px-1">to</span>
                    <input
                        type="number"
                        placeholder={maxPrice.toString()}
                        value={priceRange.max}
                        onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>

            {/* Sort By Price */}
            <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-3 text-sm">
                    Sort By Price
                </h3>
                
                <div className="space-y-2">
                    {/* Low to High */}
                    <label className="flex items-center cursor-pointer text-sm">
                        <input
                            type="radio"
                            name="sortBy"
                            value="lowToHigh"
                            checked={sortBy === 'lowToHigh'}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="mr-2 text-blue-600 focus:ring-blue-500 w-3 h-3"
                        />
                        <span className="text-gray-700 text-sm">Low to High</span>
                    </label>
                    
                    {/* High to Low */}
                    <label className="flex items-center cursor-pointer text-sm">
                        <input
                            type="radio"
                            name="sortBy"
                            value="highToLow"
                            checked={sortBy === 'highToLow'}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="mr-2 text-blue-600 focus:ring-blue-500 w-3 h-3"
                        />
                        <span className="text-gray-700 text-sm">High to Low</span>
                    </label>
                </div>
            </div>



            {/* Custom CSS for slider styling */}
            <style jsx>{`
                .price-slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    background: #3b82f6;
                    cursor: pointer;
                    border: 1px solid white;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.2);
                }
                
                .price-slider::-moz-range-thumb {
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    background: #3b82f6;
                    cursor: pointer;
                    border: 1px solid white;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.2);
                }

                .price-slider {
                    background: linear-gradient(to right, #3b82f6 0%, #3b82f6 50%, #e5e7eb 50%, #e5e7eb 100%);
                }
            `}</style>
        </div>
    );
};
