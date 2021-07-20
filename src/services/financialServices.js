import { financialEventsList, createFinancialEvent } from '../repositories/financialRepositories.js';
import jwt from "jsonwebtoken";

async function authenticateFinancialEventsList(token,type){
    let user;

    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return null;
    }

    const events = await financialEventsList(user.id);

    if(type === 'list') return events;
    else if(type === 'create') return user.id;
}

async function authenticateFinancialEvent(value, type, id){
    if (!['INCOME', 'OUTCOME'].includes(type)) {
        return null
    }
  
    if (value < 0) {
        return null
    }
  
    await createFinancialEvent(id, value, type)
}

export { authenticateFinancialEventsList, authenticateFinancialEvent };