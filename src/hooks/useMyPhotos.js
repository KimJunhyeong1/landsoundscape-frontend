import { useQuery } from "react-query";
import { getMyPhotos } from "../api";

function useMyPhotos(userId) {
  return useQuery(["getMyPhotos", userId], () => getMyPhotos(userId), {
    refetchOnWindowFocus: false,
  });
}

export default useMyPhotos;
