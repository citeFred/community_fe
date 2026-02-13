import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleDetail } from '../../../apis/features/articles';
import { createComment } from '../../../apis/features/comments';
import { toggleArticleLike, toggleCommentLike } from '../../../apis/features/likes';
import CommentSection from './comments/CommentSection';

function ArticleDetailPage() {
    const { boardId, articleId } = useParams();
    const [article, setArticle] = useState(null);
    const navigate = useNavigate();

    const fetchArticle = useCallback(async () => {
        try {
            const response = await getArticleDetail(boardId, articleId);
            setArticle(response.data);
        } catch (error) {
            console.error("게시글 상세 조회 실패", error);
            alert("게시글을 불러올 수 없습니다.");
            navigate(`/boards/${boardId}`);
        }
    }, [boardId, articleId, navigate]);

    useEffect(() => {
        fetchArticle();
    }, [fetchArticle]);

    const handleArticleLike = async () => {
        try {
            await toggleArticleLike(boardId, articleId);
            await fetchArticle(); // 화면 갱신
        } catch (error) {
            console.error("게시글 좋아요 실패", error);
            if (error.response?.status === 401) alert("로그인이 필요합니다.");
        }
    };

    const handleCommentLike = async (commentId) => {
        try {
            await toggleCommentLike(boardId, articleId, commentId);
            await fetchArticle(); // 화면 갱신
        } catch (error) {
            console.error("댓글 좋아요 실패", error);
            if (error.response?.status === 401) alert("로그인이 필요합니다.");
        }
    };

    const handleCreateComment = async (commentData) => {
        try {
            await createComment(boardId, articleId, commentData);
            await fetchArticle();
        } catch (error) {
            console.error("댓글 작성 실패", error);
            alert("댓글 작성에 실패했습니다.");
        }
    };

    const nestedComments = useMemo(() => {
        if (!article?.comments) return [];
        
        const commentMap = new Map();
        const rootComments = [];
        
        article.comments.forEach(c => commentMap.set(c.id, { ...c, childComments: [] }));
        
        article.comments.forEach(c => {
            if (c.parentCommentId && commentMap.has(c.parentCommentId)) {
                commentMap.get(c.parentCommentId).childComments.push(commentMap.get(c.id));
            } else {
                rootComments.push(commentMap.get(c.id));
            }
        });
        return rootComments;
    }, [article]);

    if (!article) return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-gray-500 font-medium">게시글을 불러오는 중...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-6">
                
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                                게시글 상세
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                                {article.title}
                            </h1>
                        </div>
                        <button 
                            onClick={() => navigate(`/boards/${boardId}/articles`)} 
                            className="group flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
                        >
                            <svg className="w-4 h-4 text-gray-400 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            목록으로
                        </button>
                    </div>
                </div>

                <article className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden border border-gray-100">
                    
                    <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/30 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                                {article.authorNickname.substring(0, 1)}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">{article.authorNickname}</p>
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {new Date(article.createdAt || article.createAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 md:p-10">
                        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap font-sans">
                            {article.contents}
                        </div>
                    </div>

                    {article.files && article.files.length > 0 && (
                        <div className="px-8 pb-8">
                            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                                첨부파일 ({article.files.length})
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {article.files.map((file, index) => (
                                    <div key={index} className="group relative bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                        <div className="aspect-w-16 aspect-h-12 bg-gray-200 overflow-hidden">
                                            <img 
                                                src={`/temp/${file.storedFileName}`} 
                                                alt={file.originalFileName}
                                                className="w-full h-32 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                            <div className="hidden w-full h-32 flex items-center justify-center bg-gray-100 text-gray-400">
                                                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                                 <a 
                                                    href={`/${file.storedFileName}`} 
                                                    download={file.originalFileName}
                                                    className="p-2 bg-white rounded-full text-gray-900 shadow-lg transform hover:scale-110 transition-transform"
                                                    title="다운로드"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <p className="text-xs font-medium text-gray-700 truncate" title={file.originalFileName}>
                                                {file.originalFileName}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="px-8 py-6 border-t border-gray-100 flex justify-center bg-gray-50/50">
                        <button
                            onClick={handleArticleLike}
                            className={`group flex items-center gap-3 px-8 py-3 rounded-full text-base font-bold transition-all duration-300 shadow-sm border transform active:scale-95 ${
                                article.liked 
                                    ? 'bg-rose-50 text-rose-600 border-rose-200 shadow-rose-100 hover:bg-rose-100' 
                                    : 'bg-white text-gray-500 border-gray-200 hover:bg-white hover:border-gray-300 hover:text-gray-700 hover:shadow-md'
                            }`}
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`h-6 w-6 transition-transform duration-300 group-hover:scale-110 ${article.liked ? 'fill-current text-rose-500' : 'fill-none stroke-current'}`} 
                                viewBox="0 0 24 24" 
                                strokeWidth="2" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span>좋아요</span>
                            <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${article.liked ? 'bg-rose-200 text-rose-700' : 'bg-gray-100 text-gray-600'}`}>
                                {article.likesCount}
                            </span>
                        </button>
                    </div>
                </article>

                <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100">
                    <div className="flex items-center gap-2 mb-8">
                        <h3 className="text-xl font-bold text-gray-900">
                            댓글
                        </h3>
                        <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700 text-sm font-bold">
                            {article.comments ? article.comments.length : 0}
                        </span>
                    </div>
                    
                    <CommentSection 
                        comments={nestedComments} 
                        onCommentSubmit={handleCreateComment}
                        onLike={handleCommentLike} 
                    />
                </div>
            </div>
        </div>
    );
}

export default ArticleDetailPage;