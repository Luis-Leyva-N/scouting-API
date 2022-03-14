const db = require("../database/db");

class MainController {
    // Update team match results
    async updateTeamResults(req, res) {
        try {
            const docRef = db
                .collection("Teams")
                .doc(req.body.teamId)
                .collection("Matches")
                .doc(req.body.matchId);
            const doc = await docRef.get();
            const data = doc.data();
            const matchRef = data.id;
            matchRef.update({
                empiezaPelota: req.body.empiezaPelota,
                mueveAutonomo: req.body.mueveAutonomo,
                disparaAutonomo: req.body.disparaAutonomo,
                anotaAutonomo: req.body.anotaAutonomo,
                anotaPelotasAutonomo: req.body.anotaPelotasAutonomo,
                humanPlayerAnota: req.body.humanPlayerAnota,
                mueveTeleoperado: req.body.mueveTeleoperado,
                disparaTeleoperado: req.body.disparaTeleoperado,
                anotaTeleoperadoArriba: req.body.anotaTeleoperadoArriba,
                anotaTeleoperadoAbajo: req.body.anotaTeleoperadoAbajo,
                escala: req.body.escala,
                nivelAvance: req.body.nivelAvance,
            });
            res.json({ message: "ok" });
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    // Get teams
    async getTeams(req, res) {
        try {
            const docRef = db.collection("Teams");
            const doc = await docRef.get();
            const data = doc.docs.map((doc) => doc.data());
            res.json(data);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    // Get team matches
    async getTeamMatches(req, res) {
        try {
            const docRef = db
                .collection("Teams")
                .doc(req.body.teamId)
                .collection("Matches");
            const doc = await docRef.get();
            const data = doc.docs.map((doc) => doc.data());
            const result = [];
            const matches = data.map((match) =>
                match.id.get().then((doc) => {
                    const datas = doc.data();
                    result.push(datas);
                })
            );

            console.log(result);
            res.json(matches);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }
}

const teamsController = new MainController();
module.exports = teamsController;
