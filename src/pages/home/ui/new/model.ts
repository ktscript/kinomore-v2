import { axios } from "shared/lib/axios";
import { getCurrentYear } from "shared/lib/get-current-year";
import type { IData } from "shared/types/IData";
import type { IMovieItem } from "shared/types/IMovieItem";

export const getNewMovies = async () => {
  const { data } = await axios.get<IData<IMovieItem[]>>("/movie", {
    params: {
      search: getCurrentYear(),
      field: "year",
      sortField: "votes.filmCritics",
      sortType: "-1",
      limit: 15,
    },
  });

  return data;
};