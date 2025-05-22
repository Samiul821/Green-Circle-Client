import React from "react";
import { useNavigate } from "react-router-dom";

const TipRow = ({ tip }) => {
  const navigate = useNavigate();

  return (
    <tr>
      <td className="font-medium">{tip.title}</td>
      <td>{tip.category}</td>
      <td>
        <img
          src={tip.image}
          alt={tip.title}
          className="w-20 h-20 object-cover rounded"
        />
      </td>
      <td>
        <button
          onClick={() => navigate(`/tip/${tip._id}`)}
          className="btn btn-sm btn-outline btn-primary flex items-center gap-1"
        >
          See More
        </button>
      </td>
    </tr>
  );
};

export default TipRow;
