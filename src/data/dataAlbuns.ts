import connection from "../connection";
import { album } from "../types/typesAlbums";

export class albumData {
  addAlbum = async (idalbum: string, namealbum: string, releasealbum: string, idartist: string, idmusic: string) => {
    return await connection("albuns").insert({
      idalbum,
      namealbum,
      idartist,
      releasealbum,
      idmusic,
    });
  };

  deleteAlbum = async (id: string) => {
    return await connection("albuns")
      .where("idalbum", "=", id)
      .del();
  };

  getAlbumsMusicData = async (id: string): Promise<any> => {
    return await connection("albuns")
      .innerJoin("musics", "musics.idalbum", "=", "albuns.idalbum")
      .select("musics.namemusic")
      .where("albuns.idalbum", "=", id)
      .orderBy("musics.idmusic", "asc");
  };

  getAlbumsByNameData = async (name: string): Promise<any> => {
    return await connection("albuns")
      .select("namealbum")
      .where("namealbum", "like", `%${name}%`)
      .orderBy("namealbum", "asc")
      .limit(5);
  };

  getAlbumsData = async (): Promise<any> => {
    return await connection("albuns").orderBy("idalbum", "asc").limit(10);
  };
}
