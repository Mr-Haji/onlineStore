import "./SingleProductPage.css";

const SingleProductPage = ({
  image,
  title,
  brand,
  category,
  price,
  question,
  rating,
  review,
  description,
  hrefLink,
}) => {
  return (
    <>
      <div className="picAndname">
        <div className="pic">
          <img
            className="productImage"
            src={
              image ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrl6niCbhkLFAle6mwiWb6k239uvHqIGHsNw&usqp=CAU"
            }
            alt="pic"
          />
        </div>
        <div className="nameBrandCategoryPrice">
          <div className="name">{title || "This Product Have No Title"}</div>
          <div className="brand">
            Brand :{" "}
            <a href={hrefLink}>{brand || "This Product Have No Brand"}</a>
          </div>
          <div className="category">
            Category :{" "}
            <a href="#">{category || "This Product Have No Category"}</a>
          </div>
          <div className="price">Rs. {price || "00"}</div>
        </div>
      </div>
      <div className="reviewAnddescription">
        <div className="questionAnswer">
          Question And Answer About this Product :{" "}
          <a href="#">{question || "This Product Have No Q/A"}</a>
        </div>
        <div className="review">
          Ratings :<a href="#">{rating || "This Product Have No Ratings"} </a>
        </div>
        <div className="review">
          Reviews :<a href="#">{review || "This Product Have No Reviews"} </a>
        </div>
        <div className="description">
          <span>Description :</span>
          {description || "This Product Have No Descrption"}
        </div>
      </div>
    </>
  );
};

export default SingleProductPage;
