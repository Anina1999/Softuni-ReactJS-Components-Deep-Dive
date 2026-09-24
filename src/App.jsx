import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import UserList from "./components/UserList";
import UserSearch from "./components/UserSearch";
import "./styles.css";
import SaveUserModal from "./components/SaveUserModal";
import { fetchUsers } from "./api/usersApi";

const baseUrl = "http://localhost:3030/jsonstore/users";

function App() {
    const [users, setUsers] = useState([]);
    const [showSaveUserModal, setShowSaveUserModal] = useState(false);

    useEffect(() => {
        fetchUsers()
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error fetching users:", error));
    }, []);
    
    const addUserClickHandler = () => {
        setShowSaveUserModal(true);
    }

    const addUserCloseHandler = () => {
        setShowSaveUserModal(false);
    }

    const submitUserHandler = async (userData) => {
        try {
            //Send user to REST API
            await fetch(baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            //Fetch All users after adding a new one 
            const updatedUsers = await fetchUsers();

            //Update state
            setUsers(updatedUsers);
        } catch (error) {
            alert("Error adding user:", error)
        } finally {
            setShowSaveUserModal(false);
        }
    }

    const userUpdateHandler = async () => {
        try {
            const updatedUsers = await fetchUsers();
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error updating users:', error);
        }
    }

    return (
        <>
            < Header />

            <main className="main">
                <section className="card users-container">
                    <UserSearch />

                    <UserList users={users} onUserUpdate={userUpdateHandler}/>      

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
