const VolunteerProfile = ({ profile }) => {
    return (
      <div className="mt-6">
        <h3 className="text-xl font-medium">Volunteer Details</h3>
        <p><strong>Age:</strong> {profile.volunteer.age}</p>
        <p><strong>Interests:</strong> {profile.volunteer.interests.join(", ")}</p>
  
        {/* Events Attended */}
        {profile.volunteer.attendedEvents.length > 0 && (
          <div className="mt-4">
            <h3 className="text-xl font-medium">Events Attended</h3>
            <ul className="list-disc ml-6">
              {profile.volunteer.attendedEvents.map(event => (
                <li key={event._id}>{event.title} - {new Date(event.date).toLocaleDateString()}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  export default VolunteerProfile;
  