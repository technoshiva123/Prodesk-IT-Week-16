import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext); 
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-[100] w-full border-b border-white/5 bg-[#030712] backdrop-blur-xl text-white">
            <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
                <Link to="/" className="text-xl font-black text-violet-400 tracking-tighter hover:opacity-80 transition">
                    TaskMatrix
                </Link>
                
                <div className="hidden md:flex items-center space-x-8">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="text-sm font-medium text-gray-400 hover:text-white transition">Dashboard</Link>
                            <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-xl border border-red-500/20 hover:bg-red-500 hover:text-white transition text-xs font-bold uppercase tracking-wider">
                                <LogOut size={14} /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm font-medium text-gray-400 hover:text-white transition">Login</Link>
                            <Link to="/register" className="bg-violet-600 px-6 py-2 rounded-xl font-bold hover:bg-violet-500 transition text-sm shadow-lg shadow-violet-500/20">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>

                <button className="md:hidden p-2 text-gray-400" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden absolute w-full bg-[#030712] border-b border-white/5 p-6 space-y-4 animate-in slide-in-from-top-5 duration-300">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="block text-gray-300 font-medium" onClick={() => setIsOpen(false)}>Dashboard</Link>
                            <button onClick={handleLogout} className="w-full text-left text-red-400 font-medium">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="block text-gray-300 font-medium" onClick={() => setIsOpen(false)}>Login</Link>
                            <Link to="/register" className="block bg-violet-600 text-center py-3 rounded-xl font-bold shadow-lg shadow-violet-500/20" onClick={() => setIsOpen(false)}>Register</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;