import connection from "../connection";
import { album } from "../types/typesAlbums";

export class albumData {
  deleteAlbum = async (id: string): Promise<void> => {
    try {
      const result = await connection("albuns").where("idalbum", id).del();
      if (result === 0) {
        throw new Error(`Album com id ${id} não encontrado.`);
      }
    } catch (error) {
      throw new Error("Erro ao deletar o álbum no banco de dados.");
    }
  };

  updateAlbum = async (
    id: string,
    updates: { namealbum?: string; releasealbum?: string; idartist?: string }
  ): Promise<void> => {
    try {
      await connection("albuns").where("idalbum", "=", id).update(updates);
    } catch (sql) {
      throw sql;
    }
  };

  addAlbum = async (
    idalbum: string,
    namealbum: string,
    releasealbum: string,
    idartist: string
  ) => {
    try {
      return await connection("albuns").insert({
        idalbum,
        namealbum,
        idartist,
        releasealbum,
      });
    } catch (sql) {
      throw sql;
    }
  };


  getAlbumsByNameData = async (name: string): Promise<any> => {
    try {
      return await connection("albuns")
        .select("namealbum")
        .where("namealbum", "like", `%${name}%`)
        .orderBy("namealbum", "asc")
        .limit(5);
    } catch (sql) {
      throw sql;
    }
  };

  getAlbumsData = async (): Promise<any> => {
    try {
      return await connection("albuns").orderBy("idalbum", "asc").limit(10);
    } catch (sql) {
      throw sql;
    }
  };
}
export { album };
