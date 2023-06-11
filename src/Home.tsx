import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from 'axios';
import { API } from "./constants/API";
import Loading from "@components/Loading/Loading";
import SplashScreen from "@components/SplashScreen/SplashScreen";
import useWindowDimensions from "@hooks/use-window-dimension";
import NotificationHelper from "@components/Notification/Notification";
import { Modal } from 'antd';
import { setCookie, getCookie } from "@utils/use-cookies";

interface QuestionProps {
    _id: string
    name: string
    answer: string
    times: number
    hide: string
    row: number
    status: boolean
    isSelect: boolean
}

const COOKIE_STORE = "rule";

function Home() {
    const [questions, setQuestions] = useState<QuestionProps[]>([]);
    const [loadingScreen, setLoadingScreen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { height } = useWindowDimensions();
    const [heightQuestion, setHeightQuestion] = useState(0);
    const [isSelectQuestion, setIsSelectQuestion] = useState<QuestionProps>();
    const [value, setValue] = useState<string>();
    const [isModalOpen, setIsModalOpen] = useState(!getCookie(COOKIE_STORE));

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        if (!getCookie(COOKIE_STORE)) {
            setCookie(COOKIE_STORE, 'read');
        }
        setIsModalOpen(false);
    };

    useEffect(() => {
        setHeightQuestion(height - 390 - 70);
    }, [height])

    useEffect(() => {
        setLoadingScreen(true);
        if (getCookie(COOKIE_STORE)) {
            setIsModalOpen(false);
        }
        setTimeout(() => {
            getQuestions();

            
        }, 500);
    }, [])

    const getQuestions = async () => {
        try {
            const res = await axios.get<Partial<QuestionProps[]>>(`${API}/questions`);
            const item = res.data.find(item => item.isSelect === true);
            setIsSelectQuestion(item);
            setQuestions(res.data);
            setLoadingScreen(false);
        } catch (error) {
            NotificationHelper.setError("get list questions", error.message)
        }
    }

    const selectQuestion = async (id: string) => {
        try {
            await axios.post(`${API}/select-question`, {
                id,
            })
        } catch (error) {
            NotificationHelper.setError("select question", error.message)
        }
    }

    const handleAnswerQuestion = async (id: string, answer: string) => {
        try {
            await axios.post(`${API}/answer-question`, {
                id,
                answer,
            })
            await getQuestions();
            NotificationHelper.setSuccess("answer question", "nohii tra loi dung roi ne 🥳🔥")
        } catch (error) {
            NotificationHelper.setError("answer question", error.response.data.message || error.message)
        }
    }

    const handleSelectQuestion = async (item: QuestionProps) => {
        if (item?.status) {
            NotificationHelper.setWarning("select question", "moi nohii chon cau hoi khac");
            return;
        }
        if (isSelectQuestion?.isSelect) {
            NotificationHelper.setWarning("select question", "nohii hok the doi cau hoi khac duoc");
            return;
        }
        await selectQuestion(item?._id);
        setIsSelectQuestion({
            ...item,
            isSelect: true,
        })
    }

    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const onSubmitAnswer = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (value) {
            setLoading(true);
            await handleAnswerQuestion(isSelectQuestion?._id, value);
            setTimeout(() => {
                setLoading(false);
            }, 500)
        }
    }

    return (
        <>
            {loadingScreen ? <SplashScreen /> : (
                <div className="bg-background-base h-screen relative">
                    {loading && <Loading />}
                    <div className="container max-w-6xl mx-auto">
                        <div className="pt-16 pb-8 space-y-8">
                            <h2 className="text-3xl text-center font-semibold">do vui co thuong</h2>
                            <div className="flex flex-wrap justify-center space-x-5">
                                {
                                    questions.map((item, index) => (
                                        <h6 
                                            key={index}
                                            className={`box ${isSelectQuestion?._id === item?._id && 'select'}
                                            ${item.status && '!bg-[#5bc6ccff] !text-white'} cursor-pointer my-3 md:my-0`}
                                            onClick={() => handleSelectQuestion(item)}
                                        >
                                            {index + 1}
                                        </h6>
                                    ))
                                }
                            </div>
                            <div className="min-h-[150px] max-h-[150px] flex flex-col items-center justify-center w-3/4 mx-auto py-5 border border-solid border-stone-700 rounded-lg">
                                {isSelectQuestion ? 
                                    <><h6 className="mb-8 px-3 md:px-0 text-center text-2xl">{isSelectQuestion?.name}</h6>
                                    <form className="w-full md:w-1/2 px-5 md:px-0" onSubmit={onSubmitAnswer}>
                                        <input hidden type="submit"/>
                                        <input
                                            className="w-full p-3 rounded-lg outline-none border border-solid
                                        border-slate-200 hover:border-blue-200 focus:border-blue-200"
                                            type="text"
                                            placeholder="nhap cau tra loi o day ne"
                                            autoComplete="off"
                                            onChange={onChangeValue}
                                        />
                                    </form></> : <h2 className="text-xl text-center font-medium">moi nohii chon cau hoi</h2>
                                }
                            </div>
                        </div>
                        <div className={`flex justify-center m-4`}>
                            <div style={{ maxHeight: heightQuestion }}  className="w-full space-y-5 overflow-y-auto hide-scrollbar md:mx-40">
                                {questions?.map((item, index) => (
                                    <div className="flex items-center space-x-5" key={index}>
                                        <h6 className="min-w-[20px] md:min-w-[50px]">{index +1}.</h6>
                                        {!item.status && item?.hide.split('').map((char, index) => (
                                            <div key={index}>
                                                <h6 key={index} className={'box cursor-default'}>
                                                    {char}
                                                </h6>
                                            </div>
                                        ))}
                                        {
                                            item.status && item.answer.split(' ').join('').split('').map((char, index) => (
                                                <h6 key={index} className={'box cursor-default !bg-[#fab8b8] !text-white'}>
                                                    {char}
                                                </h6>
                                            ))
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-5 right-5">
                        <button className="bg-[#3182ce] text-white py-2 px-3 rounded-lg outline-none" onClick={showModal}>
                            rule
                        </button>
                        <Modal 
                            title=""
                            open={isModalOpen}
                            onOk={handleCancel}
                            onCancel={handleCancel}
                            className="custom-modal-css"
                            footer={false}
                            centered
                        >
                            <div className="space-y-2">
                                <h3 className="text-xl font-medium mb-3">nhung thong tin can biet</h3>
                                <p className="text-base">
                                    <span className="inline-block min-w-[20px] font-semibold">1.</span>
                                    chon cau hoi nao thi phai tra loi duoc cau hoi do xong moi duoc chon cau hoi khac.
                                </p>
                                <p className="text-base">
                                    <span className="inline-block min-w-[20px] font-semibold">2.</span>
                                    1 ngay chi tra loi sai toi da duoc 5 lan.
                                </p>
                                <p className="text-base">
                                    neu co thac mac gi thi lien he minh qua <span> </span>
                                    <a 
                                        className="!text-[#1677ff]" 
                                        href="https://www.instagram.com/voducthang__"
                                        target="_blank"
                                    >
                                        instagram
                                    </a>.
                                </p>
                                <p className="text-base italic">hay doc ky nhung thong tin nay truoc khi choi</p>
                                <p className="text-lg text-[#fab8b8]">happy playing 🖤🤍❤️‍🔥❤️‍🩹💞</p>
                            </div>
                        </Modal>
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;