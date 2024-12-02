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
  
      const result = await connection("albuns")
        .where("idalbum", "=", id)
        .update(updateData);
  
      // Verifica se alguma linha foi alterada
      if (result === 0) {
        throw new Error("Nenhum álbum encontrado com o ID fornecido.");
      }
    } catch (sql) {
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
    console.log(`Buscando álbuns com o nome: ${name}`);
    try {
        const result = await connection("albuns")
            .select("*")
            .where("namealbum", "ilike", `%${name}%`)
            .orderBy("namealbum", "asc")
            .limit(5);
        console.log(`Resultado da busca: ${JSON.stringify(result)}`);
        return result;
    } catch (error: any) {
        console.error("Erro ao buscar álbuns no banco de dados:", error.message);
        throw error; // Não substitua o erro aqui
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
