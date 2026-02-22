import { useState } from "react";
import { Calendar, MapPin, Globe, Users, Image, LogIn as WhatsappLogo } from 'lucide-react';
import { backendUrl } from "../constant";

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
      const response = await fetch(`${backendUrl}/api/events`, {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 ">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 py-8 px-8">
            <h2 className="text-4xl font-bold text-white text-center tracking-tight">Create an Event</h2>
            <p className="text-indigo-100 text-center mt-2">Share your event with the community</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Main Event Details Section */}
            <div className="space-y-6 bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Event Details</h3>
              
              <div className="space-y-4">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Event Title"
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-lg placeholder:text-gray-400"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="organizerName"
                      value={formData.organizerName}
                      onChange={handleChange}
                      placeholder="Organizer Name"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="locationLink"
                      value={formData.locationLink}
                      onChange={handleChange}
                      placeholder="Location Link (Google Maps)"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                    />
                  </div>
                </div>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Event Description"
                  rows="4"
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 resize-none"
                  required
                ></textarea>
              </div>
            </div>

            {/* Additional Details Section */}
            <div className="space-y-6 bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Additional Information</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="Website (if any)"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                    />
                  </div>

                  <input
                    type="text"
                    name="opportunity"
                    value={formData.opportunity}
                    onChange={handleChange}
                    placeholder="Opportunity Type"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="date"
                        name="from"
                        value={formData.from}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="date"
                        name="to"
                        value={formData.to}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>
                </div>

                <textarea
                  name="whyJoinUs"
                  value={formData.whyJoinUs}
                  onChange={handleChange}
                  placeholder="Why should people join this event?"
                  rows="3"
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 resize-none"
                ></textarea>
              </div>
            </div>

            {/* Media and Contact Section */}
            <div className="space-y-6 bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Media & Contact</h3>
              
              <div className="space-y-4">
                <div className="relative">
                  <Image className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="file"
                    name="images"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300
                             file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
                             file:text-sm file:font-semibold file:bg-indigo-50 
                             file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                </div>

                <div className="relative">
                  <WhatsappLogo className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="whatsappGroupLink"
                    value={formData.whatsappGroupLink}
                    onChange={handleChange}
                    placeholder="WhatsApp Group Link (Optional)"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {loading && (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
                <p className="text-indigo-600 mt-3 font-medium">Uploading images...</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 px-8 rounded-xl
                         font-semibold text-lg hover:from-indigo-700 hover:to-blue-700
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                         transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
                         disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Event"}
            </button>
          </form>
        </div>

        {createdEvent && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Created Event</h3>
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
              <div className="relative h-80">
                <img
                  src={createdEvent.images?.[0] || "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80"}
                  alt={createdEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h2 className="text-white text-3xl font-bold mb-3">{createdEvent.title}</h2>
                  <p className="text-white/90 text-xl">{createdEvent.organizerName}</p>
                </div>
              </div>
              <div className="p-8 bg-white">
                <div className="flex items-center justify-between text-gray-700">
                  <div className="space-y-1">
                    <p className="font-medium text-gray-500">Starts</p>
                    <p className="text-lg">{new Date(createdEvent.from).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-gray-500">Ends</p>
                    <p className="text-lg">{new Date(createdEvent.to).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateEvent;