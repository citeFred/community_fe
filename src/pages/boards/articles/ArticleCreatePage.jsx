import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createArticle } from '../../../apis/features/articles';

function ArticleCreatePage() {
    const { boardId } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        contents: '',
        file: null
    });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };

    const handleCreateArticle = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        try {
            await createArticle(boardId, formData);
            alert('게시글이 성공적으로 등록되었습니다.');
            navigate(`/boards/${boardId}/articles`);
        } catch (err) {
            const errorMessage = err.response?.data || '게시글 작성에 실패했습니다.';
            setMessage(errorMessage);
            setIsError(true);
            console.error('Article creation failed:', err);
        }
    };

    return (
        <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-6">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                            New Post
                        </span>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            게시글 작성
                        </h1>
                    </div>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="group flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
                    >
                        <svg className="w-4 h-4 text-gray-400 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        돌아가기
                    </button>
                </div>

                <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden border border-gray-100">
                    <form onSubmit={handleCreateArticle} className="p-8 sm:p-10 space-y-8">
                        
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 ml-1">
                                제목
                            </label>
                            <input 
                                type="text" 
                                name="title" 
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-5 py-4 text-lg font-medium bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-gray-400" 
                                placeholder="제목을 입력해 주세요" 
                                required 
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 ml-1">
                                내용
                            </label>
                            <textarea 
                                name="contents" 
                                value={formData.contents}
                                onChange={handleChange}
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-gray-400 min-h-[300px] resize-y" 
                                placeholder="내용을 자유롭게 작성해 주세요..." 
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 ml-1">
                                첨부 파일
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-blue-50 rounded-xl opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none"></div>
                                <input 
                                    type="file" 
                                    name="file" 
                                    onChange={handleChange}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 file:transition-colors file:cursor-pointer p-2 border border-gray-200 rounded-xl bg-white cursor-pointer" 
                                />
                            </div>
                            <p className="text-xs text-gray-400 ml-1">
                                * 이미지 파일(jpg, png 등)을 업로드할 수 있습니다.
                            </p>
                        </div>

                        <div className="border-t border-gray-100 my-6"></div>

                        <button 
                            type="submit" 
                            className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:from-blue-700 hover:to-indigo-700 transform transition hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            게시글 등록하기
                        </button>
                    </form>

                    {message && (
                        <div className={`mx-8 mb-8 p-4 rounded-xl text-sm font-medium text-center flex items-center justify-center gap-2 ${
                            isError 
                            ? 'bg-red-50 text-red-600 border border-red-100' 
                            : 'bg-green-50 text-green-600 border border-green-100'
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
            </div>
        </div>
    );
}

export default ArticleCreatePage;