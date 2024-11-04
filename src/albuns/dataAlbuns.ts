import connection from "../connection";

interface Album {
  idalbum: string;
  namealbum: string;
  releaseyear: number;
}

export const getAlbunsMusicsData = async (id: string): Promise<any> => {
  return await connection("Albuns")
    .select("namemusic")
    .join("albuns", "musics.idalbum", "=", "albuns.idalbum")
    .where("idalbum", "=", id)
    .orderBy("idmusic", "asc");
};

export const searchAlbumsByName = async (name: string): Promise<any> => {
  return await connection("Albuns")
    .select("namealbum")
    .where("namealbum", "like", `%${name}%`)
    .orderBy("namealbum", "asc")
    .limit(5);
};

export const getAlbunsData = async (): Promise<any> => {
  return await connection("albuns").orderBy("idalbum", "asc").limit(10);
};
