import "./splash-screen.css";

export default function SplashScreen() {
    return (<div className={"bg-white h-screen w-screen splash-screen"}>
        <div className={"splash-logo"}>
            <img src={"/icons/icon-128.png"} width={100} height={100} alt={"image logo"} />
        </div>
        <div className={"text-center splash-text text-20px"}>
            from
            <p className={"text-green-base text-30px"}>voducthang</p>
        </div>
    </div>)
}
