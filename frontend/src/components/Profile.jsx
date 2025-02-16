"use client"

import { useEffect, useState } from "react"
import NgoProfile from "./NgoProfile"
import VolunteerProfile from "./VolunteerProfile"
import DonorProfile from "./DonorProfile"

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileResponse = await fetch("/api/profile", { credentials: "include" })
        if (!profileResponse.ok) throw new Error("Failed to fetch profile")

        const profileData = await profileResponse.json()
        const userId = profileData.user._id

        if (profileData.user.role === "NGO" && userId.match(/^[0-9a-fA-F]{24}$/)) {
          const [eventsResponse, donationsResponse] = await Promise.all([
            fetch(`/api/events/ngo/${userId}`),
            fetch(`/api/donations/ngo/${userId}`),
          ])

          const events = eventsResponse.ok ? await eventsResponse.json() : []
          const donations = donationsResponse.ok ? await donationsResponse.json() : []

          profileData.ngo = { ...profileData.ngo, events, donations }
        }

        setProfile(profileData)
      } catch (err) {
        console.error("Error fetching profile:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [])

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl">
            <div className="bg-gradient-to-r from-primary/90 to-primary h-40 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
            </div>
            <div className="px-8 pb-8 -mt-20">
              <div className="relative inline-block">
                <div className="h-32 w-32 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-white overflow-hidden transform transition-transform hover:scale-105">
                  <span className="text-5xl">👤</span>
                </div>
                
              </div>

              {profile && (
                <div className="mt-6 space-y-4">
                  <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{profile.user.name}</h1>
                  <div className="grid gap-3 text-gray-600">
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="font-medium">{profile.user.email}</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold tracking-wide text-sm backdrop-blur-sm shadow-sm">
                        {profile.user.role}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Role-specific Profile Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 backdrop-blur-sm backdrop-filter">
            {profile && profile.user.role === "NGO" && <NgoProfile profile={profile} />}
            {profile && profile.user.role === "Volunteer" && <VolunteerProfile profile={profile} />}
            {profile && profile.user.role === "Donor" && <DonorProfile profile={profile} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile