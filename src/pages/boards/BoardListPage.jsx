import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionCard from '../../components/cards/ActionCard';
import { getBoards } from '../../apis/features/boards';

function BoardListPage() {
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
            } catch (error) {
                const errorMessage = error.response?.data || "게시판 목록을 불러오는 중 오류가 발생했습니다.";
                setMessage(errorMessage);
                setIsError(true);
                console.error("게시판 목록 조회 실패", error);
            }
        };
        fetchBoards();
    }, []);

    const handleBoardSelect = (board) => {
        navigate(`/boards/${board.id}/articles`, { state: { boardTitle: board.title } });
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-12">
                
                <div className="text-center space-y-4">
                    <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wide">
                        Community Boards
                    </span>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                        주제별 게시판
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        관심 있는 주제를 선택하여 자유롭게 소통하고, 지식을 공유해보세요.
                    </p>
                </div>

                {message && (
                    <div className={`p-4 rounded-xl flex items-center justify-center gap-2 shadow-sm ${
                        isError 
                        ? 'bg-red-50 text-red-600 border border-red-100' 
                        : 'bg-blue-50 text-blue-600 border border-blue-100'
                    }`}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-sm">{message}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {boards.length > 0 ? (
                        boards.map((board, index) => (
                            <div key={board.id} className="h-full">
                                <ActionCard
                                    title={board.title}
                                    text={board.description || `"${board.title}"에서 다양한 사람들과 이야기를 나눠보세요.`}
                                    buttonText="입장하기"
                                    buttonVariant={index % 2 === 0 ? "primary" : "success"}
                                    onButtonClick={() => handleBoardSelect(board)}
                                />
                            </div>
                        ))
                    ) : (
                        !message && (
                            <div className="col-span-full py-24 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4 text-gray-400">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">아직 생성된 게시판이 없습니다.</h3>
                                <p className="text-gray-500 mt-1">관리자가 게시판을 생성할 때까지 기다려주세요.</p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default BoardListPage;