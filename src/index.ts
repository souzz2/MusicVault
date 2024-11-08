import express from "express";
import cors from "cors";
//mport routerAlbuns from "./albuns/routerAlbuns";
//import routerMusics from "./musics/routerMusics"

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

//app.use("/albuns", routerAlbuns);
//app.use("/musics", routerMusics)