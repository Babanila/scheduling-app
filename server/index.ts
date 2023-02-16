import express from "express";
import dotenv from "dotenv";
import cors from "cors";

interface DatabaseTypes {
    id: string;
    username: string;
    password: string;
    email: string;
    timezone: {};
    schedule: any[];
};

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const database: DatabaseTypes[] = [];
const generateID = () => Math.random().toString(36).substring(2, 10);

app.get('/', (req, res) => {
    res.send('Express + TypeScript Server Running');
});

app.post("/register", (req, res) => {
    const { username, email, password } = req.body;

    let result = database.filter(
    (user) => user.email === email || user.username === username
    );

    if (result.length === 0) {
        database.push({
            id: generateID(),
            username,
            password,
            email,
            timezone: {},
            schedule: [],
        });

        return res.json({ message: "Account created successfully!" });
    };

    res.json({ error_message: "User already exists!" });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    let result = database.filter(
    (user) => user.username === username && user.password === password
    );

    if (result.length !== 1) {
        return res.json({
            error_message: "Incorrect credentials",
        });
    };

    res.json({
        message: "Login successfully",
        data: {
            _id: result[0].id,
            _email: result[0].email,
        },
    });
});

app.post("/schedule/create", (req, res) => {
    const { userId, timezone, schedule } = req.body;

    let result = database.filter((db) => db.id === userId);
    result[0].timezone = timezone;
    result[0].schedule = schedule;
    res.json({ message: "OK" });
});

app.get("/schedules/:id", (req, res) => {
    const { id } = req.params;
    let result = database.filter((db) => db.id === id);

    if (result.length === 1) {
        return res.json({
            message: "Schedules successfully retrieved!",
            schedules: result[0].schedule,
            username: result[0].username,
            timezone: result[0].timezone,
        });
    };

    return res.json({ error_message: "Sign in again, an error occured..." });
});

app.post("/schedules/:username", (req, res) => {
    const { username } = req.body;
    let result = database.filter((db) => db.username === username);

    if (result.length === 1) {
        const scheduleArray = result[0].schedule;
        const filteredArray = scheduleArray.filter((sch) => sch?.startTime !== "");

        return res.json({
            message: "Schedules successfully retrieved!",
            schedules: filteredArray,
            timezone: result[0].timezone,
            receiverEmail: result[0].email,
        });
    };

    return res.json({ error_message: "User doesn't exist" });
});

console.log("database", database);

app.listen(PORT, () => {
    console.log(`⚡⚡⚡ Server is running here 👉 at http://localhost:${PORT}`);
});