import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './InsertProduct.css';

export default function InsertProduct() {
    const [formData, setFormData] = useState({
        ProductName: '',
        ProductPrice: '',
        ProductBarcode: '',
        ProductQuantity: '',
        ProductCategory: '',
        ProductDescription: '',
        LowStockThreshold: 10
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'ProductBarcode' && value.length > 12) {
            return; // Prevent input if more than 12 digits
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addProduct = async (e) => {
        e.preventDefault();

        const { ProductName, ProductPrice, ProductBarcode, ProductQuantity, ProductCategory } = formData;

        if (!ProductName || !ProductPrice || !ProductBarcode || !ProductQuantity || !ProductCategory) {
            setError("*Please fill in all the required fields.");
            return;
        }

        if (ProductPrice <= 0) {
            setError("*Product price must be greater than 0.");
            return;
        }

        if (ProductQuantity < 0) {
            setError("*Product quantity cannot be negative.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem('token');
            const res = await fetch("http://localhost:3001/insertproduct", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.status === 201) {
                alert("Product added successfully!");
                setFormData({
                    ProductName: '',
                    ProductPrice: '',
                    ProductBarcode: '',
                    ProductQuantity: '',
                    ProductCategory: '',
                    ProductDescription: '',
                    LowStockThreshold: 10
                });
                navigate('/products');
            }
            else if (res.status === 422) {
                alert("Product is already added with that barcode.");
            }
            else if (res.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            }
            else {
                setError("Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='insert-product-container'>
            <div className="insert-header">
                <div className="header-content">
                    <h1>
                        <i className="fas fa-plus-circle"></i>
                        Add New Product
                    </h1>
                    <p>Enter product information to add to your inventory</p>
                </div>
                <NavLink to="/products" className='btn-secondary'>
                    <i className="fas fa-arrow-left"></i>
                    Back to Products
                </NavLink>
            </div>

            <div className="form-container">
                <form onSubmit={addProduct} className="product-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="ProductName" className="form-label required">
                                <i className="fas fa-tag"></i>
                                Product Name
                            </label>
                            <input 
                                type="text" 
                                name="ProductName"
                                onChange={handleChange} 
                                value={formData.ProductName} 
                                className="form-control" 
                                id="ProductName" 
                                placeholder="Enter product name" 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="ProductCategory" className="form-label required">
                                <i className="fas fa-tags"></i>
                                Category
                            </label>
                            <select
                                name="ProductCategory"
                                onChange={handleChange}
                                value={formData.ProductCategory}
                                className="form-control"
                                id="ProductCategory"
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Food & Beverages">Food & Beverages</option>
                                <option value="Books">Books</option>
                                <option value="Health & Beauty">Health & Beauty</option>
                                <option value="Sports & Outdoors">Sports & Outdoors</option>
                                <option value="Home & Garden">Home & Garden</option>
                                <option value="Toys & Games">Toys & Games</option>
                                <option value="Automotive">Automotive</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="ProductPrice" className="form-label required">
                                <i className="fas fa-rupee-sign"></i>
                                Price (INR)
                            </label>
                            <input 
                                type="number" 
                                name="ProductPrice"
                                onChange={handleChange} 
                                value={formData.ProductPrice} 
                                className="form-control" 
                                id="ProductPrice" 
                                placeholder="₹0.00" 
                                min="0"
                                step="0.01"
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="ProductQuantity" className="form-label required">
                                <i className="fas fa-cubes"></i>
                                Quantity
                            </label>
                            <input 
                                type="number" 
                                name="ProductQuantity"
                                onChange={handleChange} 
                                value={formData.ProductQuantity} 
                                className="form-control" 
                                id="ProductQuantity" 
                                placeholder="0" 
                                min="0"
                                required 
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="ProductBarcode" className="form-label required">
                                <i className="fas fa-barcode"></i>
                                Barcode (12 digits max)
                            </label>
                            <input 
                                type="number" 
                                name="ProductBarcode"
                                onChange={handleChange} 
                                value={formData.ProductBarcode} 
                                className="form-control" 
                                id="ProductBarcode" 
                                placeholder="Enter barcode" 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="LowStockThreshold" className="form-label">
                                <i className="fas fa-exclamation-triangle"></i>
                                Low Stock Alert (Optional)
                            </label>
                            <input 
                                type="number" 
                                name="LowStockThreshold"
                                onChange={handleChange} 
                                value={formData.LowStockThreshold} 
                                className="form-control" 
                                id="LowStockThreshold" 
                                placeholder="10" 
                                min="1"
                            />
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="ProductDescription" className="form-label">
                            <i className="fas fa-align-left"></i>
                            Description (Optional)
                        </label>
                        <textarea 
                            name="ProductDescription"
                            onChange={handleChange} 
                            value={formData.ProductDescription} 
                            className="form-control" 
                            id="ProductDescription" 
                            placeholder="Enter product description..." 
                            rows="3"
                        />
                    </div>

                    {error && (
                        <div className="error-message">
                            <i className="fas fa-exclamation-triangle"></i>
                            {error}
                        </div>
                    )}

                    <div className="form-actions">
                        <NavLink to="/products" className='btn-cancel'>
                            <i className="fas fa-times"></i>
                            Cancel
                        </NavLink>
                        <button type="submit" className="btn-submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i>
                                    Adding Product...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-plus"></i>
                                    Add Product
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
