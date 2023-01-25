import {
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface MultipleSelectProps {
  items: string[];
  selectedTickerNames: string[];
  handleChange: (event: SelectChangeEvent) => void;
}

export const MultipleSelect: FC<MultipleSelectProps> = (props) => {
  const { items, selectedTickerNames, handleChange } = props;

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <Select
        multiple
        displayEmpty
        // @ts-ignore
        value={selectedTickerNames}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (selected?.length === 0) {
            return <em>Choose tickers</em>;
          }
          // @ts-ignore
          return selected?.join(", ");
        }}
        MenuProps={MenuProps}
        inputProps={{ "aria-label": "Without label" }}
      >
        {items?.map((item, index) => (
          <MenuItem key={index} value={item}>
            <Checkbox checked={selectedTickerNames?.indexOf(item) > -1} />
            <ListItemText primary={item} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
