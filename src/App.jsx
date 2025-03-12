import { useState,useCallback, useEffect,useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numAllow,setnumAllow]=useState(false);
  const [charAllow,setCharAllow]=useState(false);
  const [password,setPassword]=useState("");
  const passwordRef=useRef(null)
   const passwordGenertor=useCallback(()=>{
     let pass=""
     let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
     if(numAllow)str+="0123456789"
     if(charAllow)str+="@#!$%^&*"
      for (let i = 1; i <=length; i++) {
        let char=Math.floor(Math.random()*str.length+1)
        pass+=str.charAt(char)
        
      }
      setPassword(pass)

   },[length,numAllow,charAllow,setPassword])
const copyPass=useCallback(()=>{
    passwordRef.current?.select();
    
    navigator.clipboard.writeText(password);
},[password])
   useEffect(()=>{
    passwordGenertor()
   },[length,numAllow,charAllow,passwordGenertor])
  return (
   
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 py-4'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className="flex shadow-md rounded-lg overflow-hidden mb-4">
        <input 
        type="text" 
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
        <button 
        onClick={copyPass}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{
            setLength(e.target.value)
          }}
          />
          <label >Length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
              defaultChecked={numAllow}
              id="numberInput"
              onChange={()=>{
                setnumAllow((prev)=>!prev);
              }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
              defaultChecked={charAllow}
              id="charInput"
              onChange={()=>{
                setCharAllow((prev)=>!prev);
              }}
          />
            <label htmlFor="charInput">Special Characters</label>
        </div>

      </div>

    </div>
  
  )
}

export default App
