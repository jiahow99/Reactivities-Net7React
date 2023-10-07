
const ChatLoading = () => {
    return (
        <div className="flex flex-col gap-3 h-44 overflow-y-scroll">
            <div className="flex gap-3">
                <div className="w-2/12 sm:w-1/12">
                    <div className="w-12 h-12 rounded-full bg-gray-500 animate-pulse mx-auto"></div>
                </div>
                <div className="w-8/12 sm:w-7/12 flex items-center">
                    <div className="w-full h-10 bg-gray-500 animate-pulse rounded-md"></div>
                </div>
            </div>
            <div className="flex gap-3">
                <div className="w-2/12 sm:w-1/12">
                    <div className="w-12 h-12 rounded-full bg-gray-500 animate-pulse mx-auto"></div>
                </div>
                <div className="w-4/12 flex items-center">
                    <div className="w-full h-20 bg-gray-500 animate-pulse rounded-md"></div>
                </div>
            </div>
            <div className="flex gap-3">
                <div className="w-2/12 sm:w-1/12">
                    <div className="w-12 h-12 rounded-full bg-gray-500 animate-pulse mx-auto"></div>
                </div>
                <div className="w-5/12 flex items-center">
                    <div className="w-full h-10 bg-gray-500 animate-pulse rounded-md"></div>
                </div>
            </div>
        </div>
    )
}

export default ChatLoading;