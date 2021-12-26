import React from 'react'

interface Pagination{
  page: number;
  limit: number;
  total: number;
}

interface PaginationProps{
  pagination: Pagination,
  onPageChange: (newPage: number) => void
}
function Pagination(props: PaginationProps) {
  const { pagination, onPageChange} = props;
  const { page, limit, total} = pagination;

  const totalPages = Math.ceil(total/limit);

  function handlePageChange(newPage : number,event : React.MouseEvent<HTMLAnchorElement>){
    event.defaultPrevented = true;
    onPageChange(newPage);
  }
  const listPage = []
  for(let i = 1; i <= totalPages;i++){
    listPage.push(<li key={i} className={`page-item ${page == i ? 'active': ""}` }><a className="page-link" href="#" onClick={(e) => {handlePageChange(i,e)}}>{i}</a></li>)
  }
  
  return (
    <nav aria-label="...">
    <ul className="pagination">
      <li className={`page-item ${page <=1 ? 'disabled': ""}` }>
        <a className="page-link" href="#" aria-disabled={page <= 1} onClick={(e) => {handlePageChange(page - 1,e)}}>Previous</a>
      </li>
      {listPage}
      <li className={`page-item ${page >= totalPages ? 'disabled': ""}` }>
        <a className="page-link" href="#" aria-disabled={page >= totalPages} onClick={(e) => {handlePageChange(page + 1,e)}}>Next</a>
      </li>
    </ul>
  </nav>
  )
}

export default Pagination
