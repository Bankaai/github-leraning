const app = require('./Middlewares/1-request-Count'); // Adjust path if needed

const port = 3000;

app.listen(port, () => {
    console.log("Server created successfully!");
});
