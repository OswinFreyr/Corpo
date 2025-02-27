export default async function askUsers() {
    const usersData = await fetch("http://localhost:2000/api/v1/users/");
    const users = await usersData.json();
    return users;
}