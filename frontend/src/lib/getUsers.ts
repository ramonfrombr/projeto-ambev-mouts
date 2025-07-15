const getUsers = () => fetch("http://localhost:8082/users").then((res) => res.json())

export { getUsers }