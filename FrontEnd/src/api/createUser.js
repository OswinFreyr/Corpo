export default async function addUser(userData) {
    try {
        const user = await fetch('http://localhost:2000/api/v1/users/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
    
        if (!user.ok) {
          throw new Error('Erreur lors de l\'ajout du joueur');
        }
        return user
    } catch (error) {
        throw new Error('Erreur : ' + error);
    }
}
