// Needed Imports:
const db = require("../database/db");

class MainController {
    // Get Matches For Event
    async getMatches(req, res) {
        try {
            const docRef = db.collection("Matches");
            let response = [];
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
}

const matchesController = new MainController();
module.exports = matchesController;
