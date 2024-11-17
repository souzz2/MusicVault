import connection from "../connection";
import { music } from "../types/typesMusics";
import { generatedId } from "../services/idGenerator";

export class musicData {
  addMusics = async (
    namemusic: string,
    genremusic: string,
    duration: string,
    idalbum: string
  ): Promise<void> => {
    try {
      const idmusic = generatedId();
      await connection("musics").insert({
        idmusic,
        namemusic,
        genremusic,
        duration,
        idalbum,
      });
    } catch (sql) {
      throw sql;
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
      return await connection("musics")
        .select("namemusic")
        .where("namemusic", "like", `%${name}%`)
        .orderBy("namemusic", "asc")
        .limit(5);
    } catch (sql) {
      throw sql;
    }
  };

  getMusics = async (): Promise<music[]> => {
    try {
      return await connection("musics").orderBy("idmusic", "asc").limit(10);
    } catch (sql) {
      throw sql;
    }
  };
}
