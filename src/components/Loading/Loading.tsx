import { LoadingOutlined } from '@ant-design/icons'
import Spin from 'antd/es/spin';
import "./Loading.css";

const Loading = () => {
	return (<div className={"loading"}>
		<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} className={"content-loading text-blue"} />
	</div>);
};

export default Loading;
