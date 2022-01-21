import { Navigate } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'

export default function Admin() {
  const user = memoryUtils.user
  if (!user || !user._id) {
    return <Navigate to="/login" />
  }
  return (
    <div>Admin</div>
  )
}