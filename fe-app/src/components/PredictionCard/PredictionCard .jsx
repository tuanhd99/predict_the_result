import { useState } from 'react';

function PredictionCard() {
    const [selectedScore, setSelectedScore] = useState(null);
    const [selectedAmount, setSelectedAmount] = useState(null);
    const scores = ['4:0', '4:1', '4:2', '4:3'];
    const amounts = [50, 100, 150, 200, 500];
    return (
        <div>
            <div className="h-80 w-[650px] bg-blue-900 rounded-2xl grid grid-cols-8 items-center border-2 border-white">
                <div className="col-span-2 flex flex-col items-center justify-center h-80">
                    <div className="h-64 w-full text-center">Image</div>
                    <div className="text-lg font-bold text-white">Tên Team</div>
                </div>
                <div className="col-span-4 text-white h-80 border-r-2 border-l-2 border-white">
                    <div className="grid grid-rows-5 h-full">
                        <div className="row-span-1 text-center text-xl font-bold mt-4 border-b-2 border-white">
                            TÊN TRẬN
                        </div>
                        <div className=" border-b-2 border-white row-span-2">
                            <div className="text-center uppercase text-lg font-bold py-2">Dự đoán tỉ số</div>
                            <div className="flex justify-center items-center gap-4">
                                {scores.map((score, index) => (
                                    <button
                                        key={index}
                                        className={`w-16 h-16 rounded-full text-xl font-semibold transition ${
                                            selectedScore === score ? 'bg-white text-blue-800' : 'bg-blue-700'
                                        }`}
                                        onClick={() => setSelectedScore(score)}
                                    >
                                        {score}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="row-span-2">
                            <div className="text-center uppercase text-lg font-bold py-2">Số xu dự đoán</div>
                            <div className="flex justify-center items-center gap-4">
                                {amounts.map((amount, index) => (
                                    <button
                                        key={index}
                                        className={`w-16 h-16  rounded-full text-lg font-semibold transition ${
                                            selectedAmount === amount ? 'bg-white text-blue-800' : 'bg-blue-700'
                                        }`}
                                        onClick={() => setSelectedAmount(amount)}
                                    >
                                        {amount}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-2 flex flex-col items-center justify-center h-80">
                    <div className="h-64 w-full text-center">Image</div>
                    <div className="text-lg font-bold text-white">Tên Team</div>
                </div>
            </div>
            <div className="text-center mt-2">
                <button
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold text-lg transition"
                    onClick={() => alert(`Dự đoán: ${selectedScore}, Số xu: ${selectedAmount}`)}
                >
                    XÁC NHẬN DỰ ĐOÁN
                </button>
            </div>
        </div>
    );
}

export default PredictionCard;
