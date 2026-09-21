import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import UserList from "./components/UserList";
import UserSearch from "./components/UserSearch";
import "./styles.css";

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3030/jsonstore/users")
            .then((response) => response.json())
            .then((data) => setUsers(Object.values(data)))
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    return (
        <>
            < Header />

            <main className="main">
                <section className="card users-container">
                    <UserSearch />

                    <UserList users={users}/>      

                    <button className="btn-add btn">Add new user</button>          

                    <Pagination />
                </section>

            </main>
            <Footer />
        </>

    )
}

export default App
