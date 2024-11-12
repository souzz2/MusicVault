import { albumData } from "../data/dataAlbuns"
import { generateToken, payload } from "../services/authenticator";
import { generatedId } from "../services/idGenerator";

export class AlbumBusiness {
  albumData = new albumData();

  getAlbumsMusic = async (id: string) => {
    try {
      if (!id) {
        throw new Error("É necessário preencher o parâmetro id");
      }

      const AlbunsMusics = await this.albumData.getAlbumsMusicData(id);
      if (!AlbunsMusics || AlbunsMusics.length === 0) {
        throw new Error("Álbum não encontrado");
      }

      return AlbunsMusics;
    } catch (error) {
      throw new Error("Erro ao buscar as músicas do álbum");
    }
  };

  searchAlbumsByName = async (name: string) => {
    try {
      if (!name) {
        throw new Error('O parâmetro de busca "name" é obrigatório.');
      }

      const albums = await this.albumData.getAlbumsByNameData(name);
      if (!albums || albums.length === 0) {
        throw new Error("Nenhum álbum encontrado.");
      }

      return albums;
    } catch (error) {
      throw new Error("Erro ao buscar álbuns");
    }
  };

  getAlbums = async () => {
    try {
      const albums = await this.albumData.getAlbumsData();
      if (albums.length === 0) {
        throw new Error("Não há álbuns disponíveis no momento.");
      }

      return albums;
    } catch (error) {
      throw new Error("Erro ao buscar álbuns");
    }
  };
}
