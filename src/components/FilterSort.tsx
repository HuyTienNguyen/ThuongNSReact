import React, { useState } from 'react'

interface FilterSort{
  sort: (type: string) => void;
}

const FilterSort: React.FC<FilterSort> = (props) => {
  const {sort} = props;
  const [type,setType] = useState<string>('');
  function handleSort(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.options[event.target.selectedIndex].value;
    if(value){
      setType(value);
      sort(value);
    }
    
  }
  
  return (
    <>
      <select onChange={handleSort}>
        <option value="">Select field to sort</option>
        <option value="id">Id</option>
        <option value="firstName">First Name</option>
        <option value="lastName">Last Name</option>
        <option value="email">Email</option>
        <option value="birthday">Birthday</option>
        <option value="salary">Salary</option>
      </select>
    </>
  )
}

export default FilterSort
