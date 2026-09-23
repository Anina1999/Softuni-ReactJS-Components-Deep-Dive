import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import UserList from "./components/UserList";
import UserSearch from "./components/UserSearch";
import "./styles.css";
import SaveUserModal from "./components/SaveUserModal";

const baseUrl = "http://localhost:3030/jsonstore/users";

function App() {
    const [users, setUsers] = useState([]);
    const [showSaveUserModal, setShowSaveUserModal] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3030/jsonstore/users")
            .then((response) => response.json())
            .then((data) => setUsers(Object.values(data)))
            .catch((error) => console.error("Error fetching users:", error));
    }, []);
    
    const addUserClickHandler = () => {
        setShowSaveUserModal(true);
    }

    const addUserCloseHandler = () => {
        setShowSaveUserModal(false);
    }

    const submitUserHandler = (userData) => {
        fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
        .then((response) => response.json())
        .then((data) => {
            setUsers((prevUsers) => [...prevUsers, data]);
            setShowSaveUserModal(false);
        })
        .catch((error) => alert("Error adding user:", error))
    }

    return (
        <>
            < Header />

            <main className="main">
                <section className="card users-container">
                    <UserSearch />

                    <UserList users={users}/>      

                    <button className="btn-add btn" onClick={addUserClickHandler}>
                        Add new user
                    </button>
                    {showSaveUserModal && <SaveUserModal onClose={addUserCloseHandler} onSubmit={submitUserHandler} />}

                    <Pagination />
                </section>

            </main>
            <Footer />
        </>

    )
}

export default App
