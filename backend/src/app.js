const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db');
connectDB();

const authRoutes = require('./routes/auth.routes');
const clientRoutes = require('./routes/client.routes');
const projectRoutes = require('./routes/project.routes');
const timeRoutes = require('./routes/time.routes');
const invoiceRoutes = require('./routes/invoice.routes');
const dashboardRoutes = require("./routes/dashboard.routes");



const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/time', timeRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;


