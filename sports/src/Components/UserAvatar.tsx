import React from "react";
import type { User } from "../context/FantasyTypes";

type Props = {
  user: User;
  size?: number;
};

const UserAvatar: React.FC<Props> = ({ user, size = 40 }) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .filter((n) => n.length > 0)
      .map((n) => n[0].toUpperCase())
      .slice(0, 2)
      .join("");
  };

  if (user.image) {
    return (
      <img
        src={user.image}
        alt={user.name}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: "#4C6EF5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: size * 0.4,
      }}
    >
      {getInitials(user.name)}
    </div>
  );
};

export default UserAvatar;
