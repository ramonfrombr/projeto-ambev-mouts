import Link from "next/link"

const Navbar=()=>{
    return (
        <nav className="flex justify-between items-center bg-cyan-100 px-8 py-3">
            <Link className="text-black font-bold" href={"/"}>List of Users</Link>
            <Link className="bg-white p-2" href={"/create"}>Create User</Link>
        </nav>
    )
}
export default Navbar;