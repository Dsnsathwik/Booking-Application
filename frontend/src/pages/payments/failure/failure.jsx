import React from 'react';
// import { FaTimesCircle } from 'react-icons/fa';

const PaymentFailed = () => {
  return (
    <div style={styles.container}>
      <div style={styles.iconContainer}>
        {/* <FaTimesCircle style={styles.icon} /> */}
      </div>
      <h1 style={styles.heading}>Payment Failed</h1>
      <p style={styles.text}>
        Unfortunately, your payment could not be processed. Please try again or contact support.
      </p>
      <button style={styles.button} onClick={() => window.location.href = '/retry-payment'}>
        Try Again
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f4f6f9',
    padding: '20px',
    textAlign: 'center',
    color: '#333',
  },
  iconContainer: {
    marginBottom: '20px',
  },
  icon: {
    fontSize: '5rem',
    color: '#FF4C4C',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '15px',
  },
  text: {
    fontSize: '1.2rem',
    marginBottom: '25px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#FF4C4C',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default PaymentFailed;
