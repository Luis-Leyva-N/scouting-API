// Needed Imports:
const db = require("../database/db");

class MainController {
    // Get Matches For Event
    async getMatches(req, res) {
        try {
            const docRef = db.collection("Matches");
            const response = [];
            await docRef.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().match_number) {
                        response.push(doc.data().match_number);
                    }
                });
            });
            res.send(response);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    // Get Matches Teams
    async getMatchesTeams(req, res) {
        try {
            const response = [];
            const redRef = db
                .collection("Matches")
                .doc(req.body.match_number)
                .collection("Red");
            const blueRef = db
                .collection("Matches")
                .doc(req.body.match_number)
                .collection("Blue");
            await redRef.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    response.push(doc.data().team);
                });
            });
            await blueRef.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    response.push(doc.data().team);
                });
            });
            res.send(response);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }
}

const matchesController = new MainController();
module.exports = matchesController;
