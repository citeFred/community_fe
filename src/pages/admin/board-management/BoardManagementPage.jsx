import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBoards } from "../../../apis/features/boards";

function BoardManagementPage() {
    const [boards, setBoards] = useState([]);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchBoards = async () => {
            setMessage('');
            setIsError(false);

            try {
                const response = await getBoards();
                setBoards(response.data);
            } catch (err) {
                const errorMessage = err.response?.data || '게시판 조회 중 오류가 발생했습니다.';
                setMessage(`게시판 조회 실패: ${errorMessage}`);
                setIsError(true);
                console.error('Fetching boards list failed:', err);
            }
        };
        fetchBoards();
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 mb-3 tracking-wide">
                        BOARDS MANAGEMENT
                    </span>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                        게시판 관리
                    </h1>
                    <p className="mt-3 text-gray-500">
                        서비스에 표시될 게시판 목록을 조회하고 관리합니다.
                    </p>
                </div>
                <button 
                    onClick={() => navigate('/admin/boards/create-form')}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:from-blue-700 hover:to-indigo-700 transform transition hover:-translate-y-0.5 active:scale-95"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    새 게시판 생성
                </button>
            </div>

            {message && (
                <div className={`p-4 rounded-xl flex items-center gap-3 shadow-sm ${
                    isError 
                    ? 'bg-red-50 text-red-700 border border-red-100' 
                    : 'bg-blue-50 text-blue-700 border border-blue-100'
                }`}>
                    {isError ? (
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                    <span className="font-medium text-sm">{message}</span>
                </div>
            )}

            <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/80 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-bold">
                                <th className="px-8 py-5 text-center w-24">ID</th>
                                <th className="px-8 py-5">게시판 이름</th>
                                <th className="px-8 py-5 text-center w-48">관리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {boards.length > 0 ? (
                                boards.map((board) => (
                                    <tr key={board.id} className="group hover:bg-blue-50/30 transition-colors duration-200">
                                        <td className="px-8 py-5 text-center text-sm font-medium text-gray-400">
                                            {board.id}
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-base font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                                                {board.title}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button 
                                                    onClick={() => navigate(`/admin/boards/${board.id}/edit-form`)}
                                                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                    title="수정"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button 
                                                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                                    title="삭제"
                                                    onClick={() => alert("삭제 기능은 구현 예정입니다.")}
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-24 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-3 opacity-60">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                            </div>
                                            <p className="text-lg font-bold text-gray-500">등록된 게시판이 없습니다.</p>
                                            <p className="text-sm text-gray-400">새로운 게시판을 생성하여 서비스를 시작해보세요.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default BoardManagementPage;