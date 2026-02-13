import { useNavigate } from "react-router-dom";
import ActionCard from "../../components/cards/ActionCard";

function HomePage() {
    const navigate = useNavigate();

    return (
        <main className="justify-center py-5 sm:px-6 lg:px-8">
                <div className="text-center mb-16 space-y-4">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 text-sm font-bold tracking-wide uppercase mb-2">
                        Welcome to Community
                    </span>
                    <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                        함께 나누는 지식,<br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                             더 똑똑해진 AI의 시작
                        </span>
                    </h2>
                    <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        게시판에서 자유롭게 소통하거나, AI 어시스턴트와 대화하며<br className="hidden sm:block" />
                        새로운 인사이트를 발견해보세요.
                    </p>
                </div>
                
                <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 px-4">
                    <div className="flex-1 max-w-md w-full transform transition duration-300 hover:-translate-y-2 hover:shadow-xl rounded-2xl">
                        <ActionCard 
                            title="📝 게시판"
                            text="다양한 주제로 글을 쓰고, 댓글로 소통하며 커뮤니티의 즐거움을 느껴보세요."
                            buttonText="게시판 입장하기"
                            onButtonClick={() => navigate('/boards')}
                            buttonVariant="primary"
                        />
                    </div>

                    <div className="flex-1 max-w-md w-full transform transition duration-300 hover:-translate-y-2 hover:shadow-xl rounded-2xl">
                        <ActionCard
                            title="🤖 AI 챗봇"
                            text="24시간 언제든 질문하세요. 최신 AI가 당신의 궁금증을 즉시 해결해 드립니다."
                            buttonText="AI와 대화하기"
                            onButtonClick={() => navigate('/chatbot')}
                            buttonVariant="success"
                        />
                    </div>
                </div>
        </main>);
}

export default HomePage;