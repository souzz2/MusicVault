import { musicData } from "../data/dataMusics";

export class musicBusiness {
  musicData = new musicData();

  getMusicById = async (id: string) => {
    try {
      const music = await this.musicData.findMusicById(id);
      if (!music || music.length === 0) {
        throw new Error(`Música com id ${id} não encontrada`);
      }
      return music;
    } catch (error: any) {
      throw new Error(error.message || "Erro ao buscar a música");
    }
  };

  searchMusicByName = async (name: string) => {
    try {
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

  getAllMusics = async () => {
    try {
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
    idmusic: string,
    namemusic: string,
    genremusic: string,
    duration: string,
    idalbum: string
  ) => {
    try {
      await this.musicData.addMusics(
        idmusic,
        namemusic,
        genremusic,
        duration,
        idalbum
      );
    } catch (error: any) {
      throw new Error(error.message || "Erro ao adicionar a música.");
    }
  };
}
