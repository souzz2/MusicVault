import connection from "../connection";
import { album } from "../types/typesAlbums";

export class albumData {
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
    idartist: string,
    idmusic: string[]
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

  deleteAlbum = async (id: string) => {
    try {
      return await connection("albuns").where("idalbum", "=", id).del();
    } catch (sql) {
      throw sql;
    }
  };

  getAlbumsMusicData = async (id: string): Promise<any> => {
    try {
      return await connection("albuns")
        .innerJoin("musics", "musics.idalbum", "=", "albuns.idalbum")
        .select("musics.namemusic")
        .where("albuns.idalbum", "=", id)
        .orderBy("musics.idmusic", "asc");
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
