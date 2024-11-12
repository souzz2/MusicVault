import connection from "../connection";

export class artistData {
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
    } catch (error) {
      throw new Error("Erro ao buscar artista por ID");
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
    } catch (error) {
      throw new Error("Erro ao buscar artistas por nome");
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
    } catch (error) {
      throw new Error("Erro ao buscar todos os artistas");
    }
  };
}
