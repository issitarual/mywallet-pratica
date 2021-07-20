import express from "express";
import cors from "cors";

import { signIn, signUp } from "./controllers/userController.js";
import { createFinancialEvent, listFinancialEvents, sumFinancialEvents } from "./controllers/financialControlers.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", signUp);

app.post("/sign-in", signIn);

app.post("/financial-events", createFinancialEvent);

app.get("/financial-events", listFinancialEvents);

app.get("/financial-events/sum", sumFinancialEvents);

export default app;
