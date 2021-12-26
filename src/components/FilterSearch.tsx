import React, { useState } from 'react'

interface SearchProps{
  search: (value: string) => void;
}
function FilterSearch(props: SearchProps) {
  const [valueInput,setValueInput] = useState("");

  const handleSearch = (event : React.FormEvent) =>{
    event.preventDefault();
    if(valueInput.trim()){
        props.search(valueInput);
    }
    setValueInput("");
  }
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>)=> {
    setValueInput(event.target.value)
    // console.log(event.target.value);
  }

  return (
    <div>
      <form action="" onSubmit={handleSearch}>
        <div className="form-group">
          <input 
              className="input" 
              value={valueInput} 
              type="text" 
              placeholder="Search...." 
              onChange={handleChangeInput}
          />
          <button 
              type="submit" 
              className="submit" 
          >Search</button>
        </div>
      </form>        
    </div>
  )
}

export default FilterSearch
