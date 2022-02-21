// Needed Imports:
const db = require("../database/db");

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
                    });

                element.alliances.red_team_keys.forEach((subElement) => {
                    db.collection("Matches")
                        .doc(element.comp_level + "-" + element.match_number)
                        .collection("Red")
                        .doc(subElement)
                        .set({
                            team: subElement,
                        });

                    const id = db
                        .collection("Matches")
                        .doc(element.comp_level + "-" + element.match_number)
                        .collection("Red")
                        .doc(subElement);

                    db.collection("Teams")
                        .doc(subElement)
                        .collection("Matches")
                        .doc(element.comp_level + "-" + element.match_number)
                        .set({
                            id: id,
                        });
                });

                element.alliances.blue_team_keys.forEach((subElement) => {
                    db.collection("Matches")
                        .doc(element.comp_level + "-" + element.match_number)
                        .collection("Blue")
                        .doc(subElement)
                        .set({
                            team: subElement,
                        });

                    const id = db
                        .collection("Matches")
                        .doc(element.comp_level + "-" + element.match_number)
                        .collection("Blue")
                        .doc(subElement);

                    db.collection("Teams")
                        .doc(subElement)
                        .collection("Matches")
                        .doc(element.comp_level + "-" + element.match_number)
                        .set({
                            id: id,
                        });
                });
            });

            const docRef = db.collection("Matches").doc("MatchCounter");
            await docRef.update({ Count: req.body.length });
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    // Update Teams Count And Information
    async postUpdateTeams(req, res) {
        try {
            req.body.forEach((element) => {
                db.collection("Teams").doc(element.key).set({
                    number: element.team_number,
                    name: element.name,
                });
            });
            const docRef = db.collection("Teams").doc("TeamsCounter");
            await docRef.update({ Count: req.body.length });
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }
}

const eventController = new MainController();
module.exports = eventController;
