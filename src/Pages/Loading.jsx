import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center py-6 bg-green-600">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
      </div>
  );
};

export default Loading;
