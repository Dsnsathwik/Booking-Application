import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch.js"

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/api/hotel/find?featured=true&minRat=4.5&limit=4")
  console.log(data)
  return (
    <div className="fp">
      {
        loading ? (
          "Loading please wait"
        ) : (
          <>
            {data.map((item, index) => (
              <div className="fpItem" key={index}>
                <img
                  src={item.photos[0]}
                  alt=""
                  className="fpImg"
                />
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              </div>
            ))}
          </>
        )
      }
    </div>
  );
};

export default FeaturedProperties;
