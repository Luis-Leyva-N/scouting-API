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
                empiezaPelota: req.body.matchData.empiezaPelota,
                mueveAutonomo: req.body.matchData.mueveAutonomo,
                cantidadAutonomo: req.body.matchData.cantidadAutonomo,
                anotaPelotasAutonomo: req.body.matchData.anotaPelotasAutonomo,
                dondeAnotaAutonomo: req.body.matchData.dondeAnotaAutonomo,
                mueveTeleoperado: req.body.matchData.mueveTeleoperado,
                disparaTeleoperado: req.body.matchData.disparaTeleoperado,
                cantidadDisparosTeleoperado:
                    req.body.matchData.cantidadDisparosTeleoperado,
                anotaTeleoperadoArriba:
                    req.body.matchData.anotaTeleoperadoArriba,
                anotaTeleoperadoAbajo: req.body.matchData.anotaTeleoperadoAbajo,
                escala: req.body.matchData.escala,
                nivelAvance: req.body.matchData.nivelAvance,
                team: req.body.teamId,
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
            const data = doc.docs.map((doc) => doc.data().id);
            const matches = [];
            for (let index = 0; index < data.length; index++) {
                const temp = await data[index].get();
                matches.push(temp.data());
            }
            res.send(matches);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }
}

const teamsController = new MainController();
module.exports = teamsController;
