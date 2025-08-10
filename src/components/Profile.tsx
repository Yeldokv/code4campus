import React from 'react';

const Profile: React.FC = () => (
  <div className="max-w-xl mx-auto bg-gray-800 rounded-xl p-8 border border-gray-700 text-white mt-8">
    <h2 className="text-3xl font-bold mb-6">Profile</h2>
    <div className="space-y-4 text-lg">
      <div><span className="font-semibold">Name:</span> Yeldo K V</div>
      <div><span className="font-semibold">Age:</span> 21</div>
      <div><span className="font-semibold">Course:</span> B.Tech Computer Science</div>
      <div><span className="font-semibold">Year:</span> 3rd Year</div>
      <div><span className="font-semibold">Email:</span> yeldo@example.com</div>
    </div>
  </div>
);

export default Profile;
