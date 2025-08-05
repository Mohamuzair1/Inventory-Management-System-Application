import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Products.css';

export default function Products() {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        getProducts();
    }, [navigate])

    const getProducts = async () => {
        const token = localStorage.getItem('token');
        
        try {
            const res = await fetch("http://localhost:3001/products", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (res.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
                return;
            }

            const data = await res.json();

            if (res.status === 201) {
                console.log("Data Retrieved.");
                setProductData(data);
            }
            else {
                console.log("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const deleteProduct = async (id) => {
        const token = localStorage.getItem('token');
        
        if (window.confirm('Are you sure you want to delete this product?')) {
            const response = await fetch(`http://localhost:3001/deleteproduct/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            const deletedata = await response.json();
            console.log(deletedata);

            if (response.status === 422 || !deletedata) {
                console.log("Error");
                alert("Error deleting product");
            } else {
                console.log("Product deleted");
                alert("Product deleted successfully");
                getProducts();
            }
        }
    }

    const filteredProducts = productData.filter(product =>
        product.ProductName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.ProductCategory?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.ProductBarcode.toString().includes(searchTerm)
    );

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading products...</p>
            </div>
        );
    }

    return (
        <div className='products-container'>
            <div className="products-header">
                <div className="header-content">
                    <h1>
                        <i className="fas fa-boxes"></i>
                        Products Inventory
                    </h1>
                    <p>Manage your product inventory efficiently</p>
                </div>
                <div className="header-actions">
                    <button 
                        onClick={() => navigate('/dashboard')} 
                        className="btn-secondary"
                    >
                        <i className="fas fa-arrow-left"></i>
                        Dashboard
                    </button>
                    <NavLink to="/insertproduct" className='btn-primary'>
                        <i className="fas fa-plus"></i>
                        Add New Product
                    </NavLink>
                </div>
            </div>

            <div className="search-section">
                <div className="search-box">
                    <i className="fas fa-search"></i>
                    <input
                        type="text"
                        placeholder="Search products by name, category, or barcode..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="products-count">
                    Showing {filteredProducts.length} of {productData.length} products
                </div>
            </div>

            <div className="products-grid">
                {filteredProducts.length === 0 ? (
                    <div className="no-products">
                        <i className="fas fa-box-open"></i>
                        <h3>No products found</h3>
                        <p>Try adjusting your search or add new products to get started.</p>
                        <NavLink to="/insertproduct" className='btn-primary'>
                            <i className="fas fa-plus"></i>
                            Add First Product
                        </NavLink>
                    </div>
                ) : (
                    filteredProducts.map((product, index) => (
                        <div key={product._id} className={`product-card ${product.ProductQuantity <= product.LowStockThreshold ? 'low-stock' : ''}`}>
                            <div className="product-header">
                                <h3 className="product-name">{product.ProductName}</h3>
                                {product.ProductQuantity <= product.LowStockThreshold && (
                                    <span className="low-stock-badge">
                                        <i className="fas fa-exclamation-triangle"></i>
                                        Low Stock
                                    </span>
                                )}
                            </div>
                            
                            <div className="product-details">
                                <div className="price-section">
                                    <span className="price">₹{product.ProductPrice}</span>
                                    <span className="currency">INR</span>
                                </div>
                                
                                <div className="product-info">
                                    <div className="info-item">
                                        <i className="fas fa-tags"></i>
                                        <span>{product.ProductCategory || 'Uncategorized'}</span>
                                    </div>
                                    <div className="info-item">
                                        <i className="fas fa-cubes"></i>
                                        <span>{product.ProductQuantity || 0} in stock</span>
                                    </div>
                                    <div className="info-item">
                                        <i className="fas fa-barcode"></i>
                                        <span>#{product.ProductBarcode}</span>
                                    </div>
                                </div>

                                {product.ProductDescription && (
                                    <div className="product-description">
                                        <p>{product.ProductDescription}</p>
                                    </div>
                                )}
                            </div>

                            <div className="product-actions">
                                <NavLink 
                                    to={`/updateproduct/${product._id}`} 
                                    className="btn-action edit"
                                    title="Edit Product"
                                >
                                    <i className="fas fa-edit"></i>
                                </NavLink>
                                <button 
                                    className="btn-action delete" 
                                    onClick={() => deleteProduct(product._id)}
                                    title="Delete Product"
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>

                            {product.ProductQuantity === 0 && (
                                <div className="out-of-stock-overlay">
                                    <span>Out of Stock</span>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
