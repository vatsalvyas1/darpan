import { useState } from "react";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    ngoId: "",
    title: "",
    organizerName: "",
    locationLink: "",
    description: "",
    website: "",
    opportunity: "",
    from: "",
    to: "",
    whyJoinUs: "",
    images: [],
    whatsappGroupLink: "",
  });

  const [createdEvent, setCreatedEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);

    const uploadedImages = [];

    for (const file of files) {
      const imageData = new FormData();
      imageData.append("file", file);
      imageData.append("upload_preset", "darpan");
      imageData.append("cloud_name", "dhrhfuzb0");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dhrhfuzb0/image/upload",
          {
            method: "POST",
            body: imageData,
          }
        );

        const data = await response.json();
        if (response.ok) {
          uploadedImages.push(data.secure_url);
        } else {
          console.error("Cloudinary Upload Error:", data.error.message);
        }
      } catch (error) {
        console.error("Upload Failed:", error);
      }
    }

    setFormData((prev) => ({ ...prev, images: uploadedImages }));
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (
      !formData.title ||
      !formData.organizerName ||
      !formData.description ||
      !formData.opportunity ||
      !formData.from ||
      !formData.to
    ) {
      alert("Please fill out all required fields.");
      return;
    }
  
    // Check if 'from' date is less than or equal to 'to' date
    const fromDate = new Date(formData.from);
    const toDate = new Date(formData.to);
  
    if (fromDate > toDate) {
      alert("The 'From' date cannot be later than the 'To' date.");
      return;
    }
  
    const eventData = {
      ngoId: formData.ngoId,
      title: formData.title,
      organizerName: formData.organizerName,
      locationLink: formData.locationLink,
      description: formData.description,
      website: formData.website || "",
      opportunity: formData.opportunity,
      when: { from: formData.from, to: formData.to },
      whyJoinUs: formData.whyJoinUs,
      images: formData.images,
      whatsappGroupLink: formData.whatsappGroupLink || "",
    };
  
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert("Event created successfully!");
  
        setCreatedEvent({
          _id: result.event._id,
          title: formData.title,
          organizerName: formData.organizerName,
          images: formData.images,
          from: formData.from,
          to: formData.to,
        });
  
        setFormData({
          title: "",
          organizerName: "",
          locationLink: "",
          description: "",
          website: "",
          opportunity: "",
          from: "",
          to: "",
          whyJoinUs: "",
          images: [],
          whatsappGroupLink: "",
        });
      } else {
        alert(result.message || "Error creating event");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };
  

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Create an Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Event Title"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="organizerName"
          value={formData.organizerName}
          onChange={handleChange}
          placeholder="Organizer Name"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="locationLink"
          value={formData.locationLink}
          onChange={handleChange}
          placeholder="Location Link (Google Maps)"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Event Description"
          rows="4"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>

        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="Website (if any)"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="opportunity"
          value={formData.opportunity}
          onChange={handleChange}
          placeholder="Opportunity (e.g., Volunteer, Internship)"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

<div className="flex space-x-2">
  <div className="w-1/2">
    <label className="block text-sm font-medium text-gray-700">From</label>
    <input
      type="date"
      name="from"
      value={formData.from}
      onChange={handleChange}
      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>
  <div className="w-1/2">
    <label className="block text-sm font-medium text-gray-700">To</label>
    <input
      type="date"
      name="to"
      value={formData.to}
      onChange={handleChange}
      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>
</div>

        <textarea
          name="whyJoinUs"
          value={formData.whyJoinUs}
          onChange={handleChange}
          placeholder="Why should people join?"
          rows="2"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        ></textarea>

        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />

        {loading && <p className="text-center text-blue-500">Uploading images...</p>}

        <input
          type="text"
          name="whatsappGroupLink"
          value={formData.whatsappGroupLink}
          onChange={handleChange}
          placeholder="WhatsApp Group Link (Optional)"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>

      {createdEvent && (
  <div className="mt-8 max-w-md mx-auto rounded-3xl overflow-hidden bg-white shadow-lg">
    {/* Event Image */}
    <div className="relative h-72">
      <img
        src={createdEvent.images?.[0] || "https://via.placeholder.com/300"}
        alt={createdEvent.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        <h2 className="text-white text-2xl font-bold">{createdEvent.title}</h2>
      </div>
    </div>

    {/* Event Details */}
    <div className="p-6">
      <p className="text-gray-800 text-lg font-semibold">{createdEvent.organizerName}</p>
      <p className="text-gray-600 mt-2">
        <strong>From:</strong> {new Date(createdEvent.from).toLocaleDateString()} <br />
        <strong>To:</strong> {new Date(createdEvent.to).toLocaleDateString()}
      </p>
    </div>
  </div>
)}

    </div>
  );
};

export default CreateEvent;
