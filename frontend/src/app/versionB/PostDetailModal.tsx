import React from "react";
import { PostInterface } from "../versionA/page";

interface PostDetailModalProps {
  post: PostInterface;
  onClose: () => void;
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({ post, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          Close
        </button>
        <img
          className="max-w-full h-auto rounded-md mb-4"
          src={post.image}
          alt={post.imageName}
        />
        <h2 className="text-xl font-bold mb-2">{post.imageName}</h2>
        <p className="text-gray-700">{post.likes}</p>
      </div>
    </div>
  );
};

export default PostDetailModal;