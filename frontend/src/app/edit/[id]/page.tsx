import { redirect } from 'next/navigation'
import EditUserForm from "@/components/EditUserForm";
import { IUser } from "@/components/UsersList";

const getUser: (id: string) => Promise<IUser | null> = async (id) => {
  try {
    const res = await fetch(`http://localhost:8082/users/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    const data: IUser = await res.json();
    console.log("user > ", data);
    return data;
  } catch (error) {
    console.log("Error loading topics:", error);
    return null;
  }
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await getUser(id);

  if (!user) {
    redirect("/");
  }

  return (
    <div>
      <EditUserForm id={id} name={user?.name} email={user?.email} />
    </div>
  );
}
