import { Request, Response } from "express";
import {
  getArtistsData as getArtists,
  getArtistsByNameData as getArtistsByName,
  getArtistByIdData as getArtistById,
} from "./dataArtists";

export const searchArtistsByName = async (req: Request, res: Response) => {
  const name = req.query.name?.toString().toLowerCase();
  try {
    if (!name) {
      throw new Error('O parâmetro de busca "name" é obrigatório.');
    }

    const artists = await getArtistsByName(name);

    if (!artists.length) {
      throw new Error("Nenhum artista foi encontrado.");
    }

    res.status(200).json({ artists });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar artista", error });
  }
};

export const getArtistsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const findArtistId = await getArtistById(id);
    if (!id) {
      throw new Error("É necessário preencher o parâmetro id");
    }
    if (!findArtistId) {
      throw new Error(`Artista com id ${id} não encontrada`);
    }
    res.status(200).json(findArtistId);
  } catch (error) {
    res.status(500).json({ message: `Erro ao buscar a artista`, error });
  }
};

export const getArtist = async (req: Request, res: Response) => {
  try {
    const result = await getArtists();
    if (result.length === 0) {
      throw new Error("Não há playlists disponíveis no momento.");
    }
    res.send(result);
  } catch (error) {
    res.status(404).json({ message: "Erro ao buscar playlists.", error });
  }
};
