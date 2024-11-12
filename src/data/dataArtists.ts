import connection from "../connection";
import { artist } from "../types/typesArtists";

export class artistData {
  getArtistByIdData = async (id: string) => {
    return await connection("artists")
      .where("idartist", "=", id)
      .orderBy("idartist", "asc")
      .limit(10);
  };

  getArtistsByNameData = async (name: string) => {
    return await connection("artists")
      .select("nameartist")
      .where("nameartist", "like", `%${name}%`)
      .orderBy("nameartist", "asc")
      .limit(5);
  };

  getArtistsData = async () => {
    return await connection("artists").orderBy("idartist", "asc").limit(10);
  };
}
