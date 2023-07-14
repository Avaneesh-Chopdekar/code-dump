"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const Document_1 = __importDefault(require("./models/Document"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(express_1.default.static("public"));
app.use(express_1.default.urlencoded({ extended: true }));
mongoose_1.default.connect(process.env.MONGO_URI || "");
app.get("/", (req, res) => {
    const code = `Welcome to Code Dump!

Use the commands in the top right corner
to create a new file to share with others. 
`;
    res.render("code-display", {
        code,
        lineNumbers: code.split("\n").length,
        language: "language-plaintext",
    });
});
app.get("/new", (req, res) => {
    res.render("new");
});
app.post("/save", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { value } = req.body;
    try {
        const document = yield Document_1.default.create({ value });
        res.redirect(`/${document._id}`);
    }
    catch (error) {
        res.render("new", { value });
    }
}));
app.get("/:id/duplicate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const document = yield Document_1.default.findById(id);
        res.render("new", { value: document.value });
    }
    catch (error) {
        res.redirect(`/${id}`);
    }
}));
app.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const document = yield Document_1.default.findById(id);
        const code = document.value;
        res.render("code-display", {
            code,
            lineNumbers: code.split("\n").length,
            id,
        });
    }
    catch (error) {
        res.redirect("/");
    }
}));
app.listen(port, () => {
    console.log("Code Dump listening on port " + port);
});
exports.default = app;
