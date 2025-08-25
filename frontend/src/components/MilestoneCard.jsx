import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, CheckCircle2, Circle, Edit2, Trash2, GripVertical } from 'lucide-react';
import { format } from 'date-fns';

const MilestoneCard = ({ 
  milestone, 
  onEdit, 
  onDelete, 
  onToggleComplete,
  isDragging = false,
  dragHandleProps
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'No date set';
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const isOverdue = !milestone.completed && new Date(milestone.achieveDate) < new Date();

  return (
    <Card 
      className={`transition-all duration-300 hover:shadow-lg bg-gray-800 border-gray-700 ${
        isDragging ? 'opacity-50 rotate-2' : ''
      } ${milestone.completed ? 'bg-green-900/30 border-green-600/50' : isOverdue ? 'bg-red-900/30 border-red-600/50' : ''}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div {...dragHandleProps} className="cursor-move mt-1">
              <GripVertical className="h-4 w-4 text-gray-400" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold flex items-center gap-2 text-white">
                {milestone.title}
                {milestone.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-400" />
                )}
              </CardTitle>
              <p className="text-sm text-gray-300 mt-1">{milestone.description}</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(milestone)}
              className="h-8 w-8 p-0 text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(milestone.id)}
              className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Calendar className="h-4 w-4" />
            <span>Target: {formatDate(milestone.achieveDate)}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="flex gap-2">
              {milestone.completed && milestone.completedDate && (
                <Badge variant="secondary" className="text-xs bg-green-900/50 text-green-300 border-green-600">
                  Completed: {formatDate(milestone.completedDate)}
                </Badge>
              )}
              {isOverdue && !milestone.completed && (
                <Badge variant="destructive" className="text-xs bg-red-900/50 text-red-300 border-red-600">
                  Overdue
                </Badge>
              )}
            </div>
            <Button
              onClick={() => onToggleComplete(milestone.id, !milestone.completed)}
              variant={milestone.completed ? "outline" : "default"}
              size="sm"
              className={`text-xs px-3 ${
                milestone.completed 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {milestone.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MilestoneCard;