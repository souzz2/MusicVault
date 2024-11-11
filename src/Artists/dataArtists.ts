import connection from "../connection";

interface Artist {
  idartist: string;
  nameartist: string;
  bio: string;
  countryartist: string;
  ageartist: string;
}

export const getArtistByIdData = async (id: string): Promise<Artist[]> => {
  return await connection("artists")
    .where("idartist", "=", id)
    .orderBy("idartist", "asc")
    .limit(10);
};

export const getArtistsByNameData = async (name: string): Promise<any> => {
  return await connection("artists")
    .select("nameartist")
    .where("nameartist", "like", `%${name}%`)
    .orderBy("nameartist", "asc")
    .limit(5);
};

export const getArtistsData = async (): Promise<any> => {
  return await connection("artists").orderBy("idartist", "asc").limit(10);
};
