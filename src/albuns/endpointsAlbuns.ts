import { Request, Response } from "express";
import { getAlbunsData as getAlbuns ,getAlbunsMusicsData as getAlbunsMusics } from "./dataAlbuns";


export const getAlbunsMusic = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
    const AlbunsMusics = await getAlbunsMusics(id);
    if (!id) {
        throw new Error("É necessário preencher o parâmetro id");
    }
    if (!AlbunsMusics) {
        throw new Error("Album não encontrado");
    }
    res.status(200).json(AlbunsMusics);
} catch (error) {
    res.status(500).json({ message: `Erro ao buscar o album`, error });
}
};

export const getAlbum = async (req: Request, res: Response) => {
  try {
    const result = await getAlbuns();
    if (result.length === 0) {
      throw new Error("Não há playlists disponíveis no momento.");
    }
    res.send(result);
  } catch (error) {
    res.status(404).json({ message: "Erro ao buscar playlists.", error });
  }
};