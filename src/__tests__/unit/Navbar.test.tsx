/// <reference types="vitest" />

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "../../components";
import { BrowserRouter } from "react-router-dom";

const toggleThemeMock = vi.fn();

vi.mock("../../contexts/ThemeContext", () => ({
  useAppThemeContext: () => ({
    themeName: "light",
    toggleTheme: toggleThemeMock,
  }),
}));

const setQueryMock = vi.fn();

vi.mock("../../contexts", () => ({
  useSearchContext: () => ({
    setQuery: setQueryMock,
  }),
}));

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual: typeof import("react-router-dom") = await vi.importActual(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithRouter = (ui: React.ReactNode) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renderiza título 'MovieInfo'", () => {
    renderWithRouter(<Navbar />);
    expect(
      screen.getByRole("link", { name: /movieinfo/i })
    ).toBeInTheDocument();
  });

  test("renderiza botão de alternar tema", () => {
    renderWithRouter(<Navbar />);
    expect(
      screen.getByRole("button", { name: /toggle-theme/i })
    ).toBeInTheDocument();
  });

  test("chama toggleTheme ao clicar no botão de tema", async () => {
    renderWithRouter(<Navbar />);
    const botaoTema = screen.getByRole("button", { name: /toggle-theme/i });
    await userEvent.click(botaoTema);
    expect(toggleThemeMock).toHaveBeenCalled();
  });

  test("navega para /movieinfo/search/valor/1 ao digitar busca", async () => {
    const { useSearchContext } = await import("../../contexts");
    renderWithRouter(<Navbar />);
    const input = screen.getByPlaceholderText(/search/i);

    await userEvent.type(input, "matrix");

    expect(useSearchContext().setQuery).toHaveBeenCalledWith("matrix");
    expect(mockNavigate).toHaveBeenCalledWith("/movieinfo/search/matrix/1");
  });

  test("navega para /home se o input estiver vazio", async () => {
    renderWithRouter(<Navbar />);
    const input = screen.getByPlaceholderText(/search/i);

    await userEvent.type(input, " ");
    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });

  test("link to /home", () => {
    renderWithRouter(<Navbar />);
    const link = screen.getByRole("link", { name: /MovieInfo/i });
    expect(link).toHaveAttribute("href", "/home");
  });
});
