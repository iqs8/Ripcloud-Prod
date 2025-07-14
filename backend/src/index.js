import express from "express";
import dotenv from "dotenv"
import { clerkMiddleware } from '@clerk/express'
import fileUpload from "express-fileupload"
import path from "path"
import cors from "cors"
import cron from "node-cron";

import userRoutes from "./routes/user.route.js"
import adminRoutes from "./routes/admin.route.js"
import authRoutes from "./routes/auth.route.js"
import songRoutes from "./routes/song.route.js"
import albumRoutes from "./routes/album.route.js"
import statRoutes from "./routes/stat.route.js"
import { connectDB } from "./lib/db.js"

dotenv.config();

const app = express();
const __dirname = path.resolve()
const PORT = process.env.PORT;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(express.json())  //for parsing json data
app.use(clerkMiddleware())  //for auth on req obj => req.auth.userId
app.use(fileUpload ({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limit: {
        fileSize: 10 * 1024 * 1024,
    },
}))

// cron jobs
const tempDir = path.join(process.cwd(), "tmp");
cron.schedule("0 * * * *", () => {
	if (fs.existsSync(tempDir)) {
		fs.readdir(tempDir, (err, files) => {
			if (err) {
				console.log("error", err);
				return;
			}
			for (const file of files) {
				fs.unlink(path.join(tempDir, file), (err) => {});
			}
		});
	}
});

app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/songs', songRoutes)
app.use('/api/albums', albumRoutes)
app.use('/api/stats', statRoutes)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
	});
}

//error handler
app.use((err, req, res, next) => {
    if (res.headersSent) {
        // Let Express handle the error (logging, closing connection, etc.)
        return next(err);
    }
    // Safe to send your error response
    else {res.status(500).json({ message: "Internal server error" })
    };
});

app.listen(5000, () =>{
    console.log("server is listening in port 5000")
    connectDB();
})