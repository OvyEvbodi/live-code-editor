"use client"

import TriangleSpinner from "@/components/TriangleSpinner";
const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <TriangleSpinner />
    </div>
  )
}

export default loading;