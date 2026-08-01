export type BlogPost = {
  slug: string;
  title: string;
  category: "Recovery Guides" | "Bone Health" | "Exercises" | "Lifestyle Tips" | "Nutrition";
  excerpt: string;
  readTime: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "knee-replacement-recovery-timeline",
    title: "What to Expect: Your Knee Replacement Recovery Timeline",
    category: "Recovery Guides",
    excerpt:
      "A week-by-week guide to recovering from robotic knee replacement, from the first 48 hours to full mobility.",
    readTime: "6 min read",
  },
  {
    slug: "osteoporosis-prevention",
    title: "5 Ways to Protect Your Bone Health After 40",
    category: "Bone Health",
    excerpt:
      "Practical, evidence-based steps to reduce osteoporosis risk and keep your joints strong for longer.",
    readTime: "4 min read",
  },
  {
    slug: "post-surgery-exercises",
    title: "Safe Home Exercises After Joint Replacement Surgery",
    category: "Exercises",
    excerpt:
      "A physiotherapist-guided routine to rebuild strength and range of motion safely at home.",
    readTime: "5 min read",
  },
  {
    slug: "sports-injury-prevention",
    title: "Preventing Common Sports Injuries: A Guide for Athletes",
    category: "Lifestyle Tips",
    excerpt:
      "How proper warm-up, technique and recovery reduce the risk of ACL tears and joint injuries.",
    readTime: "5 min read",
  },
  {
    slug: "nutrition-for-joint-health",
    title: "Foods That Support Joint and Bone Health",
    category: "Nutrition",
    excerpt: "A practical nutrition guide for maintaining strong bones and healthy joints.",
    readTime: "4 min read",
  },
];
