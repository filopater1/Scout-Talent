
export interface ExperienceData {
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export const addExperience = async (
  userId: string,
  experience: ExperienceData,
) => {
  try {
    const response = await fetch(`/api/users/${userId}/experience`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(experience),
    });

    if (!response.ok) {
      throw new Error("Failed to add experience");
    }

    return await response.json();
  } catch (error) {
    console.error("Add Experience Error:", error);
    throw error;
  }
};

export const uploadCV = async (userId: string, file: File) => {
  try {
    const formData = new FormData();
    formData.append("cv", file);

    const response = await fetch(`/api/users/${userId}/upload-cv`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload CV");
    }

    return await response.json();
  } catch (error) {
    console.error("Upload CV Error:", error);
    throw error;
  }
};
