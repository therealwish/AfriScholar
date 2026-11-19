"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

type Reply = {
  id: string;
  author_name: string;
  content: string;
};

type Post = {
  id: string;
  author_name: string;
  location: string;
  content: string;
  created_at: string;
  likes: number;
  replies: Reply[];
};

export function CommunityWall() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [location, setLocation] = useState("Harare");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Reply state
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      // Fetch posts and their nested replies
      const { data } = await supabase
        .from("posts")
        .select(`
          *,
          replies (*)
        `)
        .order("created_at", { ascending: false });
        
      if (data) {
        setPosts(data.map(p => ({ ...p, likes: Math.floor(Math.random() * 10) })));
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handlePost = async () => {
    if (!newPost.trim() || !user) return;

    const authorName = user.user_metadata?.full_name || "Anonymous Founder";

    const { data, error } = await supabase
      .from("posts")
      .insert([{ author_name: authorName, location, content: newPost }])
      .select()
      .single();

    if (!error && data) {
      setPosts([{ ...data, likes: 0, replies: [] }, ...posts]);
      setNewPost("");
    }
  };

  const handleReplySubmit = async (postId: string) => {
    if (!replyText.trim() || !user) return;

    const authorName = user.user_metadata?.full_name || "Anonymous Founder";

    const { data, error } = await supabase
      .from("replies")
      .insert([{ post_id: postId, author_name: authorName, content: replyText }])
      .select()
      .single();

    if (!error && data) {
      setPosts(posts.map(p => {
        if (p.id === postId) {
          return { ...p, replies: [...p.replies, data] };
        }
        return p;
      }));
      setReplyText("");
      setReplyingTo(null);
    }
  };

  const handleLike = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  if (loading) {
    return <div className="text-center py-12 font-mono text-ink-soft uppercase">Loading community...</div>;
  }

  return (
    <div className="mx-auto max-w-3xl">
      
      {/* Post Input Area */}
      <div className="bg-paper-deep border-2 border-ink p-6 mb-12">
        <h2 className="text-xl text-forest mb-4">Pitch your idea.</h2>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder={user ? "What are you building? What do you need help with?" : "Please log in to post an idea."}
          disabled={!user}
          className="w-full bg-paper border-2 border-ink/20 p-4 focus:border-forest focus:outline-none text-ink resize-none mb-4 disabled:opacity-50"
          rows={3}
        />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-ink-soft">From:</span>
            <select 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={!user}
              className="bg-paper border-2 border-ink/20 text-sm p-2 focus:outline-none focus:border-forest disabled:opacity-50"
            >
              <option>Harare</option>
              <option>Bulawayo</option>
              <option>Gweru</option>
              <option>Mutare</option>
              <option>Masvingo</option>
              <option>Other</option>
            </select>
          </div>
          
          <Button onClick={handlePost} disabled={!newPost.trim() || !user}>
            {user ? "Post to community" : "Log in to post"}
          </Button>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-8">
        {posts.map((post) => (
          <div key={post.id} className="border-b-2 border-ink/10 pb-8">
            
            {/* Post Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 bg-forest text-paper flex items-center justify-center font-display text-sm">
                {post.author_name.charAt(0)}
              </div>
              <div>
                <p className="text-sm text-ink leading-none">{post.author_name}</p>
                <p className="font-mono text-[0.65rem] text-ink-faint uppercase tracking-wider mt-1">
                  {post.location} • {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Post Content */}
            <p className="text-lg text-ink leading-relaxed mb-4">
              {post.content}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-6 mb-4">
              <button onClick={() => handleLike(post.id)} className="group flex items-center gap-2 text-sm text-ink-soft hover:text-forest transition-colors">
                <span className="font-mono">Like</span>
                <span className="bg-ink/5 group-hover:bg-forest/10 px-2 py-0.5 rounded-xs font-mono text-xs">{post.likes}</span>
              </button>
              
              <button 
                onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}
                disabled={!user}
                className="text-sm text-ink-soft hover:text-forest transition-colors disabled:opacity-50"
              >
                Reply
              </button>
            </div>

            {/* Replies List */}
            {post.replies && post.replies.length > 0 && (
              <div className="pl-4 border-l-2 border-forest/20 space-y-3 mb-4">
                {post.replies.map((reply) => (
                  <div key={reply.id}>
                    <span className="text-sm font-medium text-forest">{reply.author_name}: </span>
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