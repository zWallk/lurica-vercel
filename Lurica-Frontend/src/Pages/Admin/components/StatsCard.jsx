import PropTypes from 'prop-types';

export const StatsCard = ({ title, value, icon: Icon, bgColor }) => (
  <div className={`p-6 rounded-lg shadow-lg ${bgColor} text-white`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm opacity-80">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <Icon size={24} className="opacity-80" />
    </div>
  </div>
);