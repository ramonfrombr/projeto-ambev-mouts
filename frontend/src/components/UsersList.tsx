// app/posts/posts.tsx
'use client'
import Link from "next/link";
import { FaPencilAlt } from "react-icons/fa";


import { useQuery } from "@tanstack/react-query";
import RemoveBtn from "@/components/RemoveButton";
import { IUser } from "@/types/iUser";
import { getUsers } from "@/lib/getUsers";

export default function UsersList() {
  const {  isPending, error, data } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <>
      {data.map((n: IUser) => (
        <div key={n.id} className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
          <div>
            <h2 className="fonr-bold text-2xl">{n.name}</h2>
            <div> {n.email}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={n.id} />
            <Link href={`/edit/${n.id}`}>
              <FaPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  )
}