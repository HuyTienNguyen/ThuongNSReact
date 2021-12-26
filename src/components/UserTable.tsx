import React from 'react'

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
interface UserTable{
  data: User[]
}
const UserTable: React.FC<UserTable> = (props) =>{
  const {data} = props;
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope='col'>Gender</th>
            <th scope='col'>Birthday</th>
            <th scope='col'>Salary</th>
            <th scope='col'>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => {
            let phone = user.phone;
            let date = new Date(user.birthday);
            let dd = String(date.getDate()).padStart(2, '0');
            let mm = String(date.getMonth() + 1).padStart(2, '0');
            let yyyy = date.getFullYear();
            let birthday = `${dd}/${mm}/${yyyy}`;
            return (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{birthday}</td>
                <td>{user.salary}</td>
                <td>{ `(+84)${phone.split('-').join("")}`}</td>
              </tr>
            )
          })}
        </tbody>
      </table> 
    </>
  )
}

export default UserTable
