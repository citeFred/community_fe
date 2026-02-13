import { useState } from "react";

function CommentItem({ comment, onReplySubmit, onLike }) {
    const [showReplyForm, setShowReplyForm] = useState(false);
    
    const [formData, setFormData] = useState({
        replycontents: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleReplySubmit = (e) => {
        e.preventDefault();
        if (!formData.replycontents.trim()) return;

        const commentData = {
            contents: formData.replycontents,
            parentCommentId: comment.id
        };
        
        onReplySubmit(commentData);
        setFormData({ replycontents: '' });
        setShowReplyForm(false);
    };

    const handleLikeClick = (e) => {
        e.stopPropagation();
        onLike(comment.id);
    };
    
    return (
         <div className="group animate-fade-in-down">
            <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 font-bold shadow-sm border border-white">
                        {comment.authorNickname ? comment.authorNickname.charAt(0) : '?'}
                    </div>
                </div>

                <div className="flex-grow">
                    <div className="bg-gray-50/50 rounded-2xl rounded-tl-none p-4 border border-gray-100 relative group-hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                                <span className="text-sm font-bold text-gray-900">
                                    {comment.authorNickname}
                                </span>
                                <span className="text-xs text-gray-400">
                                    {new Date(comment.createdAt).toLocaleString()}
                                </span>
                            </div>
                        </div>
                        
                        <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap break-words">
                            {comment.contents}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 mt-2 ml-1">
                        <button 
                            onClick={handleLikeClick}
                            className={`flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 ${
                                comment.liked 
                                ? 'text-rose-500' 
                                : 'text-gray-500 hover:text-rose-500'
                            }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${comment.liked ? 'fill-current' : 'fill-none stroke-current'}`} viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {comment.likesCount > 0 ? comment.likesCount : '좋아요'}
                        </button>

                        <button 
                            onClick={() => setShowReplyForm(!showReplyForm)}
                            className="text-xs font-semibold text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                            </svg>
                            {showReplyForm ? '취소' : '답글 달기'}
                        </button>
                    </div>

                    {showReplyForm && (
                        <div className="mt-3 animate-fade-in">
                            <form onSubmit={handleReplySubmit} className="flex flex-col gap-2">
                                <textarea 
                                    name="replycontents" 
                                    value={formData.replycontents}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none text-sm" 
                                    rows="2" 
                                    placeholder="답글을 작성해보세요..."
                                    autoFocus
                                    required
                                ></textarea>
                                <div className="flex justify-end">
                                    <button 
                                        type="submit" 
                                        className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                                    >
                                        답글 등록
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {comment.childComments && comment.childComments.length > 0 && (
                        <div className="mt-4 space-y-4 pl-4 sm:pl-8 border-l-2 border-gray-100">
                            {comment.childComments.map(child => (
                                <CommentItem 
                                    key={child.id} 
                                    comment={child} 
                                    onReplySubmit={onReplySubmit}
                                    onLike={onLike}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );       
}

export default CommentItem;