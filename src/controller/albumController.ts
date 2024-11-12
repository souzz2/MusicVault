import { Request, Response } from "express";
import { AlbumBusiness } from "../business/albumBusiness";

export class albumController {
  albumBusiness = new AlbumBusiness();
  getAlbumsMusic = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const musics = await this.albumBusiness.getAlbumsMusic(id);
      res.status(200).send({ musics });
    } catch (error: any) {
      res.status(500).json({ message: `Erro ao buscar o album`, error });
    }
  };

  searchAlbumsByName = async (req: Request, res: Response) => {
    try {
      const name = req.query.name as string;
      const albums = await this.albumBusiness.searchAlbumsByName(name);
      res.status(200).send({ albums });
    } catch (error: any) {
        const message = error.sqlMessage || error.message || "Erro ao buscar álbum";
        res.json(message)
    }
  };

  
}
