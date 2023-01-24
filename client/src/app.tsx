import { useAppSelector, useDispatchedActions } from "hooks";
import { FC, useEffect } from "react";
import { getSocketInfo } from "store/selectors";

export const App: FC = () => {
  const { startConnecting } = useDispatchedActions();
  const { tickers } = useAppSelector(getSocketInfo);

  useEffect(() => {
    startConnecting();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <ul style={{ display: "flex", alignItems: "center", gap: "30px" }}>
        {tickers.map((ticker, index) => (
          <li key={index}>{ticker.change}</li>
        ))}
      </ul>
    </div>
  );
};
