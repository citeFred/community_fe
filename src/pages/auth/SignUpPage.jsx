import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../apis/features/auth';

function SignUpPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        nickname: '',
        email: ''
    });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        try {
            await signup(formData);
            alert('회원가입 성공! 로그인 페이지로 이동합니다.');
            navigate('/login');
            
        } catch (err) {
            const errorMessage = err.response?.data || '알 수 없는 오류가 발생했습니다.';
            setMessage(`회원가입 실패: ${errorMessage}`);
            setIsError(true);
            console.error('Signup failed:', err);
        }
    };

    return (
        <main className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-blue-900/10 border border-gray-100 p-8 sm:p-10">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 mb-4">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900">회원가입</h1>
                    <p className="mt-2 text-sm text-gray-500">새로운 계정을 생성하고 커뮤니티에 참여하세요.</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                            아이디
                        </label>
                        <input 
                            type="text" 
                            name="username" 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400" 
                            placeholder="사용할 아이디를 입력하세요"
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                            비밀번호
                        </label>
                        <input 
                            type="password" 
                            name="password" 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400" 
                            placeholder="비밀번호를 입력하세요"
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                            닉네임
                        </label>
                        <input 
                            type="text" 
                            name="nickname" 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400" 
                            placeholder="커뮤니티에서 사용할 닉네임"
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                            이메일
                        </label>
                        <input 
                            type="email" 
                            name="email" 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400" 
                            placeholder="example@email.com"
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="w-full py-3.5 px-4 mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:from-blue-700 hover:to-indigo-700 transform transition hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        회원가입 완료
                    </button>
                </form>

                {message && (
                    <div className={`mt-6 p-4 rounded-xl text-sm font-medium text-center border flex items-center justify-center gap-2 animate-pulse ${
                        isError 
                        ? 'bg-red-50 text-red-600 border-red-100' 
                        : 'bg-green-50 text-green-600 border-green-100'
                    }`} role="alert">
                        {isError ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                        {message}
                    </div>
                )}
            </div>
        </main>
    );
}

export default SignUpPage;