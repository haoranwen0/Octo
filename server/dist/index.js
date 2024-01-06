"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagram_1 = __importDefault(require("./routes/diagram"));
const diagram_v2_1 = __importDefault(require("./routes/diagram-v2"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
dotenv_1.default.config();
// Cor middleware allowing all origin access
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Initialize routes
app.use('/diagram', diagram_1.default);
app.use('/diagram-v2', diagram_v2_1.default);
app.get('/', (req, res) => {
    res.status(200).send('Connected!');
});
// Get env variables
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
exports.default = app;
