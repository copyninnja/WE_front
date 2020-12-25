import React, {useContext} from "react";
import 'antd/dist/antd.css';
import './index.css';
import { Radio } from 'antd';
import {MoviesContext} from "../../contexts/moviesContext";

const RadioBox = (page) => {
        // const [language, setLanguage] = useState("en");
        const context = useContext(MoviesContext);

        const handleChange = e => {
            context.seLanguage(e.target.value)
            console.log(e.target.value)
        };

  return (
    <>
      <Radio.Group data-cy="radioGroup" defaultValue="en" onChange={handleChange} >
        <Radio.Button data-cy="english" value="en">English</Radio.Button>
        <Radio.Button data-cy="japanese" value="ja">Japanese</Radio.Button>
        <Radio.Button data-cy="chinese" value="zh">Chinese</Radio.Button>
      </Radio.Group>
    </>
  );
}
export default RadioBox;