import React from 'react'

export default function About() {
  return (
    <div className='container-fluid p-5' style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh', color: 'white' }}>
        <div className="row justify-content-center">
            <div className="col-lg-10">
                <div className="text-center mb-5">
                    <h1 className="display-4 mb-3">
                        <i className="fas fa-boxes me-3"></i>
                        Advanced Inventory Management System
                    </h1>
                    <p className="lead">A comprehensive MERN stack solution for modern business inventory management</p>
                    <hr className="my-4" style={{ borderColor: 'rgba(255,255,255,0.3)' }} />
                </div>

                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="card h-100" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', backdropFilter: 'blur(10px)' }}>
                            <div className="card-body text-white">
                                <h3 className="card-title">
                                    <i className="fas fa-rocket me-2 text-warning"></i>
                                    What is This System?
                                </h3>
                                <p className="card-text">
                                    Our Advanced Inventory Management System is a full-stack web application built with the modern MERN stack (MongoDB, Express.js, React, Node.js). 
                                    It's designed to help businesses of all sizes efficiently manage their product inventory with real-time tracking, sales processing, and comprehensive analytics.
                                </p>
                                <p className="card-text">
                                    The system provides a secure, user-friendly platform that streamlines inventory operations, reduces manual errors, and provides valuable insights 
                                    into your business performance.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-4">
                        <div className="card h-100" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', backdropFilter: 'blur(10px)' }}>
                            <div className="card-body text-white">
                                <h3 className="card-title">
                                    <i className="fas fa-cogs me-2 text-success"></i>
                                    Key Capabilities
                                </h3>
                                <ul className="list-unstyled">
                                    <li className="mb-2"><i className="fas fa-check-circle me-2 text-success"></i>Complete product lifecycle management</li>
                                    <li className="mb-2"><i className="fas fa-check-circle me-2 text-success"></i>Real-time inventory tracking</li>
                                    <li className="mb-2"><i className="fas fa-check-circle me-2 text-success"></i>Automated sales processing</li>
                                    <li className="mb-2"><i className="fas fa-check-circle me-2 text-success"></i>Low stock alerts and notifications</li>
                                    <li className="mb-2"><i className="fas fa-check-circle me-2 text-success"></i>Comprehensive search and filtering</li>
                                    <li className="mb-2"><i className="fas fa-check-circle me-2 text-success"></i>Secure user authentication</li>
                                    <li className="mb-2"><i className="fas fa-check-circle me-2 text-success"></i>Mobile-responsive design</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', backdropFilter: 'blur(10px)' }}>
                            <div className="card-body text-white">
                                <h3 className="card-title text-center mb-4">
                                    <i className="fas fa-star me-2 text-warning"></i>
                                    Core Features & Functionality
                                </h3>
                                
                                <div className="row">
                                    <div className="col-lg-4 mb-4">
                                        <div className="feature-box text-center p-3">
                                            <div className="feature-icon mb-3">
                                                <i className="fas fa-shield-alt fa-3x text-primary"></i>
                                            </div>
                                            <h5>Secure Authentication</h5>
                                            <p className="small">
                                                JWT-based authentication system with encrypted passwords, user registration with shop details, 
                                                and protected routes to ensure data security and user privacy.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 mb-4">
                                        <div className="feature-box text-center p-3">
                                            <div className="feature-icon mb-3">
                                                <i className="fas fa-database fa-3x text-info"></i>
                                            </div>
                                            <h5>Product Management</h5>
                                            <p className="small">
                                                Complete CRUD operations for products including detailed information management, 
                                                categorization, barcode tracking, and bulk operations for efficient inventory control.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 mb-4">
                                        <div className="feature-box text-center p-3">
                                            <div className="feature-icon mb-3">
                                                <i className="fas fa-chart-line fa-3x text-success"></i>
                                            </div>
                                            <h5>Sales Processing</h5>
                                            <p className="small">
                                                Automated sales transactions with real-time stock deduction, quantity validation, 
                                                sales confirmation messages, and automatic low-stock alerts when thresholds are reached.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 mb-4">
                                        <div className="feature-box text-center p-3">
                                            <div className="feature-icon mb-3">
                                                <i className="fas fa-search fa-3x text-warning"></i>
                                            </div>
                                            <h5>Advanced Search</h5>
                                            <p className="small">
                                                Powerful search functionality allowing users to find products by name, category, barcode, 
                                                or any combination of criteria with real-time filtering and sorting options.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 mb-4">
                                        <div className="feature-box text-center p-3">
                                            <div className="feature-icon mb-3">
                                                <i className="fas fa-tachometer-alt fa-3x text-danger"></i>
                                            </div>
                                            <h5>Analytics Dashboard</h5>
                                            <p className="small">
                                                Comprehensive dashboard with real-time statistics, inventory valuation, low stock monitoring, 
                                                and key performance indicators to help make informed business decisions.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 mb-4">
                                        <div className="feature-box text-center p-3">
                                            <div className="feature-icon mb-3">
                                                <i className="fas fa-rupee-sign fa-3x text-light"></i>
                                            </div>
                                            <h5>Indian Rupee Support</h5>
                                            <p className="small">
                                                Native support for Indian currency (₹) throughout the application, making it perfect 
                                                for local businesses with proper formatting and currency calculations.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-md-6 mb-4">
                        <div className="card h-100" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', backdropFilter: 'blur(10px)' }}>
                            <div className="card-body text-white">
                                <h3 className="card-title">
                                    <i className="fas fa-code me-2 text-info"></i>
                                    Technology Stack
                                </h3>
                                <div className="row">
                                    <div className="col-6">
                                        <h6 className="text-warning">Frontend:</h6>
                                        <ul className="list-unstyled small">
                                            <li>• React 18</li>
                                            <li>• React Router</li>
                                            <li>• Modern CSS3</li>
                                            <li>• Font Awesome</li>
                                            <li>• Responsive Design</li>
                                        </ul>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="text-warning">Backend:</h6>
                                        <ul className="list-unstyled small">
                                            <li>• Node.js</li>
                                            <li>• Express.js</li>
                                            <li>• MongoDB</li>
                                            <li>• JWT Authentication</li>
                                            <li>• bcryptjs</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-4">
                        <div className="card h-100" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', backdropFilter: 'blur(10px)' }}>
                            <div className="card-body text-white">
                                <h3 className="card-title">
                                    <i className="fas fa-users me-2 text-success"></i>
                                    Who Can Use This?
                                </h3>
                                <ul className="list-unstyled">
                                    <li className="mb-2"><i className="fas fa-store me-2 text-success"></i>Small to medium retail businesses</li>
                                    <li className="mb-2"><i className="fas fa-warehouse me-2 text-success"></i>Warehouse management companies</li>
                                    <li className="mb-2"><i className="fas fa-shopping-cart me-2 text-success"></i>E-commerce businesses</li>
                                    <li className="mb-2"><i className="fas fa-industry me-2 text-success"></i>Manufacturing companies</li>
                                    <li className="mb-2"><i className="fas fa-truck me-2 text-success"></i>Distribution centers</li>
                                    <li className="mb-2"><i className="fas fa-home me-2 text-success"></i>Home-based businesses</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', backdropFilter: 'blur(10px)' }}>
                            <div className="card-body text-white text-center">
                                <h3 className="card-title">
                                    <i className="fas fa-lightbulb me-2 text-warning"></i>
                                    Why Choose Our System?
                                </h3>
                                <div className="row">
                                    <div className="col-md-3 mb-3">
                                        <i className="fas fa-clock fa-2x text-primary mb-2"></i>
                                        <h6>Real-Time Updates</h6>
                                        <p className="small">Get instant updates on inventory changes and stock levels</p>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <i className="fas fa-mobile-alt fa-2x text-success mb-2"></i>
                                        <h6>Mobile Friendly</h6>
                                        <p className="small">Access your inventory from any device, anywhere</p>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <i className="fas fa-lock fa-2x text-warning mb-2"></i>
                                        <h6>Secure & Reliable</h6>
                                        <p className="small">Enterprise-level security with data encryption</p>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <i className="fas fa-expand-arrows-alt fa-2x text-info mb-2"></i>
                                        <h6>Scalable Solution</h6>
                                        <p className="small">Grows with your business needs and requirements</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-5">
                    <div className="card" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', backdropFilter: 'blur(10px)' }}>
                        <div className="card-body text-white">
                            <h4 className="mb-3">
                                <i className="fas fa-handshake me-2 text-warning"></i>
                                Ready to Transform Your Inventory Management?
                            </h4>
                            <p className="lead mb-4">
                                Join thousands of businesses who have streamlined their operations with our comprehensive inventory management solution.
                            </p>
                            <div className="d-flex justify-content-center gap-3 flex-wrap">
                                <span className="badge bg-primary fs-6 p-2">
                                    <i className="fas fa-check me-1"></i> Easy to Use
                                </span>
                                <span className="badge bg-success fs-6 p-2">
                                    <i className="fas fa-check me-1"></i> Secure
                                </span>
                                <span className="badge bg-warning fs-6 p-2">
                                    <i className="fas fa-check me-1"></i> Scalable
                                </span>
                                <span className="badge bg-info fs-6 p-2">
                                    <i className="fas fa-check me-1"></i> Modern
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
