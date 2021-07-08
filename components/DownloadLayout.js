import React from 'react'

const DownloadLayout = () => {
    return (
        <div className="text-center mt-auto ml-auto mr-auto pt-8">
            <span className="px-2 bg-white text-center text-gray-900 font-bold">Download Our App</span>
            <div className="grid grid-cols-2 gap-2 mt-4" style={{ width: 300 }}>

                <a href="#">
                    <img src="img/play-store.png" />
                </a>
                <a href="#">
                    <img src="img/app-store.png" />
                </a>
            </div>
        </div>
    )
}

export default DownloadLayout
