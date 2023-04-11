
export async function getAllUsers() {

    const response = await fetch('/api/patients');
    return await response.json();
}

export async function createUser(data: {firstname: string, lastname: string, email: string}) {
    const response = await fetch(`/api/patient`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({patient: data})
      })
    return await response.json();
}