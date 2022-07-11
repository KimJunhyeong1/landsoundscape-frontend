import { useQuery } from "react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";

import { getPhotos } from "../../api";
import useModal from "../../hooks/useModal";
import SearchView from "../ViewAssetComponents/SearchView";

function Search() {
  const { hideModal } = useModal();
  const [filter, setFilter] = useState("");
  const [debouncedFilter] = useDebounce(filter, 500);
  const { data } = useQuery(
    ["getPhotos", debouncedFilter],
    () => getPhotos(debouncedFilter),
    {
      enabled: Boolean(debouncedFilter),
      refetchOnWindowFocus: false,
    },
  );

  const SearchProps = {
    photos: data,
    onInputChange: e => setFilter(e.target.value),
    onPhotoClick: () => hideModal(),
  };

  return <SearchView {...SearchProps} />;
}

export default Search;
