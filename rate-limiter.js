const express = require('express');
const app = express();

let requestCount = 0;
const requestLimit = 5;
const resetInterval = 5000; // 5 seconds
                            // time after which the clock resets and limiter can be used again

// Middleware to count requests
const requestCounter = (req, res, next) => {
    requestCount++;
    next(); // Pass control to the next middleware or route handler
};

// Middleware to block requests if limit is reached
const rateLimiter = (req, res, next) => {
    if (requestCount > requestLimit) {
        res.status(429).send('Rate limit exceeded. Try again later.');
    } else {
        next(); // Allow request if within limit
    }
};

// Setup request count reset interval
const resetRequestCounter = () => {
    setInterval(() => {
        requestCount = 0; // Reset global request count
    }, resetInterval);
};

// Apply middlewares
app.use(requestCounter); // Track the count of requests
app.use(rateLimiter);   // Limit access if count exceeds limit

// Start request count reset process
resetRequestCounter();

// Define routes
app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});

app.get('/block-this-request', (req, res) => {
    res.send('This route has rate limiting.');
});

module.exports = app; // Export the app
