// Needed Imports:
const db = require("../database/db");
const firestore = require("firebase/firestore");

class MainController {
    async getAllEvents(req, res) {
        try {
            res.json({ existe: "Gello" });
            // app.get('/hello-world', (req, res) => {
            //     return res.status(200).send('Hello World!');
            //   });
        } catch (error) {
            res.status(500);
            res.json(error.message);
        }
    }
}

const eventController = new MainController();
module.exports = eventController;
