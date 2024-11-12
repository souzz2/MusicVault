import { Request, Response } from "express";
import { musicsBusiness } from "../business/musicsBusiness"; // Importando corretamente o arquivo de business

export const postMusics = async (req: Request, res: Response) => {
  try {
    const { idmusic, namemusic, genremusic, duration, idalbum } = req.body;
    if (!idmusic || !namemusic || !genremusic || !duration || !idalbum) {
      throw new Error(
        "Os parâmetros de busca não foram preenchidos corretamente."
      );
    }

    await musicsBusiness.addMusic(
      idmusic,
      namemusic,
      genremusic,
      duration,
      idalbum
    );
    res.send(`Música ${namemusic} adicionada com sucesso!`);
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar música", error });
  }
};

export const getMusicsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const music = await musicsBusiness.findMusicById(id);

    if (!music) {
      throw new Error(`Música com id ${id} não encontrada`);
    }
    res.status(200).json(music);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar música", error });
  }
};

export const getMusics = async (req: Request, res: Response) => {
  try {
    const musics = await musicsBusiness.getMusics();
    if (!musics.length) {
      throw new Error("Não há músicas disponíveis no momento.");
    }
    res.status(200).json(musics);
  } catch (error) {
    res.status(404).json({ message: "Erro ao buscar músicas.", error });
  }
};

export const searchMusicByName = async (req: Request, res: Response) => {
  try {
    const name = req.query.name?.toString().toLowerCase();
    if (!name) {
      throw new Error('O parâmetro de busca "name" é obrigatório.');
    }

    const musics = await musicsBusiness.searchMusicByName(name);
    if (!musics.length) {
      throw new Error("Nenhuma música foi encontrada.");
    }
    res.status(200).json({ musics });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar música", error });
  }
};
