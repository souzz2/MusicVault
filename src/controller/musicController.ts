import { Request, Response } from "express";
import { musicBusiness } from "../business/musicBusiness";

export class musicController {
  musicBusiness = new musicBusiness();

  deleteMusic = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        throw new Error("O ID da música é obrigatório para exclusão.");
      }
      const token = req.headers.authorization as string;
      await this.musicBusiness.deleteMusic(id, token);

      res
        .status(200)
        .send({ message: `Música com ID ${id} deletada com sucesso.` });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Erro ao deletar música.", error: error.message });
    }
  };

  updateMusic = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { namemusic, genremusic, duration, idalbum } = req.body;

      if (!id || (!namemusic && !genremusic && !duration && !idalbum)) {
        throw new Error("Parâmetros de atualização inválidos.");
      }
      const token = req.headers.authorization as string;
      await this.musicBusiness.updateMusic(id,token, {
        namemusic,
        genremusic,
        duration,
        idalbum,
      });
      res.status(200).send(`Música com ID ${id} atualizada com sucesso.`);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Erro ao atualizar música.", error: error.message });
    }
  };

  postMusics = async (req: Request, res: Response) => {
    try {
      const { namemusic, genremusic, duration, idalbum } = req.body;
      if (!namemusic || !genremusic || !duration || !idalbum) {
        throw new Error(
          "Os parâmetros de busca não foram preenchidos corretamente."
        );
      }
      const token = req.headers.authorization as string;
      await this.musicBusiness.addMusic(
        namemusic,
        genremusic,
        duration,
        idalbum,
        token
      );
      res.status(200).send(`Música ${namemusic} adicionada com sucesso!`);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Erro ao adicionar música", error: error.message });
    }
  };

  getMusicsById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const token = req.headers.authorization as string;
      const music = await this.musicBusiness.getMusicById(id,token);

      if (!music) {
        throw new Error(`Música com id ${id} não encontrada`);
      }

      res.status(200).json(music);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Erro ao buscar música", error: error.message });
    }
  };

  searchMusicByName = async (req: Request, res: Response) => {
    try {
      const name = req.query.name?.toString().toLowerCase();
      if (!name) {
        throw new Error('O parâmetro de busca "name" é obrigatório.');
      }
      const token = req.headers.authorization as string;
      const musics = await this.musicBusiness.searchMusicByName(name,token);
      if (!musics || musics.length === 0) {
        throw new Error("Nenhuma música foi encontrada.");
      }

      res.status(200).json({ musics });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Erro ao buscar música", error: error.message });
    }
  };

  getMusics = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const musics = await this.musicBusiness.getMusics(token);
      if (!musics.length) {
        throw new Error("Não há músicas disponíveis no momento.");
      }

      res.status(200).json(musics);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Erro ao buscar músicas.", error: error.message });
    }
  };
}
