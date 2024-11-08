import connection from "../connection";
import { Artist } from "./typeArtist";

export const searchArtistsByName = async (name: string): Promise<Artist[]> => {
  return await connection("artists").select("nameartist").where("nameartist", "like", `%${name}%`).orderBy("nameartist", "asc").limit(5);
};

