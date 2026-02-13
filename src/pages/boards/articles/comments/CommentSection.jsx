import { useState } from "react";
import CommentItem from "./CommentItem";

function CommentSection({ comments, onCommentSubmit, onLike }) {
    const initialFormState = {
        contents: '',
        parentCommentId: null
    };
    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRootCommentSubmit = async (e) => {
        e.preventDefault();
        if (!formData.contents.trim()) return;

        try {
            await onCommentSubmit({ 
                ...formData, 
                contents: formData.contents.trim() 
            });
            setFormData(initialFormState);
        } catch (error) {
            console.error("댓글 전송 중 오류:", error);
        }
    };

    const handleReplySubmit = (replyData) => {
        onCommentSubmit(replyData);
    }

    return (
        <div className="space-y-8">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <form onSubmit={handleRootCommentSubmit} className="relative">
                    <textarea 
                        name="contents"
                        value={formData.contents}
                        onChange={handleChange}
                        className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none text-sm min-h-[100px] placeholder-gray-400" 
                        placeholder="소중한 댓글을 남겨주세요..." 
                        required
                    ></textarea>
                    <div className="flex justify-end mt-3">
                        <button 
                            type="submit" 
                            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm rounded-lg shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-700 transform active:scale-95 transition-all"
                        >
                            댓글 등록
                        </button>
                    </div>
                </form>
            </div>
            
            <div className="space-y-6">
                {comments && comments.length > 0 ? comments.map(comment => (
                    <CommentItem 
                        key={comment.id} 
                        comment={comment} 
                        onReplySubmit={handleReplySubmit}
                        onLike={onLike}
                    />
                )) : (
                    <div className="py-12 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-dashed border-gray-200">
                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 font-medium">아직 작성된 댓글이 없습니다.</p>
                        <p className="text-sm text-gray-400">첫 번째 댓글의 주인공이 되어보세요!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommentSection;