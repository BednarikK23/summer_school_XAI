import { useTours } from "../../hooks/useTours";
import TourCard from "../../components/tourCard/tourCard.tsx";
import "./MainToursPage.css";
import { useState } from "react";
import TablePagination from "../../components/pagination/TablePaginator.tsx";
import SearchComponentTour from "../../components/search/SearchComponentTour.tsx";
import { useWineryTours } from "../../hooks/useWineries.ts";
import { FiltersTour } from "../../components/search/constantsFilters.ts";

interface MainToursPageProps {
  wineryId?: string;
}

const MainToursPage: React.FC<MainToursPageProps> = ({ wineryId }) => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<FiltersTour>({});

  const { data: tourResponse, isFetching } = wineryId
    ? useWineryTours(wineryId, page, query, filters.happensAfter, filters.happensBefore, filters.location, filters.status, filters.orderDate)
    : useTours(page, query, filters.happensAfter, filters.happensBefore, filters.location, filters.status, filters.orderDate);

  return (
    <>
      <div className={"tours-main-page"}>
        <h1>Upcoming tours</h1>
        <div className="tours-btns">
          <SearchComponentTour query={query} setQuery={setQuery} setFilters={setFilters} filters={filters} flag={(wineryId !== undefined)} />

        </div>
        <div className={"tours-container"}>
          {!isFetching &&
            tourResponse && tourResponse.items.length > 0 && (
              <ul className="tours-list">
                {tourResponse?.items.map((tour) => (
                  <TourCard tour={tour} key={tour.id}
                    imageUrl={"https://images.fineartamerica.com/images-medium-large-5/vsattui-winery-revisited-gail-salituri.jpg"}
                  />
                ))}
              </ul>
            )}
          {!isFetching &&
            tourResponse && tourResponse.items.length == 0 &&
            (
              wineryId ?
                <p>Your winery is not assigned to any tour.</p>
                :
                <p>No tours found.</p>
            )
          }

          {isFetching && <p> "Loading...."</p>}
        </div>
      </div>
      <TablePagination pagination={tourResponse?.pagination ?? { currentPage: 0, totalPages: 0 }} onSelect={setPage} />
    </>
  );
};

export default MainToursPage;
