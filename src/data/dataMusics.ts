import connection from "../connection";
import { music } from "../types/typesMusics";
import { generatedId } from "../services/idGenerator";

export class musicData {
  deleteMusic = async (id: string): Promise<void> => {
    try {
      const result = await connection("musics").where("idmusic", id).del();
      if (result === 0) {
        throw new Error(`Música com id ${id} não encontrada.`);
      }
    } catch (error) {
      throw new Error("Erro ao deletar música no banco de dados.");
    }
  };

  updateMusic = async (
    id: string,
    updates: {
      namemusic?: string;
      genremusic?: string;
      duration?: string;
      idalbum?: string;
    }
  ): Promise<void> => {
    try {
      const fields: string[] = [];
      const values: (string | undefined)[] = [];

      if (updates.namemusic) {
        fields.push("namemusic = ?");
        values.push(updates.namemusic);
      }
      if (updates.genremusic) {
        fields.push("genremusic = ?");
        values.push(updates.genremusic);
      }
      if (updates.duration) {
        fields.push("duration = ?");
        values.push(updates.duration);
      }
      if (updates.idalbum) {
        fields.push("idalbum = ?");
        values.push(updates.idalbum);
      }

      if (fields.length === 0) {
        throw new Error("Nenhum campo válido para atualizar.");
      }

      const query = `
        UPDATE musics
        SET ${fields.join(", ")}
        WHERE idmusic = ?;
      `;
      values.push(id);

      await connection.raw(query, values);
    } catch (error) {
      throw new Error("Erro ao atualizar música no banco de dados.");
    }
  };

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
