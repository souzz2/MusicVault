import connection from "../connection";
import { music } from "../types/typesMusics";

export class musicData {
  addMusics = async (
    idmusic: string,
    namemusic: string,
    genremusic: string,
    duration: string,
    idalbum: string
  ) => {
    return await connection("musics").insert({
      idmusic,
      namemusic,
      genremusic,
      duration,
      idalbum,
    });
  };

  findMusicById = async (id: string) => {
    return await connection("musics")
      .where("idmusic", "=", id)
      .orderBy("idmusic", "asc")
      .limit(10);
  };

  searchMusicByName = async (name: string) => {
    return await connection("musics")
      .select("namemusic")
      .where("namemusic", "like", `%${name}%`)
      .orderBy("namemusic", "asc")
      .limit(5);
  };

  getMusics = async () => {
    return await connection("musics").orderBy("idmusic", "asc").limit(10);
  };
}
