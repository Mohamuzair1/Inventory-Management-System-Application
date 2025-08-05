import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sales.css';

export default function Sales() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantityToSell, setQuantityToSell] = useState(1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        fetchProducts();
    }, [navigate]);

    const fetchProducts = async () => {
        const token = localStorage.getItem('token');
        
        try {
            const response = await fetch('http://localhost:3001/products', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                setMessage('Failed to fetch products');
                setMessageType('error');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setMessage('Error fetching products');
            setMessageType('error');
        }
    };

    const filteredProducts = products.filter(product =>
        product.ProductName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.ProductBarcode.toString().includes(searchTerm)
    );

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setQuantityToSell(1);
        setMessage('');
    };

    const handleSale = async () => {
        if (!selectedProduct || quantityToSell <= 0) {
            setMessage('Please select a product and enter a valid quantity');
            setMessageType('error');
            return;
        }

        setLoading(true);
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:3001/saleproduct/${selectedProduct._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantitySold: parseInt(quantityToSell) })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setMessageType(data.lowStock ? 'warning' : 'success');
                
                // Update the product in the list
                setProducts(prevProducts =>
                    prevProducts.map(p =>
                        p._id === selectedProduct._id
                            ? { ...p, ProductQuantity: data.product.ProductQuantity }
                            : p
                    )
                );
                
                // Update selected product
                setSelectedProduct(data.product);
                setQuantityToSell(1);
                
            } else {
                setMessage(data.message || 'Sale failed');
                setMessageType('error');
            }
        } catch (error) {
            console.error('Error processing sale:', error);
            setMessage('Error processing sale');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sales-container">
            <div className="sales-header">
                <h1>
                    <i className="fas fa-shopping-cart"></i>
                    Point of Sale
                </h1>
                <button 
                    onClick={() => navigate('/dashboard')} 
                    className="back-btn"
                >
                    <i className="fas fa-arrow-left"></i>
                    Back to Dashboard
                </button>
            </div>

            <div className="sales-content">
                <div className="product-selection">
                    <div className="search-section">
                        <h2>Select Product</h2>
                        <div className="search-box">
                            <i className="fas fa-search"></i>
                            <input
                                type="text"
                                placeholder="Search by product name or barcode..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>

                    <div className="products-grid">
                        {filteredProducts.map((product) => (
                            <div
                                key={product._id}
                                className={`product-card ${selectedProduct?._id === product._id ? 'selected' : ''} ${product.ProductQuantity <= product.LowStockThreshold ? 'low-stock' : ''}`}
                                onClick={() => handleProductSelect(product)}
                            >
                                <div className="product-info">
                                    <h3>{product.ProductName}</h3>
                                    <p className="product-price">₹{product.ProductPrice}</p>
                                    <p className="product-quantity">
                                        Stock: {product.ProductQuantity}
                                        {product.ProductQuantity <= product.LowStockThreshold && (
                                            <span className="low-stock-badge">
                                                <i className="fas fa-exclamation-triangle"></i>
                                                Low Stock
                                            </span>
                                        )}
                                    </p>
                                    <p className="product-barcode">#{product.ProductBarcode}</p>
                                </div>
                                {product.ProductQuantity === 0 && (
                                    <div className="out-of-stock">Out of Stock</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="sale-section">
                    <h2>Process Sale</h2>
                    
                    {selectedProduct ? (
                        <div className="sale-details">
                            <div className="selected-product">
                                <h3>{selectedProduct.ProductName}</h3>
                                <p className="price">₹{selectedProduct.ProductPrice} each</p>
                                <p className="available">Available: {selectedProduct.ProductQuantity}</p>
                            </div>

                            <div className="quantity-section">
                                <label htmlFor="quantity">Quantity to Sell:</label>
                                <div className="quantity-controls">
                                    <button
                                        type="button"
                                        onClick={() => setQuantityToSell(Math.max(1, quantityToSell - 1))}
                                        className="quantity-btn"
                                    >
                                        <i className="fas fa-minus"></i>
                                    </button>
                                    <input
                                        type="number"
                                        id="quantity"
                                        value={quantityToSell}
                                        onChange={(e) => setQuantityToSell(Math.max(1, parseInt(e.target.value) || 1))}
                                        min="1"
                                        max={selectedProduct.ProductQuantity}
                                        className="quantity-input"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setQuantityToSell(Math.min(selectedProduct.ProductQuantity, quantityToSell + 1))}
                                        className="quantity-btn"
                                    >
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="sale-total">
                                <h3>Total: ₹{(selectedProduct.ProductPrice * quantityToSell).toFixed(2)}</h3>
                            </div>

                            <button
                                onClick={handleSale}
                                disabled={loading || selectedProduct.ProductQuantity === 0 || quantityToSell > selectedProduct.ProductQuantity}
                                className="sale-btn"
                            >
                                {loading ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-cash-register"></i>
                                        Complete Sale
                                    </>
                                )}
                            </button>
                        </div>
                    ) : (
                        <div className="no-selection">
                            <i className="fas fa-mouse-pointer"></i>
                            <p>Select a product to process sale</p>
                        </div>
                    )}

                    {message && (
                        <div className={`message ${messageType}`}>
                            <i className={`fas ${messageType === 'success' ? 'fa-check-circle' : messageType === 'warning' ? 'fa-exclamation-triangle' : 'fa-times-circle'}`}></i>
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
