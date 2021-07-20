import { createUser, findByEmail } from '../repositories/userRepositories.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function authenticateSignUp(email, name, password){
    const existingUserWithGivenEmail = await findByEmail(email);

    if (existingUserWithGivenEmail) {
      return null;
    }
    
    const hashedPassword = bcrypt.hashSync(password, 12);

    await createUser(name, email, hashedPassword);
}

async function authenticateSignIn(email, password){
    const user = await findByEmail(email)

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return null;
    }

    const token = jwt.sign({
      id: user.id
    }, process.env.JWT_SECRET);

    return token;
}

export { authenticateSignIn, authenticateSignUp };