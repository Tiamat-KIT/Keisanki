
import {useState} from "react"
import "./index.css"

interface ForDefaultType {
  name: string,
  price: number
}

type RowData = {
  Add: ForDefaultType[],
  Sub: ForDefaultType[]
  
}

function App() {
  const [store,setStore] = useState<RowData>({
    Add: [] as unknown as ForDefaultType[],
    Sub: [] as unknown as ForDefaultType[]
  })

 

  function For({each}:{each: ForDefaultType[]}){
      return (
        <>
        {each.map((data,index) => {
          return (
            <tr>
              <th>{index + 1}</th>
              <td>{data.name}</td>
              <td>{data.price}</td>
            </tr>
          )
        })}
        </>
      )
    }

  return (
    <>
      <nav>

      </nav>
      <main>
      <form 
          id="add"
          className='form-control'
          onSubmit={(event) => {
          event.preventDefault()
            const formDatus = new FormData(
              document.getElementById("add") as HTMLFormElement,
              document.querySelector("button[value=submit]") as HTMLElement
            )
            const resultVal = {
              name: formDatus.get("name") as string,
              price:formDatus.get("price") as string
            }
            if(formDatus.get("select") as string === "Add"){
              setStore({Add: [...store.Add,{
                name: resultVal.name,
                price: Number(resultVal.price)
              }],Sub: [...store.Sub]})
            }else {
              setStore(
                {
                  Add:[...store.Add],
                  Sub: [...store.Sub,{
                    name: resultVal.name,
                    price: Number(resultVal.price)
                  }]
              }
              )
            }
        }}>
          <div className='grid grid-cols-3 max-x-md'>
            <div>
              <label className='label'><span className='label-text'>Input Name</span></label>
              <input type="text" className='input w-full max-w-xs' name="name" />
            </div>
            <div>
              <label className='label'><span className='label-text'>Input Price</span></label>
              <input type="number" className='input w-full max-w-xs' name='price' />
            </div>
            <div className='pt-9'>
              <select name="select" className='select select-bordered w-full max-w-xs'>
                <option disabled selected>Select Add or Sub</option>
                <option value="Add">Add</option>
                <option value="Sub">Sub</option>
              </select>
            </div>
          </div>        
          
          <input type='submit' className='btn' value="submit" />
        </form>
        <div className='flex flex-row'>
          <div className='basis-1/2'>
          <h3 className='text-xl'>Add</h3>
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
              <For each={store.Add} />
              </tbody>
            </table>
            
          </div>
          <div className='basis-1/2'>
            <h3 className='text-xl'>Sub</h3>
          <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
              <For each={store.Sub} />
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
