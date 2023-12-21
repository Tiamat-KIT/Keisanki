import { For, batch} from 'solid-js'
import { createStore } from "solid-js/store";
import "./index.css"

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

  return (
    <>
      <nav>

      </nav>
      <main>
      <form 
          id="add"
          class='form-control'
          onSubmit={(event) => {
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
            if(formDatus.get("select") as string === "Add"){
              setStore({Sub: [...store.Sub,{
                name: resultVal.name,
                price: Number(resultVal.price)
              }]})
            }else {
              setStore({Add: [...store.Add,{
                name: resultVal.name,
                price: Number(resultVal.price)
              }]})
            }
            
          })
        }}>
          <div class='grid grid-cols-3 max-x-md'>
            <div>
              <label class='label'><span class='label-text'>Input Name</span></label>
              <input type="text" class='input w-full max-w-xs' name="name" />
            </div>
            <div>
              <label class='label'><span class='label-text'>Input Price</span></label>
              <input type="number" class='input w-full max-w-xs' name='price' />
            </div>
            <div class='pt-9'>
              <select name="select" class='select select-bordered w-full max-w-xs'>
                <option disabled selected>Select Add or Sub</option>
                <option value="Add">Add</option>
                <option value="Sub">Sub</option>
              </select>
            </div>
          </div>        
          
          <input type='submit' class='btn' value="submit" />
        </form>
        <div class='flex flex-row'>
          <div class='basis-1/2'>
          <h3 class='text-xl'>Add</h3>
            <table class="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
              <For each={store.Add}>
                {(data,index) => 
                <tr>
                  <th>{index() + 1}</th>
                  <td>{data.name}</td>
                  <td>{data.price}</td>
                </tr>
                }
              </For> 
              </tbody>
            </table>
            
          </div>
          <div class='basis-1/2'>
            <h3 class='text-xl'>Sub</h3>
          <table class="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
              <For each={store.Sub}>
                {(data,index) => 
                <tr>
                  <th>{index() + 1}</th>
                  <td>{data.name}</td>
                  <td>{data.price}</td>
                </tr>
                }
              </For> 
              </tbody>
            </table>
          </div>
        </div>
        
        
      </main>
    </>
  )
}

export default App
