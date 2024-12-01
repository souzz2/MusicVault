import { artistData } from "../data/dataArtists";
import { generatedId } from "../services/idGenerator";
export class artistBusiness {
  artistData = new artistData();

  addMusic = async (
    nameartist: string,
    bio: string,
    countryartist: string,
    ageartist: string, 
    token: string
  ) => {
    try {
      if (!token) {
        throw new Error("Token não informado");
      }
      const idmusic = generatedId();
      await this.artistData.addArtist(nameartist, bio, countryartist, ageartist);
    } catch (error: any) {
      throw new Error(error.message || "Erro ao adicionar o artista.");
    }
  };

  deleteArtist = async (id: string, token: string) => {
    try {
      if (!token) {
        throw new Error("Token não informado");
      }
      if (!id) {
        throw new Error("O ID do artista é obrigatório para exclusão.");
      }

      const music = await this.artistData.getArtistByIdData(id);
      if (!music || music.length === 0) {
        throw new Error(`Artista com id ${id} não encontrado.`);
      }

      await this.artistData.deleteArtist(id);
    } catch (error: any) {
      throw new Error(error.message || "Erro ao deletar o artista.");
    }
  };

  getArtistsMusic = async (id: string) => {
    try {
      const artist = await this.artistData.getArtistByIdData(id);
      if (!artist) {
        throw new Error(`Artista com id ${id} não encontrada`);
      }
      return artist;
    } catch (error: any) {
      throw new Error(error.message || "Erro ao buscar o artista");
    }
  };

  searchArtistsByName = async (name: string) => {
    try {
      if (!name) {
        throw new Error('O parâmetro de busca "name" é obrigatório.');
      }

      const artists = await this.artistData.getArtistsByNameData(name);
      if (!artists.length) {
        throw new Error("Nenhum artista foi encontrado.");
      }

      return artists;
    } catch (error: any) {
      throw new Error(error.message || "Erro ao buscar artista");
    }
  };

  getAllArtists = async () => {
    try {
      const artists = await this.artistData.getArtistsData();
      if (artists.length === 0) {
        throw new Error("Não há artistas disponíveis no momento.");
      }
      return artists;
    } catch (error: any) {
      throw new Error(error.message || "Erro ao buscar artistas.");
    }
  };
}
