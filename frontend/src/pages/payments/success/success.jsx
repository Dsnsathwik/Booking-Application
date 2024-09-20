import React from 'react';
// import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccess = () => {
  return (
    <div style={styles.container}>
      <div style={styles.iconContainer}>
        {/* <FaCheckCircle style={styles.icon} /> */}
      </div>
      <h1 style={styles.heading}>Payment Successful</h1>
      <p style={styles.text}>
        Thank you for your payment. Your transaction has been completed successfully.
      </p>
      <button style={styles.button} onClick={() => window.location.href = '/dashboard'}>
        Continue to Dashboard
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
    color: '#4CAF50',
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
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default PaymentSuccess;
