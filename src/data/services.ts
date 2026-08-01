export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  icon:
    | "knee"
    | "hip"
    | "shoulder"
    | "sports"
    | "arthroscopy"
    | "spine"
    | "trauma"
    | "fracture"
    | "pediatric"
    | "arthritis"
    | "robotic"
    | "tumor"
    | "bone-health"
    | "revision";
};

export const services: Service[] = [
  {
    slug: "joint-replacement",
    name: "Joint Replacement",
    short: "Total & partial replacement",
    description:
      "Comprehensive joint replacement care for knee, hip and shoulder, using minimally invasive and robotic-assisted techniques.",
    icon: "knee",
  },
  {
    slug: "knee-replacement",
    name: "Knee Replacement",
    short: "Robotic total & partial TKR",
    description:
      "Precision robotic-assisted total and partial knee replacement for accurate implant placement and faster recovery.",
    icon: "knee",
  },
  {
    slug: "hip-replacement",
    name: "Hip Replacement",
    short: "Total & partial THR",
    description:
      "Full and partial hip joint replacement to relieve chronic pain and restore range of motion.",
    icon: "hip",
  },
  {
    slug: "shoulder-replacement",
    name: "Shoulder Replacement",
    short: "Minimally invasive",
    description:
      "Minimally invasive total shoulder replacement to relieve pain and restore function.",
    icon: "shoulder",
  },
  {
    slug: "sports-injury",
    name: "Sports Injury",
    short: "Athletic injury care",
    description:
      "Comprehensive evaluation and treatment for athletic and activity-related injuries, including ACL/PCL and meniscus repair.",
    icon: "sports",
  },
  {
    slug: "arthroscopy",
    name: "Arthroscopy",
    short: "Keyhole surgery",
    description:
      "Minimally invasive keyhole surgery for diagnosis and treatment of knee and shoulder joint conditions.",
    icon: "arthroscopy",
  },
  {
    slug: "spine-surgery",
    name: "Spine Surgery",
    short: "Spinal care",
    description:
      "Evidence-based management of spinal conditions with modern surgical and non-surgical protocols.",
    icon: "spine",
  },
  {
    slug: "trauma-care",
    name: "Trauma Care",
    short: "AO-trained trauma surgery",
    description:
      "Advanced trauma reconstruction informed by AO Advanced Trauma Fellowship training at Harvard MGH, Boston.",
    icon: "trauma",
  },
  {
    slug: "fracture-management",
    name: "Fracture Management",
    short: "Complex fracture care",
    description:
      "Evidence-based management of simple and complex fractures using internationally accepted protocols.",
    icon: "fracture",
  },
  {
    slug: "pediatric-orthopedics",
    name: "Pediatric Orthopedics",
    short: "Care for growing bones",
    description:
      "Specialised assessment and treatment for orthopedic conditions in children and adolescents.",
    icon: "pediatric",
  },
  {
    slug: "arthritis",
    name: "Arthritis",
    short: "Joint pain management",
    description:
      "Personalised, staged treatment for arthritis — from conservative management to joint replacement.",
    icon: "arthritis",
  },
  {
    slug: "robotic-surgery",
    name: "Robotic Surgery",
    short: "Precision technology",
    description:
      "Robotic-assisted knee, hip and shoulder surgery for greater precision and quicker recovery.",
    icon: "robotic",
  },
  {
    slug: "bone-tumors",
    name: "Bone Tumors",
    short: "Oncologic orthopedics",
    description:
      "Assessment and coordinated care pathways for benign and malignant bone tumors.",
    icon: "tumor",
  },
  {
    slug: "bone-health",
    name: "Bone Health",
    short: "Osteoporosis & prevention",
    description:
      "Preventive bone health screening and management, including osteoporosis risk assessment.",
    icon: "bone-health",
  },
  {
    slug: "revision-surgery",
    name: "Revision Joint Replacement",
    short: "Specialised revisions",
    description:
      "Specialised revision surgery for previously replaced knee, hip or shoulder joints.",
    icon: "revision",
  },
];
