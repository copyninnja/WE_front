import React, { useContext } from "react";
import "./filterControls.css";
import { GenresContext } from '../../contexts/genresContext' 
import RadioBox from "../radioBox";
import { Select} from 'antd';
import { Option } from 'rc-select';


const FilterControls = props => {
  const context = useContext(GenresContext);

  const handleChange = (e, type, value) => {
    // e.preventDefault();
    props.onUserInput(type, value);
  };
  const handleTextChange = e => {
    handleChange(e, "name", e.target.value);
  };
  const handleGenreChange = e => {
    console.log(e)
    handleChange(e, "genre", e);
  };

  return (
    <div className="row bg-warning">
      <div className="col-md-12">
        <h4>
          <span>List Filtering:</span>
          <input
            type="text"
            placeholder="Title Search"
            onChange={handleTextChange}
            data-cy="title_search"
          />
          <span>Genre:</span>
          {/* <select id="genre" onChange={handleGenreChange}>
            {context.genres.map(genre => {
              return (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              );
            })}
          </select> */}
          <Select
        id="genre"
        mode="multiple"
        placeholder="Please select"
        onChange={handleGenreChange}
        style={{ width: '20%' }}
        data-cy="genre_select"
      >
         {context.genres.map(genre => {
              return (
                <Option key={genre.id} value={genre.id}>
                  {genre.name}
                </Option>
              );
            })}
      </Select>
          <span>Language:</span>
          <RadioBox />
          

        </h4>
      </div>
    </div>
  );
};

export default FilterControls;