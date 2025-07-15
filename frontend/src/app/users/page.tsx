// app/posts/page.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { getUsers } from '../../lib/getUsers'
import UsersList from '@/components/UsersList'

export default async function UsersPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: getUsers,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UsersList />
    </HydrationBoundary>
  )
}