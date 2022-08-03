import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot, useRecoilValue } from "recoil";
import { render } from "@testing-library/react";
import { screen, fireEvent } from "@testing-library/dom";

import AsideButtons from "../components/AsideButtons";
import modalState from "../recoil/modal/atom";

const RecoilObserver = ({ node, onChange }) => {
  const value = useRecoilValue(node);
  useEffect(() => onChange(value), [onChange, value]);

  return null;
};

describe("The modal state should", () => {
  const renderMainPage = (state, onChange) => {
    return render(
      <RecoilRoot>
        <RecoilObserver node={modalState} onChange={onChange} />
        <BrowserRouter>
          <AsideButtons />
        </BrowserRouter>
      </RecoilRoot>,
    );
  };

  test("change when the user click a searchIcon", () => {
    const onChange = jest.fn();

    renderMainPage(modalState, onChange);

    const searchIcon = screen.getByTestId("search_icon");

    fireEvent.click(searchIcon);

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith(null);
    expect(onChange).toHaveBeenCalledWith({
      modalType: "SearchModal",
      modalProps: { title: "Search" },
    });
  });
});
