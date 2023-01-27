import { SelectChangeEvent } from "@mui/material";
import { MultipleSelect } from "components/form";
import { useAppSelector, useDispatchedActions } from "hooks";
import { getTickerInfo } from "store/selectors";

export const Select = () => {
  const { tickerNames, selectedTickerNames } = useAppSelector(getTickerInfo);
  const { setSelectedTickerNames, selectTickerForChart } = useDispatchedActions();

  const handleChange = (event: SelectChangeEvent<typeof selectedTickerNames>) => {
    const {
      target: { value }
    } = event;
    setSelectedTickerNames(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    if (!value.length) {
      selectTickerForChart("");
    }
  };

  return (
    <div style={{ marginTop: "24px" }}>
      <MultipleSelect items={tickerNames} selectedTickerNames={selectedTickerNames} handleChange={handleChange} data-testid="multiple-select-on-home" />
    </div>
  );
};
