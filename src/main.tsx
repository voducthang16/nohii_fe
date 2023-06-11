import { createRoot } from 'react-dom/client';
import '@styles/index.css';
import smoothscroll from 'smoothscroll-polyfill';
import loadable from "@loadable/component";

(() => {
    console.log(`%cBuild End: ${REACT_APP_BUILD_TIME}`, "color: white; font-family: Montserrat; font-size: 24px; background-color: #5bc6ccff; padding: 4px; border-radius: 4px");
    const App = loadable(() => import("./App"))
    smoothscroll.polyfill();
    const root = createRoot(document.getElementById('root') as HTMLElement);
    root.render(<App />);
})();