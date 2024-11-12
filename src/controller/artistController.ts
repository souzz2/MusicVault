import { Request, Response } from "express";
import { artistBusiness } from "../business/artistBusiness";

export class artistController {
  artistBusiness = new artistBusiness();

  searchArtistsByName = async (req: Request, res: Response) => {
    try {
      const name = req.query.name as string;
      const artists = await this.artistBusiness.searchArtistsByName(name);
      res.status(200).json({ artists });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Erro ao buscar artista", error });
    }
  };

  getArtistsById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const artist = await this.artistBusiness.getArtistsMusic(id);
      res.status(200).json({ artist });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Erro ao buscar artista", error });
    }
  };

  getAllArtists = async (req: Request, res: Response) => {
    try {
      const artists = await this.artistBusiness.getAllArtists();
      res.status(200).json({ artists });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Erro ao buscar artistas", error });
    }
  };
}
