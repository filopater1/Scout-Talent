import { Job, JobStatus, JobType, WorkMode } from "../types/job";

let jobs: Job[] = [];

export const jobStore = {
  getAll: () => jobs,

  getPublished: () => jobs.filter((j) => j.status === JobStatus.PUBLISHED),

  add: (job: Job) => {
    jobs.push(job);
  },

  update: (job: Job) => {
    jobs = jobs.map((j) => (j.id === job.id ? job : j));
  },

  delete: (id: number) => {
    jobs = jobs.filter((j) => j.id !== id);
  },

  updateStatus: (id: number, status: JobStatus) => {
    jobs = jobs.map((j) => (j.id === id ? { ...j, status } : j));
  },
};
