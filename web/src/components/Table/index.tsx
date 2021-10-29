import React from "react"
import { IDomain } from "../../App"
import "./styles.css"

interface Props {
  list: IDomain[]
}

const Table: React.FC<Props> = (props) => {
  return (
    <td className="sub-table-container">
      <table className="sub-table">
        {props.list.map(item => (
          <tr>
            <td>{item.codigo}</td>
            <td>{item.descricao}</td>
          </tr>
        ))}
      </table>
    </td>
    
  )
}


export { Table }
