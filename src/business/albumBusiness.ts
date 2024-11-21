import { albumData, album } from "../data/dataAlbuns";
import { generateToken, payload } from "../services/authenticator";
import { generatedId } from "../services/idGenerator";
import { musicBusiness } from "./musicBusiness"; // Add this import

export class AlbumBusiness {
  albumData = new albumData();

  updateAlbum = async (
    id: string,
    token: string,
    namealbum?: string,
    releasealbum?: string,
    idartist?: string
  ) => {
    try {
      if (!token) {
        throw new Error("Token não informado");
      }
      if (!id) {
        throw new Error("O ID do álbum é obrigatório.");
      }

      if (!namealbum && !releasealbum && !idartist) {
        throw new Error(
          "Pelo menos um campo deve ser informado para atualizar."
        );
      }

      const updates: {
        namealbum?: string;
        releasealbum?: string;
        idartist?: string;
      } = {};

      if (namealbum) updates.namealbum = namealbum;
      if (releasealbum) updates.releasealbum = releasealbum;
      if (idartist) updates.idartist = idartist;

      await this.albumData.updateAlbum(id, updates);
    } catch (error: any) {
      throw new Error(error.message || "Erro ao atualizar álbum.");
    }
  };

  deleteAlbum = async (id: string, token: string) => {
    try {
      if (!token) {
        throw new Error("Token não informado");
      }
      await this.albumData.deleteAlbum(id);
    } catch (error: any) {
      throw new Error(error.message || "Erro ao deletar álbum");
    }
  };

  getAlbumsMusic = async (id: string, token: string) => {
    try {
      if (!token) {
        throw new Error("Token não informado");
      }
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

  searchAlbumsByName = async (name: string, token: string) => {
    try {
      if (!token) {
        throw new Error("Token não informado");
      }

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

  getAlbums = async (token: string) => {
    try {
      if (!token) {
        throw new Error("Token não informado");
      }
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
