import { albumData, album } from "../data/dataAlbuns";
import { generatedId } from "../services/idGenerator";
import { musicBusiness } from "./musicBusiness"; // Importar a classe musicBusiness

export class AlbumBusiness {
  albumData = new albumData();
  musicBusiness = new musicBusiness();

  addAlbumWithMusics = async (
    namealbum: string,
    releasealbum: string,
    idartist: string,
    musics: { namemusic: string; genremusic: string; duration: string }[],
    token: string
  ): Promise<string> => {
    try {
      if (!token) {
        throw new Error("Token não informado.");
      }

      if (!namealbum || !releasealbum || !idartist || musics.length === 0) {
        throw new Error(
          "Os parâmetros do álbum ou das músicas não foram preenchidos corretamente."
        );
      }

      const idalbum = generatedId();

      await this.albumData.addAlbum(idalbum, namealbum, releasealbum, idartist);

      await Promise.all(
        musics.map(async (music) => {
          const existingMusic = await this.musicBusiness.searchMusicByName(
            music.namemusic,
            token
          );

          if (!existingMusic || existingMusic.length === 0) {
            await this.musicBusiness.addMusicsWithAlbuns(
              music.namemusic,
              music.genremusic,
              music.duration,
              idalbum,
              token
            );
            console.log(existingMusic);
            await this.musicBusiness.updateMusic(
              existingMusic[0].idmusic,
              token,
              {
                idalbum,
              }
            );
          }
        })
      );

      return `Álbum "${namealbum}" adicionado com sucesso com as músicas associadas.`;
    } catch (error: any) {
      throw new Error(
        error.message || "Erro ao adicionar o álbum e as músicas."
      );
    }
  };

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
