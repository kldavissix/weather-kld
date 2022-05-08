import React from "react"

const Card = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minWidth: "300px",
        minHeight: "400px",
        color: "white",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3),
  rgba(0, 0, 0, 0.3))`,
        borderRadius: "5%",
        marginTop: "15px",
        padding: "20px 20px 40px 20px",
      }}
    >
      {children}
    </div>
  )
}

export default Card
