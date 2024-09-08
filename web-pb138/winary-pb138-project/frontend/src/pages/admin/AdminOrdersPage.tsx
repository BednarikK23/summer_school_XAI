import { useOrders } from "../../hooks/useOrder";
import { useState } from "react";
import SearchComponent from "../../components/search/SearchComponent";
import TablePagination from "../../components/pagination/TablePaginator";
import "./AdminTemplatePage.css";
import "./testOrder.css";
import CreateOrderForm from "../../components/forms/order/CreateOrderForm";
import OrderCard from "../../components/orderCard/OrderCard";

const AdminOrdersPage = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const { data: ordersResponse, isFetching } = useOrders(page, query);

  return (
    <>
      <div className={"admin-page"}>
        <CreateOrderForm label="Create Order"/>
        <SearchComponent query={query} setQuery={setQuery}></SearchComponent>

        {!isFetching && ordersResponse && (
          <ul className="admin-list">
            {ordersResponse.items.map((order) => (
              <OrderCard order={order}/>
            ))}
          </ul>
        )}
      </div>
      <TablePagination
        pagination={
          ordersResponse?.pagination ?? { currentPage: 0, totalPages: 0 }
        }
        onSelect={setPage}
      />
    </>
  );
};

export default AdminOrdersPage;
