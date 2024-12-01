import connection from "../connection";
import { music } from "../types/typesMusics";

export class musicData {
  deleteMusic = async (id: string): Promise<void> => {
    try {
      const result = await connection("musics").where("idmusic", id).del();
      if (result === 0) {
        throw new Error(`Música com id ${id} não encontrada.`);
      }
    } catch (error) {
      throw new Error("Erro ao deletar música no banco de dados.");
    }
  };

  updateMusics = async (
    id: string,
    updates: {
      namemusic?: string;
      genremusic?: string;
      duration?: string;
      idalbum?: string;
    }
  ): Promise<void> => {
    try {
      await connection("musics").where("idmusic", id).update(updates);
    } catch (error) {
      throw new Error("Erro ao atualizar música no banco de dados.");
    }
  };

  checkAlbumExists = async (idalbum: string): Promise<boolean> => {
    const album = await connection("albuns").where("idalbum", idalbum).first();
    return !!album;
  };

  addMusicsData = async (
    idmusic: string,
    namemusic: string,
    genremusic: string,
    duration: string,
    idalbum?: string
  ): Promise<void> => {
    try {
      await connection("musics").insert({
        idmusic,
        namemusic,
        genremusic,
        duration,
        idalbum,
      });
    } catch (error) {
      throw new Error("Erro ao adicionar música no banco de dados.");
    }
  };

  findMusicById = async (id: string): Promise<music[]> => {
    try {
      return await connection("musics")
        .where("idmusic", id)
        .orderBy("idmusic", "asc")
        .limit(10);
    } catch (sql) {
      throw sql;
    }
  };

  searchMusicByName = async (name: string): Promise<music[]> => {
    try {
      return await connection("musics").where(
        "namemusic",
        "ilike",
        `%${name}%`
      );
    } catch (sql) {
      throw sql;
    }
  };

  getMusics = async (limit: number, offset: number): Promise<music[]> => {
    try {
      return await connection("musics")
        .orderBy("idmusic", "asc")
        .limit(limit)
        .offset(offset);
    } catch (sql) {
      throw sql;
    }
  };
}
