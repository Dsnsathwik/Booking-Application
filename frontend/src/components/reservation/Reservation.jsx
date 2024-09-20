import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reservation.css"
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/searchContext";
import axios from "axios";
import {loadStripe} from "@stripe/stripe-js"
import { useNavigate, useParams } from "react-router-dom";

const Reservation = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([])
  const { data, loading, error, reFetch } = useFetch(`/api/hotel/rooms/${hotelId}`)
  const { dates } = useContext(SearchContext)
  const navigate = useNavigate()

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  function dayDifference(date1, date2) {
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
    return diffDays
  }

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate)
  // console.log("allDates ", getDatesInRange(dates[0].startDate, dates[0].endDate))

  const isAvailable = (roomNumber) => {
    const isFoundArr = roomNumber.unavailableDates.map((date) =>
      new Date(date).getTime()
    );

    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );

    // console.log("roomno: ", roomNumber, " isFoundArr: ", isFoundArr, " allDates: ",allDates)

    return !isFound;
  };

  console.log("selected rooms: ", selectedRooms)

  // console.log("allDates: ",allDates)
  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/api/room/availability/${roomId}`, {
            dates: allDates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/booking-summary",
        {
          state: {
            hotelId,
            selectedRooms,
            dates
          }
        }
      );

    } catch (err) { }
  };

  const handleSelect = (e) => {
    const checked = e.target.checked
    const value = e.target.value
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter(item => item !== value)

    )
  }

  const handlePayments = async () => {
    const stripe = await loadStripe(`${process.env.STRIPE_PUBLIC_KEY}`)

    const body = {
      hotels: [{  // note: array of objects
        hotelId: data.id,
        hotelName: data.name,
        city: data.city,
        address: data.address,
        price: dayDifference(dates[0].startDate, dates[0].endDate) * data.cheapestPrice,
        photos: data.photos,
        rooms: selectedRooms,
        type: data.type,
      }]
    }

    const headers = {
      "Content-Type": "application/json"
    }

    const response = await fetch(` http://localhost:4000/api/create-checkout-session`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    })

    console.log(response)
    const session = await response.json()

    const result = stripe.redirectToCheckout({
      sessionId: session.id
    })
  }

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handlePayments} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );

}

export default Reservation