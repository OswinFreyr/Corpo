export default async function addUser(userData) {
    try {
        const user = await fetch('http://localhost:2000/api/v1/users/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
    
        if (!response.ok) {
          throw new Error('Erreur lors de l\'ajout du joueur');
        }
        resetForm();
    } catch (error: any) {
        throw new Error('Erreur : ' + error);
    }
}
