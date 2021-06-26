import { React, Component, useContext } from "react";
import { CURRENCIES_NAME } from '../utils/constants';
import Select, { createFilter } from 'react-select'
import { FixedSizeList as List } from "react-window";
import { InfoContext } from "../utils/InfoContext";

const height = 35;

class MenuList extends Component {
  render() {
    const { options, children, maxHeight, getValue } = this.props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * height;

    return (
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={height}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    );
  }
}

export const Searchbar = () => {
  const { info, setInfo } = useContext(InfoContext);

  const handleChange = (e) => {
    console.log(e.label);
    let temp = info["currentlyOwned"];
    temp[e.label] = 1;
    setInfo({ "currentlyOwned": temp });
  }

  return (
    <Select filterOption={createFilter({ ignoreAccents: false })} components={{ MenuList }} options={CURRENCIES_NAME} onChange={handleChange}/>
  )
}
