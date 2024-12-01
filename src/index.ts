import express from "express";
import cors from "cors";
import { albumRouter } from "./router/routerAlbuns";
import { artistRouter } from "./router/routerArtists";
import { musicRouter } from "./router/routerMusics";
import { userRouter } from "./router/routerUsers";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.use("/albums", albumRouter);
app.use("/artists", artistRouter);
app.use("/musics", musicRouter);
app.use("/", userRouter);
