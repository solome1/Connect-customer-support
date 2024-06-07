const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./app/middlewares/error.middleware.js');
const app = express();

var corsOptions = {
  origin: "*"
};

// Set up MongoDB connection using Mongoose
const db = require('./app/models');
db.mongoose
 .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
 .then(() => {
    console.log('Connected to the database');
  })
 .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

// Enable CORS
app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to BezKoder application.' });
});

// Company routes
const companyRoutes = require('./app/routes/company.routes.js');
app.use('/', companyRoutes);

// Organization routes
const organizationRoutes = require('./app/routes/organization.routes.js');
app.use('/', organizationRoutes);


const customerRoutes = require('./app/routes/customer.routes.js');
app.use('/', customerRoutes);

const agentRoutes = require('./app/routes/agent.routes.js');
app.use('/', agentRoutes);

// Set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Error handling middleware
app.use(errorHandler);