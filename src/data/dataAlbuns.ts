import connection from "../connection";

interface Album {
  idalbum: string;
  namealbum: string;
  releaseyear: number;
}

export const getAlbumsMusicData = async (id: string): Promise<any> => {
  return await connection("albuns")
    .innerJoin("musics", "musics.idalbum", "=", "albuns.idalbum")
    .select("musics.namemusic")
    .where("albuns.idalbum", "=", id)
    .orderBy("musics.idmusic", "asc");
};

export const getAlbumsByNameData = async (name: string): Promise<any> => {
  return await connection("albuns")
    .select("namealbum")
    .where("namealbum", "like", `%${name}%`)
    .orderBy("namealbum", "asc")
    .limit(5);
};

export const getAlbumsData = async (): Promise<any> => {
  return await connection("albuns").orderBy("idalbum", "asc").limit(10);
};
