"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routerAlbuns_1 = require("./router/routerAlbuns");
const routerArtists_1 = require("./router/routerArtists");
const routerMusics_1 = require("./router/routerMusics");
const routerUsers_1 = require("./router/routerUsers");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.use("/albums", routerAlbuns_1.albumRouter);
app.use("/artists", routerArtists_1.artistRouter);
app.use("/musics", routerMusics_1.musicRouter);
app.use("/user", routerUsers_1.userRouter);
