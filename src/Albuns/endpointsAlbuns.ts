import { Request, Response } from "express";
import {
  getAlbumsData as getAlbums,
  getAlbumsMusicData as getAlbumsMusics,
  getAlbumsByNameData as getAlbumsByName,
} from "./dataAlbuns";

export const getAlbumsMusic = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const AlbunsMusics = await getAlbumsMusics(id);
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

export const searchAlbumsByName = async (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;
    if (!name) {
      throw new Error('O parâmetro de busca "name" é obrigatório.');
    }
    
    const albuns = await getAlbumsByName(name);

    if (!albuns.length) {
      res.status(404);
      throw new Error("Nenhum álbum foi encontrado.");
    }

    res.status(200).json({ albuns });
  } catch (error: any) {
    const message = error.sqlMessage || error.message || "Erro ao buscar álbum";
    res.json(message);
  }
};

export const getAlbum = async (req: Request, res: Response) => {
  try {
    const result = await getAlbums();
    if (result.length === 0) {
      throw new Error("Não há playlists disponíveis no momento.");
    }
    res.send(result);
  } catch (error) {
    res.status(404).json({ message: "Erro ao buscar playlists.", error });
  }
};
