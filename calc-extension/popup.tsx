import {useStorage} from "@plasmohq/storage/hook"
import { Storage } from "@plasmohq/storage"
import "./index.css"
import { useCallback, useMemo } from "react"

const strage = new Storage(
  {area: "local"}
)

interface ForDefaultType {
  name: string,
  price: number
}

type RowData = {
  Add: ForDefaultType[],
  Sub: ForDefaultType[]
  
}

function App() {

  const [StrageDatus, setStrageDatus] = useStorage<RowData>("RowData", (data) => {
    return data === undefined ? {
      Add: [] as unknown as ForDefaultType[],
      Sub: [] as unknown as ForDefaultType[]
    } : data
    })


  function For({each,text}:{each: ForDefaultType[],text: string}){
    const Comp = useCallback(() => {
      return(
        <>
        {each.map((data,index) => {
          return (
            <tr key={index} id={`${text}-${index}`}>
              <th>{index + 1}</th>
              <td>{data.name}</td>
              <td>{data.price}</td>
              <td><button className='btn btn-error' onClick={() => {
                if(text === "add"){
                  StrageDatus.Add.splice(index,1)
                  setStrageDatus({Add: [...StrageDatus.Add],Sub: [...StrageDatus.Sub]})
              }else{
                StrageDatus.Sub.splice(index,1)
                setStrageDatus({Add: [...StrageDatus.Add],Sub: [...StrageDatus.Sub]})
              }
              } }>Del</button></td>
            </tr>
          )
        })}
        </>
      )
    },[StrageDatus])
      return Comp()
    }

    const Result = useMemo(() => {
      return StrageDatus.Add.reduce((acc,cur) => {
        return acc + cur.price
      },0) - StrageDatus.Sub.reduce((acc,cur) => {
        return acc + cur.price
      },0)
    },[StrageDatus])
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
              setStrageDatus({Add: [...StrageDatus.Add,{
                name: resultVal.name,
                price: Number(resultVal.price)
              }],Sub: [...StrageDatus.Sub]})
            }else {
              setStrageDatus(
                {
                  Add:[...StrageDatus.Add],
                  Sub: [...StrageDatus.Sub,{
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
              <select name="select" defaultValue="default" className='select select-bordered w-full max-w-xs'>
                <option disabled value="default">Select Add or Sub</option>
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
                  <th>Del</th>
                </tr>
              </thead>
              <tbody>
              <For each={StrageDatus.Add} text="add"/>
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
                  <th>Del</th>
                </tr>
              </thead>
              <tbody>
              <For each={StrageDatus.Sub} text="sub"/>
              </tbody>
            </table>
          </div>
        </div>
        <h2 className='text-2xl'>Result:{Result}</h2>
      </main>
    </>
  )
}

export default App
