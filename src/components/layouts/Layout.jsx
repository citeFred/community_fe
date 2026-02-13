import Footer from "./Footer";
import Header from "./Header";

function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden font-sans text-gray-900 transition-colors duration-300">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-purple-300/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse"></div>
                <div className="absolute top-[-10%] right-[-20%] w-[35rem] h-[35rem] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70" style={{ animationDuration: '4s' }}></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[50rem] h-[50rem] bg-indigo-100/50 rounded-full mix-blend-multiply filter blur-[120px] opacity-60"></div>
                <div className="absolute bottom-[10%] right-[-10%] w-[30rem] h-[30rem] bg-teal-100/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-50"></div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Header />
                
                <main className="flex-grow w-full">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
                        {children}
                    </div>
                </main>
                
                <Footer />
            </div>
        </div>
    );
}

export default Layout;