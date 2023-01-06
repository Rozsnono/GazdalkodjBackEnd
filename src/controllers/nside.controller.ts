import { Request, Response, Router } from "express";
import Controller from "../interfaces/controller.interface";
import nsideModel from "./nside.model";
import onesideModel from "./oneside.model";
import linkModel from "./link.model";
import youtubeLink from "./youtubeLink.model";
import machineModel from "./machine.model";
import pagesModel from "./pages.model";
import userModel from "./user.model";


export default class nsideController implements Controller {
    public path = "/api/xyz";
    public router = Router();
    private nsideM = nsideModel;
    private onesideM = onesideModel;
    private linkM = linkModel;
    private machineM = machineModel;
    private ylM = youtubeLink;
    private page = pagesModel;
    private userM = userModel;

    constructor() {
        this.router.get("/", (req: Request, res: Response) => {
            res.send("MEGY!");
        });

        this.router.get("/turn", this.getTurn);
        this.router.get("/user", this.getUsers);

        this.router.post("/card", this.addCard);
        this.router.post("/card", this.getCard);
        this.router.post("/user", this.newUser);
        this.router.post("/turn", this.firstTurn);

        this.router.put("/user/:id", this.modifyUser);
        this.router.put("/turn/:id", this.nextTurn);

        this.router.delete("/user/:id", this.deleteUser);
        this.router.delete("/turn/:id", this.deleteTurn);

        
        // this.router.get("/api/alldates", this.getAll);
        // this.router.post("/api/dates",this.getFutureDates)
        // this.router.get("/api/links", this.getAllLink);
		// this.router.get("/api/links/:id", this.getLinkById);
        // this.router.get("/api/machines", this.getAllMachine);
        // this.router.get("/api/dates/:id", this.getById);
		// this.router.get("/api/games", this.getAllGames);
        // this.router.get("/api/games/:id", this.getByIdGame);
        // this.router.get("/api/youtube", this.getAllYoutubeLink);
        // this.router.get("/api/youtube/:name", this.getYoutubeLinkByName);
        // this.router.get("/api/pages", this.getAllPage);


        // this.router.post("/api/date", this.create);
        // this.router.post("/api/game", this.createGame);
        // this.router.post("/api/link", this.createLink);
        // this.router.post("/api/machine", this.createMachine);
        // this.router.post("/api/youtube", this.createYoutube);
        // this.router.post("/api/page", this.createPage);
        
        // this.router.post("/login", this.login);
        // this.router.post("/register", this.register);

        // this.router.put("/api/date/:id", this.modifyPUTdate);
		// this.router.put("/api/game/:id", this.modifyPUTgame);
        // this.router.put("/api/link/:id", this.modifyPUTlink);
        // this.router.put("/api/machine/:id", this.modifyPUTmachine);
        // this.router.put("/api/page/:id", this.modifyPUTpage);
        // this.router.put("/api/youtube/:id", this.modifyPUTyoutube);

        // this.router.delete("/api/dates/:id", this.delete);
        // this.router.delete("/api/games/:id", this.deleteGame);
        // this.router.delete("/api/youtube/:id", this.deleteYoutube);
    }

    private getTurn = async (req: Request, res: Response) => {
        try {
            const data = await this.nsideM.find();
            res.send(data);
        } catch (error) {
            res.status(400).send(error.message);
        }
    };
    private getUsers = async (req: Request, res: Response) => {
        try {
            const data = await this.onesideM.find();
            res.send(data);
        } catch (error) {
            res.status(400).send(error.message);
        }
    };
    private addCard = async (req: Request, res: Response) => {
        try {
            const body = req.body;
            const createdDocument = new this.page({
                ...body,
            });
            const savedDocument = await createdDocument.save();
            res.send(savedDocument);
        } catch (error) {
            res.status(400).send(error.message);
        }
    };
    private getCard = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const body = req.body;
            const modificationResult = await this.page.replaceOne({ _id: id }, body, { runValidators: true });
            if (modificationResult.modifiedCount) {
                const updatedDoc = await this.page.findById(id);
                res.send(updatedDoc);
            } else {
                res.status(404).send(`Document with id ${id} not found!`);
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    };
    private newUser = async (req: Request, res: Response) => {
        try {
            const body = req.body;
            const createdDocument = new this.onesideM({
                ...body,
            });
            const savedDocument = await createdDocument.save();
            res.status(200);
        } catch (error) {
            res.status(400).send(error.message);
        }
    };
    private firstTurn = async (req: Request, res: Response) => {
        try {
            const body = req.body;
            const createdDocument = new this.nsideM({
                ...body,
            });
            const savedDocument = await createdDocument.save();
            res.status(200);
        } catch (error) {
            res.status(400).send(error.message);
        }
    };
    private modifyUser = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const body = req.body;
            const modificationResult = await this.onesideM.replaceOne({ _id: id }, body, { runValidators: true });
            if (modificationResult.modifiedCount) {
                const updatedDoc = await this.onesideM.findById(id);
                res.send(updatedDoc);
            } else {
                res.status(404).send(`Document with id ${id} not found!`);
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    };
    private nextTurn = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const body = req.body;
            const modificationResult = await this.nsideM.replaceOne({ _id: id }, body, { runValidators: true });
            if (modificationResult.modifiedCount) {
                const updatedDoc = await this.nsideM.findById(id);
                res.send(updatedDoc);
            } else {
                res.status(404).send(`Document with id ${id} not found!`);
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    };
    private deleteUser = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const successResponse = await this.onesideM.findByIdAndDelete(id);
            if (successResponse) {
                res.status(200).send('OK');
            } else {
                res.status(404).send(`Document with id ${id} not found!`);
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    };
    private deleteTurn = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const successResponse = await this.nsideM.findByIdAndDelete(id);
            if (successResponse) {
                res.status(200).send('OK');
            } else {
                res.status(404).send(`Document with id ${id} not found!`);
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    };

}
