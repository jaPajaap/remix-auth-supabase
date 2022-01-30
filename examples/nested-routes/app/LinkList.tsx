import { Link } from 'remix'

export const LinkList = () => {
  return (<ul>
    <li>
      <Link to="/private">Go to private page</Link>
    </li>
    <li>
      <Link to="/private/1">Go to private/1 page</Link>
    </li>
    <li>
      <Link to="/private/1/details">Go to private/1/details page</Link>
    </li>
    <li>
      <Link to="/private/1/other">Go to private/1/other page</Link>
    </li>
  </ul>)
}
