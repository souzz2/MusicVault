import connection from "../connection";

interface Music {
  idmusic: string;
  namemusic: string;
  genremusic: string;
  duration: string;
  idalbum: string;
}
/*
const deleteMusicById = async (id) => {
    return await connection("musics").where({ idmusic: id }).delete();
  };
 
  const updateMusicById = async (id, namemusic, genremusic, idalbum) => {
    return await connection("musics")
      .update({ namemusic, genremusic, idalbum })
      .where({ idmusic: id });
  };
  */

  export const addMusics = async (idmusic: string, namemusic: string, genremusic: string,duration:string, idalbum: string): Promise<Music[]> => {
    return await connection("musics").insert({
      idmusic,
      namemusic,
      genremusic,
      duration,
      idalbum,
    });
  };

export const findMusicById = async (id: string): Promise<Music[]> => {
  return await connection("musics")
    .where("idmusic", "=", id)
    .orderBy("idmusic", "asc")
    .limit(10);
};

export const searchMusicByName = async (name: string): Promise<Music[]> => {
  return await connection("musics")
    .select("namemusic")
    .where("namemusic", "like", `%${name}%`)
    .orderBy("namemusic", "asc")
    .limit(5);
};

export const getMusics = async (): Promise<Music[]> => {
  return await connection("musics").orderBy("idmusic", "asc").limit(10);
};
