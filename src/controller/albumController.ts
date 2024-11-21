import { Request, Response } from "express";
import { AlbumBusiness } from "../business/albumBusiness";
import { generatedId } from "../services/idGenerator";

export class AlbumController {
  albumBusiness = new AlbumBusiness();

  updateAlbum = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { namealbum, releasealbum, idartist } = req.body;
      if (!id) {
        throw new Error("O ID do álbum é obrigatório.");
      }
      
      const token = req.headers.authorization as string;
      await this.albumBusiness.updateAlbum(id, namealbum, releasealbum, idartist, token);
  
      res.status(200).send({ message: "Álbum atualizado com sucesso!" });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || "Erro ao atualizar álbum", error });
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
      const token = req.headers.authorization as string;
      const musics = await this.albumBusiness.getAlbumsMusic(id, token);
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
      const token = req.headers.authorization as string;
      const albums = await this.albumBusiness.searchAlbumsByName(name, token);
      res.status(200).send({ albums });
    } catch (error: any) {
      const message = error.message || "Erro ao buscar álbum";
      res.status(500).json({ message, error });
    }
  };

  getAlbums = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const albums = await this.albumBusiness.getAlbums(token);
      res.status(200).send({ albums });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || "Erro ao buscar álbuns", error });
    }
  };
}
