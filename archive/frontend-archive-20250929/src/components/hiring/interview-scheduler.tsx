import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";

interface InterviewSchedulerProps {
  candidate: {
    id: string;
    name: string;
    email: string;
    position: string;
  };
  onSchedule: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function InterviewScheduler({ candidate, onSchedule, onCancel, isLoading = false }: InterviewSchedulerProps) {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    duration: "60",
    type: "video",
    interviewers: [""],
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSchedule({
      candidateId: candidate.id,
      ...formData,
      interviewers: formData.interviewers.filter(interviewer => interviewer.trim() !== "")
    });
  };

  const addInterviewer = () => {
    setFormData(prev => ({
      ...prev,
      interviewers: [...prev.interviewers, ""]
    }));
  };

  const updateInterviewer = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      interviewers: prev.interviewers.map((interviewer, i) => i === index ? value : interviewer)
    }));
  };

  const removeInterviewer = (index: number) => {
    setFormData(prev => ({
      ...prev,
      interviewers: prev.interviewers.filter((_, i) => i !== index)
    }));
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Schedule Interview</CardTitle>
        <p className="text-sm text-gray-600">
          Candidate: {candidate.name} ({candidate.email}) - {candidate.position}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="time">Time</Label>
              <input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <select
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
              </select>
            </div>

            <div>
              <Label htmlFor="type">Interview Type</Label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="video">Video Call</option>
                <option value="phone">Phone Call</option>
                <option value="in-person">In Person</option>
              </select>
            </div>
          </div>

          <div>
            <Label>Interviewers</Label>
            <div className="space-y-2 mt-1">
              {formData.interviewers.map((interviewer, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="email"
                    value={interviewer}
                    onChange={(e) => updateInterviewer(index, e.target.value)}
                    placeholder="Enter interviewer email"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formData.interviewers.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeInterviewer(index)}
                      className="px-3"
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addInterviewer}
                className="w-full"
              >
                Add Interviewer
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
              placeholder="Any additional notes or instructions..."
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Scheduling..." : "Schedule Interview"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
