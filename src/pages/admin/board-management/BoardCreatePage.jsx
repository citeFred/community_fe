import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBoard } from "../../../apis/features/boards";

function BoardCreatePage() {
    const [formData, setFormData] = useState({
        title: '',
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

    const handleCreateBoard = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        try {
            await createBoard(formData);
            alert(`새 게시판 "${formData.title}"이(가) 생성되었습니다!`);   
            navigate('/admin/boards');
            
        } catch (err) {
            const errorMessage = err.response?.data || '알 수 없는 오류가 발생했습니다.';
            setMessage(`게시판 생성 실패: ${errorMessage}`);
            setIsError(true);
            console.error('Board creation failed:', err);
        }
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto space-y-8">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 mb-2">
                            New Board
                        </span>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            새 게시판 생성
                        </h1>
                    </div>
                    <button 
                        onClick={() => navigate('/admin/boards')} 
                        className="group flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
                    >
                        <svg className="w-4 h-4 text-gray-400 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        목록으로
                    </button>
                </div>

                <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden border border-gray-100">
                    <div className="p-8 sm:p-10">
                        <form onSubmit={handleCreateBoard} className="space-y-8">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">
                                    게시판 이름
                                </label>
                                <input 
                                    type="text" 
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange} 
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400 text-lg" 
                                    placeholder="예: 자유게시판, 공지사항..."
                                    required 
                                    autoFocus
                                />
                                <p className="mt-2 text-xs text-gray-500 ml-1">
                                    * 사용자들이 알아보기 쉬운 직관적인 이름을 입력해주세요.
                                </p>
                            </div>

                            <button 
                                type="submit" 
                                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:from-blue-700 hover:to-indigo-700 transform transition hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                게시판 생성하기
                            </button>
                        </form>

                        {message && (
                            <div className={`mt-8 p-4 rounded-xl flex items-center gap-3 ${
                                isError 
                                ? 'bg-red-50 text-red-700 border border-red-100' 
                                : 'bg-green-50 text-green-700 border border-green-100'
                            }`} role="alert">
                                {isError ? (
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                                <span className="text-sm font-medium">{message}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoardCreatePage;