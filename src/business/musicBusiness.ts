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
      idalbum?: string
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

      await this.musicData.updateMusic(id, updates);
    } catch (error: any) {
      throw new Error(error.message || "Erro ao atualizar a música.");
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

  searchMusicByName = async (name: string, token: string) => {
    try {
      if (!token) {
        throw new Error("Token não informado");
      }
      if (!name) {
        throw new Error('O parâmetro de busca "name" é obrigatório.');
      }

      const musics = await this.musicData.searchMusicByName(name);
      if (!musics || musics.length === 0) {
        throw new Error("Nenhuma música foi encontrada.");
      }

      return musics;
    } catch (error: any) {
      throw new Error(error.message || "Erro ao buscar músicas");
    }
  };

  getMusics = async (token: string) => {
    try {
      if (!token) {
        throw new Error("Token não informado");
      }
      const musics = await this.musicData.getMusics();
      if (musics.length === 0) {
        throw new Error("Não há músicas disponíveis no momento.");
      }
      return musics;
    } catch (error: any) {
      throw new Error(error.message || "Erro ao buscar músicas.");
    }
  };

  addMusic = async (
    namemusic: string,
    genremusic: string,
    duration: string,
    idalbum: string, 
    token: string
  ) => {
    try {
      if (!token) {
        throw new Error("Token não informado");
      }
      const idmusic = generatedId();
      await this.musicData.addMusics(namemusic, genremusic, duration, idalbum);
    } catch (error: any) {
      throw new Error(error.message || "Erro ao adicionar a música.");
    }
  };
}
