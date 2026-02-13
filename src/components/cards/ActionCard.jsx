function ActionCard({ title, text, buttonText, onButtonClick, buttonVariant = 'primary' }) {
    const buttonStyles = {
        primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30 ring-blue-500',
        success: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/30 ring-emerald-500',
        danger: 'bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white shadow-lg shadow-rose-500/30 ring-rose-500',
        secondary: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 shadow-sm ring-gray-200',
    };

    const selectedStyle = buttonStyles[buttonVariant] || buttonStyles['primary'];

    return (
        <div className="group relative flex flex-col h-full bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 transition-all duration-500 group-hover:bg-blue-50/80 group-hover:scale-110"></div>

            <div className="p-8 flex-grow relative z-10">
                <h5 className="text-2xl font-bold text-gray-800 mb-3 transition-colors duration-300 group-hover:text-blue-700">
                    {title}
                </h5>
                <p className="text-gray-500 leading-relaxed text-base">
                    {text}
                </p>
            </div>

            <div className="p-8 pt-0 mt-auto relative z-10">
                <button 
                    onClick={onButtonClick} 
                    className={`w-full py-4 px-6 rounded-2xl font-bold transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 flex justify-center items-center gap-2 ${selectedStyle}`}
                >
                    {buttonText}
                    <svg 
                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default ActionCard;