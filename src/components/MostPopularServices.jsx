import React from "react";

const services = [
  { name: "Bathroom Services", image: "/services/bathroom.png" },
  { name: "AC repair", image: "/services/ac.png" },
  { name: "Massage", image: "/services/massage.png" },
  { name: "Electrician", image: "/services/electrician.png" },
];

export default function MostPopularServices() {
  return (
    <div className="mt-6 px-4">
      <h2 className="text-lg font-semibold mb-3">Most Popular Services</h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {services.map((service, i) => (
          <div
            key={i}
            className="w-1/4 bg-pink-100 rounded-lg p-4 hover:shadow-md transition text-center"
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <p className="text-sm font-medium">{service.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
