"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ChevronRight,
  Mail,
  Phone,
  Linkedin,
  FileText,
  Calendar,
  Star,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CandidateDetail from "./candidate-detail";

const stages = [
  { id: "new", title: "New Applications", color: "bg-gray-100" },
  { id: "screening", title: "Screening", color: "bg-blue-100" },
  { id: "culture_fit", title: "Culture Fit", color: "bg-purple-100" },
  { id: "interview", title: "Interview", color: "bg-orange-100" },
  { id: "offer", title: "Offer", color: "bg-green-100" },
  { id: "hired", title: "Hired", color: "bg-emerald-100" }
];

export default function CandidatePipeline({ candidates }: { candidates: any[] }) {
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [candidatesByStage, setCandidatesByStage] = useState(() => {
    const grouped: Record<string, any[]> = {};
    stages.forEach(stage => {
      grouped[stage.id] = candidates?.filter(c => c.stage === stage.id) || [];
    });
    return grouped;
  });

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    if (source.droppableId === destination.droppableId) {
      // Reorder within same stage
      const items = Array.from(candidatesByStage[source.droppableId]);
      const [removed] = items.splice(source.index, 1);
      items.splice(destination.index, 0, removed);
      
      setCandidatesByStage({
        ...candidatesByStage,
        [source.droppableId]: items
      });
    } else {
      // Move between stages
      const sourceItems = Array.from(candidatesByStage[source.droppableId]);
      const destItems = Array.from(candidatesByStage[destination.droppableId]);
      const [removed] = sourceItems.splice(source.index, 1);
      
      // Update candidate stage
      removed.stage = destination.droppableId;
      destItems.splice(destination.index, 0, removed);
      
      setCandidatesByStage({
        ...candidatesByStage,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems
      });
      
      // API call to update stage
      updateCandidateStage(draggableId, destination.droppableId);
    }
  };

  const updateCandidateStage = async (candidateId: string, newStage: string) => {
    // API call to update candidate stage
    console.log(`Updating candidate ${candidateId} to stage ${newStage}`);
  };

  return (
    <>
      <div className="h-full">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-6 gap-4 h-full">
            {stages.map((stage) => (
              <div key={stage.id} className="flex flex-col h-full">
                <div className={`p-3 rounded-t-lg ${stage.color}`}>
                  <h3 className="font-semibold text-sm">{stage.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {candidatesByStage[stage.id]?.length || 0} candidates
                  </p>
                </div>
                
                <Droppable droppableId={stage.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex-1 bg-gray-50 p-2 space-y-2 overflow-y-auto ${
                        snapshot.isDraggingOver ? "bg-blue-50" : ""
                      }`}
                    >
                      {candidatesByStage[stage.id]?.map((candidate, index) => (
                        <Draggable
                          key={candidate.id}
                          draggableId={candidate.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`${
                                snapshot.isDragging ? "opacity-50" : ""
                              }`}
                            >
                              <CandidateCard
                                candidate={candidate}
                                onClick={() => setSelectedCandidate(candidate)}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <CandidateDetail
          candidate={selectedCandidate}
          onStatusChange={(candidateId, status) => {
            // Handle status change
            console.log('Status change:', candidateId, status);
          }}
          onScheduleInterview={(candidate) => {
            // Handle interview scheduling
            console.log('Schedule interview:', candidate);
          }}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
    </>
  );
}

function CandidateCard({ candidate, onClick }: any) {
  return (
    <div 
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-3">
        <div className="flex items-start gap-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="text-xs">
              {candidate.name.split(' ').map((n: string) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate">{candidate.name}</h4>
            <p className="text-xs text-gray-600 truncate">{candidate.jobTitle}</p>
            
            <div className="flex items-center gap-2 mt-2">
              {candidate.screeningScore && (
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span className="text-xs">{candidate.screeningScore}</span>
                </div>
              )}
              {candidate.cultureFitScore && (
                <Badge variant="outline" className="text-xs">
                  Culture: {candidate.cultureFitScore}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(candidate.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  );
}
