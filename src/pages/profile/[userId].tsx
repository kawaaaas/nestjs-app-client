import Post from "@/components/Post";
import apiClient from "@/lib/apiClient";
import { Posts, Profile } from "@/types";
import { GetServerSideProps } from "next";
import React from "react";

type Props = {
  profile: Profile;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId } = context.query;

  try {
    const profileResponse = await apiClient.get(`/profile/${userId}`);
    return {
      props: {
        profile: profileResponse.data,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

const userProfile = ({ profile }: Props) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <div className="flex items-center">
            <img
              className="w-20 h-20 rounded-full mr-4"
              alt="User Avatar"
              src={profile.profileImageUrl}
            />
            <div>
              <h2 className="text-2xl font-semibold mb-1">
                {profile.user.username}
              </h2>
              <p className="text-gray-600">{profile.bio}</p>
            </div>
          </div>
        </div>
        {profile.user.posts.map((post: Posts, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
    </div>
  );
};

export default userProfile;
