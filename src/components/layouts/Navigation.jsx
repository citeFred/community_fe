import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavLinks from "./NavLinks";
import { useAuth } from "../../hooks/useAuth"; 

function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const { isLoggedIn, userRole, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (typeof logout === 'function') {
            logout();
        } else {
            localStorage.removeItem('accessToken');
        }
        
        alert('로그아웃 되었습니다.');
        setIsOpen(false);
        navigate('/');
        window.location.reload();
    };

    const handleClose = () => setIsOpen(false);

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    <div className="flex-shrink-0 flex items-center">
                        <Link 
                            to="/" 
                            onClick={handleClose}
                            className="flex items-center gap-2 group"
                        >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md group-hover:shadow-blue-500/30 transition-all">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-xl font-extrabold text-gray-800 tracking-tight group-hover:text-blue-600 transition-colors">
                                Citefred<span className="text-blue-600">Commu</span>
                            </span>
                        </Link>
                    </div>

                    <ul className="hidden md:flex items-center space-x-1">
                        <NavLinks 
                            isLoggedIn={isLoggedIn} 
                            userRole={userRole} 
                            onLogout={handleLogout} 
                        />
                    </ul>
                    
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none transition-colors"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg z-50`}>
                <ul className="px-4 pt-2 pb-6 space-y-2">
                    <NavLinks 
                        onClick={handleClose} 
                        isLoggedIn={isLoggedIn} 
                        userRole={userRole} 
                        onLogout={handleLogout}
                        isMobile={true}
                    />
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;