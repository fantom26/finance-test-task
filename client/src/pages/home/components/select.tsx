import { SelectChangeEvent } from "@mui/material";
import { MultipleSelect } from "components/form";
import { useAppSelector, useDispatchedActions } from "hooks";
import { getSocketInfo } from "store/selectors";

export const Select = () => {
  const { tickerNames, selectedTickerNames } = useAppSelector(getSocketInfo);
  const { setSelectedTickerNames, selectTickerForChart } =
    useDispatchedActions();

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    // @ts-ignore
    setSelectedTickerNames(value);

    if (!value.length) {
      selectTickerForChart("");
    }
  };

  return (
    <div style={{ marginTop: "24px" }}>
      <MultipleSelect
        items={tickerNames}
        selectedTickerNames={selectedTickerNames}
        handleChange={handleChange}
        data-testid="multiple-select-on-home"
      />
    </div>
  );
};
