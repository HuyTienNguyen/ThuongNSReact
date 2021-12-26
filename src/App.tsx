import React, { useEffect, useState } from 'react';
import './App.css';
import UserData from './data/users.json';
import UserTable from './components/UserTable';
import FilterSort from './components/FilterSort';
import FilterSearch from './components/FilterSearch';
import PaginationProps from './components/Pagination';
interface User{
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  gender: string,
  birthday: string,
  salary: number,
  phone: string
}

interface Pagination{
  page: number;
  limit: number;
  total: number;
}

function App() {

  const[users,setUsers] = useState<User[]>([]);
  const[filterSort,setFilterSort] = useState<string>('');
  const[filterSearch,setFilterSearch] = useState<string>('');
  const[pagination,setPagination] = useState<Pagination>({limit: 10,page: 1,total: users.length});
  const{page,limit,total} = pagination;
  const [userPaging,setUserPaging] = useState<User[]>([]);
  useEffect(()=> {
    let sorted = UserData;
    if(filterSearch){
      sorted = sorted.filter((item: any) => {
        return Object.keys(item).some((key) => {
          return item[key].toString().toLowerCase().includes(filterSearch);
        })
      })
    }
    if(filterSort){
      sorted = sorted.sort((a: any,b: any) => {
        if(filterSort === 'birthday'){
          return (new Date(a[filterSort])).getTime() - (new Date(b[filterSort])).getTime();
        }else {
          if( a[filterSort] > b[filterSort]) return 1;
          else if (a[filterSort] < b[filterSort]) return -1;
          return 0;
        }
        
      }) 
    }
    setUsers([...sorted]);
    setPagination({...pagination,page : 1,total: sorted.length});
  },[filterSort,filterSearch])


  useEffect(() => {
    let usersList = [];
    
    if(page* limit > total){
      for(let i = (page-1)*limit; i < total; i++){
        usersList.push(users[i]);
      }
    }else {
      for(let i = (page-1)*limit; i < page*limit; i++){
        usersList.push(users[i]);
      }
    }
    
    setUserPaging(usersList);
  },[pagination])
  const handleSort = (type: string)=> {
    setFilterSort(type);
  }

  const handleSearch = (input: string) => {
    setFilterSearch(input.toLowerCase());
  }

  const handlePagination = (page: number) => {
    setPagination({...pagination,page: page})
  }
  return (
    <>
      <h1>A simple web app</h1>
      <h2 style={{display: 'inline-block',marginRight: '10px'}}>OrderBy </h2>
      <FilterSort sort={handleSort}/>
      <FilterSearch search={handleSearch}/>
      <UserTable data= {userPaging}/>
      <PaginationProps pagination={pagination} onPageChange={handlePagination}/>
    </>
  );
}

export default App;
