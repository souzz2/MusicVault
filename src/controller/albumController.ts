import { Request, Response } from "express";
import { AlbumBusiness } from "../business/albumBusiness";
import { generatedId } from "../services/idGenerator";

export class AlbumController {
  albumBusiness = new AlbumBusiness();

  addAlbumWithMusics = async (req: Request, res: Response): Promise<void> => {
    try {
      const { namealbum, releasealbum, idartist, musics } = req.body;
      const token = req.headers.authorization;

      if (!token) {
        throw new Error("Token de autorização não fornecido.");
      }

      if (
        !namealbum ||
        !releasealbum ||
        !idartist ||
        !musics ||
        musics.length === 0
      ) {
        throw new Error(
          "Parâmetros do álbum ou das músicas estão incompletos."
        );
      }

      await this.albumBusiness.addAlbumWithMusics(
        namealbum,
        releasealbum,
        idartist,
        musics,
        token
      );

      res.status(201).send({
        message: `Álbum "${namealbum}" adicionado com sucesso.`,
      });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  };

  updateAlbum = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { namealbum, releasealbum, idartist } = req.body;
      const token = req.headers.authorization;

      if (!id) {
        throw new Error("O ID do álbum é obrigatório.");
      }
    
      if (!token) {
        throw new Error("Token de autorização não fornecido.");
      }

      await this.albumBusiness.updateAlbum(
        id,
        token,
        namealbum,
        releasealbum,
        idartist
      );

      res.status(200).send({
        message: `Álbum com ID ${id} atualizado com sucesso.`,
      });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  };

  deleteAlbum = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error("O id do álbum é obrigatório.");
      }

      const token = req.headers.authorization as string;
      await this.albumBusiness.deleteAlbum(id, token);
      res
        .status(200)
        .json({ message: `Álbum com id ${id} deletado com sucesso!` });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || "Erro ao deletar álbum", error });
    }
  };

  searchAlbumsByName = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.query;
        const token = req.headers.authorization;

        if (!token) {
            res.status(401).send({ message: "Token de autorização não fornecido." });
            return;
        }

        if (!name) {
            res.status(400).send({ message: 'O parâmetro "name" é obrigatório.' });
            return;
        }

        const albums = await this.albumBusiness.searchAlbumsByName(name as string, token);

        if (albums.length === 0) {
            res.status(200).send({ message: "Nenhum álbum encontrado." });
            return;
        }

        res.status(200).send(albums);
    } catch (error: any) {
        console.error("Erro ao buscar álbuns:", error.message);
        res.status(400).send({
            message: "Erro ao buscar álbuns",
            error: error.message,
        });
    }
};


  getAlbums = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const albums = await this.albumBusiness.getAlbums(token);
      res.status(200).json({ albums });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || "Erro ao buscar álbuns", error });
    }
  };
}
