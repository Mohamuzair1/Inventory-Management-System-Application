import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        totalProducts: 0,
        lowStockProducts: 0,
        totalValue: 0
    });
    const [lowStockItems, setLowStockItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (!userData || !token) {
            navigate('/login');
            return;
        }
        
        setUser(JSON.parse(userData));
        fetchDashboardData();
    }, [navigate]);

    const fetchDashboardData = async () => {
        const token = localStorage.getItem('token');
        
        try {
            // Fetch products for stats
            const productsResponse = await fetch('http://localhost:3001/products', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (productsResponse.ok) {
                const products = await productsResponse.json();
                
                const totalProducts = products.length;
                const totalValue = products.reduce((sum, product) => 
                    sum + (product.ProductPrice * product.ProductQuantity), 0);
                
                setStats({
                    totalProducts,
                    lowStockProducts: 0, // Will be updated by low stock API
                    totalValue
                });
            }

            // Fetch low stock products
            const lowStockResponse = await fetch('http://localhost:3001/lowstock', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (lowStockResponse.ok) {
                const lowStock = await lowStockResponse.json();
                setLowStockItems(lowStock);
                setStats(prev => ({ ...prev, lowStockProducts: lowStock.length }));
            }

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="welcome-section">
                    <h1>Welcome back, {user.firstName}!</h1>
                    <p className="shop-name">{user.shopName}</p>
                </div>
                <button onClick={handleLogout} className="logout-btn">
                    <i className="fas fa-sign-out-alt"></i>
                    Logout
                </button>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">
                        <i className="fas fa-boxes"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{stats.totalProducts}</h3>
                        <p>Total Products</p>
                    </div>
                </div>

                <div className="stat-card warning">
                    <div className="stat-icon">
                        <i className="fas fa-exclamation-triangle"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{stats.lowStockProducts}</h3>
                        <p>Low Stock Items</p>
                    </div>
                </div>

                <div className="stat-card success">
                    <div className="stat-icon">
                        <i className="fas fa-rupee-sign"></i>
                    </div>
                    <div className="stat-info">
                        <h3>₹{stats.totalValue.toFixed(2)}</h3>
                        <p>Total Inventory Value</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-actions">
                <button 
                    onClick={() => navigate('/products')} 
                    className="action-btn primary"
                >
                    <i className="fas fa-list"></i>
                    View All Products
                </button>
                
                <button 
                    onClick={() => navigate('/insertproduct')} 
                    className="action-btn success"
                >
                    <i className="fas fa-plus"></i>
                    Add New Product
                </button>
                
                <button 
                    onClick={() => navigate('/sales')} 
                    className="action-btn info"
                >
                    <i className="fas fa-shopping-cart"></i>
                    Make Sale
                </button>
            </div>

            {lowStockItems.length > 0 && (
                <div className="low-stock-section">
                    <h2>
                        <i className="fas fa-exclamation-triangle"></i>
                        Low Stock Alert
                    </h2>
                    <div className="low-stock-grid">
                        {lowStockItems.map((item) => (
                            <div key={item._id} className="low-stock-item">
                                <div className="item-info">
                                    <h4>{item.ProductName}</h4>
                                    <p>Only {item.ProductQuantity} left</p>
                                </div>
                                <div className="item-actions">
                                    <button 
                                        onClick={() => navigate(`/updateproduct/${item._id}`)}
                                        className="btn-small primary"
                                    >
                                        Restock
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
