import React from 'react';
import './BookingSummary.css';
import { useLocation } from 'react-router-dom';
import useFetch from '../../hooks/useFetch'

const BookingSummary = () => {
    const location = useLocation()
    const { hotelId, selectedRooms, dates } = location.state || {}
    const {data: hotelData, loading, error} = useFetch(`api/hotel/find/${hotelId}`)
    const checkInDate = dates[0].startDate.toDateString(); // "Mon Aug 19 2024"
    const checkInTime = dates[0].startDate.toTimeString().split(' ')[0];

    const checkOutDate = dates[0].startDate.toDateString(); // "Mon Aug 19 2024"
    const checkOutTime = dates[0].startDate.toTimeString().split(' ')[0];

    // stay days
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2){
        const timeDiff = Math.abs(date2.getTime() - date1.getTime())
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
        return diffDays
    }
    const stayDays = dayDifference(dates[0].endDate, dates[0].startDate)

    console.log(hotelData)
    console.log(stayDays)

    return (
        <div className="booking-summary">
            <div className="room-section">
                <div className="room-info">
                    {/* <img src={hotelData.photos[0]} alt="Room" className="room-image" /> */}
                    <div className="room-details">
                        <h3>Booking Summary</h3>
                        <p className="location">{`${hotelData.name}, ${hotelData.address}`}</p>
                        <div className="amenities">
                            <span>📰 News Paper</span>
                            <span>📶 Wi-Fi</span>
                            <span>🔋 Power Backup</span>
                            <span>🧊 Refrigerator</span>
                        </div>
                    </div>
                    <button className="remove-button">Remove</button>
                </div>

                <div className="check-info">
                    <div className="check-in-out-info">
                        <div>
                            <h4>Check In</h4>
                            <p>{checkInDate}</p>
                        </div>
                        <div>
                            <h4>Check Out</h4>
                            <p>{checkOutDate}</p>
                        </div>
                    </div>
                    <div className="occupancy-info">
                        <h4>Occupancy</h4>
                        <p>02 Adults, 01 Room</p>
                    </div>
                </div>
            </div>

            <div className="price-section">
                <div className="price-summary">
                    <div>
                        <p>Total rooms price (Incl. all taxes)</p>
                        <p>₹ 7,875.00</p>
                    </div>
                    <div>
                        <p>Extra Services</p>
                        <p>₹ 728.00</p>
                    </div>
                </div>

                <div className="total-price">
                    <p>Total rooms cost (tax incl)</p>
                    <p>₹ 8,603.00</p>
                </div>

                <div className="coupon-section">
                    <h4>Have a promocode?</h4>
                    <input type="text" placeholder="Enter promo code" />
                    <button>Apply</button>
                </div>

                <button className="proceed-button">
                    PROCEED
                </button>
            </div>
        </div>
    );
}

export default BookingSummary;
