export default async function updateUser(id, userData) {
    try {
        const user = await fetch('http://localhost:2000/api/v1/users/update?id=' + id, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
    
        if (!user.ok) {
          throw new Error('Erreur lors de la modification du joueur');
        }
        return user
    } catch (error) {
        throw new Error('Erreur : ' + error);
    }
}
