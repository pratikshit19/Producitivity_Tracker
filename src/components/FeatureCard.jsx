import { Link } from "react-router-dom";

export default function FeatureCard({ title, description, link, image }) {
  return (
    <Link to={link}>
      <div
        className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer h-48 flex items-end"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-opacity-50" />
        {/* Content */}
        <div className="relative z-10 p-4">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-gray-300 text-sm">{description}</p>
        </div>
      </div>
    </Link>
  );
}
