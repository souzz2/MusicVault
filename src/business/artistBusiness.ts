import { artistData } from "../data/dataArtists";
export class artistBusiness {
  artistData = new artistData();

  
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
