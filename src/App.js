import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "./App.css";

function App() {
  const [beers, setBeers] = useState();
  const [pagination, setPagination] = useState(10);

  useEffect(() => {
    fetch(`https://api.punkapi.com/v2/beers?per_page=${pagination}`)
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else throw result;
      })
      .then((data) => setBeers(data))
      .catch((error) => console.log("Error Fetching Beer data", error));
  }, [pagination]);

  const handleLoadMore = () => {
    const _pagination = pagination + 10;
    setPagination(_pagination);
  };
  return (
    <div className="app">
      <div className="beer">
        <span className="beer-header">Beers</span>
        <div className="beer-list">
          <Row>
            {beers?.map((beer) => (
              <Col md={6} sm={12} key={beer.id}>
                <div className="beer-container">
                  <div className="flex-1-4 beer-image">
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-${beer.id}`}>
                          Ingredients:{" "}
                          {beer.ingredients.hops
                            .map((item) => item.name)
                            .join()}
                          ,{" "}
                          {beer.ingredients.malt
                            .map((item) => item.name)
                            .join()}
                          ,{beer.ingredients.yeast}
                        </Tooltip>
                      }
                    >
                      <img
                        data-tooltip={beer.name}
                        src={beer.image_url}
                        alt={beer.name}
                        height={75}
                        width={40}
                      />
                    </OverlayTrigger>
                  </div>

                  <div className="beer-sub-container flex-3">
                    <p className="beer-sub-container-header">{beer.name}</p>
                    <p className="beer-sub-container-tag">
                      {beer.ingredients?.yeast}
                    </p>
                    <p className="beer-sub-container-description">
                      {beer.description}
                    </p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          <div className="load-more" onClick={handleLoadMore}>
            Load More...
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
