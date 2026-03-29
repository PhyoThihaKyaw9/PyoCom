import { useState } from "react";
import { Users, ThumbsUp, ThumbsDown, MessageCircle, Shield, Filter } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

interface Comment {
  id: string;
  author: string;
  authorEn: string;
  isExpert: boolean;
  content: string;
  contentEn: string;
  upvotes: number;
  downvotes: number;
  replies: Comment[];
  timestamp: string;
}

export function CommunityFeed() {
  const [sortBy, setSortBy] = useState<"top" | "newest">("top");

  const feedData: Comment[] = [
    {
      id: "1",
      author: "ဦးမျိုးမင်း",
      authorEn: "U Myo Min",
      isExpert: true,
      content: "မနော်သုခမျိုး အတွက် ယူရီယာ မြေသြဇာ အကြိမ်ပေါင်း ၃ ကြိမ် ထည့်ပေးရန် လိုအပ်ပါသည်။",
      contentEn: "For Manaw Thukha variety, apply Urea fertilizer three times during the season.",
      upvotes: 24,
      downvotes: 2,
      timestamp: "၂ နာရီက / 2 hours ago",
      replies: [
        {
          id: "1-1",
          author: "မမရီတာ",
          authorEn: "Ma Rita",
          isExpert: false,
          content: "အလွန်အသုံးဝင်ပါတယ်ဆရာ။ ကျေးဇူးတင်ပါတယ်။",
          contentEn: "Very useful, thank you teacher!",
          upvotes: 8,
          downvotes: 0,
          timestamp: "၁ နာရီက / 1 hour ago",
          replies: []
        }
      ]
    },
    {
      id: "2",
      author: "ကိုအောင်ကျော်",
      authorEn: "Ko Aung Kyaw",
      isExpert: false,
      content: "အညိုရောင် ပေါက်စားပိုး များအတွက် ဘယ်ဆေးမျိုး အကောင်းဆုံးလဲ ခင်ဗျာ?",
      contentEn: "What's the best pesticide for brown planthoppers?",
      upvotes: 15,
      downvotes: 1,
      timestamp: "၅ နာရီက / 5 hours ago",
      replies: [
        {
          id: "2-1",
          author: "ဒေါ်ခင်မာ",
          authorEn: "Daw Khin Ma",
          isExpert: true,
          content: "Buprofezin 25% SC ကို အသုံးပြုပါ။ ရေ ၂၀ လီတာလျှင် ၄၀ ml နှုန်းဖြင့် ဖျန်းပေးပါ။",
          contentEn: "Use Buprofezin 25% SC at 40ml per 20 liters of water.",
          upvotes: 18,
          downvotes: 0,
          timestamp: "၃ နာရီက / 3 hours ago",
          replies: []
        },
        {
          id: "2-2",
          author: "ကိုထွန်းမြင့်",
          authorEn: "Ko Htun Myint",
          isExpert: false,
          content: "ကျွန်တော်လည်း တူညီတဲ့ပြဿနာ ကြုံနေရပါတယ်။ တစ်ပတ်အကြာ ထပ်ဖျန်းရမလား?",
          contentEn: "I have the same problem. Should I spray again after a week?",
          upvotes: 5,
          downvotes: 0,
          timestamp: "၂ နာရီက / 2 hours ago",
          replies: []
        }
      ]
    },
    {
      id: "3",
      author: "မအေးအေးမြင့်",
      authorEn: "Ma Aye Aye Myint",
      isExpert: false,
      content: "ရွှေဘိုပေါ်ဆန် အတွက် မြေဆီလွှာ pH ဘယ်လောက်ထားရမလဲ?",
      contentEn: "What soil pH is needed for Shwebo Pawsan?",
      upvotes: 12,
      downvotes: 0,
      timestamp: "၁ ရက်က / 1 day ago",
      replies: [
        {
          id: "3-1",
          author: "ဦးစိုးမြင့်",
          authorEn: "U Soe Myint",
          isExpert: true,
          content: "pH ၅.၅ မှ ၆.၅ အကြား ထားပေးရမည်။ မြေဆီလွှာ pH စစ်ဆေးရန် အရေးကြီးပါသည်။",
          contentEn: "Maintain pH between 5.5 and 6.5. Soil pH testing is important.",
          upvotes: 16,
          downvotes: 1,
          timestamp: "၁၂ နာရီက / 12 hours ago",
          replies: []
        }
      ]
    },
    {
      id: "4",
      author: "ကိုဇော်လင်း",
      authorEn: "Ko Zaw Lin",
      isExpert: false,
      content: "မိုးကြီးတဲ့အခါ မြေသြဇာထည့်ပေးရင် ရလား မရဘူးလား?",
      contentEn: "Can I apply fertilizer during heavy rain?",
      upvotes: 20,
      downvotes: 3,
      timestamp: "၂ ရက်က / 2 days ago",
      replies: [
        {
          id: "4-1",
          author: "ဒေါ်နု၀င်း",
          authorEn: "Daw Nu Win",
          isExpert: true,
          content: "မိုးကြီးတဲ့အချိန် မြေသြဇာမထည့်သင့်ပါ။ မြေသြဇာ ရေနဲ့စီးသွားနိုင်ပြီး ထိရောက်မှု နည်းပါးသွားမည်။",
          contentEn: "Don't apply fertilizer during heavy rain. It will wash away and be ineffective.",
          upvotes: 25,
          downvotes: 0,
          timestamp: "၁ ရက်က / 1 day ago",
          replies: []
        }
      ]
    }
  ];

  const [threads, setThreads] = useState<Comment[]>(feedData);
  const [userVotes, setUserVotes] = useState<{[key: string]: 'up' | 'down' | null}>({});

  const handleVote = (commentId: string, voteType: 'up' | 'down') => {
    const currentVote = userVotes[commentId];
    
    setThreads((prevThreads) => {
      return prevThreads.map((thread) => updateCommentVotes(thread, commentId, voteType, currentVote));
    });

    if (currentVote === voteType) {
      setUserVotes({ ...userVotes, [commentId]: null });
    } else {
      setUserVotes({ ...userVotes, [commentId]: voteType });
    }
  };

  const updateCommentVotes = (
    comment: Comment,
    targetId: string,
    voteType: 'up' | 'down',
    currentVote: 'up' | 'down' | null
  ): Comment => {
    if (comment.id === targetId) {
      let newUpvotes = comment.upvotes;
      let newDownvotes = comment.downvotes;

      if (currentVote === 'up') {
        newUpvotes -= 1;
        if (voteType === 'down') newDownvotes += 1;
      } else if (currentVote === 'down') {
        newDownvotes -= 1;
        if (voteType === 'up') newUpvotes += 1;
      } else {
        if (voteType === 'up') newUpvotes += 1;
        if (voteType === 'down') newDownvotes += 1;
      }

      return { ...comment, upvotes: newUpvotes, downvotes: newDownvotes };
    }

    if (comment.replies.length > 0) {
      return {
        ...comment,
        replies: comment.replies.map((reply) =>
          updateCommentVotes(reply, targetId, voteType, currentVote)
        ),
      };
    }

    return comment;
  };

  const sortedThreads = [...threads].sort((a, b) => {
    if (sortBy === "top") {
      return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
    } else {
      return 0; // For "newest", keep original order
    }
  });

  const renderComment = (comment: Comment, isReply: boolean = false) => {
    const voteScore = comment.upvotes - comment.downvotes;
    const userVote = userVotes[comment.id];

    return (
      <div key={comment.id} className={isReply ? "ml-8 mt-3" : ""}>
        <Card className={isReply ? "bg-gray-50" : ""}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#16a34a] rounded-full flex items-center justify-center text-white font-medium">
                  {comment.author[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{comment.author}</span>
                    {comment.isExpert && (
                      <Badge className="bg-[#78350f] text-white text-xs h-5">
                        <Shield className="w-3 h-3 mr-1" />
                        ကျွမ်းကျင်သူ
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{comment.authorEn}</p>
                  <p className="text-xs text-gray-400">{comment.timestamp}</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            <div>
              <p className="text-sm mb-1">{comment.content}</p>
              <p className="text-sm text-gray-600">{comment.contentEn}</p>
            </div>

            {/* Vote and Reply Controls */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote(comment.id, 'up')}
                className={`h-9 px-2 ${userVote === 'up' ? 'text-[#16a34a] bg-green-50' : ''}`}
              >
                <ThumbsUp className={`w-4 h-4 ${userVote === 'up' ? 'fill-current' : ''}`} />
              </Button>
              <span className={`text-sm font-medium min-w-[30px] text-center ${
                voteScore > 0 ? 'text-[#16a34a]' : voteScore < 0 ? 'text-red-500' : 'text-gray-500'
              }`}>
                {voteScore}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote(comment.id, 'down')}
                className={`h-9 px-2 ${userVote === 'down' ? 'text-red-500 bg-red-50' : ''}`}
              >
                <ThumbsDown className={`w-4 h-4 ${userVote === 'down' ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm" className="ml-2 h-9">
                <MessageCircle className="w-4 h-4 mr-1" />
                <span className="text-xs">
                  {comment.replies.length > 0 ? `${comment.replies.length} ပြန်စာ` : 'ပြန်စာ'}
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Render Replies */}
        {comment.replies.length > 0 && (
          <div className="mt-3 space-y-3">
            {comment.replies.map((reply) => renderComment(reply, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f0fdf4]">
      {/* Header */}
      <header className="bg-[#16a34a] text-white p-4 shadow-md">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <div>
            <h1 className="text-lg">လူမှုကွန်ရက် ဖိုရမ်</h1>
            <p className="text-sm opacity-90">Community Forum</p>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Filter Bar */}
        <Card>
          <CardContent className="p-3">
            <Tabs value={sortBy} onValueChange={(value) => setSortBy(value as "top" | "newest")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="top" className="h-11">
                  <div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>အများဆုံးမဲ</span>
                    </div>
                    <div className="text-xs opacity-70">Top Rated</div>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="newest" className="h-11">
                  <div>
                    <div className="flex items-center gap-1">
                      <Filter className="w-4 h-4" />
                      <span>နောက်ဆုံး</span>
                    </div>
                    <div className="text-xs opacity-70">Newest</div>
                  </div>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Thread List */}
        <div className="space-y-4">
          {sortedThreads.map((thread) => renderComment(thread))}
        </div>

        {/* New Post Button */}
        <div className="fixed bottom-24 right-4">
          <Button
            size="lg"
            className="h-14 w-14 rounded-full bg-[#16a34a] hover:bg-[#15803d] shadow-lg"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
