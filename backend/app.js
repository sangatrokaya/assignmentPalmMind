import express from "express";
import notFoundHandler from "./middlewares/notFound.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";
import logger from "./middlewares/logger.middleware.js";

// routers import
import userRouter from "./routes/user.router.js";

// Initialize express app
const app = express();

// middlewares
app.use(express.json());
app.use(logger);

// routes
app.use("/api/v1/users", userRouter);

// error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
