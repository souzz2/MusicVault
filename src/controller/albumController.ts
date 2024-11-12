import { Request, Response } from "express";
import { AlbumBusiness } from "../business/albumBusiness";

export class AlbumController {
  albumBusiness = new AlbumBusiness();

  addAlbum = async (req: Request, res: Response) => {
    try {
      const { idalbum, namealbum, releasealbum, idartist, idmusic} = req.body;
      if (!idalbum || !namealbum || !releasealbum || !idartist || !idmusic) {
        throw new Error("Todos os campos devem ser preenchidos.");
      }

      await this.albumBusiness.addAlbum(
        idalbum,
        namealbum,
        releasealbum,
        idartist,
        idmusic
      );
      res
        .status(201)
        .send({ message: `Álbum ${namealbum} inserido com sucesso!` });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || "Erro ao adicionar álbum", error });
    }
  };

  deleteAlbum = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error("O id do álbum é obrigatório.");
      }

      await this.albumBusiness.deleteAlbum(id);
      res
        .status(200)
        .send({ message: `Álbum com id ${id} deletado com sucesso!` });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || "Erro ao deletar álbum", error });
    }
  };

  getAlbumsMusic = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const musics = await this.albumBusiness.getAlbumsMusic(id);
      res.status(200).send({ musics });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || "Erro ao buscar o álbum", error });
    }
  };

  searchAlbumsByName = async (req: Request, res: Response) => {
    try {
      const name = req.query.name as string;
      const albums = await this.albumBusiness.searchAlbumsByName(name);
      res.status(200).send({ albums });
    } catch (error: any) {
      const message = error.message || "Erro ao buscar álbum";
      res.status(500).json({ message, error });
    }
  };

  getAlbums = async (req: Request, res: Response) => {
    try {
      const albums = await this.albumBusiness.getAlbums();
      res.status(200).send({ albums });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || "Erro ao buscar álbuns", error });
    }
  };
}
