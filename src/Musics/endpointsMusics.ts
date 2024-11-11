import { Request, Response } from "express";
import {
  getMusics as getMusicsData,
  findMusicById as findMusicByIdData,
  searchMusicByName as getMusicsByName,
  addMusics as addMusic
} from "../data/dataMusics";
/*
app.delete("/musics/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletMusic = await connection("musics")
        .where({ idmusic: id })
        .delete();
      if (!deletMusic) {
        res.send(`Musica ${id} não encontrada`);
      }
      res.send(`Musica ${id} deletada`);
    } catch (error) {
      res.status(500).json({ message: "Erro ao deleta a música" });
    }
  });
  
  app.put("/musics/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { namemusic, genremusic, idalbum } = req.body;
      const alterMusic = await connection("musics")
        .update({ namemusic, genremusic, idalbum })
        .where({ idmusic: id });
      if (!alterMusic) {
        res.status(404).json({ message: "Música não encontrada" });
      }
      res.status(200).json({ message: "Música atualizada com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar música", error });
    }
  });
  */
  export const postMusics = async (req: Request, res: Response) => {
    try {
      const { idmusic, namemusic, genremusic, duration, idalbum } = req.body;
      if (!idmusic && !namemusic &&!genremusic &&!duration && !idalbum) {
        throw new Error('Os parâmetros de busca não foram preenchidos corretamente.');
      }
      await addMusic(idmusic, namemusic, genremusic, duration, idalbum);
      res.send(`Musica ${namemusic} adicionada com sucesso!`);
    } catch (error) {
      res.status(500).json({ message: "Erro ao adicionar música", error });
    }
  };

export const getMusicsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const findMusicsId = await findMusicByIdData(id);
    if (!id) {
      throw new Error("É necessário preencher o parâmetro id");
    }
    if (!findMusicsId) {
      throw new Error(`Música com id ${id} não encontrada`);
    }
    res.status(200).json(findMusicsId);
  } catch (error) {
    res.status(500).json({ message: `Erro ao buscar a musica`, error });
  }
};

export const searchMusicByName = async (req: Request, res: Response) => {
  try {
    const name = req.query.name?.toString().toLowerCase();
    if (!name) {
      throw new Error('O parâmetro de busca "name" é obrigatório.');
    }

    const musics = await getMusicsByName(name);

    if (!musics.length) {
      throw new Error("Nenhuma musica foi encontrado.");
    }

    res.status(200).json({ musics });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar musica", error });
  }
};

export const getMusics = async (req: Request, res: Response) => {
  try {
    const result = await getMusicsData();
    if (result.length === 0) {
      throw new Error("Não há músicas disponíveis no momento.");
    }
    res.send(result);
  } catch (error) {
    res.status(404).json({ message: "Erro ao buscar musicas.", error });
  }
};
