export default async function askOneUser(id) {
    const userData = await fetch(`http://localhost:2000/api/v1/users/id?id=${id}`);
    const user = await userData.json();
    return user;
}