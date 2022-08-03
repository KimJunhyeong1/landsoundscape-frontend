import { QueryClient, QueryClientProvider } from "react-query";
import { renderHook } from "@testing-library/react-hooks";
import ObjectID from "bson-objectid";

import { getMyPhotos } from "../api/index";
import useMyPhotos from "../hooks/useMyPhotos";

jest.mock("../api/index");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useMyPhotos", () => {
  test("A list of photos uploaded by a specific user through API is imported.", async () => {
    getMyPhotos.mockResolvedValue([
      {
        _id: "62d6df693365a41fab671241",
        imageUrl:
          "https://landsoundscape.s3.ap-northeast-2.amazonaws.com/pedro-lastra-Nyvq2juw4_o-unsplash%20%281%29.jpg",
        tags: ["#chainlink fence"],
        country: "United States",
        city: "Chicago",
      },
      {
        _id: "62d6dfd73365a41fab67124f",
        imageUrl:
          "https://landsoundscape.s3.ap-northeast-2.amazonaws.com/anthony-delanoix-Q0-fOL2nqZc-unsplash.jpg",
        tags: ["#stupa"],
        country: "France",
        city: "Paris",
      },
    ]);
    const testUserId = new ObjectID().toHexString();
    const { waitFor, result } = renderHook(() => useMyPhotos(testUserId), {
      wrapper,
    });

    await waitFor(() => {
      return result.current.isSuccess;
    });

    expect(getMyPhotos).toHaveBeenCalledTimes(1);
    expect(result.current.data).toBeDefined();
    expect(result.current.data).toEqual([
      {
        _id: "62d6df693365a41fab671241",
        imageUrl:
          "https://landsoundscape.s3.ap-northeast-2.amazonaws.com/pedro-lastra-Nyvq2juw4_o-unsplash%20%281%29.jpg",
        tags: ["#chainlink fence"],
        country: "United States",
        city: "Chicago",
      },
      {
        _id: "62d6dfd73365a41fab67124f",
        imageUrl:
          "https://landsoundscape.s3.ap-northeast-2.amazonaws.com/anthony-delanoix-Q0-fOL2nqZc-unsplash.jpg",
        tags: ["#stupa"],
        country: "France",
        city: "Paris",
      },
    ]);
  });
});
