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

//post para fazer login

/*
app.get("/search", async (req, res) => {
  const name = req.query.name?.toString().toLowerCase();
  try {
    if (!name) {
      throw new Error('O parâmetro de busca "name" é obrigatório.');
    }

    const [musics, albums, artists] = await Promise.all([
      searchMusicByName(name),
      searchAlbumsByName(name),
      searchArtistsByName(name),
    ]);

    if (!musics.length && !albums.length && !artists.length) {
      throw new Error("Nenhuma música, álbum ou artista foi encontrada.");
    }

    res.status(200).json({ musics, albums, artists });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar música, álbum ou artista", error });
  }
});*/

app.use("/albums", albumRouter);
app.use("/artists", artistRouter);
app.use("/musics", musicRouter);
app.use("/user", userRouter);
