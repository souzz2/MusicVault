import { albumData } from "../data/dataAlbuns";
import { generateToken, payload } from "../services/authenticator";
import { generatedId } from "../services/idGenerator";
import { musicBusiness } from "./musicBusiness"; // Add this import

export class AlbumBusiness {
  albumData = new albumData();
  musicBusiness = new musicBusiness(); // Add this instance

  addAlbum = async (idalbum: string, namealbum: string, releasealbum: string, idartist: string, idmusic: string[]) => {
    try {
      // Validação básica
      if (!idalbum || !namealbum || !releasealbum || !idartist || !idmusic.length) {
        throw new Error("Todos os campos devem ser preenchidos.");
      }

      // Chamada para a camada de dados
      await this.albumData.addAlbum(idalbum, namealbum, releasealbum, idartist, idmusic);
    } catch (error: any) {
      throw new Error(error.message || "Erro ao adicionar álbum");
    }
  };

  deleteAlbum = async (id: string) => {
    try {
      await this.albumData.deleteAlbum(id);
    } catch (error: any) {
      throw new Error(error.message || "Erro ao deletar álbum");
    }
  };

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
