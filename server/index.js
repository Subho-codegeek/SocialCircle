import express from "express";
import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";
import commentRouter from "./routes/comments.js";
import likeRouter from "./routes/likes.js";
import authRouter from "./routes/auth.js";
import relationshipRoutes from "./routes/relationships.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";


const app = express();

//middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hi");
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/public/upload");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage });

//routes
app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/likes", likeRouter);
app.use("/api/relationships", relationshipRoutes);

//connection
app.listen(8000, () => {
    console.log("Server connected");
})