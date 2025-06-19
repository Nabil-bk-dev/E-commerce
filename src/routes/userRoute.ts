import express from 'express';
import { login, register } from '../services/userService';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const result = await register({ firstName, lastName, email, password });
        console.log("Register result:", result); // ← Ajoute ce log
        res.status(result.statusCode).send(result.data);
    } catch (err: any) {
        console.error("Erreur dans /register:", err); // ← Très important
        res.status(500).send("Something went wrong");
    }
});

router.post('/login', async (req,res) => {
    try{
        const {email,password} = req.body;
        const result = await login({email,password});
        res.status(result.statusCode).send(result.data);
    }catch(err){
        res.status(500).send("something went wrong");
    }
})

export default router;