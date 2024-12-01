import { Request, Response } from "express";
import { artistBusiness } from "../business/artistBusiness";

export class artistController {
  artistBusiness = new artistBusiness();

  
  deleteArtist = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        throw new Error("O ID do artista é obrigatório para exclusão.");
      }
      const token = req.headers.authorization as string;
      await this.artistBusiness.deleteArtist(id, token);
      
      res
      .status(200)
      .json({ message: `Artista com ID ${id} deletada com sucesso.` });
    } catch (error: any) {
      res
      .status(500)
      .json({ message: "Erro ao deletar o artista.", error: error.message });
    }
  };
  
  postArtist = async (req: Request, res: Response) => {
    try {
      const { nameartist, bio, countryartist, datebirthartist } = req.body;
      if (!nameartist || !bio || !countryartist || !datebirthartist) {
        throw new Error(
          "Os parâmetros de busca não foram preenchidos corretamente."
        );
      }
      const token = req.headers.authorization as string;
      await this.artistBusiness.addArtist(
        nameartist,
        bio,
        countryartist,
        datebirthartist,
        token
      );
      res.status(200).json(`Artista ${nameartist} adicionado com sucesso!`);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Erro ao adicionar o artista", error: error.message });
    }
  };
  
  searchArtistsByName = async (req: Request, res: Response) => {
    try {
      const name = req.query.name as string;
      const artists = await this.artistBusiness.searchArtistsByName(name);
      res.status(200).json({ artists });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || "Erro ao buscar artista", error });
    }
  };

  getArtistsById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const artist = await this.artistBusiness.getArtistsMusic(id);
      res.status(200).json({ artist });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || "Erro ao buscar artista", error });
    }
  };

  getAllArtists = async (req: Request, res: Response) => {
    try {
      const artists = await this.artistBusiness.getAllArtists();
      res.status(200).json({ artists });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || "Erro ao buscar artistas", error });
    }
  };
}
