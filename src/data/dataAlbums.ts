import connection from "../connection";
import { album } from "../types/typesAlbums";

export class albumData {
  deleteAlbum = async (id: string): Promise<void> => {
    try {
      const result = await connection("albuns").where("idalbum", id).del();
      if (result === 0) {
        throw new Error(`Album com id ${id} não encontrado.`);
      }
    } catch (error) {
      throw new Error("Erro ao deletar o álbum no banco de dados.");
    }
  };

  updateAlbum = async (
    id: string,
    updates: { namealbum?: string; releasealbum?: string; idartist?: string }
  ): Promise<void> => {
    try {
      const updateData: any = {};
      if (updates.namealbum) updateData.namealbum = updates.namealbum;
      if (updates.releasealbum) updateData.releasealbum = updates.releasealbum;
      if (updates.idartist) updateData.idartist = updates.idartist;

      console.log(`Atualizando álbum com id: ${id} com os dados: ${JSON.stringify(updateData)}`);  // Log para depuração

      await connection("albuns").where("idalbum", "=", id).update(updateData);
    } catch (sql) {
      console.error(`Erro ao atualizar o álbum no banco de dados: ${(sql as Error).message}`);  // Log do erro
      throw new Error("Erro ao atualizar o álbum no banco de dados.");
    }
  };

  addAlbum = async (
    idalbum: string,
    namealbum: string,
    releasealbum: string,
    idartist: string
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
