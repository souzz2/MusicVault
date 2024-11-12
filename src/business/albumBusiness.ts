import { compare } from "bcrypt";
import { albumData } from "../data/dataAlbuns";
import { generateToken, payload } from "../services/authenticator";
import { generatedId } from "../services/idGenerator";

export class AlbumBusiness {
  albumData = new albumData();
  getAlbumsMusic = async (id: string) => {
    try {
      const AlbunsMusics =  this.albumData.getAlbumsMusicData(id);
      if (!id) {
        throw new Error("É necessário preencher o parâmetro id");
      }
      if (!AlbunsMusics) {
        throw new Error("Album não encontrado");
      }

    } catch (error) {
      
    }
  };

  searchAlbumsByName = async (name: string) => {
    try {
      if (!name) {
        throw new Error('O parâmetro de busca "name" é obrigatório.');
      }
        const albums = await this.albumData.getAlbumsByNameData(name)
      if (!albums.length) {
        throw new Error("Nenhum álbum foi encontrado.");
      }
    } catch (error: any) {
      throw new Error("Erro")////
    }
  };

  getAlbum = async (req: Request, res: Response) => {
    try {
      const result = await getAlbums();
      if (result.length === 0) {
        throw new Error("Não há playlists disponíveis no momento.");
      }
      res.send(result);
    } catch (error) {
      res.status(404).json({ message: "Erro ao buscar playlists.", error });
    }
  };
}
