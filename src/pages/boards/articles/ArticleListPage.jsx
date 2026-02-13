import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getArticlesByBoard } from '../../../apis/features/articles';

function ArticleListPage() {
    const { boardId } = useParams();
    const location = useLocation();
    const boardTitle = location.state?.boardTitle || '게시글 목록';
    const [pageData, setPageData] = useState({
        content: [],
        page: { totalPages: 0, number: 0, totalElements: 0 },
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticles = async (page = 0) => {
            try {
                const response = await getArticlesByBoard(boardId, page);
                setPageData(response.data);
            } catch (error) {
                console.error("게시글 목록 조회 실패", error);
            }
        };
        fetchArticles(0);
    }, [boardId]);

    const handlePageChange = async (pageNumber) => {
        try {
            const response = await getArticlesByBoard(boardId, pageNumber);
            setPageData(response.data);
        } catch (error) {
            console.error("게시글 목록 조회 실패", error);
        }
    };

    return (
        <div className="w-full space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-2">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wide">
                            Board
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">
                        {boardTitle}
                    </h2>
                    <p className="mt-2 text-gray-500 font-medium">
                        총 <span className="text-blue-600 font-bold">{pageData.totalElements}</span>개의 이야기가 있습니다.
                    </p>
                </div>
                
                <button
                    onClick={() => navigate('/boards')}
                    className="group flex items-center gap-2 px-5 py-2.5 bg-white text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm font-medium"
                >
                    <svg className="w-4 h-4 text-gray-400 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    목록으로 돌아가기
                </button>
            </div>

            <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/80 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                                <th scope="col" className="px-6 py-5 text-center w-[80px]">No.</th>
                                <th scope="col" className="px-6 py-5 w-auto">제목</th>
                                <th scope="col" className="px-6 py-5 text-center w-[120px]">작성자</th>
                                <th scope="col" className="px-6 py-5 text-center w-[120px]">작성일</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {pageData.content.length > 0 ? pageData.content.map((article, index) => (
                                <tr
                                    key={article.id}
                                    onClick={() => navigate(`/boards/${boardId}/articles/${article.id}`)}
                                    className="group hover:bg-blue-50/50 transition-colors duration-200 cursor-pointer"
                                >
                                    <td className="px-6 py-5 text-center text-gray-400 font-medium text-sm group-hover:text-blue-500">
                                        {pageData.totalElements - (pageData.number * 10) - index}
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-base font-bold text-gray-800 group-hover:text-blue-700 transition-colors line-clamp-1">
                                            {article.title}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className="inline-block px-2 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-600 group-hover:bg-white group-hover:shadow-sm transition-all">
                                            {article.authorNickname}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-center text-sm text-gray-400">
                                        {new Date(article.createdAt).toLocaleDateString('ko-KR', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit'
                                        })}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-24">
                                        <div className="flex flex-col items-center justify-center space-y-4 opacity-60">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                </svg>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-lg font-bold text-gray-600">작성된 게시글이 없습니다.</p>
                                                <p className="text-sm text-gray-400">가장 먼저 글을 작성해보세요!</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-6 pt-2">
                
                <div className="flex-1 flex justify-center sm:justify-start">
                    {pageData.totalPages > 1 && (
                        <nav className="flex items-center gap-1">
                            {Array.from({ length: pageData.totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i)}
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                                        pageData.number === i
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                                        : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-blue-600 border border-gray-200'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </nav>
                    )}
                </div>

                <button
                    onClick={() => navigate(`/boards/${boardId}/articles/create-form`)}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:from-blue-700 hover:to-indigo-700 transform transition hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    새 글 작성
                </button>
            </div>
        </div>
    );
}

export default ArticleListPage;