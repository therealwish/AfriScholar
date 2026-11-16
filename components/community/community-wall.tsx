"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Reply = {
  id: string;
  author: string;
  content: string;
};

type Post = {
  id: string;
  author: string;
  location: string;
  content: string;
  time: string;
  likes: number;
  replies: Reply[];
};

const initialPosts: Post[] = [
  {
    id: "1",
    author: "Tinashe M.",
    location: "Gweru",
    content: "I am building a solar-powered irrigation system for small-scale farmers. The goal is to reduce reliance on diesel pumps. Any advice on finding affordable solar panels in Zimbabwe?",
    time: "2 hours ago",
    likes: 12,
    replies: [{ id: "r1", author: "Rudo K.", content: "Check out Sun Exchange. They do solar crowd-funding in Zim." }],
  },
  {
    id: "2",
    author: "Rudo K.",
    location: "Harare",
    content: "Looking for a technical co-founder for a campus delivery app. I have the business plan and a pilot group of 50 students ready to test. I handle operations, you handle the code. DMs open.",
    time: "5 hours ago",
    likes: 24,
    replies: [],
  },
];

export function CommunityWall() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState("");
  const [location, setLocation] = useState("Harare");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const handlePost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      author: "You",
      location: location,
      content: newPost,
      time: "Just now",
      likes: 0,
      replies: [],
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  const handleLike = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleReplySubmit = (postId: string) => {
    if (!replyText.trim()) return;
    
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          replies: [...p.replies, { id: Date.now().toString(), author: "You", content: replyText }]
        };
      }
      return p;
    }));
    
    setReplyText("");
    setReplyingTo(null);
  };

  return (
    <div className="mx-auto max-w-3xl">
      
      {/* Post Input Area */}
      <div className="bg-paper-deep border-2 border-ink p-6 mb-12">
        <h2 className="text-xl text-forest mb-4">Pitch your idea.</h2>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What are you building? What do you need help with?"
          className="w-full bg-paper border-2 border-ink/20 p-4 focus:border-forest focus:outline-none text-ink resize-none mb-4"
          rows={3}
        />
        <div className="flex items-center justify-between">
          {/* Location Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-ink-soft">From:</span>
            <select 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-paper border-2 border-ink/20 text-sm p-2 focus:outline-none focus:border-forest"
            >
              <option>Harare</option>
              <option>Bulawayo</option>
              <option>Gweru</option>
              <option>Mutare</option>
              <option>Masvingo</option>
              <option>Other</option>
            </select>
          </div>
          
          <Button onClick={handlePost} disabled={!newPost.trim()}>
            Post to community
          </Button>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-8">
        {posts.map((post) => (
          <div key={post.id} className="border-b-2 border-ink/10 pb-8">
            
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 bg-forest text-paper flex items-center justify-center font-display text-sm">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="text-sm text-ink leading-none">{post.author}</p>
                <p className="font-mono text-[0.65rem] text-ink-faint uppercase tracking-wider mt-1">
                  {post.location} • {post.time}
                </p>
              </div>
            </div>

            <p className="text-lg text-ink leading-relaxed mb-4">
              {post.content}
            </p>

            <div className="flex items-center gap-6 mb-4">
              <button 
                onClick={() => handleLike(post.id)}
                className="group flex items-center gap-2 text-sm text-ink-soft hover:text-forest transition-colors"
              >
                <span className="font-mono">Like</span>
                <span className="bg-ink/5 group-hover:bg-forest/10 px-2 py-0.5 rounded-xs font-mono text-xs">
                  {post.likes}
                </span>
              </button>
              
              <button 
                onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}
                className="text-sm text-ink-soft hover:text-forest transition-colors"
              >
                Reply
              </button>
            </div>

            {/* Replies List */}
            {post.replies.length > 0 && (
              <div className="pl-4 border-l-2 border-forest/20 space-y-3 mb-4">
                {post.replies.map((reply) => (
                  <div key={reply.id}>
                    <span className="text-sm font-medium text-forest">{reply.author}: </span>
                    <span className="text-sm text-ink-soft">{reply.content}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Reply Input Box */}
            {replyingTo === post.id && (
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="flex-1 bg-paper border-2 border-ink/20 p-2 text-sm focus:border-forest focus:outline-none text-ink"
                  autoFocus
                />
                <Button size="sm" onClick={() => handleReplySubmit(post.id)}>
                  Send
                </Button>
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
} 