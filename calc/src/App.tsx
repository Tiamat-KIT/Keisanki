import { For, batch, createEffect } from 'solid-js'
import { createStore } from "solid-js/store";

type RowData = {
  Add: {
    name: string,
    price: number
  }[]
  Sub: {
    name: string,
    price: number
  }[]
  
}

function App() {
  const [store,setStore] = createStore<RowData>({
    Add: [] as RowData["Add"],
    Sub: [] as RowData["Sub"]
  })

  const beforeVal: RowData["Add"] = []

  return (
    <>
      <nav>

      </nav>
      <main>
      <form id="add" onSubmit={(event) => {
          event.preventDefault()
          batch(() => {
            const formDatus = new FormData(
              document.getElementById("add") as HTMLFormElement,
              document.querySelector("button[value=submit]") as HTMLElement
            )
            const resultVal = {
              name: formDatus.get("name") as string,
              price:formDatus.get("price") as string
            }
            store.Add.forEach((data) => {
              beforeVal.push(data)
            })
            setStore({Add: [...beforeVal,{
              name: resultVal.name,
              price: Number(resultVal.price)
            }]})
          })
          console.log(store.Add)
        }}>
          <input type="text" name="name" />
          <input type="number" name='price' />
          <input type='submit' value="submit" />
        </form>
        <For each={store.Add}>
          {(data) => <p>{data.name}</p>}
        </For> 
        
      </main>
    </>
  )
}

export default App
