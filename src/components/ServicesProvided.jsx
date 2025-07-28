import React from "react";

const services = [
  {
    name: "Plumber",
    icon: "/water-tap.png", // from public folder
  },
  {
    name: "Carpenter",
    icon: "/plumber.png",
  },
  {
    name: "Salon",
    icon: "/salon.png",
  },
  {
    name: "Painter",
    icon: "/painting.png",
  },
];

export default function ServicesProvided() {
  return (
    <div className="mt-6 px-4">
      <div className="text-lg font-semibold mb-4 flex justify-between items-center">
        <span>Services Provided</span>
        <span className="text-sm text-blue-500 cursor-pointer hover:underline">
          →
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
