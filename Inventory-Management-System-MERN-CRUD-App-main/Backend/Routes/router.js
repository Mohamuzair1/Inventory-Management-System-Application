const express = require('express');
const router = express.Router();
const products = require('../Models/Products');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');

// JWT Secret (in production, use environment variable)
const JWT_SECRET = 'your-secret-key';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// User Registration
router.post("/register", async (req, res) => {
    const { username, email, password, shopName, firstName, lastName } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(422).json({ message: "User already exists with this email or username" });
        }

        const newUser = new User({
            username,
            email,
            password,
            shopName,
            firstName,
            lastName
        });

        await newUser.save();
        
        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id, username: newUser.username, shopName: newUser.shopName },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({ 
            message: "User registered successfully",
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                shopName: newUser.shopName,
                firstName: newUser.firstName,
                lastName: newUser.lastName
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error during registration" });
    }
});

// User Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username, shopName: user.shopName },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                shopName: user.shopName,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error during login" });
    }
});

//Inserting(Creating) Data:
router.post("/insertproduct", authenticateToken, async (req, res) => {
    const { ProductName, ProductPrice, ProductBarcode, ProductQuantity, ProductCategory, ProductDescription, LowStockThreshold } = req.body;

    try {
        const pre = await products.findOne({ ProductBarcode: ProductBarcode })
        console.log(pre);

        if (pre) {
            res.status(422).json("Product is already added.")
        }
        else {
            const addProduct = new products({ 
                ProductName, 
                ProductPrice, 
                ProductBarcode, 
                ProductQuantity: ProductQuantity || 0,
                ProductCategory,
                ProductDescription: ProductDescription || '',
                LowStockThreshold: LowStockThreshold || 10
            })

            await addProduct.save();
            res.status(201).json(addProduct)
            console.log(addProduct)
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" });
    }
})

//Getting(Reading) Data:
router.get('/products', authenticateToken, async (req, res) => {
    try {
        const getProducts = await products.find({})
        console.log(getProducts);
        res.status(201).json(getProducts);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
})

//Getting(Reading) individual Data:
router.get('/products/:id', authenticateToken, async (req, res) => {
    try {
        const getProduct = await products.findById(req.params.id);
        console.log(getProduct);
        res.status(201).json(getProduct);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
})

//Editing(Updating) Data:
router.put('/updateproduct/:id', authenticateToken, async (req, res) => {
    const { ProductName, ProductPrice, ProductBarcode, ProductQuantity, ProductCategory, ProductDescription, LowStockThreshold } = req.body;

    try {
        const updateProducts = await products.findByIdAndUpdate(
            req.params.id, 
            { ProductName, ProductPrice, ProductBarcode, ProductQuantity, ProductCategory, ProductDescription, LowStockThreshold }, 
            { new: true }
        );
        console.log("Data Updated");
        res.status(201).json(updateProducts);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
})

// Sale Product (subtract quantity)
router.put('/saleproduct/:id', authenticateToken, async (req, res) => {
    const { quantitySold } = req.body;

    try {
        const product = await products.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.ProductQuantity < quantitySold) {
            return res.status(400).json({ 
                message: "Insufficient quantity", 
                availableQuantity: product.ProductQuantity 
            });
        }

        const newQuantity = product.ProductQuantity - quantitySold;
        const updatedProduct = await products.findByIdAndUpdate(
            req.params.id,
            { ProductQuantity: newQuantity },
            { new: true }
        );

        let message = `Sale completed! ${quantitySold} units sold.`;
        
        if (newQuantity <= updatedProduct.LowStockThreshold) {
            message += ` Warning: Low stock! Only ${newQuantity} units left.`;
        } else {
            message += ` ${newQuantity} units remaining.`;
        }

        res.status(200).json({
            message,
            product: updatedProduct,
            lowStock: newQuantity <= updatedProduct.LowStockThreshold
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
})

//Deleting Data:
router.delete('/deleteproduct/:id', authenticateToken, async (req, res) => {
    try {
        const deleteProduct = await products.findByIdAndDelete(req.params.id);
        console.log("Data Deleted");
        res.status(201).json(deleteProduct);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
})

// Get low stock products
router.get('/lowstock', authenticateToken, async (req, res) => {
    try {
        const lowStockProducts = await products.find({
            $expr: { $lte: ["$ProductQuantity", "$LowStockThreshold"] }
        });
        res.status(200).json(lowStockProducts);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
})

module.exports = router;