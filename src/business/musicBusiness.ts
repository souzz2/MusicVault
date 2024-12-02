import { musicData } from "../data/dataMusics";
import { generatedId } from "../services/idGenerator";

export class musicBusiness {
  musicData = new musicData();

  deleteMusic = async (id: string, token: string) => {
    try {
      if (!token) {
        throw new Error("Token não informado");
      }
      if (!id) {
        throw new Error("O ID da música é obrigatório para exclusão.");
      }

      const music = await this.musicData.findMusicById(id);
      if (!music || music.length === 0) {
        throw new Error(`Música com id ${id} não encontrada.`);
      }

      await this.musicData.deleteMusic(id);
    } catch (error: any) {
      throw new Error(error.message || "Erro ao deletar a música.");
    }
  };

  updateMusic = async (
    id: string,
    token: string,
    updates: {
      namemusic?: string;
      genremusic?: string;
      duration?: string;
      idalbum?: string;
    }
  ) => {
    try {
      if (!token) {
        throw new Error("Token não informado");
      }
      const music = await this.musicData.findMusicById(id);
      if (!music) {
        throw new Error(`Música com id ${id} não encontrada.`);
      }

      await this.musicData.updateMusics(id, updates);
    } catch (error: any) {
      throw new Error(error.message || "Erro ao atualizar a música.");
    }
  };

  addMusic = async (
    namemusic: string,
    genremusic: string,
    duration: string,
    token: string
  ): Promise<string> => {
    try {
      if (!token) {
        throw new Error("Token não informado");
      }

      if (!namemusic || !genremusic || !duration) {
        throw new Error("Todos os campos da música são obrigatórios.");
      }

      const idmusic = generatedId();

      await this.musicData.addMusicsData(
        idmusic,
        namemusic,
        genremusic,
        duration
      );
      return idmusic;
    } catch (error: any) {
      throw new Error(
        error.message || "Erro ao adicionar música no banco de dados."
      );
    }
  };

  addMusicsWithAlbuns = async (
    namemusic: string,
    genremusic: string,
    duration: string,
    idalbum: string,
    token: string
  ): Promise<string> => {
    try {
      if (!token) {
        throw new Error("Token não informado");
      }

      if (!namemusic || !genremusic || !duration || !idalbum) {
        throw new Error("Todos os campos da música são obrigatórios.");
      }

      const idmusic = generatedId();

      const albumExists = await this.musicData.checkAlbumExists(idalbum);
      if (!albumExists) {
        throw new Error(`Álbum com id ${idalbum} não encontrado.`);
      }

      await this.musicData.addMusicsData(
        idmusic,
        namemusic,
        genremusic,
        duration,
        idalbum
      );
      return idmusic;
    } catch (error: any) {
      throw new Error(
        error.message || "Erro ao adicionar música no banco de dados."
      );
    }
  };

  searchMusicByName = async (name: string, token: string) => {
    console.log("name", name);
    try {
      if (!token) {
        throw new Error("Token não informado");
      }
      if (!name) {
        throw new Error('O parâmetro de busca "name" é obrigatório.');
      }

      const musics = await this.musicData.searchMusicByName(name);

      return musics || [];
    } catch (error: any) {
      throw new Error(error.message || "Erro ao buscar músicas.");
    }
  };

  getMusicById = async (id: string, token: string) => {
    try {
      if (!token) {
        throw new Error("Token não informado");
      }
      const music = await this.musicData.findMusicById(id);
      if (!music || music.length === 0) {
        throw new Error(`Música com id ${id} não encontrada`);
      }
      return music;
    } catch (error: any) {
      throw new Error(error.message || "Erro ao buscar a música");
    }
  };
  getMusics = async (token: string, limit: number, offset: number) => {
    try {
      if (!token) {
        throw new Error("Token não informado");
      }
      const musics = await this.musicData.getMusics(limit, offset);
      if (musics.length === 0) {
        throw new Error("Não há músicas disponíveis no momento.");
      }
      return musics;
    } catch (error: any) {
      throw new Error(error.message || "Erro ao buscar músicas.");
    }
  };
}
