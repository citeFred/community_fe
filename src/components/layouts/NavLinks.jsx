import { Link } from "react-router-dom";

function NavLinks({ onClick, isLoggedIn, userRole, onLogout, isMobile = false }) {
    const baseStyle = `block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        isMobile 
        ? "text-base py-3 text-gray-600 hover:bg-gray-50 hover:text-blue-600" 
        : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
    }`;

    const primaryBtnStyle = `block px-5 py-2 rounded-lg text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-all duration-200 transform active:scale-95 ${
        isMobile
        ? "w-full text-center py-3 bg-blue-600"
        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:-translate-y-0.5"
    }`;

    return (
        <>
            <li>
                <Link className={baseStyle} to="/boards" onClick={onClick}>
                    게시판
                </Link>
            </li>
            <li>
                <Link className={baseStyle} to="/chatbot" onClick={onClick}>
                    AI 챗봇
                </Link>
            </li>

            {isLoggedIn && userRole === 'ROLE_ADMIN' && (
                <li>
                    <Link 
                        className={`${baseStyle} text-amber-600 hover:text-amber-700 hover:bg-amber-50`} 
                        to="/admin" 
                        onClick={onClick}
                    >
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            관리자
                        </span>
                    </Link>
                </li>
            )}

            {isLoggedIn ? (
                <li className={isMobile ? "mt-4 pt-4 border-t border-gray-100" : "ml-2"}>
                    <button 
                        onClick={onLogout} 
                        className={`${baseStyle} w-full text-left flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50`}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        로그아웃
                    </button>
                </li>
            ) : (
                <>
                    <li className={isMobile ? "mt-4 pt-4 border-t border-gray-100" : "ml-2"}>
                        <Link className={baseStyle} to="/login" onClick={onClick}>
                            로그인
                        </Link>
                    </li>
                    <li className={isMobile ? "mt-2" : "ml-2"}>
                        <Link className={primaryBtnStyle} to="/signup" onClick={onClick}>
                            회원가입
                        </Link>
                    </li>
                </>
            )}
        </>
    );
}

export default NavLinks;