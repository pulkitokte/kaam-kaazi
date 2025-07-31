import React from "react";

const services = [
  { name: "Plumber", icon: "/water-tap.png" },
  { name: "Carpenter", icon: "/plumber.png" },
  { name: "Salon", icon: "/hair.png" },
  { name: "Painter", icon: "/painting.png" },
  { name: "House Cleaning", icon: "/cleaning.png" },
  { name: "Gardener", icon: "/trimming.png" },
];

export default function ServicesProvided() {
  return (
    <div className="mt-6 px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Services Provided</h2>
        <button className="flex items-center text-black  cursor-pointer">
          <span className="mr-1 text-sm font-semibold">View All</span>
          <img src="/next.png" alt="Next" className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {services.map((service) => (
          <div
            key={service.name}
            className="bg-pink-100 rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-lg transition"
          >
            <img
              src={service.icon}
              alt={service.name}
              className="w-10 h-10 mb-2 object-contain"
            />
            <p className="text-sm font-medium text-gray-700">{service.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
