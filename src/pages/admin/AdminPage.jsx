import { useNavigate } from "react-router-dom";
import ActionCard from "../../components/cards/ActionCard";

function AdminPage() {
    const navigate = useNavigate();

    return (
        <div className="space-y-10">
            <div className="border-b border-gray-200 pb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 mb-3 tracking-wide">
                            ADMINISTRATOR DASHBOARD
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                            관리자 대시보드
                        </h2>
                        <p className="mt-3 text-lg text-gray-500 max-w-2xl">
                            서비스의 핵심 기능을 제어하고, 시스템 현황을 한눈에 파악하세요.
                        </p>
                    </div>
                    
                    <div className="hidden md:block text-right">
                        <p className="text-sm font-medium text-gray-500">Current Session</p>
                        <p className="text-lg font-bold text-gray-800">Active</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ActionCard 
                    title="📋 게시판 관리"
                    text="새로운 게시판을 생성하거나, 기존 게시판의 설정 및 권한을 수정합니다."
                    buttonText="게시판 관리하기"
                    buttonVariant="primary"
                    onButtonClick={() => { 
                        navigate('/admin/boards'); 
                    }}
                />
                
                <ActionCard 
                    title="👥 사용자 관리"
                    text="가입된 회원 목록을 조회하고, 등급 변경 및 제재 조치를 수행합니다."
                    buttonText="사용자 목록 보기"
                    buttonVariant="success"
                    onButtonClick={() => { 
                        alert('사용자 관리 페이지로 이동 (구현 예정)'); 
                    }}
                />
                
                <ActionCard 
                    title="⚙️ 사이트 설정"
                    text="SEO, 로고, 푸터 정보 등 웹 사이트의 전반적인 환경설정을 관리합니다."
                    buttonText="설정 변경"
                    buttonVariant="secondary"
                    onButtonClick={() => { 
                        alert('사이트 관리 페이지로 이동 (구현 예정)'); 
                    }}
                />
                
                <ActionCard 
                    title="📊 접속 통계"
                    text="일별/월별 방문자 수와 트래픽 현황을 그래프로 확인합니다."
                    buttonText="리포트 보기"
                    buttonVariant="danger"
                    onButtonClick={() => { 
                        alert('통계 페이지로 이동 (구현 예정)'); 
                    }}
                />
            </div>
        </div>
    )
}

export default AdminPage;