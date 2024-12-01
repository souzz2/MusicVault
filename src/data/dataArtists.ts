import connection from "../connection";
import { generatedId } from "../services/idGenerator";

export class artistData {

  deleteArtist = async (id: string): Promise<void> => {
    try {
      const result = await connection("artists").where("idartist", id).del();
      if (result === 0) {
        throw new Error(`Aritsta com id ${id} não encontrado.`);
      }
    } catch (error) {
      throw new Error("Erro ao deletar o artista no banco de dados.");
    }
  };

  addArtist = async (
    nameartist: string,
    bio: string,
    countryartist: string,
    ageartist: string
  ): Promise<void> => {
    try {
      const idartist = generatedId();
      await connection("artists").insert({
        idartist,
        nameartist,
        bio,
        countryartist,
        ageartist,
      });
    } catch (sql) {
      throw sql;
    }
  };

  getArtistByIdData = async (id: string): Promise<any> => {
    try {
      const result = await connection("artists")
        .where("idartist", "=", id)
        .orderBy("idartist", "asc")
        .limit(1);
      if (!result.length) {
        throw new Error(`Artista com id ${id} não encontrado`);
      }
      return result[0];
    } catch (sql) {
      throw sql;
    }
  };

  getArtistsByNameData = async (name: string): Promise<any> => {
    try {
      const result = await connection("artists")
        .select("nameartist")
        .where("nameartist", "like", `%${name}%`)
        .orderBy("nameartist", "asc")
        .limit(5);

      if (!result.length) {
        throw new Error("Nenhum artista encontrado com esse nome.");
      }

      return result;
    } catch (sql) {
      throw sql;
    }
  };

  getArtistsData = async (): Promise<any> => {
    try {
      const result = await connection("artists")
        .orderBy("idartist", "asc")
        .limit(10);

      if (!result.length) {
        throw new Error("Não há artistas disponíveis.");
      }

      return result;
    } catch (sql) {
      throw sql;
    }
  };
}
