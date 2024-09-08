import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import "./App.css";



export default class App extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <main className="container">
                    <Routes>
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/movies/:id" element={<MovieForm />} />
                        <Route path="/movies" element={<Movies />} />
                        <Route path="/customers" element={<Customers />} />
                        <Route path="/rentals" element={<Rentals />} />
                        <Route path="/not-found" element={<NotFound />} />
                        <Route path="/" element={<Navigate to="/movies" />} />
                        <Route path="*" element={<Navigate to="/not-found" />} />
                    </Routes>
                </main>
            </React.Fragment>
        );
    }
}
