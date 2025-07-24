import React from "react";
import { FaToolbox, FaPaintRoller, FaBath, FaCut } from "react-icons/fa"; // placeholder icons
import { MdPlumbing } from "react-icons/md";

const services = [
  {
    name: "Plumber",
    icon: <MdPlumbing size={30} className="text-red-500" />,
  },
  {
    name: "Carpenter",
    icon: <FaToolbox size={30} className="text-yellow-600" />,
  },
  {
    name: "Salon",
    icon: <FaCut size={30} className="text-pink-500" />,
  },
  {
    name: "Painter",
    icon: <FaPaintRoller size={30} className="text-blue-500" />,
  },
];


export default function ServicesProvided() {
    return (
      <div className="mt-6 pxx-4">
        <div className="text-lg font-semibold mb-4 flex jusitfy-between items-center">
          <span>Services Provided</span>
          <span className="text-sm text-blue-500 cursor-pointer hover:underline">
            →
          </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {services.map((service) => (
                    <div
                        key={service.name}
                        className="bg-pink-100 rounded-lg p-4 flex justify-center items-center hover:shadow-lg transition"
                    >
                        {service.icon}
                        <p className="mt-2 text-sm fon">{ service.name }</p>
                    </div>
                ))}

            </div>
      </div>
    );
}