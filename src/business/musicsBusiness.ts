import { musicData } from "../data/dataMusics"; // Importando o arquivo de data

const musicDataInstance = new musicData();

export const musicsBusiness = {
  addMusic: async (
    idmusic: string,
    namemusic: string,
    genremusic: string,
    duration: string,
    idalbum: string
  ) => {
    return musicDataInstance.addMusics(
      idmusic,
      namemusic,
      genremusic,
      duration,
      idalbum
    );
  },

  findMusicById: async (id: string) => {
    return musicDataInstance.findMusicById(id);
  },

  searchMusicByName: async (name: string) => {
    return musicDataInstance.searchMusicByName(name);
  },

  getMusics: async () => {
    return musicDataInstance.getMusics();
  },
};
