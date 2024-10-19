import express, { Request, Response } from 'express'
import FinancialRecordModel from "../schema/financial-record"

const router = express.Router()

// Backend Ready!!!

// Root endpoint message
router.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello Shubham");
});

// Get All User By Id
router.get("/getAllByUserId/:userId", async(req:Request, res:Response) => {
    try{
        const userId = req.params.userId
        const records = await FinancialRecordModel.find({userId: userId})
        if(records.length == 0){
            res.status(404).send("No records found for the user.")
        }
        res.status(200).send(records)
    }catch(error){
        res.status(500).send(error)
    }
})

// Post
router.post("/", async(req:Request, res:Response) => {
    try{
        const newRecordBody = req.body
        const newRecord = new FinancialRecordModel(newRecordBody)
        const savedRecord = await newRecord.save()
        res.status(200).send(savedRecord)
    }catch(error){
        res.status(500).send(error)
    }
})

// Put/Update
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const newRecordBody = req.body;
        const record = await FinancialRecordModel.findByIdAndUpdate(id, newRecordBody, { new: true });
        if (!record)  res.status(404).send();
        res.status(200).send(record);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete Record
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const record = await FinancialRecordModel.findByIdAndDelete(id);
        if (!record)  res.status(404).send();
        res.status(200).send(record);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router