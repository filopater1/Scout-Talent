import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Calendar, Video, CheckCircle } from "lucide-react";

type CandidateStatus = "Interview" | "Offer" | "Hired";

interface Candidate {
  id: number;
  name: string;
  position: string;
  interviewDate?: string;
  interviewLink?: string;
  status: CandidateStatus;
}

export default function HRInterviewDashboard() {
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: 1,
      name: "Michael Taylor",
      position: "Senior Software Engineer",
      status: "Interview",
    },
    {
      id: 2,
      name: "Lisa Anderson",
      position: "Data Engineer",
      status: "Interview",
    },
  ]);

  const updateCandidate = (id: number, updates: Partial<Candidate>) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">HR Interview Management</h1>

      <div className="space-y-6">
        {candidates.map((candidate) => (
          <Card key={candidate.id}>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-lg">{candidate.name}</h2>
                  <p className="text-sm text-gray-600">{candidate.position}</p>
                </div>

                <Badge>{candidate.status}</Badge>
              </div>

              {/* Schedule Interview */}
              {candidate.status === "Interview" && (
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm">Interview Date</label>
                    <Input
                      type="datetime-local"
                      onChange={(e) =>
                        updateCandidate(candidate.id, {
                          interviewDate: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm">Meeting Link</label>
                    <Input
                      placeholder="https://meet.google.com/..."
                      onChange={(e) =>
                        updateCandidate(candidate.id, {
                          interviewLink: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-end gap-2">
                    <Button
                      onClick={() =>
                        alert(`Interview scheduled for ${candidate.name}`)
                      }
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Send Invite
                    </Button>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                {candidate.status === "Interview" && (
                  <Button
                    variant="outline"
                    onClick={() =>
                      updateCandidate(candidate.id, {
                        status: "Offer",
                      })
                    }
                  >
                    Move to Offer
                  </Button>
                )}

                {candidate.status === "Offer" && (
                  <Button
                    onClick={() =>
                      updateCandidate(candidate.id, {
                        status: "Hired",
                      })
                    }
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Hired
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
