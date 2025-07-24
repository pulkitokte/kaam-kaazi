import React from 'react'

const services = [
    {
        name: "Bathroom Services",
        image: "/public/services/bathroom.png",
    },
    {
        name: "AC repair",
        image: "/public/services/ac.png"
    },
    {
        name: "Massage",
        image: "/public/services/massage.png"
    },
    {
        name: "Electrician",
        image: "/public/services/electrician.png"
    },
]

export default function MostPopularServices() {
   return (
     <div className="mt-6 px-4">
       <h2 className="text-lg font-semibold mb-3">Most Popular Services</h2>
       <div className="flex gap-4 overflow-x-auto scrollbar-hide">
         {services.map((service, index) => (
           <div
             key={index}
             className="min-w-[100px] bg-pink-100 rounded-lg p-2 flex-shrink-0 hover:shadow-md transition text-center"
           >
             <img
               src={service.image}
               alt={service.name}
               className="w-full h-20 object-cover rounded-md"
             />
             <p className="text-sm mt-1 font-medium">{service.name}</p>
           </div>
         ))}
       </div>
     </div>
   );
}