import { authenticateFinancialEvent, authenticateFinancialEventsList } from '../services/financialServices.js';

async function createFinancialEvent(req, res){
    try {
        const authorization = req.headers.authorization || "";
        const token = authorization.split('Bearer ')[1];

        if (!token) {
            return res.sendStatus(401);
        }
    
        const id = await authenticateFinancialEventsList(token, 'create');
        if(id === null) return res.sendStatus(401);
    
        const { value, type } = req.body;
    
        if (!value || !type) return res.sendStatus(400);
    
        const authenticate = await authenticateFinancialEvent (value, type, id)
        if(authenticate === null) return res.sendStatus(400);
    
        res.sendStatus(201);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
}

async function listFinancialEvents(req, res){
    try {
        const authorization = req.headers.authorization || "";
        const token = authorization.split('Bearer ')[1];

        if (!token) {
            return res.sendStatus(401);
        }
    
        const events = await authenticateFinancialEventsList(token, 'list');
        if(events === null) return res.sendStatus(401);
    
        res.send(events);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
}

async function sumFinancialEvents(req, res){
    try {
        const authorization = req.headers.authorization || "";
        const token = authorization.split('Bearer ')[1];

        if (!token) {
            return res.sendStatus(401);
        }
    
        const events = await authenticateFinancialEventsList(token, 'list');
        if(events === null) return res.sendStatus(401);
    
        const sum = events.reduce((total, event) => event.type === 'INCOME' ? total + event.value : total - event.value, 0);
    
        res.send({ sum });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export { createFinancialEvent, listFinancialEvents, sumFinancialEvents }