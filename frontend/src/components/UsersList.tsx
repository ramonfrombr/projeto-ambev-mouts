import Link from "next/link";
import RemoveBtn from "./RemoveButton";
import { FaPencilAlt } from "react-icons/fa";

export interface IUser {
  id: number;
  name: string;
  email: string;
}

const getUsers: () => Promise<IUser[]> = async () => {
  try {
    const res = await fetch("http://localhost:8082/users", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    const data: IUser[] = await res.json();
    console.log("data > ", data);
    return data;
  } catch (error) {
    console.log("Error loading topics:", error);
    return [];
  }
};

const UsersList = async () => {
  const users = await getUsers();
  return (
    <>
      {users.map((n: IUser) => (
        <div
          key={n.id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
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
  );
};
export default UsersList;
