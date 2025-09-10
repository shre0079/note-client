import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
// 1. Import your new service functions
import { loginUser, signupUser } from "../services/authService";

export const Singup = ({ show2, handleClose2 }) => {
    const [login, setLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPass, setCPass] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (login) {
                // 2. Call the login service
                const data = await loginUser({ email, password });
                sessionStorage.setItem('email', data.email);
                alert("Login Successful");
            } else {
                if (password !== cPass) {
                    alert("Passwords do not match");
                    return; // Stop execution
                }
                // 3. Call the signup service
                await signupUser({ name, email, password });
                sessionStorage.setItem('email', email);
                alert("Signup Successful");
            }
            window.location.reload(); // Reload on success
        } catch (error) {
            // 4. Catch any errors from the API call
            alert(`Error: ${error.message}`);
        }
    };

    // ... your JSX remains exactly the same
    return (
        <Modal show={show2} onHide={handleClose2}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column justify-content-center" id="login-box">
                    {/* Your existing JSX for the form */}
                    <div className="login-box-header">
                        <h4 style={{ color: "rgb(139, 139, 139)", marginBottom: 0, fontWeight: 400, fontSize: 27 }}>
                            {login ? "Login" : "SignUp"}
                        </h4>
                    </div>
                    <div className="email-login" style={{ backgroundColor: "#ffffff" }}>
                        {!login && (
                            <input
                                type="text"
                                className="email-imput form-control"
                                style={{ marginTop: 10 }}
                                required
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                            />
                        )}
                        <input
                            type="email"
                            className="email-imput form-control"
                            style={{ marginTop: 10 }}
                            required
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            className="password-input form-control"
                            style={{ marginTop: 10 }}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            placeholder="Password"
                        />
                        {!login && (
                            <input
                                type="password"
                                className="password-input form-control"
                                style={{ marginTop: 10 }}
                                required
                                value={cPass}
                                onChange={(e) => setCPass(e.target.value)}
                                name="CPass"
                                placeholder="Confirm Password"
                            />
                        )}
                    </div>
                    <div className="submit-row" style={{ marginBottom: 8, paddingTop: 0 }}>
                        <button
                            className="btn btn-primary d-block box-shadow w-100"
                            onClick={handleSubmit}
                            type="submit"
                        >
                            {login ? "Login" : "SignUp"}
                        </button>
                    </div>
                    <div id="login-box-footer" style={{ padding: "10px 20px", paddingBottom: 23, paddingTop: 18 }}>
                        <p style={{ marginBottom: 0 }}>
                            {login ? "Don't have an account?" : "You have an account?"}
                            <a id="register-link" onClick={() => setLogin(!login)}>
                                {login ? " Sign Up!!" : " Login!!"}
                            </a>
                        </p>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};