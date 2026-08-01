export type JointKey =
  | "neck"
  | "shoulder-l"
  | "shoulder-r"
  | "elbow-l"
  | "elbow-r"
  | "wrist-l"
  | "wrist-r"
  | "spine"
  | "hip"
  | "knee-l"
  | "knee-r"
  | "ankle-l"
  | "ankle-r"
  | "foot-l"
  | "foot-r";

export type JointInfo = {
  label: string;
  problems: string[];
  treatments: string[];
};

export const jointInfo: Record<JointKey, JointInfo> = {
  neck: {
    label: "Neck (Cervical Spine)",
    problems: ["Cervical spondylosis", "Nerve compression", "Stiffness"],
    treatments: ["Physiotherapy", "Pain management", "Surgical decompression (severe cases)"],
  },
  "shoulder-l": {
    label: "Left Shoulder",
    problems: ["Rotator cuff tear", "Frozen shoulder", "Arthritis"],
    treatments: ["Arthroscopy", "Total shoulder replacement", "Physiotherapy"],
  },
  "shoulder-r": {
    label: "Right Shoulder",
    problems: ["Rotator cuff tear", "Frozen shoulder", "Arthritis"],
    treatments: ["Arthroscopy", "Total shoulder replacement", "Physiotherapy"],
  },
  "elbow-l": {
    label: "Left Elbow",
    problems: ["Tennis elbow", "Ligament injury"],
    treatments: ["Conservative management", "Arthroscopic release"],
  },
  "elbow-r": {
    label: "Right Elbow",
    problems: ["Tennis elbow", "Ligament injury"],
    treatments: ["Conservative management", "Arthroscopic release"],
  },
  "wrist-l": {
    label: "Left Wrist",
    problems: ["Fracture", "Carpal tunnel syndrome"],
    treatments: ["Splinting", "Fracture fixation", "Surgical release"],
  },
  "wrist-r": {
    label: "Right Wrist",
    problems: ["Fracture", "Carpal tunnel syndrome"],
    treatments: ["Splinting", "Fracture fixation", "Surgical release"],
  },
  spine: {
    label: "Spine",
    problems: ["Disc herniation", "Scoliosis", "Chronic back pain"],
    treatments: ["Physiotherapy", "Pain management", "Spine surgery (select cases)"],
  },
  hip: {
    label: "Hip",
    problems: ["Osteoarthritis", "Fracture", "Avascular necrosis"],
    treatments: ["Total / partial hip replacement", "Minimally invasive surgery"],
  },
  "knee-l": {
    label: "Left Knee",
    problems: ["Osteoarthritis", "ACL/PCL tear", "Meniscus tear"],
    treatments: ["Robotic knee replacement", "Arthroscopy", "Ligament reconstruction"],
  },
  "knee-r": {
    label: "Right Knee",
    problems: ["Osteoarthritis", "ACL/PCL tear", "Meniscus tear"],
    treatments: ["Robotic knee replacement", "Arthroscopy", "Ligament reconstruction"],
  },
  "ankle-l": {
    label: "Left Ankle",
    problems: ["Sprain", "Fracture", "Instability"],
    treatments: ["Bracing", "Physiotherapy", "Surgical stabilisation"],
  },
  "ankle-r": {
    label: "Right Ankle",
    problems: ["Sprain", "Fracture", "Instability"],
    treatments: ["Bracing", "Physiotherapy", "Surgical stabilisation"],
  },
  "foot-l": {
    label: "Left Foot",
    problems: ["Plantar fasciitis", "Bunion", "Stress fracture"],
    treatments: ["Orthotics", "Physiotherapy", "Corrective surgery"],
  },
  "foot-r": {
    label: "Right Foot",
    problems: ["Plantar fasciitis", "Bunion", "Stress fracture"],
    treatments: ["Orthotics", "Physiotherapy", "Corrective surgery"],
  },
};
