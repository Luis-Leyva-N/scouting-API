// Needed Imports:
const db = require("../database/db");
const firestore = require("firebase/firestore");

class MainController {
    // Get Total Number of matches
    async getMatchNumbers(req, res) {
        try {
            const docRef = db.collection("Matches").doc("MatchCounter");
            const doc = await docRef.get();
            const count = doc.data();
            res.json({ count: count.Count });
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    // Update Matches Count And Information
    async postUpdateMatches(req, res) {
        try {
            req.body.forEach((element) => {
                db.collection("Matches")
                    .doc(element.comp_level + "-" + element.match_number)
                    .set({
                        match_number: element.match_number,
                        // alliances: element.alliances,
                        // alliances:
                    });
            });

            const docRef = db.collection("Matches").doc("MatchCounter");
            await docRef.update({ Count: req.body.length });
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }
    // async getTeamNumbers(req, res) {}
}

const eventController = new MainController();
module.exports = eventController;
