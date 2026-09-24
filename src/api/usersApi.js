const baseUrl = "http://localhost:3030/jsonstore/users";

export async function fetchUsers() {
    const response = await fetch(baseUrl);
    const data = await response.json();

    return Object.values(data);
}