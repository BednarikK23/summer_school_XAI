import { useEffect, useState } from "react";
import Button from "../../components/buttons/Button";
import { useOrders } from "../../hooks/useOrder";
import { useAtom } from "jotai";
import { whoAmIAtom } from "../../state/authAtom";
import TablePagination from "../../components/pagination/TablePaginator";
import SearchComponent from "../../components/search/SearchComponent";
import { Navigate, useNavigate } from "react-router-dom";
import './MyWineryOrdersPage.css';
import OrderCard from "../../components/orderCard/OrderCard";
import useRedirect from "../../hooks/useRedirect";

const MyWineryOrdersPage = () => {
  const [status, setStatus] = useState("PENDING");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loggedUser] = useAtom(whoAmIAtom);
  const navigate = useNavigate();

  const wineryId = loggedUser && loggedUser.vinery && loggedUser.vinery.length > 0 ? loggedUser.vinery[0].id : "";
  const { data: ordersResponse, isFetching, refetch } = useOrders(page, query, wineryId, status)
  useEffect(() => {
    refetch();
  }, [status, ordersResponse])

  const handleSwitch = () => {
    setStatus(prevStatus => {
      if (prevStatus === "PENDING") return "ACTIVE";
      if (prevStatus === "ACTIVE") return "COMPLETED";
      return "PENDING";
    });
  }

  const shouldRedirect = useRedirect(wineryId === "" ? true : false, 3000);

  if (shouldRedirect) {
      return <Navigate to="/not-found" />;
  }

  return (
    <>
      {wineryId !== "" && (
        <>
          <div className={"my-orders"}>
            <div className={"my-orders__container"}>
              <div className={"my-orders__search"}>
                <SearchComponent query={query} setQuery={setQuery} />
                <Button onClick={() => handleSwitch()} children={status}></Button>
                <Button onClick={() => navigate("/user/account")}>Back</Button>
              </div>
              {!isFetching && ordersResponse && (
                <ul className="my-orders-content">
                  {ordersResponse.items.map((order) => (
                    <OrderCard order={order} key={order.id} />
                  ))}
                </ul>
              )}
            </div>
          </div>
          <TablePagination pagination={ordersResponse?.pagination ?? { currentPage: 0, totalPages: 0 }} onSelect={setPage} />
        </>
        
      )}
    </>
  );
};

export default MyWineryOrdersPage;