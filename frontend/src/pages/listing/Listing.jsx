import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import styles from "../../style/style";

const Listing = () => {
  SwiperCore.use([Navigation]);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(null);
  const params = useParams();
  console.log(listing);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setError(false);
        setLoading(true);
        const res = await fetch(`/api/listing/getListing/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          setLoading(false);
        }
        setListing(data);
        setError(false);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  return (
    <section>
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[500px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="w-9/12		mx-auto my-10">
            <div id="title">
              <h1 className="text-3xl font-bold">
                {listing.name} - ${" "}
                {listing.offer
                  ? listing.discountPrice.toLocaleString("en-US")
                  : listing.regularPrice.toLocaleString("en-US")}
                {listing.type === "rent" && " / month"}
              </h1>
            </div>
            <p className="flex items-center gap-2 font-bold text-xl my-5">
              <FaMapMarkedAlt className="text-green-600" /> {listing.address}
            </p>
            <div className={`${styles.normalFlex}`}>
              {listing.type === "rent" ? (
                <span className="py-2 px-10 text-white rounded-md text-md font-medium  bg-red-600">
                  For Rent
                </span>
              ) : (
                <span className="py-2 px-10 text-white rounded-md text-md font-medium  bg-red-600">
                  For Sale
                </span>
              )}
              {listing.discountPrice !== 0 ? (
                <p className="py-2 px-10 text-white rounded-md text-md font-medium  bg-green-600">
                  {+listing.regularPrice - +listing.discountPrice}
                </p>
              ) : (
                ""
              )}
            </div>
            <p className="my-5 text-slate-800 text-md font-medium">
              <span className="font-bold text-xl">Description - </span>
              {listing.description}
            </p>
            <div className={`${styles.normalFlex} gap-5`}>
              <span
                className={`${styles.normalFlex} gap-2 text-green-600 font-medium text-md`}
              >
                <FaBed />
                {listing.bedrooms > 1 ? "beds" : "bed"}
              </span>
              <span
                className={`${styles.normalFlex} gap-2 text-green-600 font-medium text-md`}
              >
                <FaBath />
                {listing.bathrooms > 1 ? "baths" : "bath"}
              </span>
              <span
                className={`${styles.normalFlex} gap-2 text-green-600 font-medium text-md`}
              >
                <FaParking />
                {listing.parking ? "Parking" : "No Parking"}
              </span>
              <span
                className={`${styles.normalFlex} gap-2 text-green-600 font-medium text-md`}
              >
                <FaChair />
                {listing.furnished ? "Furnished" : "No Furnished"}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Listing;
