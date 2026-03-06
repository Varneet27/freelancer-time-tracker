require("dotenv").config();

const connectDB = require("./src/config/db");

const Client = require("./src/models/Client.model");
const Project = require("./src/models/Project.model");
const Invoice = require("./src/models/Invoice.model");
const TimeLog = require("./src/models/TimeLog.model");

(async () => {
  try {
    await connectDB();
    console.log("Connected to DB");

    await Client.deleteMany({});
    await Project.deleteMany({});
    await Invoice.deleteMany({});
    await TimeLog.deleteMany({});

    console.log(
      "Polluted collections cleared (clients, projects, invoices, timelogs)"
    );
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
