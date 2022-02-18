// Libraries needed:
const express = require("express");

// Controllers imports:
const eventController = require("../controllers/eventController");
const teamsController = require("../controllers/teamsController");
const matchesController = require("../controllers/matchesController");

// Initialize Express Router:
const router = express.Router();

// Methods:
router.get("/api/matchNumbers", eventController.getMatchNumbers);
router.post("/api/updateMatches", eventController.postUpdateMatches);

// Export Router:
module.exports = router;
