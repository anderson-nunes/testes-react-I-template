import { render, screen } from "@testing-library/react"
import TodoList from "../components/TodoList"
import userEvent from "@testing-library/user-event"

describe("TodoList", () => {

  test("deve renderizar com o título", () => {

    render(<TodoList />)

    const title = screen.getByText("Todo List")
    expect(title).toBeInTheDocument()
  })

  test("o input deve iniciar vazio", () => {

    render(<TodoList />)
    const input = screen.getByPlaceholderText("Enter a todo")
    expect(input).toHaveValue("")
  })

  test("deve atualizar o valor do input ao digitar nele", async () => {

    render(<TodoList />)
    screen.debug()
    const user = userEvent.setup()
    const input = screen.getByPlaceholderText("Enter a todo")
    await user.type(input, "bananinha")
    screen.debug()
    expect(input).toHaveValue("bananinha")
  })

  test("deve renderizar uma nova tarefa ao digitar no input e pressionar a tecla enter", async () => {
    render(<TodoList />)
    const user = userEvent.setup()
    const input = screen.getByPlaceholderText("Enter a todo")
    await user.type(input, "bananinha{enter}")
    const todoItem = screen.getByText("bananinha")
    expect(todoItem).toBeInTheDocument()
  })

  test("deve alterar o status da tarefa quando o botão de alterar a tarefa for clicado", async () => {
    render(<TodoList />)
    const user = userEvent.setup()
    const input = screen.getByPlaceholderText("Enter a todo")
    await user.type(input, "bananinha{enter}")
    const todoItem = screen.getByText("bananinha")
    const toggleButton = screen.getByText("Toggle")
    await user.click(toggleButton)
    expect(todoItem).toHaveStyle("text-decoration: line-through")
    await user.click(toggleButton)
    expect(todoItem).toHaveStyle("text-decoration: none")
  })

  test("deve remover a tarefa quando o botão de deleter for clicado", async () => {
    render(<TodoList />)
    const user = userEvent.setup()
    const input = screen.getByPlaceholderText("Enter a todo")
    await user.type(input, "bananinha{enter}")
    const todoItem = screen.getByText("bananinha")
    const deleteTarefa = screen.getByText("Delete")
    await user.click(deleteTarefa)
    expect(todoItem).not.toBeInTheDocument()
  })
})