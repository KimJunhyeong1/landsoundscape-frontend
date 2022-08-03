import { render } from "@testing-library/react";

import MainPageHeader from "../components/MainPageHeader";

describe("MainPageHeader", () => {
  const renderMainPageHeader = (creator, city, country) => {
    return render(
      <MainPageHeader creator={creator} city={city} country={country} />,
    );
  };

  it("The creator, city, and country given the factor are capitalized.", () => {
    const [creator, city, country] = ["June", "Busan", "Korea"];
    const { container } = renderMainPageHeader(creator, city, country);

    expect(container).toHaveTextContent(creator.toUpperCase());
    expect(container).toHaveTextContent(city.toUpperCase());
    expect(container).toHaveTextContent(country.toUpperCase());
  });
});
