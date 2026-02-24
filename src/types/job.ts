export enum JobType {
  FULL_TIME = "Full_Time",
  PART_TIME = "Part_Time",
  CONTRACT = "Contract",
  FREELANCE = "Freelance",
  INTERNSHIP = "Internship",
  TEMPORARY = "Temporary",
}

export enum WorkMode {
  ONSITE = "Onsite",
  REMOTE = "Remote",
  HYBRID = "Hybrid",
}

export enum JobStatus {
  DRAFT = "Draft",
  PUBLISHED = "Published",
  CLOSED = "Closed",
  PAUSED = "Paused",
  EXPIRED = "Expired",
  FILLED = "Filled",
}

export type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  type: JobType;
  workMode: WorkMode;
  status: JobStatus;
  description: string;
  skills: string[];
  responsibilities: string[];
  requirements: string[];
};
