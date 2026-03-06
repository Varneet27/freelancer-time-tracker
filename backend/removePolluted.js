require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./src/config/db");

(async () => {
  await connectDB();

  const db = mongoose.connection.db;

  await db.collection("clients").deleteMany({ userId: { $exists: false } });
  await db.collection("projects").deleteMany({ userId: { $exists: false } });
  await db.collection("time").deleteMany({ userId: { $exists: false } });
  await db.collection("invoices").deleteMany({ userId: { $exists: false } });

  console.log("Polluted documents removed");
  process.exit();
})();
