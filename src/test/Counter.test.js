import { render, screen } from "@testing-library/react"
import Counter from "../components/Counter"
import userEvent from "@testing-library/user-event"

describe("Counter", () => {
  test("deve renderizar com o título", () => {
    // renderiza o componente
    render(<Counter />)

    // seleciona o elemento
    // const title = screen.getByText("Counter")
    const title = screen.getByText(/counter/i)

    // avalia a assertiva esperada
    expect(title).toBeInTheDocument()
  })

  test("deve iniciar com o valor 0", () => {
    render(<Counter />)

    // o HTML é gerado com o valor em string, mesmo em código sendo number
    const value = screen.getByText("0")

    expect(value).toBeInTheDocument()
  })

  test(
    "deve aumentar o valor do contador em 1 quando o botão de incremento for clicado",
    async () => {

      // configuração do simulador de user (antes de tudo)
      const user = userEvent.setup()

      // renderização do componente
      render(<Counter />)

      // selecionamos o elemento que será interagido
      const incrementButton = screen.getByText("+")

      // simula o clique da pessoa
      await user.click(incrementButton)
      await user.click(incrementButton)
      await user.click(incrementButton)

      // o valor do contador foi pra 1, então selecionamos via "1"
      const value = screen.getByText("3")

      expect(value).toBeInTheDocument()
    })

  test(
    "deve diminuir o valor do contador em 1 quando o botão de decremento for clicado",
    async () => {

      // configuração do simulador de user (antes de tudo)
      const user = userEvent.setup()

      // renderização do componente
      render(<Counter />)

      // selecionamos o elemento que será interagido
      const decrementButton = screen.getByText("-")

      // simula o clique da pessoa
      await user.click(decrementButton)

      // o valor do contador foi pra -1, então selecionamos via "-1"
      const value = screen.getByText("-1")

      expect(value).toBeInTheDocument()
    })
})